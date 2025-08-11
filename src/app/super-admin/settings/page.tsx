'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate } from '../../../lib/utils'

// Mock settings data
const mockSettings = {
  platform: {
    siteName: 'ClubHub',
    siteDescription: 'University Club Management Platform',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    maxClubsPerUser: 5,
    maxEventsPerClub: 50,
    defaultMembershipDuration: 365
  },
  payment: {
    bkashEnabled: true,
    nagadEnabled: true,
    rocketEnabled: true,
    bankTransferEnabled: true,
    minimumPayment: 100,
    maximumPayment: 100000,
    transactionFee: 2.5,
    refundPolicy: '7 days'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    systemAlerts: true,
    weeklyReports: true
  },
  security: {
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelist: []
  },
  content: {
    autoModeration: true,
    profanityFilter: true,
    imageModeration: true,
    maxImageSize: 5,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    maxFileSize: 10
  }
}

const mockAdmins = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@clubhub.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: new Date('2024-02-18T10:30:00'),
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@clubhub.com',
    role: 'Admin',
    status: 'active',
    lastLogin: new Date('2024-02-17T15:45:00'),
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@clubhub.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: new Date('2024-02-10T09:20:00'),
    createdAt: new Date('2024-02-01')
  }
]

const mockSystemLogs = [
  {
    id: '1',
    action: 'User Registration',
    user: 'ahmed.rahman@student.buet.ac.bd',
    timestamp: new Date('2024-02-18T14:30:00'),
    status: 'success',
    details: 'New user registered successfully'
  },
  {
    id: '2',
    action: 'Payment Processing',
    user: 'fatima.khan@du.ac.bd',
    timestamp: new Date('2024-02-18T14:25:00'),
    status: 'success',
    details: 'Membership payment processed - BDT 5000'
  },
  {
    id: '3',
    action: 'Club Application',
    user: 'tech.club@nsu.edu.bd',
    timestamp: new Date('2024-02-18T14:20:00'),
    status: 'pending',
    details: 'New club registration submitted for review'
  },
  {
    id: '4',
    action: 'Login Attempt',
    user: 'suspicious.user@example.com',
    timestamp: new Date('2024-02-18T14:15:00'),
    status: 'failed',
    details: 'Multiple failed login attempts detected'
  }
]

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('platform')
  const [settings, setSettings] = useState(mockSettings)

  const handleSaveSettings = (category: string) => {
    console.log('Saving settings for:', category)
  }

  const handleAddAdmin = () => {
    console.log('Adding new admin')
  }

  const handleToggleAdmin = (adminId: string) => {
    console.log('Toggling admin status:', adminId)
  }

  const handleBackupData = () => {
    console.log('Creating system backup')
  }

  const handleRestoreData = () => {
    console.log('Restoring system data')
  }

  const handleClearLogs = () => {
    console.log('Clearing system logs')
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-2">Configure platform settings and manage system preferences</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleBackupData}>
              💾 Backup Data
            </Button>
            <Button size="sm" className="w-full sm:w-auto" onClick={() => handleSaveSettings(selectedTab)}>
              💾 Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="platform" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>Basic platform settings and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name</label>
                      <Input 
                        value={settings.platform.siteName} 
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          platform: { ...prev.platform, siteName: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Description</label>
                      <Input 
                        value={settings.platform.siteDescription}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          platform: { ...prev.platform, siteDescription: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Clubs per User</label>
                      <Input 
                        type="number" 
                        value={settings.platform.maxClubsPerUser}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          platform: { ...prev.platform, maxClubsPerUser: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Events per Club</label>
                      <Input 
                        type="number" 
                        value={settings.platform.maxEventsPerClub}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          platform: { ...prev.platform, maxEventsPerClub: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Membership Duration (days)</label>
                      <Input 
                        type="number" 
                        value={settings.platform.defaultMembershipDuration}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          platform: { ...prev.platform, defaultMembershipDuration: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={settings.platform.maintenanceMode}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, maintenanceMode: e.target.checked }
                      }))}
                      className="rounded"
                    />
                    <label className="text-sm font-medium">Maintenance Mode</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={settings.platform.registrationEnabled}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, registrationEnabled: e.target.checked }
                      }))}
                      className="rounded"
                    />
                    <label className="text-sm font-medium">User Registration Enabled</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={settings.platform.emailVerificationRequired}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, emailVerificationRequired: e.target.checked }
                      }))}
                      className="rounded"
                    />
                    <label className="text-sm font-medium">Email Verification Required</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
                <CardDescription>Payment gateway and transaction settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" checked={settings.payment.bkashEnabled} className="rounded" />
                        <label className="text-sm">bKash</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" checked={settings.payment.nagadEnabled} className="rounded" />
                        <label className="text-sm">Nagad</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" checked={settings.payment.rocketEnabled} className="rounded" />
                        <label className="text-sm">Rocket</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" checked={settings.payment.bankTransferEnabled} className="rounded" />
                        <label className="text-sm">Bank Transfer</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Minimum Payment (BDT)</label>
                      <Input type="number" value={settings.payment.minimumPayment} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Maximum Payment (BDT)</label>
                      <Input type="number" value={settings.payment.maximumPayment} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Transaction Fee (%)</label>
                      <Input type="number" step="0.1" value={settings.payment.transactionFee} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Refund Policy</label>
                      <Input value={settings.payment.refundPolicy} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Send notifications via email</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.emailNotifications} className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Send notifications via SMS</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.smsNotifications} className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Send browser push notifications</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.pushNotifications} className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Send promotional and marketing emails</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.marketingEmails} className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Alerts</p>
                      <p className="text-sm text-gray-500">Critical system notifications</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.systemAlerts} className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-gray-500">Send weekly analytics reports</p>
                    </div>
                    <input type="checkbox" checked={settings.notifications.weeklyReports} className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security policies and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Password Minimum Length</label>
                      <Input type="number" value={settings.security.passwordMinLength} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                      <Input type="number" value={settings.security.sessionTimeout} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                      <Input type="number" value={settings.security.maxLoginAttempts} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={settings.security.requireSpecialChars} className="rounded" />
                      <label className="text-sm font-medium">Require Special Characters in Password</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={settings.security.twoFactorAuth} className="rounded" />
                      <label className="text-sm font-medium">Enable Two-Factor Authentication</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Configure content moderation and file upload settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Image Size (MB)</label>
                      <Input type="number" value={settings.content.maxImageSize} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max File Size (MB)</label>
                      <Input type="number" value={settings.content.maxFileSize} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Allowed File Types</label>
                      <Input value={settings.content.allowedFileTypes.join(', ')} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={settings.content.autoModeration} className="rounded" />
                      <label className="text-sm font-medium">Auto Moderation</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={settings.content.profanityFilter} className="rounded" />
                      <label className="text-sm font-medium">Profanity Filter</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={settings.content.imageModeration} className="rounded" />
                      <label className="text-sm font-medium">Image Moderation</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            {/* Admin Management */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Management</CardTitle>
                <CardDescription>Manage system administrators and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">System Administrators</h3>
                  <Button size="sm" onClick={handleAddAdmin}>+ Add Admin</Button>
                </div>
                <div className="space-y-4">
                  {mockAdmins.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{admin.role}</Badge>
                          <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                            {admin.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last login: {formatDate(admin.lastLogin)}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => handleToggleAdmin(admin.id)}
                        >
                          {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Logs */}
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Recent system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Recent Activities</h3>
                  <Button size="sm" variant="outline" onClick={handleClearLogs}>Clear Logs</Button>
                </div>
                <div className="space-y-3">
                  {mockSystemLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium text-sm">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.user}</p>
                        <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          log.status === 'success' ? 'default' :
                          log.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {log.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(log.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Backup, restore, and maintenance operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleBackupData}>
                    💾 Create Backup
                  </Button>
                  <Button variant="outline" onClick={handleRestoreData}>
                    🔄 Restore Data
                  </Button>
                  <Button variant="outline">
                    🧹 Clear Cache
                  </Button>
                  <Button variant="outline">
                    📊 Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  )
}