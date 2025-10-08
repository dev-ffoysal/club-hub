'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate, formatTime } from '../../../lib/utils'
import { MessageSquare, Bell, Megaphone, Info, AlertTriangle, X, CheckCircle, UserCheck, Send } from 'lucide-react'

// Mock data
const mockGeneralChatMessages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Ahmed Rahman',
    content: 'Hey everyone! Don\'t forget about the AI workshop tomorrow at 2 PM.',
    timestamp: new Date('2024-02-10T14:30:00'),
    type: 'text' as const
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Fatima Khan',
    content: 'Thanks for the reminder! I\'ve prepared some questions to ask.',
    timestamp: new Date('2024-02-10T14:32:00'),
    type: 'text' as const
  },
  {
    id: '3',
    senderId: '3',
    senderName: 'Karim Ahmed',
    content: 'Will the session be recorded? I might be a few minutes late.',
    timestamp: new Date('2024-02-10T14:35:00'),
    type: 'text' as const
  },
  {
    id: '4',
    senderId: 'admin',
    senderName: 'Club Admin',
    content: 'ANNOUNCEMENT: Programming contest registration is now open! Link: https://contest.example.com',
    timestamp: new Date('2024-02-10T15:00:00'),
    type: 'announcement' as const
  }
]

const mockCommitteeChatMessages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Ahmed Rahman',
    content: 'Committee meeting scheduled for Friday 3 PM. Please confirm your attendance.',
    timestamp: new Date('2024-02-10T09:00:00'),
    type: 'text' as const
  },
  {
    id: '2',
    senderId: '3',
    senderName: 'Karim Ahmed',
    content: 'Confirmed. I\'ll prepare the agenda and send it by tomorrow.',
    timestamp: new Date('2024-02-10T09:15:00'),
    type: 'text' as const
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Fatima Khan',
    content: 'Confirmed. Should we discuss the budget allocation for upcoming events?',
    timestamp: new Date('2024-02-10T09:30:00'),
    type: 'text' as const
  },
  {
    id: '4',
    senderId: 'admin',
    senderName: 'Club Admin',
    content: 'COMMITTEE NOTICE: Please review the quarterly report before Friday\'s meeting.',
    timestamp: new Date('2024-02-10T10:00:00'),
    type: 'announcement' as const
  }
]

const mockNotifications = [
  {
    id: '1',
    title: 'Workshop Reminder',
    message: 'AI Workshop starts in 1 hour. Don\'t forget to bring your laptops!',
    type: 'info' as const,
    sentAt: new Date('2024-02-10T13:00:00'),
    recipients: 45,
    status: 'sent'
  },
  {
    id: '2',
    title: 'Registration Open',
    message: 'Programming Contest 2024 registration is now open. Register before Feb 18th!',
    type: 'success' as const,
    sentAt: new Date('2024-02-09T10:00:00'),
    recipients: 156,
    status: 'sent'
  },
  {
    id: '3',
    title: 'Meeting Cancelled',
    message: 'Today\'s club meeting has been cancelled due to unforeseen circumstances.',
    type: 'warning' as const,
    sentAt: new Date('2024-02-08T09:00:00'),
    recipients: 156,
    status: 'sent'
  },
  {
    id: '4',
    title: 'System Error',
    message: 'There was an error processing member registrations. Please contact support.',
    type: 'error' as const,
    sentAt: new Date('2024-02-07T16:30:00'),
    recipients: 5,
    status: 'sent'
  }
]

interface NotificationForm {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  recipients: 'all' | 'active' | 'admins' | 'selected'
  priority: 'normal' | 'high' | 'urgent'
}

export default function CommunicationsPage() {
  const [selectedTab, setSelectedTab] = useState('chat')
  const [activeChat, setActiveChat] = useState<'general' | 'committee'>('general')
  const [newMessage, setNewMessage] = useState('')
  const [generalMessages, setGeneralMessages] = useState(mockGeneralChatMessages)
  const [committeeMessages, setCommitteeMessages] = useState(mockCommitteeChatMessages)
  const [showNotificationForm, setShowNotificationForm] = useState(false)
  const [notificationForm, setNotificationForm] = useState<NotificationForm>({
    title: '',
    message: '',
    type: 'info',
    recipients: 'all',
    priority: 'normal'
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: 'admin',
        senderName: 'Club Admin',
        content: newMessage,
        timestamp: new Date(),
        type: 'text' as const
      }
      
      if (activeChat === 'general') {
        setGeneralMessages(prev => [...prev, message])
      } else {
        setCommitteeMessages(prev => [...prev, message])
      }
      
      setNewMessage('')
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    if (activeChat === 'general') {
      setGeneralMessages(prev => prev.filter(msg => msg.id !== messageId))
    } else {
      setCommitteeMessages(prev => prev.filter(msg => msg.id !== messageId))
    }
  }

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending notification:', notificationForm)
    setShowNotificationForm(false)
    setNotificationForm({
      title: '',
      message: '',
      type: 'info',
      recipients: 'all',
      priority: 'normal'
    })
  }


  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
            <p className="text-gray-600 mt-2">Manage group chat, send notifications, and communicate with members</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Chat Settings</Button>
            <Button onClick={() => setShowNotificationForm(true)}>
              Send Notification
            </Button>
          </div>
        </div>

        {/* Communication Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Messages</p>
                  <p className="text-3xl font-bold text-blue-600">{mockGeneralChatMessages.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-3xl font-bold text-green-600">89</p>
                </div>
                <span className="text-2xl">🟢</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notifications Sent</p>
                  <p className="text-3xl font-bold text-purple-600">{mockNotifications.length}</p>
                </div>
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                  <p className="text-3xl font-bold text-orange-600">78%</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Form */}
        {showNotificationForm && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Send Push Notification</CardTitle>
              <CardDescription>Send instant notifications to club members</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendNotification} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Title *
                    </label>
                    <Input
                      required
                      value={notificationForm.title}
                      onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                      placeholder="Enter notification title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      required
                      value={notificationForm.type}
                      onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="info">Information</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Enter notification message"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients *
                    </label>
                    <select
                      required
                      value={notificationForm.recipients}
                      onChange={(e) => setNotificationForm({ ...notificationForm, recipients: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Members</option>
                      <option value="active">Active Members Only</option>
                      <option value="admins">Club Admins</option>
                      <option value="selected">Selected Members</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      required
                      value={notificationForm.priority}
                      onChange={(e) => setNotificationForm({ ...notificationForm, priority: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowNotificationForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Send Notification
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Group Chat</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          </TabsList>

          {/* Group Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Club Communication</span>
                  </CardTitle>
                  <CardDescription>
                    Manage club chat rooms for different member groups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Chat Room Selector */}
                  <div className="flex space-x-2 mb-6">
                    <Button
                      variant={activeChat === 'general' ? 'default' : 'outline'}
                      onClick={() => setActiveChat('general')}
                      className="flex items-center space-x-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>General Chat</span>
                    </Button>
                    <Button
                      variant={activeChat === 'committee' ? 'default' : 'outline'}
                      onClick={() => setActiveChat('committee')}
                      className="flex items-center space-x-2"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Committee Chat</span>
                    </Button>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-900">
                    <div className="space-y-4">
                      {(activeChat === 'general' ? generalMessages : committeeMessages).map((message) => (
                        <div key={message.id} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activeChat === 'general' 
                              ? 'bg-blue-100 dark:bg-blue-900' 
                              : 'bg-purple-100 dark:bg-purple-900'
                          }`}>
                            <span className={`text-xs font-medium ${
                              activeChat === 'general'
                                ? 'text-blue-600 dark:text-blue-300'
                                : 'text-purple-600 dark:text-purple-300'
                            }`}>
                              {message.senderName.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{message.senderName}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.type === 'announcement' && (
                                <Badge variant="info" className="text-xs">Announcement</Badge>
                              )}
                            </div>
                            <div className={`p-3 rounded-lg ${
                              message.type === 'announcement'
                                ? activeChat === 'general'
                                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500'
                                  : 'bg-purple-100 dark:bg-purple-900 border-l-4 border-purple-500'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                            }`}>
                              <p className="text-sm text-gray-900 dark:text-gray-100">{message.content}</p>
                            </div>
                            {message.senderId === 'admin' && (
                              <div className="mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteMessage(message.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Type your message to ${activeChat} chat...`}
                      className="flex-1"
                    />
                    <Button type="submit" className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </Button>
                  </form>

                {/* Chat Settings */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-background rounded-lg">
                  <h4 className="font-medium mb-3">Chat Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Allow members to send messages
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Allow file sharing
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Moderate messages before posting
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>
                  View all sent push notifications and their delivery status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:bg-background">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={notification.type === 'error' ? 'destructive' : notification.type}>
                              <span className="flex items-center gap-1">
                  {notification.type === 'info' && <><Info className="w-3 h-3" /> Info</>}
                  {notification.type === 'success' && <><CheckCircle className="w-3 h-3" /> Success</>}
                  {notification.type === 'warning' && <><AlertTriangle className="w-3 h-3" /> Warning</>}
                  {notification.type === 'error' && <><X className="w-3 h-3" /> Error</>}
                </span>
                            </Badge>
                            <Badge variant="outline">{notification.status}</Badge>
                          </div>

                          <h3 className="font-semibold text-lg mb-1">{notification.title}</h3>
                          <p className="text-gray-600 mb-2">{notification.message}</p>

                          <div className="text-sm text-gray-500">
                            <p>Sent to {notification.recipients} members</p>
                            <p>Sent on {formatDate(notification.sentAt)} at {formatTime(notification.sentAt)}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button size="sm" variant="outline">
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            Resend
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Campaigns Tab */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaign</CardTitle>
                <CardDescription>
                  Send emails to club members with joining links and announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Name
                      </label>
                      <Input placeholder="Enter campaign name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipients
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>All Members</option>
                        <option>Active Members Only</option>
                        <option>Inactive Members</option>
                        <option>Prospective Members</option>
                        <option>Custom List</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Line
                    </label>
                    <Input placeholder="Enter email subject" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Content
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={8}
                      placeholder="Write your email content here..."
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Include club joining link
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Include upcoming events
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Schedule for later
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                    <Button type="button" variant="outline">
                      Preview
                    </Button>
                    <Button type="submit">
                      Send Email
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Email Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Pre-built email templates for common communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Welcome New Members', description: 'Welcome email for new club members' },
                    { name: 'Event Invitation', description: 'Invite members to upcoming events' },
                    { name: 'Meeting Reminder', description: 'Remind members about club meetings' },
                    { name: 'Newsletter', description: 'Monthly club newsletter template' },
                    { name: 'Event Follow-up', description: 'Thank you email after events' },
                    { name: 'Membership Renewal', description: 'Remind members to renew membership' }
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}