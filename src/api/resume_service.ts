import axios from 'axios'
import {
    ApiResponse,
    User,
    UserCredentials,
    Resume,
    GenerateCoverLetterRequest,
    TokenResponse,
    ListResumeResponse,
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

export const signup = (user: User): Promise<ApiResponse<TokenResponse>> => {
    const responsePromise = apiClient.post('/signup', user)
    return handleResponse<TokenResponse>(responsePromise)
}

export const login = (
    credentials: UserCredentials
): Promise<ApiResponse<TokenResponse>> => {
    const responsePromise = apiClient.post('/login', credentials)
    return handleResponse<TokenResponse>(responsePromise)
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
    metadata: Record<string, string>,
    file: File
): Promise<ApiResponse<Resume>> => {
    const formData = new FormData()
    formData.append('metadata', JSON.stringify(metadata))
    formData.append('file', file)

    const responsePromise = apiClient.put('/upload-resume', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    })
    return handleResponse<Resume>(responsePromise)
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

export const markResumePublic = async (
    token: string,
    resumeId: string
): Promise<ApiResponse<void>> => {
    const responsePromise = apiClient.put(
        `/mark-resume-public/${resumeId}`,
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
