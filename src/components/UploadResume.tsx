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
import { uploadResume, uploadResumePublic } from '../api/resume_service'
import { useAuth } from '../context/AuthContext'
import { Resume, TemporaryResume } from '../api/types'

interface UploadResumeProps {
    open: boolean
    onClose: () => void
    onUploadSuccess: (uploadedResume: Resume | TemporaryResume) => void
    setError: (error: string | null) => void
    isPublic: boolean
}

const UploadResume: React.FC<UploadResumeProps> = ({
    open,
    onClose,
    onUploadSuccess,
    setError,
    isPublic,
}: UploadResumeProps) => {
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
        let response;
        if (isPublic) {
            response = await uploadResumePublic(file)
        } else {
            response = await uploadResume(token!!, tagsList, file)
        }
        if (response.state === 'SUCCESS') {
            onUploadSuccess(response.data.resume)
            setFile(null)
            setTags('')
            onClose()
        } else {
            setError(`Error uploading resume: ${response.error}`)
        }
        setLoading(false)
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
                {!isPublic && <TextField
                    id="tags"
                    label="Tags (Optional, comma separated list of tags)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={tags}
                    onChange={handleTagsChange}
                />}
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

export default UploadResume
