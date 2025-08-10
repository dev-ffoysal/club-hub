// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: 'super_admin' | 'club_admin' | 'member';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  purpose: string;
  university: string;
  contactEmail: string;
  contactPhone?: string;
  logo?: string;
  coverImage?: string;
  template: ClubTemplate;
  colorScheme: ColorScheme;
  status: 'pending' | 'approved' | 'rejected';
  isPublic: boolean;
  memberCount: number;
  achievements: Achievement[];
  socialLinks: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubApplication {
  id: string;
  clubName: string;
  purpose: string;
  contactDetails: ContactDetails;
  university: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface ContactDetails {
  email: string;
  phone?: string;
  address?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  image?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

// Template and Design Types
export type ClubTemplate = 'modern' | 'classic' | 'minimal' | 'vibrant' | 'academic';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

// Event Types
export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location: string;
  isOnline: boolean;
  meetingLink?: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationDeadline?: Date;
  isPublic: boolean;
  commentsEnabled: boolean;
  image?: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EventCategory = 'seminar' | 'workshop' | 'competition' | 'meeting' | 'social' | 'academic';
export type EventType = 'event' | 'competition';

// Member Management Types
export interface ClubMember {
  id: string;
  userId: string;
  clubId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
  isActive: boolean;
  activityData: MemberActivity;
}

export interface MemberActivity {
  eventsAttended: number;
  competitionsParticipated: number;
  lastActive: Date;
  engagementScore: number;
}

export interface JoiningCode {
  id: string;
  clubId: string;
  code: string;
  email: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

// Communication Types
export interface GroupChat {
  id: string;
  clubId: string;
  name: string;
  isPrivate: boolean;
  participants: string[];
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'announcement';
  timestamp: Date;
  isEdited: boolean;
  editedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Financial Management Types
export interface FinancialRecord {
  id: string;
  clubId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
  receipt?: string;
  approvedBy?: string;
  createdBy: string;
  createdAt: Date;
}

export interface Budget {
  id: string;
  clubId: string;
  year: number;
  totalBudget: number;
  allocations: BudgetAllocation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetAllocation {
  category: string;
  allocated: number;
  spent: number;
}

// Review and Comment Types
export interface Review {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  isHidden: boolean;
  hiddenBy?: string;
  hiddenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface ClubAnalytics {
  clubId: string;
  memberGrowth: GrowthData[];
  eventParticipation: ParticipationData[];
  engagementMetrics: EngagementMetrics;
  financialSummary: FinancialSummary;
}

export interface GrowthData {
  date: Date;
  memberCount: number;
}

export interface ParticipationData {
  eventId: string;
  eventTitle: string;
  participantCount: number;
  date: Date;
}

export interface EngagementMetrics {
  averageEventAttendance: number;
  activeMembers: number;
  totalEvents: number;
  totalCompetitions: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyTrend: MonthlyFinancialData[];
}

export interface MonthlyFinancialData {
  month: string;
  income: number;
  expenses: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface ClubApplicationForm {
  clubName: string;
  purpose: string;
  university: string;
  contactEmail: string;
  contactPhone?: string;
  applicantName: string;
  applicantEmail: string;
  description: string;
}

export interface EventForm {
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  meetingLink?: string;
  maxParticipants?: number;
  registrationDeadline?: string;
  isPublic: boolean;
  commentsEnabled: boolean;
  tags: string[];
}

export interface MemberJoinForm {
  name: string;
  email: string;
  studentId: string;
  university?: string;
  department?: string;
  year?: string;
}