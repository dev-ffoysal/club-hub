import { MEMBERSHIP_STATUS } from "@/app/enums/all"
import type { IUser, IClubUser, IMemberUser, IAdminUser } from './interfaces'

// Export user types for backward compatibility
export type User = IUser
export type { IUser, IClubUser, IMemberUser, IAdminUser }





// export interface ClubApplication {
//   id: string;
//   clubName: string;
//   purpose: string;
//   contactDetails: ContactDetails;
//   university: string;
//   applicantName: string;
//   applicantEmail: string;
//   status: 'pending' | 'approved' | 'rejected';
//   submittedAt: Date;
//   reviewedAt?: Date;
//   reviewedBy?: string;
//   rejectionReason?: string;
// }



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
  host?: string;
  title: string;
  description?: string;
  category: EventCategory;
  type: EventType;
  startDate: Date;
  endDate: Date;
  eventDate?: string;
  eventTime?: string;
  eventDuration?: string;
  location: string;
  eventPlace?: string;
  isOnline: boolean;
  mode?: 'online' | 'offline';
  meetingLink?: string;
  maxParticipants?: number;
  totalSeat?: number;
  currentParticipants: number;
  seatAvailable?: number;
  registrationDeadline?: Date;
  isPublic: boolean;
  commentsEnabled: boolean;
  image?: string;
  images?: string[];
  cover?: string;
  videos?: string[];
  tags: string[];
  guests?: {
    name?: string;
    image?: string;
    designation?: string;
    eventChairs?: string;
  }[];
  collaboratedWith?: string[];
  eventAgenda?: {
    timeLine?: string;
    text?: string;
  }[];
  verified?: boolean;
  status?: EventStatus;
  snackAvailable?: boolean;
  organizers?: {
    name?: string;
    designation?: string;
    email?: string;
    contact?: string;
  }[];
  sponsors?: {
    name?: string;
    image?: string;
  }[];
  upvote?: number;
  downvote?: number;
  followersCount?: number;
  requirements?: string[];
  benefits?: string[];
  notes?: {
    from?: string;
    image?: string;
    descriptions?: string;
  }[];
  collaboratedClubsNotes?: {
    from?: string;
    image?: string;
    descriptions?: string;
  }[];
  fee?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EventCategory = 'seminar' | 'workshop' | 'competition' | 'meeting' | 'social' | 'academic';
export type EventType = 'event' | 'competition' | 'seminar' | 'workshop';

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

// Committee Management Types
export interface CommitteeMember {
  id: string;
  userId: string;
  clubId: string;
  designation: string;
  notes?: string;
  appointedAt: Date;
  isActive: boolean;
}

export interface Committee {
  id: string;
  clubId: string;
  name: string;
  description?: string;
  members: CommitteeMember[];
  createdAt: Date;
  updatedAt: Date;
}

// Communication Types
export interface GroupChat {
  id: string;
  clubId: string;
  name: string;
  type: 'general' | 'committee';
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
  currency?: string;
  description: string;
  date: Date;
  receipt?: string;
  approvedBy?: string;
  createdBy: string;
  transactionId?: string; // link to Transaction if applicable
  createdAt: Date;
  updatedAt: Date;
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

// Additional Utility Types
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'digital_wallet' | 'cheque';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
export type UserRole = 'super_admin' | 'club' | 'member' | 'guest';
export type ClubStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'restricted' | 'deleted';
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
export type RegistrationStatus = 'pending' | 'confirmed' | 'waitlisted' | 'cancelled';

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  university?: string;
  tags?: string[];
}

export interface EventFilters extends SearchFilters {
  eventType?: EventType;
  location?: string;
  isOnline?: boolean;
  hasAvailableSeats?: boolean;
}

export interface ClubFilters extends SearchFilters {
  verified?: boolean;
  hasRegistrationFee?: boolean;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalClubs: number;
  totalEvents: number;
  totalUsers: number;
  totalRegistrations: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'club_created' | 'event_created' | 'user_registered' | 'payment_completed';
  title: string;
  description: string;
  timestamp: Date;
  userId?: string;
  clubId?: string;
  eventId?: string;
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

// Registration Types
export interface Registration {
  id: string;
  clubId?: string;
  eventId?: string;
  userId?: string;
  amount?: number;
  status?: RegistrationStatus;
  paymentMethod?: PaymentMethod;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Types
export interface Transaction {
  id: string;
  userId?: string;
  clubId?: string;
  eventId?: string;
  registrationId?: string;
  type: 'registration' | 'membership_fee' | 'donation' | 'sponsorship' | 'income' | 'expense';
  amount: number;
  currency?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionRef?: string;
  description?: string;
  receipt?: string;
  approvedBy?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Event Invitation Types
export interface EventInvitation {
  id: string;
  senderId: string;
  receiverId: string;
  eventId?: string;
  clubId?: string;
  status?: 'pending' | 'accepted' | 'rejected';
  type?: 'oneTime' | 'normal';
  validTill?: Date;
  joiningLink?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form Types
export interface ClubApplicationForm {
  clubName: string;
  clubPurpose: string;
  university: string;
  clubEmail: string;
  clubPhone: string;
  applicantName: string;
  applicantEmail: string;
  description: string;
  terms?: boolean;
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

export interface RegistrationForm {
  eventId: string;
  userId: string;
  paymentMethod?: PaymentMethod;
  specialRequirements?: string;
}

export interface TransactionForm {
  type: 'registration' | 'membership_fee' | 'donation' | 'sponsorship';
  amount: number;
  paymentMethod: PaymentMethod;
  description?: string;
}



//------------------------





export type IClubSettingForm = {
  feeCollectionMethod?: string | 'online' | 'offline'
  clubRegistrationEnabled?: boolean
  clubRegistrationFees?: number
  clubRegistrationStartsAt?: Date
  clubRegistrationEndsAt?: Date
}