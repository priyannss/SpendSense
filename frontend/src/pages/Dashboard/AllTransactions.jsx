import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import moment from 'moment'
import TransactionInfoCard from '../../components/cards/TransactionInfoCard'
import { addThousandsSeparator } from '../../utils/helper'
import InfoCard from '../../components/cards/InfoCard'
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'

const AllTransactions = () => {
  useUserAuth();

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch both income and expense, combine and sort by date
  const fetchAllTransactions = async () => {
    setLoading(true)
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      ])
      const income = (incomeRes.data || []).map(t => ({ ...t, type: 'income' }))
      const expenses = (expenseRes.data || []).map(t => ({ ...t, type: 'expense' }))
      const all = [...income, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
      setTransactions(all)
    } catch (err) {
      setTransactions([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAllTransactions()
  }, [])

  // Overview values
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0)
  const netBalance = totalIncome - totalExpense

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="my-5 mx-auto">
        {/* Overview Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <InfoCard
            icon={<IoMdCard />}
            label="Net Balance"
            value={addThousandsSeparator(netBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(totalIncome)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(totalExpense)}
            color="bg-red-500"
          />
        </div>

        {/* All Transactions List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg">All Transactions</h5>
          </div>
          {loading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No transactions found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {transactions.map((t) => (
                <TransactionInfoCard
                  key={t._id}
                  title={t.type === 'income' ? t.source : t.category}
                  icon={t.icon}
                  date={moment(t.date).format('Do MMM YYYY')}
                  amount={addThousandsSeparator(t.amount)}
                  type={t.type}
                  hideDeleteBtn
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AllTransactions