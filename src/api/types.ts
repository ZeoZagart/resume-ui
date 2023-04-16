export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export type RESPONSE_STATE = 'SUCCESS' | 'FAILURE'

export type SuccessResponse<T> = {
    state: 'SUCCESS'
    data: T
}

export type ErrorResponse = {
    state: 'FAILURE'
    error: string
}

export interface UserCredentials {
    email: string
    password: string
}

export interface User extends UserCredentials {
    name: string
}

export interface LoginResponse {
    token: string
    emailVerified: boolean
}

export interface UploadResumeResponse {
    resume: Resume
}

export interface Resume {
    id: string
    user_id: string
    file_name: string
    upload_date: string
    tags: string[]
    public: boolean
}

export interface ListResumeResponse {
    resumes: Resume[]
}

export interface GenerateCoverLetterRequest {
    resume_id: string
    job_desc: string
}
