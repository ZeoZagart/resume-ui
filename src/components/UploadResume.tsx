// UploadResumes.tsx
import React, { useState, useCallback } from 'react'
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
    const [metadata, setMetadata] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null)
    }

    const handleMetadataChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMetadata(event.target.value)
    }

    const handleUpload = async () => {
        if (!file) {
            setError('No file selected')
            return
        }
        const metadataObject = metadata ? JSON.parse(metadata) : {}

        setLoading(true)
        const response = await uploadResume(token!!, metadataObject, file)
        setLoading(false)
        if (response.state === 'SUCCESS') {
            onUploadSuccess(response.data)
            setFile(null)
            setMetadata('')
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
                    id="metadata"
                    label="Metadata (Optional, JSON format)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={metadata}
                    onChange={handleMetadataChange}
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
