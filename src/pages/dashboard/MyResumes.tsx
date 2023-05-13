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
    Chip,
    Switch,
    Box,
    Fab,
} from '@mui/material'
import {
    downloadResume,
    listResumes,
    deleteResume,
    updateResumeVisibility,
} from '../../api/resume_service'
import AddIcon from '@mui/icons-material/Add'
import { Resume, TemporaryResume } from '../../api/types'
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

    const handleVisibilityToggle = async (
        resumeId: string,
        isPublic: boolean
    ) => {
        const response = await updateResumeVisibility(
            token!!,
            resumeId,
            isPublic
        )
        if (response.state === 'SUCCESS') {
            setResumes(
                resumes.map((resume) =>
                    resume.id === resumeId
                        ? { ...resume, public: isPublic }
                        : resume
                )
            )
        } else {
            setError(
                'An error occurred while updating the resume visibility. Please try again later.'
            )
        }
    }

    const handleCloseSnackbar = () => {
        setError(null)
    }

    const handleUploadSuccess = (uploadedResume: Resume | TemporaryResume) => {
        setResumes((prevState) => [uploadedResume as Resume, ...prevState])
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
                        <TableCell>Public?</TableCell>
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
                                {resume.tags
                                    ? (
                                          JSON.parse(
                                              resume.tags as any
                                          ) as string[]
                                      ).map((tag, index) => (
                                          <Chip
                                              key={index}
                                              label={tag}
                                              style={{ marginRight: '4px' }}
                                          />
                                      ))
                                    : []}
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={resume.public}
                                    onChange={(event) =>
                                        handleVisibilityToggle(
                                            resume.id,
                                            event.target.checked
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDownload(resume.id)}
                                >
                                    Download
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDelete(resume.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    variant="extended"
                    size="medium"
                    onClick={handleOpenUploadDialog}
                >
                    <AddIcon />
                    Upload
                </Fab>
            </Box>
            <UploadResume
                open={uploadDialogOpen}
                onClose={handleCloseUploadDialog}
                onUploadSuccess={handleUploadSuccess}
                setError={setError}
                isPublic={false}
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
