import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage'


const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageURL = "";

        if (!fullName) {
            setError('Please enter your name');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!password) {
            setError('Please enter the password');
            return;
        }

        setError("");

        // Signup API call
        try {
            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageURL = imgUploadRes.imageURL || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageURL
            })

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user); // Assuming you have a function to update user context
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    }

    return (
        <AuthLayout>
            <div className='flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>
                    Create an account
                </h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your details to create an account
                </p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4'>
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label='Full Name'
                            placeholder='Your Name'
                            type='text'
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label='Email Address'
                            placeholder='your@email.com'
                            type='email'
                        />
                    </div>

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label='Password'
                        placeholder='Min 8 characters'
                        type='password'
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary'>
                        SIGN UP
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account? {""}
                        <Link className='font-medium text-primary underline' to="/login">
                            Login
                        </Link>
                    </p>
                </form>

            </div>
        </AuthLayout>
    )
}

export default SignUp