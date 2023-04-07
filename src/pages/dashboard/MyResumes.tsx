import React, { useEffect, useState } from 'react'
import {
    Button,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Alert,
} from '@mui/material'
import {
    downloadResume,
    listResumes,
    deleteResume,
} from '../../api/resume_service'
import { Resume } from '../../api/types'
import { useAuth } from '../../context/AuthContext'
import UploadResume from '../../components/UploadResume'

const MyResumes = () => {
    const { token } = useAuth()
    const [resumes, setResumes] = useState<Resume[]>([])
    const [error, setError] = useState<string | null>(null)
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

    useEffect(() => {
        const fetchResumes = async () => {
            const response = await listResumes(token!!)
            if (response.state === 'SUCCESS') {
                const { resumes } = response.data
                setResumes(resumes)
            } else {
                console.error('Error fetching resumes:', response.error)
                setError(`Error fetching resumes: ${response.error}`)
            }
        }

        fetchResumes()
    }, [token])

    const handleDownload = async (resumeId: string) => {
        const response = await downloadResume(token!!, resumeId)

        if (response.state === 'SUCCESS') {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'resume.pdf') // You can also use the file_name attribute from the Resume type if available
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } else {
            console.error('Error downloading the resume:', response.error)
        }
    }

    const handleEdit = (resume: string) => {
        // Implement edit functionality
    }

    const handleDelete = async (id: string) => {
        const response = await deleteResume(token!!, id)
        if (response.state === 'SUCCESS') {
            setResumes(resumes.filter((resume) => resume.id !== id))
        } else {
            setError(
                'An error occurred while deleting the resume. Please try again later.'
            )
        }
    }

    const handleCloseSnackbar = () => {
        setError(null)
    }

    const handleUploadSuccess = (uploadedResume: any) => {
        setResumes((prevState) => [uploadedResume, ...prevState])
    }

    const handleOpenUploadDialog = () => {
        setUploadDialogOpen(true)
    }

    const handleCloseUploadDialog = () => {
        setUploadDialogOpen(false)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File name</TableCell>
                        <TableCell>Upload date</TableCell>
                        <TableCell>Metadata</TableCell>
                        <TableCell>Visibility</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resumes.map((resume) => (
                        <TableRow key={resume.id}>
                            <TableCell>{resume.file_name}</TableCell>
                            <TableCell>
                                {new Date(
                                    resume.upload_date
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {JSON.stringify(resume.metadata)}
                            </TableCell>
                            <TableCell>
                                {resume.public ? 'Public' : 'Private'}
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => handleDownload(resume.id)}
                                >
                                    Download
                                </Button>
                                <Button onClick={() => handleEdit(resume.id)}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(resume.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenUploadDialog}
            >
                Upload New Resume
            </Button>
            <UploadResume
                open={uploadDialogOpen}
                onClose={handleCloseUploadDialog}
                onUploadSuccess={handleUploadSuccess}
                setError={setError}
            />
            <Snackbar
                open={error !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default MyResumes
