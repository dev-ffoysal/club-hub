'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'
import { DollarSign, TrendingDown, BarChart3, TrendingUp } from 'lucide-react'

// Mock data
const mockFinancialRecords = [
  {
    id: '1',
    type: 'income' as const,
    category: 'Event Registration',
    amount: 15000,
    description: 'AI Workshop registration fees',
    date: new Date('2024-02-10'),
    receipt: 'receipt_001.pdf',
    createdBy: 'Ahmed Rahman',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '2',
    type: 'expense' as const,
    category: 'Equipment',
    amount: 8000,
    description: 'Projector rental for workshop',
    date: new Date('2024-02-09'),
    receipt: 'receipt_002.pdf',
    createdBy: 'Fatima Khan',
    createdAt: new Date('2024-02-09')
  },
  {
    id: '3',
    type: 'income' as const,
    category: 'Sponsorship',
    amount: 25000,
    description: 'Tech company sponsorship',
    date: new Date('2024-02-05'),
    receipt: 'receipt_003.pdf',
    createdBy: 'Ahmed Rahman',
    createdAt: new Date('2024-02-05')
  },
  {
    id: '4',
    type: 'expense' as const,
    category: 'Refreshments',
    amount: 3500,
    description: 'Snacks for programming contest',
    date: new Date('2024-02-03'),
    receipt: 'receipt_004.pdf',
    createdBy: 'Fatima Khan',
    createdAt: new Date('2024-02-03')
  }
]

const mockBudget = {
  id: '1',
  year: 2024,
  totalBudget: 100000,
  allocations: [
    { category: 'Events', allocated: 40000, spent: 15000 },
    { category: 'Equipment', allocated: 25000, spent: 8000 },
    { category: 'Marketing', allocated: 15000, spent: 5000 },
    { category: 'Refreshments', allocated: 10000, spent: 3500 },
    { category: 'Miscellaneous', allocated: 10000, spent: 2000 }
  ]
}

interface TransactionForm {
  type: 'income' | 'expense'
  category: string
  amount: string
  description: string
  date: string
}

export default function FinancesPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [transactionForm, setTransactionForm] = useState<TransactionForm>({
    type: 'income',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const totalIncome = mockFinancialRecords
    .filter(record => record.type === 'income')
    .reduce((sum, record) => sum + record.amount, 0)

  const totalExpenses = mockFinancialRecords
    .filter(record => record.type === 'expense')
    .reduce((sum, record) => sum + record.amount, 0)

  const balance = totalIncome - totalExpenses

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Adding transaction:', transactionForm)
    setShowAddTransaction(false)
    // Reset form
    setTransactionForm({
      type: 'income',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleDeleteTransaction = (transactionId: string) => {
    console.log('Deleting transaction:', transactionId)
  }

  const expenseCategories = ['Equipment', 'Refreshments', 'Marketing', 'Transportation', 'Venue', 'Miscellaneous']
  const incomeCategories = ['Event Registration', 'Sponsorship', 'Donations', 'Fundraising', 'Membership Fees']

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
            <p className="text-gray-600 mt-2">Track club finances, manage budgets, and monitor expenses</p>
          </div>
          <Button onClick={() => setShowAddTransaction(true)}>
            Add Transaction
          </Button>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Income</p>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Balance</p>
                  <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatCurrency(balance)}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round((totalExpenses / mockBudget.totalBudget) * 100)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Transaction Form */}
        {showAddTransaction && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Add New Transaction</CardTitle>
              <CardDescription>Record a new income or expense transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Type *
                    </label>
                    <select
                      required
                      value={transactionForm.type}
                      onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value as 'income' | 'expense'})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={transactionForm.category}
                      onChange={(e) => setTransactionForm({...transactionForm, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select category</option>
                      {(transactionForm.type === 'income' ? incomeCategories : expenseCategories).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (BDT) *
                    </label>
                    <Input
                      type="number"
                      required
                      value={transactionForm.amount}
                      onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={transactionForm.date}
                      onChange={(e) => setTransactionForm({...transactionForm, date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={transactionForm.description}
                    onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Describe the transaction"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receipt (Optional)
                  </label>
                  <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddTransaction(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Transaction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  All income and expense transactions for your club
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFinancialRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={record.type === 'income' ? 'success' : 'destructive'}>
                              <span className="flex items-center gap-1">
                                {record.type === 'income' ? (
                                  <><DollarSign className="w-3 h-3" /> Income</>
                                ) : (
                                  <><TrendingDown className="w-3 h-3" /> Expense</>
                                )}
                              </span>
                            </Badge>
                            <Badge variant="outline">{record.category}</Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-1">{record.description}</h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Amount:</strong> {formatCurrency(record.amount)}</p>
                            <p><strong>Date:</strong> {formatDate(record.date)}</p>
                            <p><strong>Added by:</strong> {record.createdBy}</p>
                            {record.receipt && (
                              <p><strong>Receipt:</strong> <a href="#" className="text-blue-600 hover:underline">{record.receipt}</a></p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteTransaction(record.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview - {mockBudget.year}</CardTitle>
                <CardDescription>
                  Track budget allocations and spending across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Budget Utilization</span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(totalExpenses)} / {formatCurrency(mockBudget.totalBudget)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totalExpenses / mockBudget.totalBudget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockBudget.allocations.map((allocation, index) => {
                    const utilizationPercentage = (allocation.spent / allocation.allocated) * 100
                    const isOverBudget = allocation.spent > allocation.allocated
                    
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{allocation.category}</h3>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {formatCurrency(allocation.spent)} / {formatCurrency(allocation.allocated)}
                            </div>
                            <div className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                              {utilizationPercentage.toFixed(1)}% used
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isOverBudget ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                          ></div>
                        </div>
                        {isOverBudget && (
                          <p className="text-xs text-red-600 mt-1">
                            Over budget by {formatCurrency(allocation.spent - allocation.allocated)}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Monthly financial chart will be implemented here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Expense breakdown pie chart will be implemented here
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate Financial Report</CardTitle>
                <CardDescription>
                  Export detailed financial reports for specific periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Monthly Summary</option>
                      <option>Quarterly Report</option>
                      <option>Annual Report</option>
                      <option>Custom Period</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}