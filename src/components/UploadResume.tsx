import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
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
}) => {
    const { token } = useAuth()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [metadata, setMetadata] = useState('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] || null)
    }

    const handleMetadataChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMetadata(event.target.value)
    }

    const handleUploadResume = async () => {
        if (selectedFile) {
            try {
                const metadataObject = metadata ? JSON.parse(metadata) : {}
                const response = await uploadResume(
                    token!!,
                    metadataObject,
                    selectedFile
                )

                if (response.state === 'SUCCESS') {
                    onUploadSuccess(response.data)
                    setSelectedFile(null)
                    setMetadata('')
                    onClose()
                } else {
                    setError(`Error uploading resume: ${response.error}`)
                }
            } catch (error) {
                setError(
                    'Invalid metadata JSON format. Please correct and try again.'
                )
            }
        } else {
            setError('Please select a file to upload.')
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload New Resume</DialogTitle>
            <DialogContent>
                <input
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="upload-file"
                    type="file"
                    onChange={handleFileChange}
                    aria-label="Select resume file"
                />
                <label htmlFor="upload-file">
                    <Button variant="outlined" color="primary" component="span">
                        {selectedFile ? selectedFile.name : 'Choose File'}
                    </Button>
                </label>
                <TextField
                    label="Metadata (Optional, JSON format)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={metadata}
                    onChange={handleMetadataChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUploadResume} color="primary">
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UploadResumes
