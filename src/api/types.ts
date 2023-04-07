export interface ApiResponse<T> {
    data: T
    error: string | null
}

export interface UserCredentials {
    email: string
    password: string
}

export interface User extends UserCredentials {
    name: string
}

export interface Resume {
    id: string
    fileName: string
    resumeId: string
    resumeURL: string
    uploadDate: string
    metadata: Record<string, string>
    public: boolean
}

export interface GenerateCoverLetterRequest {
    resume_id: string
    job_desc: string
}

class CustomError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'CustomError'
    }
}
