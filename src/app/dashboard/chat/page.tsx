'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { MemberLayout } from '../../../components/layout/member-layout'
import { formatDate, formatTime } from '../../../lib/utils'
import { MessageSquare, Send, Users, UserCheck, Building2, Hash, Lock, Trash2, MoreVertical } from 'lucide-react'
import { ClubMember, CommitteeMember, ChatMessage, Club } from '../../../types'

// Mock data for member's clubs
const mockMemberClubs: (Club & { memberRole: 'admin' | 'member'; isCommitteeMember: boolean })[] = [
  {
    id: '1',
    name: 'Computer Science Club',
    clubName: 'Computer Science Club',
    slug: 'computer-science-club',
    description: 'A club for CS enthusiasts',
    purpose: 'Learning and development',
    university: 'University of Dhaka',
    contactEmail: 'cs@du.ac.bd',
    template: 'modern',
    colorScheme: { primary: '#3b82f6', secondary: '#1e40af', accent: '#60a5fa', background: '#f8fafc' },
    status: 'active',
    isPublic: true,
    memberCount: 156,
    achievements: [],
    socialLinks: {},
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-02-10'),
    memberRole: 'member',
    isCommitteeMember: true
  },
  {
    id: '2',
    name: 'Photography Club',
    clubName: 'Photography Club',
    slug: 'photography-club',
    description: 'Capturing moments',
    purpose: 'Photography and visual arts',
    university: 'University of Dhaka',
    contactEmail: 'photo@du.ac.bd',
    template: 'vibrant',
    colorScheme: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', background: '#fffbeb' },
    status: 'active',
    isPublic: true,
    memberCount: 89,
    achievements: [],
    socialLinks: {},
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-02-10'),
    memberRole: 'member',
    isCommitteeMember: false
  },
  {
    id: '3',
    name: 'Debate Society',
    clubName: 'Debate Society',
    slug: 'debate-society',
    description: 'Art of argumentation',
    purpose: 'Debate and public speaking',
    university: 'University of Dhaka',
    contactEmail: 'debate@du.ac.bd',
    template: 'academic',
    colorScheme: { primary: '#dc2626', secondary: '#991b1b', accent: '#f87171', background: '#fef2f2' },
    status: 'active',
    isPublic: true,
    memberCount: 134,
    achievements: [],
    socialLinks: {},
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2024-02-10'),
    memberRole: 'admin',
    isCommitteeMember: true
  }
]

// Mock chat messages for different clubs and chat types
const mockChatData: Record<string, { general: ChatMessage[]; committee: ChatMessage[] }> = {
  '1': {
    general: [
      {
        id: '1',
        chatId: 'general-1',
        senderId: '1',
        content: 'Hey everyone! Don\'t forget about the AI workshop tomorrow at 2 PM.',
        type: 'text',
        timestamp: new Date('2024-02-10T14:30:00'),
        isEdited: false
      },
      {
        id: '2',
        chatId: 'general-1',
        senderId: '2',
        content: 'Thanks for the reminder! I\'ve prepared some questions to ask.',
        type: 'text',
        timestamp: new Date('2024-02-10T14:32:00'),
        isEdited: false
      },
      {
        id: '3',
        chatId: 'general-1',
        senderId: '3',
        content: 'Will the session be recorded? I might be a few minutes late.',
        type: 'text',
        timestamp: new Date('2024-02-10T14:35:00'),
        isEdited: false
      },
      {
        id: '4',
        chatId: 'general-1',
        senderId: 'admin',
        content: 'ANNOUNCEMENT: Programming contest registration is now open!',
        type: 'announcement',
        timestamp: new Date('2024-02-10T15:00:00'),
        isEdited: false
      }
    ],
    committee: [
      {
        id: '1',
        chatId: 'committee-1',
        senderId: '1',
        content: 'Committee meeting scheduled for Friday 3 PM. Please confirm attendance.',
        type: 'text',
        timestamp: new Date('2024-02-10T09:00:00'),
        isEdited: false
      },
      {
        id: '2',
        chatId: 'committee-1',
        senderId: '3',
        content: 'Confirmed. I\'ll prepare the agenda and send it by tomorrow.',
        type: 'text',
        timestamp: new Date('2024-02-10T09:15:00'),
        isEdited: false
      }
    ]
  },
  '2': {
    general: [
      {
        id: '1',
        chatId: 'general-2',
        senderId: '1',
        content: 'Great shots from yesterday\'s photo walk! Can\'t wait to see everyone\'s edits.',
        type: 'text',
        timestamp: new Date('2024-02-10T16:00:00'),
        isEdited: false
      },
      {
        id: '2',
        chatId: 'general-2',
        senderId: '2',
        content: 'I\'ll share my photos in the drive folder tonight.',
        type: 'text',
        timestamp: new Date('2024-02-10T16:05:00'),
        isEdited: false
      }
    ],
    committee: []
  },
  '3': {
    general: [
      {
        id: '1',
        chatId: 'general-3',
        senderId: '1',
        content: 'Debate tournament preparations are going well. Practice sessions start Monday.',
        type: 'text',
        timestamp: new Date('2024-02-10T11:00:00'),
        isEdited: false
      }
    ],
    committee: [
      {
        id: '1',
        chatId: 'committee-3',
        senderId: '1',
        content: 'Budget allocation for the tournament needs final approval.',
        type: 'text',
        timestamp: new Date('2024-02-10T10:00:00'),
        isEdited: false
      }
    ]
  }
}

// Mock user data
const currentUser = {
  id: 'current-user',
  name: 'Ahmed Rahman',
  avatar: 'AR'
}

const getUserName = (senderId: string): string => {
  if (senderId === 'current-user') return 'You'
  if (senderId === 'admin') return 'Club Admin'
  if (senderId === '1') return 'Ahmed Rahman'
  if (senderId === '2') return 'Fatima Khan'
  if (senderId === '3') return 'Karim Ahmed'
  return 'Unknown User'
}

export default function ChatPage() {
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [activeChat, setActiveChat] = useState<'general' | 'committee'>('general')
  const [newMessage, setNewMessage] = useState('')
  const [chatData, setChatData] = useState(mockChatData)

  const selectedClubData = selectedClub ? mockMemberClubs.find(club => club.id === selectedClub) : null
  const currentMessages = selectedClub && chatData[selectedClub] ? chatData[selectedClub][activeChat] : []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedClub) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        chatId: `${activeChat}-${selectedClub}`,
        senderId: currentUser.id,
        content: newMessage,
        type: 'text',
        timestamp: new Date(),
        isEdited: false
      }
      
      setChatData(prev => ({
        ...prev,
        [selectedClub]: {
          ...prev[selectedClub],
          [activeChat]: [...(prev[selectedClub]?.[activeChat] || []), message]
        }
      }))
      
      setNewMessage('')
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    if (selectedClub) {
      setChatData(prev => ({
        ...prev,
        [selectedClub]: {
          ...prev[selectedClub],
          [activeChat]: prev[selectedClub][activeChat].filter(msg => msg.id !== messageId)
        }
      }))
    }
  }

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Club Chat</h1>
            <p className="text-muted-foreground mt-2">Connect with your club members and committee</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Club List Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Your Clubs</span>
                </CardTitle>
                <CardDescription>Select a club to start chatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockMemberClubs.map((club) => (
                  <Button
                    key={club.id}
                    variant={selectedClub === club.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => {
                      setSelectedClub(club.id)
                      setActiveChat('general')
                    }}
                  >
                    <div className="flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{club.name}</span>
                        {club.memberRole === 'admin' && (
                          <Badge variant="secondary" className="text-xs">Admin</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{club.memberCount} members</span>
                        {club.isCommitteeMember && (
                          <>
                            <UserCheck className="w-3 h-3" />
                            <span>Committee</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedClub ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5" />
                        <span>{selectedClubData?.name}</span>
                      </CardTitle>
                      <CardDescription>
                        {activeChat === 'general' ? 'General Discussion' : 'Committee Chat'}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Chat Type Tabs */}
                  <Tabs value={activeChat} onValueChange={(value) => setActiveChat(value as 'general' | 'committee')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="general" className="flex items-center space-x-2">
                        <Hash className="w-4 h-4" />
                        <span>General Chat</span>
                      </TabsTrigger>
                      {selectedClubData?.isCommitteeMember && (
                        <TabsTrigger value="committee" className="flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Committee Chat</span>
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </Tabs>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    currentMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                          {getUserName(message.senderId).charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{getUserName(message.senderId)}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.senderId === currentUser.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                onClick={() => handleDeleteMessage(message.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          <div className={`mt-1 p-3 rounded-lg ${
                            message.type === 'announcement' 
                              ? 'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message ${activeChat === 'general' ? 'everyone' : 'committee'}...`}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a Club</h3>
                  <p>Choose a club from the sidebar to start chatting with members</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}