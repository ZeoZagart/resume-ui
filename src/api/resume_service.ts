import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const signup = async (name: string, email: string, password: string) => {
    const response = await apiClient.post('/signup', {
        name,
        email,
        password,
    })
    return response.data
}

export const login = async (email: string, password: string) => {
    const response = await apiClient.post('/login', {
        email,
        password,
    })
    return response.data
}

export const logout = async (token: string) => {
    await apiClient.post(
        '/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const uploadResume = async (
    token: string,
    metadata: object,
    file: File
) => {
    const formData = new FormData()
    formData.append('metadata', JSON.stringify(metadata))
    formData.append('file', file)

    const response = await apiClient.put('/upload-resume', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const listResumes = async (token: string) => {
    const response = await apiClient.get('/list-resumes', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
}

export const downloadResume = async (token: string, resumeId: string) => {
    const response = await apiClient.get(`/download-resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
    })
    return response.data
}

export const markResumePublic = async (token: string, resumeId: string) => {
    const response = await apiClient.put(
        `/mark-resume-public/${resumeId}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
    return response.data
}

export const generateCoverLetter = async (
    token: string,
    resumeId: string,
    jobDesc: string
) => {
    const response = await apiClient.post(
        '/generate-cover-letter',
        { resume_id: resumeId, job_desc: jobDesc },
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}
