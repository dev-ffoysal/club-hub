import { MEMBERSHIP_STATUS } from "@/app/enums/all"


export enum USER_ROLES {
  ADMIN = 'admin',
  CLUB = 'club',
  MEMBER = 'member',
  SUPER_ADMIN = 'super-admin',
}
type IClub = {
  _id: string
  clubName?: string
  club?: string
  role?: string
  status: MEMBERSHIP_STATUS.PENDING | MEMBERSHIP_STATUS.APPROVED | MEMBERSHIP_STATUS.REJECTED
}

type IPartnersWith = {
  title:string,
  image:string,
}



export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}


export interface MembersItem {
  member: string;
  position: string;
  note?: string;
}

export interface ICommitte {
  _id: string;
  club: string;
  from: Date;
  to: Date;
  members: MembersItem[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// Base User Types - Common fields for member and admin roles
export interface IBaseUser {
  _id: string
  name?: string
  lastName?: string
  profile?: string | File
  email: string
  password?: string
  status?: string
  verified: boolean
  role: string
  appId?: string
  deviceToken?: string
  studentId?: string
  bloodGroup?: string
  gender?: string
  membership?: string
  description?: string
  department?: string
  year?: string
  semester?: string
  phone?: string
  address?: string
  clubs?: IClub[]
  interestedIn?: string[]
  university?: string
  isFollowing?: boolean
  createdAt: Date
  updatedAt: Date
}

// Club-specific fields - Additional fields for club role
export interface IClubSpecificFields {
  categories?: string[]
  clubName?: string
  clubTitle?: string
  clubPurpose?: string
  clubGoal?: string
  clubRegistrationNumber?: string
  applierEmail?: string
  clubPhone?: string
  feeCollectionMethod?: string
  clubFoundedAt?: Date
  clubCovers?: string[]
  clubDescription?: string
  clubWorkingAreas?: string[]
  appliedDescription?: string
  clubCommittee?: ICommitte
  slug?: string
  followersCount?: number
  membersCount?: number
  rating?: number
  establishedYear?: string
  ratingCount?: number
  partnersWith?: IPartnersWith[]
  socialLinks?: SocialLinks
  clubRegistrationEnabled?: boolean
  clubRegistrationFees?: number
  clubRegistrationStartsAt?: Date
  clubRegistrationEndsAt?: Date
}

// Combined User Type - Includes all possible fields
export type IUser = IBaseUser & IClubSpecificFields

// Role-specific User Types
export type IMemberUser = IBaseUser
export type IAdminUser = IBaseUser
export type IClubUser = IBaseUser & IClubSpecificFields

export enum EVENT_TYPE {
    CONFERENCE = 'conference',
    MEETING = 'meeting',
    WORKSHOP = 'workshop',
    SEMINAR = 'seminar',
    HACKATHON = 'hackathon',
    COMPETITION = 'competition',
    EXHIBITION = 'exhibition',
    FESTIVAL = 'festival',
    CONCERT = 'concert',
}


export interface ICategory {
  _id: string;
  title: string;
  slug?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface IEvent {
  _id: string;
  createdBy: string | IUser;
  categories: string[] | ICategory[];
  title:string
  slogan?:string
  description?:string
  startDate: Date;
  endDate: Date;
  time?:string
  images?:string[]
  cover?:string
  location: string;
  isOnline: boolean;
  isFixedSeat: boolean;
  registrationFee?: number;
  meetingLink?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  registrationDeadline?: Date;
  isPublic: boolean;
  commentsEnabled: boolean;
  followersCount: number;
  upVotesCount?: number;
  downVotesCount?: number;
  type: EVENT_TYPE;
  tags?: string[];
  organizedBy?: string | IClubUser;
  isActive: boolean;
  host?: {
    name: string;
    designation?: string;
    position?: string;
    image?: string;
  }[];
  winningPrize?: {
    title: string;
    description?: string;
    amount?: number;
    position?: number;
  }[];
  guests?: {
    name: string;
    designation?: string;
    position?: string;
    image?: string;
  }[];
  benefits?: {
    title: string;
    description?: string;
    criteria?: string[];
  }[];
  requirements?: {
    title: string;
    description?: string;
    criteria?: string[];
  }[];
  rules?: {
    title: string;
    description?: string;
    criteria?: string[];
  }[];
  eligibility?: {
    title: string;
    description?: string;
    criteria?: string[];
  }[];
  sponsors?: {
    name: string;
    image?: string;
    website?: string;
    sponsorType?: string;
  }[];
  instructions?: {
    title: string;
    description?: string;
    criteria?: string[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
    isVoted?: boolean;
  voteType?: VoteType | null;
  createdAt: Date;
  updatedAt: Date;
}


export type VoteType = 'upvote' | 'downvote';



export interface IUniversity {
  _id: string
  name: string;
  logo: string;
  isDeleted: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventFilterables {
  searchTerm?: string;
  type?: EVENT_TYPE;
  isPublic?: boolean;
  isOnline?: boolean;
  createdBy?: string;
  organizedBy?: string;
  startDate?: string;
  endDate?: string;
  categories?: string[];
  universities?: string[];
  page?: number;
  limit?: number;
}



export interface IAchievement {
  _id: string;
  club: string | IClubUser;
  images: string[];
  title: string;
  description: string;
  subTitle: string;
  date: Date;
  teams:string[] | IUser[]
  subDescription: string;
  tags: string[];
  event?: string;
  organizedBy?: {
    name:string,
    image:string,
    title:string,
    description?:string,
    email?:string,
    phone?:string,
    website?:string,

  };
}


//----------------REGISTRATION

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum CLUB_REGISTRATION_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  MANUAL = 'manual'
}

export enum PAYMENT_METHOD {
  AMARPAY = 'amarpay',
  CARD = 'card',
  MOBILE_BANKING = 'mobile_banking'
}
export interface IPaymentInfo {
  method: PAYMENT_METHOD;
  transactionId: string;
  amount: number;
  currency: string;
  gatewayResponse?: any;
  processedAt?: Date;
}

export interface IClubregistration {
  _id: string;
  club:  IUser;
  member:  IUser;
  isPaymentRequired: boolean;
  paymentStatus?: PAYMENT_STATUS;
  paymentInfo?: IPaymentInfo
  isApprovedByClub: boolean;
  status: CLUB_REGISTRATION_STATUS;
  isCreatedByAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClubregistrationFilterables {
  searchTerm?:string;
  club?: string;
  member?: string;
  isPaymentRequired?: boolean;
  paymentStatus?: PAYMENT_STATUS;
  isApprovedByClub?: boolean;
  status?: CLUB_REGISTRATION_STATUS;
  isCreatedByAdmin?: boolean;
}