// Generic API response interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  meta?: {
    total: number;
    limit: number;
    page: number;
    totalPages:number;
  };
  data?: T; // present only when success is true
  statusCode?: number; // optional because error responses may not include it
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
  stack?: string; // optional because you usually don't expose this in prod
}


export interface IMemberRegistrationResponse {
    email?: string
    otp?: string
}

export interface IVerifyOtpResponse {
    accessToken: string,
    refreshToken?: string,
    role:string
}

export interface IUserLoginResponse {
    accessToken: string,
    role:string,
    refreshToken?: string,
}

export interface IClubApplicationResponse{
    
}

export interface IClubProfileUpdateResponse{
  
}