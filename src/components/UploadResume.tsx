// UploadResumes.tsx
import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
} from '@mui/material'
import { uploadResume } from '../api/resume_service'
import { useAuth } from '../context/AuthContext'
import { Resume } from '../api/types'

interface UploadResumesProps {
    open: boolean
    onClose: () => void
    onUploadSuccess: (uploadedResume: Resume) => void
    setError: (error: string | null) => void
}

const UploadResumes: React.FC<UploadResumesProps> = ({
    open,
    onClose,
    onUploadSuccess,
    setError,
}: UploadResumesProps) => {
    const { token } = useAuth()
    const [file, setFile] = useState<File | null>(null)
    const [tags, setTags] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null)
    }

    const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTags(event.target.value)
    }

    const handleUpload = async () => {
        if (!file) {
            setError('No file selected')
            return
        }
        let tagsList = []
        try {
            tagsList = tags.split(',').map((tag) => tag.trim())
        } catch (error) {
            setError(`${error}`)
            return
        }

        setLoading(true)
        const response = await uploadResume(token!!, tagsList, file)
        setLoading(false)
        if (response.state === 'SUCCESS') {
            onUploadSuccess(response.data.resume)
            setFile(null)
            setTags('')
            onClose()
        } else {
            setError(`Error uploading resume: ${response.error}`)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Resume</DialogTitle>
            <DialogContent>
                <input
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="upload-file"
                    type="file"
                    onChange={handleChangeFile}
                    aria-label="Select resume file"
                />
                <label htmlFor="upload-file">
                    <Button variant="outlined" color="primary" component="span">
                        {file ? file.name : 'Choose File'}
                    </Button>
                </label>
                <TextField
                    id="tags"
                    label="Tags (Optional, comma separated list of tags)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={tags}
                    onChange={handleTagsChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleUpload}
                    color="primary"
                    disabled={!file || loading}
                >
                    Upload
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        style={{ marginLeft: '10px' }}
                    />
                )}
            </DialogActions>
        </Dialog>
    )
}

export default UploadResumes
