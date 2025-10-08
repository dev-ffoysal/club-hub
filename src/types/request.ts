import { SocialLinks } from "./interfaces"

export interface IMemberRegistration {
 name: string
  lastName: string
  email: string
  password: string
  confirmPassword?: string
  studentId: string
  department?: string
  university: string
  phone?: string
  bloodGroup?: string
  gender?: 'male' | 'female' | 'other' | ''
  address?: string
}

export interface ILoginRequest {
  email: string
  password: string
}


export type IMemberProfileFormData = {
  name: string
  lastName: string
  email: string
  phone?: string
  studentId?: string
  department?: string
  university?: string
  bloodGroup?: string
  gender?: string
  address?: string
  year?: string
  semester?: string
  interestedIn?: string[]
  profile?: File | string
}

export type IClubProfileFormData = {
  categories?: string[]
  clubName?: string
  clubTitle?: string
  clubPurpose?: string
  clubGoal?: string
  clubRegistrationNumber?: string
  clubPhone?: string
  clubFoundedAt?: Date
  clubCovers?: string[]
  clubDescription?: string
  clubWorkingAreas?: string[]
  establishedYear?: string
  socialLinks?: SocialLinks
}