import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { downloadResume, listResumes } from "../../api/resume_service";
import { useAuth } from '../../context/AuthContext';

interface Resume {
  id: string;
  user_id: string;
  file_name: string;
  upload_date: string;
  metadata: Record<string, string>;
  public: boolean;
}

const MyResumes = () => {
  const {token } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await listResumes(token!!);
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  });

  const handleDownload = async (resumeId: string) => {
    try {
      const response = await downloadResume(token!!, resumeId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // You can also use the file_name attribute from the Resume type if available
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the resume:', error);
    }
  };

  const handleEdit = (resume: string) => {
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
  };

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
              <TableCell>{new Date(resume.upload_date).toLocaleDateString()}</TableCell>
              <TableCell>{JSON.stringify(resume.metadata)}</TableCell>
              <TableCell>{resume.public ? "Public" : "Private"}</TableCell>
              <TableCell>
                <Button onClick={() => handleDownload(resume.id)}>Download</Button>
                <Button onClick={() => handleEdit(resume.id)}>Edit</Button>
                <Button onClick={() => handleDelete(resume.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={() => {/* Implement upload new resume */}}>
        Upload New Resume
      </Button>
    </>
  );
};

export default MyResumes;
