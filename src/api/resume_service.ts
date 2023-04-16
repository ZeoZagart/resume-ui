import axios from 'axios'
import {
    ApiResponse,
    User,
    UserCredentials,
    GenerateCoverLetterRequest,
    LoginResponse,
    ListResumeResponse,
    UploadResumeResponse,
} from './types'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
})

const handleResponse = async <T>(
    responsePromise: Promise<any>
): Promise<ApiResponse<T>> => {
    try {
        const response = await responsePromise
        return { state: 'SUCCESS', data: response.data }
    } catch (error: any) {
        if (error.response) {
            return { state: 'FAILURE', error: error.response }
        } else {
            return { state: 'FAILURE', error: error }
        }
    }
}

export const signup = (user: User): Promise<ApiResponse<LoginResponse>> => {
    const responsePromise = apiClient.post('/signup', user)
    return handleResponse<LoginResponse>(responsePromise)
}

export const login = (
    credentials: UserCredentials
): Promise<ApiResponse<LoginResponse>> => {
    const responsePromise = apiClient.post('/login', credentials)
    return handleResponse<LoginResponse>(responsePromise)
}

export const logout = async (token: string): Promise<ApiResponse<void>> => {
    const responsePromise = apiClient.post(
        '/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return handleResponse<void>(responsePromise)
}

export const uploadResume = async (
    token: string,
    tags: string[],
    file: File
): Promise<ApiResponse<UploadResumeResponse>> => {
    const formData = new FormData()
    formData.append('tags', JSON.stringify(tags))
    formData.append('file', file)

    const responsePromise = apiClient.put('/upload-resume', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    })
    return handleResponse<UploadResumeResponse>(responsePromise)
}

export const listResumes = async (
    token: string
): Promise<ApiResponse<ListResumeResponse>> => {
    const responsePromise = apiClient.get('/list-resumes', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse<ListResumeResponse>(responsePromise)
}

export const downloadResume = async (
    token: string,
    resumeId: string
): Promise<ApiResponse<Blob>> => {
    const responsePromise = apiClient.get(`/download-resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
    })
    return handleResponse<Blob>(responsePromise)
}

export const deleteResume = async (
    token: string,
    resumeId: string
): Promise<ApiResponse<void>> => {
    const responsePromise = apiClient.delete(`/delete-resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return handleResponse<void>(responsePromise)
}

export const updateResumeVisibility = async (
    token: string,
    resumeId: string,
    isPublic: boolean
): Promise<ApiResponse<void>> => {
    const responsePromise = apiClient.post(
        `/update-resume-visibility/${resumeId}?public=${isPublic}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
    return handleResponse<void>(responsePromise)
}

export const generateCoverLetter = async (
    token: string,
    request: GenerateCoverLetterRequest
): Promise<ApiResponse<string>> => {
    const responsePromise = apiClient.post('/generate-cover-letter', request, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return handleResponse<string>(responsePromise)
}

export const verifyEmail = (
    token: string,
    otp: string
): Promise<ApiResponse<{ email_verified: boolean }>> => {
    const responsePromise = apiClient.post(
        '/verify-email',
        { otp },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    return handleResponse<{ email_verified: boolean }>(responsePromise)
}

export const resendOTP = (
    token: string
): Promise<ApiResponse<{ otp_sent: boolean }>> => {
    const responsePromise = apiClient.get('/resend-otp', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return handleResponse<{ otp_sent: boolean }>(responsePromise)
}
