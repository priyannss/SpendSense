import React from 'react'
import CARD_2 from '../../assets/images/card2.png'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-violet-200 to-fuchsia-100 relative overflow-hidden">
            {/* Decorative SVGs */}
            <svg className="absolute top-0 left-0 w-96 h-96 opacity-30 z-0" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="200" fill="#a78bfa" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-20 z-0" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="160" fill="#f472b6" />
            </svg>

            {/* Auth Card */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl px-4">
                {/* Left: Auth Form */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-8">
                        <img src="/logo.svg" alt="logo" className="h-12 drop-shadow-lg" />
                        <span className="text-2xl font-bold text-violet-700 tracking-tight">SpendSense</span>
                    </div>
                    <div className="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                        {children}
                    </div>
                </div>

                {/* Right: Illustration & Stats */}
                <div className="hidden md:flex flex-col items-center gap-8 w-1/2">
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6">
                        <StatsInfoCard
                            icon={<LuTrendingUpDown />}
                            label="Track Your Income & Expenses"
                            value="430,000"
                            color="bg-primary"
                        />
                    </div>
                    <img
                        src={CARD_2}
                        alt="Card Illustration"
                        className="w-72 rounded-2xl shadow-2xl border-8 border-white/60"
                        style={{ filter: 'drop-shadow(0 8px 32px rgba(135,92,245,0.15))' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-5 items-center">
            <div className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-xl shadow-lg`}>
                {icon}
            </div>
            <div>
                <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
                <span className="text-2xl font-semibold text-gray-900">₹{value}</span>
            </div>
        </div>
    )
}