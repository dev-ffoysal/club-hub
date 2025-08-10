'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'
import { Megaphone, Rocket, Eye, Users, Calendar } from 'lucide-react'

// Mock data for payments
const mockPayments = [
  {
    id: 'PAY-001',
    type: 'membership' as const,
    amount: 5000,
    currency: 'BDT',
    status: 'completed' as const,
    user: {
      name: 'Ahmed Rahman',
      email: 'ahmed.rahman@student.buet.ac.bd',
      university: 'BUET'
    },
    club: 'Computer Science Club',
    description: 'Annual membership fee',
    transactionId: 'TXN-20240215-001',
    paymentMethod: 'bKash',
    createdAt: new Date('2024-02-15'),
    completedAt: new Date('2024-02-15'),
    refundRequested: false
  },
  {
    id: 'PAY-002',
    type: 'event' as const,
    amount: 1500,
    currency: 'BDT',
    status: 'pending' as const,
    user: {
      name: 'Fatima Khan',
      email: 'fatima.khan@du.ac.bd',
      university: 'University of Dhaka'
    },
    club: 'Cultural Society',
    description: 'Cultural Festival 2024 registration',
    transactionId: 'TXN-20240216-002',
    paymentMethod: 'Nagad',
    createdAt: new Date('2024-02-16'),
    completedAt: null,
    refundRequested: false
  },
  {
    id: 'PAY-003',
    type: 'advertisement' as const,
    amount: 25000,
    currency: 'BDT',
    status: 'completed' as const,
    user: {
      name: 'TechCorp Ltd',
      email: 'marketing@techcorp.com',
      university: 'External'
    },
    club: null,
    description: 'Premium advertisement placement - 30 days',
    transactionId: 'TXN-20240214-003',
    paymentMethod: 'Bank Transfer',
    createdAt: new Date('2024-02-14'),
    completedAt: new Date('2024-02-14'),
    refundRequested: false
  },
  {
    id: 'PAY-004',
    type: 'membership' as const,
    amount: 3000,
    currency: 'BDT',
    status: 'failed' as const,
    user: {
      name: 'Rashid Ahmed',
      email: 'rashid.ahmed@nsu.edu.bd',
      university: 'North South University'
    },
    club: 'Entrepreneurship Club',
    description: 'Semester membership fee',
    transactionId: 'TXN-20240217-004',
    paymentMethod: 'Rocket',
    createdAt: new Date('2024-02-17'),
    completedAt: null,
    refundRequested: false
  },
  {
    id: 'PAY-005',
    type: 'event' as const,
    amount: 2000,
    currency: 'BDT',
    status: 'refunded' as const,
    user: {
      name: 'Sadia Islam',
      email: 'sadia.islam@bracu.ac.bd',
      university: 'BRAC University'
    },
    club: 'Green Earth Club',
    description: 'Environmental Workshop registration',
    transactionId: 'TXN-20240210-005',
    paymentMethod: 'bKash',
    createdAt: new Date('2024-02-10'),
    completedAt: new Date('2024-02-10'),
    refundRequested: true,
    refundedAt: new Date('2024-02-18')
  },
  {
    id: 'PAY-006',
    type: 'promotion' as const,
    amount: 15000,
    currency: 'BDT',
    status: 'completed' as const,
    user: {
      name: 'Tech Innovation Club',
      email: 'admin@techinnovation.iut.ac.bd',
      university: 'IUT'
    },
    club: 'Tech Innovation Club',
    description: 'Event promotion boost - AI Symposium',
    transactionId: 'TXN-20240213-006',
    paymentMethod: 'Bank Transfer',
    createdAt: new Date('2024-02-13'),
    completedAt: new Date('2024-02-13'),
    refundRequested: false
  }
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')

  const handleProcessRefund = (paymentId: string) => {
    console.log('Processing refund for payment:', paymentId)
  }

  const handleRetryPayment = (paymentId: string) => {
    console.log('Retrying payment:', paymentId)
  }

  const handleViewDetails = (paymentId: string) => {
    console.log('Viewing payment details:', paymentId)
  }

  const handleExportData = () => {
    console.log('Exporting payment data')
  }

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesType = typeFilter === 'all' || payment.type === typeFilter
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod === methodFilter
    return matchesSearch && matchesStatus && matchesType && matchesMethod
  })

  const stats = {
    total: mockPayments.length,
    completed: mockPayments.filter(p => p.status === 'completed').length,
    pending: mockPayments.filter(p => p.status === 'pending').length,
    failed: mockPayments.filter(p => p.status === 'failed').length,
    refunded: mockPayments.filter(p => p.status === 'refunded').length,
    totalRevenue: mockPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: mockPayments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0),
    refundedAmount: mockPayments
      .filter(p => p.status === 'refunded')
      .reduce((sum, p) => sum + p.amount, 0)
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all payment transactions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleExportData}>
              📊 Export Data
            </Button>
            <Button size="sm" className="w-full sm:w-auto">💰 Financial Report</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Payments</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{stats.refunded}</p>
                <p className="text-sm text-gray-600">Refunded</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{formatCurrency(stats.pendingAmount)}</p>
                <p className="text-sm text-gray-600">Pending Amount</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{formatCurrency(stats.refundedAmount)}</p>
                <p className="text-sm text-gray-600">Refunded</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by payment ID, user name, email, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="membership">Membership</option>
                  <option value="event">Event</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="promotion">Promotion</option>
                </select>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Methods</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">
                          {payment.type === 'membership' ? <Users className="w-4 h-4" /> :
                            payment.type === 'event' ? <Calendar className="w-4 h-4" /> :
                           payment.type === 'advertisement' ? <Megaphone className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{payment.id}</h3>
                        <p className="text-gray-600">{payment.user.name} • {payment.user.university}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          payment.status === 'completed' ? 'default' :
                          payment.status === 'pending' ? 'secondary' :
                          payment.status === 'failed' ? 'destructive' : 'outline'
                        }>
                          {payment.status}
                        </Badge>
                        <Badge variant="outline">
                          {payment.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium text-lg">{formatCurrency(payment.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">{payment.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium text-sm">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium">{formatDate(payment.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {payment.status === 'completed' ? 'Completed' :
                           payment.status === 'refunded' ? 'Refunded' : 'Status'}
                        </p>
                        {/* <p className="font-medium">
                          {payment.completedAt ? formatDate(payment.completedAt) :
                           payment.refundedAt ? formatDate(payment.refundedAt) : '-'}
                        </p> */}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700 text-sm">{payment.description}</p>
                      {payment.club && (
                        <p className="text-gray-600 text-sm mt-1">Club: {payment.club}</p>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">User Details</p>
                      <p className="text-sm text-gray-700">{payment.user.email}</p>
                    </div>
                    
                    {payment.refundRequested && (
                      <div className="mt-3">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          🔄 Refund Requested
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleViewDetails(payment.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> Details
                    </Button>
                    
                    {payment.status === 'failed' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 flex-1 lg:flex-none"
                        onClick={() => handleRetryPayment(payment.id)}
                      >
                        🔄 Retry
                      </Button>
                    )}
                    
                    {(payment.status === 'completed' && !payment.refundRequested) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-orange-600 border-orange-600 hover:bg-orange-50 flex-1 lg:flex-none"
                        onClick={() => handleProcessRefund(payment.id)}
                      >
                        💰 Refund
                      </Button>
                    )}
                    
                    {payment.refundRequested && payment.status !== 'refunded' && (
                      <Button 
                        size="sm" 
                        className="bg-orange-600 hover:bg-orange-700 flex-1 lg:flex-none"
                        onClick={() => handleProcessRefund(payment.id)}
                      >
                        ✓ Process Refund
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-4 block">💳</span>
                <h3 className="text-lg font-medium mb-2">No payments found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}