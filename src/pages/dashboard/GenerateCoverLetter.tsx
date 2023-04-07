import React, { useState, useEffect } from 'react'
import {
    Button,
    TextField,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { generateCoverLetter, listResumes } from '../../api/resume_service'
import { useAuth } from '../../context/AuthContext'
import { Resume } from '../../api/types'

const GenerateCoverLetter = () => {
    const { token } = useAuth()
    const [jobDescription, setJobDescription] = useState('')
    const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')
    const [selectedResumeId, setSelectedResumeId] = useState('')
    const [resumes, setResumes] = useState<Resume[]>([])

    useEffect(() => {
        const fetchResumes = async () => {
            const response = await listResumes(token!!)
            if (response.state === 'SUCCESS') {
                setResumes(response.data.resumes)
            } else {
                console.error('Error fetching resumes:', response.error)
            }
        }

        fetchResumes()
    }, [token])

    const handleSubmit = async () => {
        const response = await generateCoverLetter(token!!, {
            resume_id: selectedResumeId,
            job_desc: jobDescription,
        })

        if (response.state === 'SUCCESS') {
            setGeneratedCoverLetter(response.data)
        } else {
            console.error('Error generating cover letter:', response.error)
        }
    }

    return (
        <Box>
            <Typography variant="h4">Generate Cover Letter</Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 3,
                }}
            >
                <FormControl sx={{ minWidth: 200, mt: 2 }}>
                    <InputLabel id="resume-select-label">
                        Select Resume
                    </InputLabel>
                    <Select
                        labelId="resume-select-label"
                        id="resume-select"
                        value={selectedResumeId}
                        label="Select Resume"
                        onChange={(e) =>
                            setSelectedResumeId(e.target.value as string)
                        }
                    >
                        {resumes.map((resume) => (
                            <MenuItem key={resume.id} value={resume.id}>
                                {resume.file_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Job Description"
                    variant="outlined"
                    multiline
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ minWidth: 400, mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                    disabled={!selectedResumeId}
                >
                    Generate
                </Button>
            </Box>
            {generatedCoverLetter && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Generated Cover Letter:
                    </Typography>
                    <Box
                        component="pre"
                        sx={{
                            background: (theme) =>
                                theme.palette.background.default,
                            borderRadius: 1,
                            p: 2,
                            mt: 2,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {generatedCoverLetter}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default GenerateCoverLetter
