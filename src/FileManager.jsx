import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Container, Paper, Grid, ButtonGroupButtonContext } from '@mui/material';
import { 
  callChatGPT, 
  callGoogleCloudVision, 
  uploadImageToSupabase,
  signUpOnSupabase,
  buildJsonFileTree
} from './service.js';


function FileManager() {
  // State to hold files
  const [files, setFiles] = useState([]);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle file uploads
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
      newFiles.forEach(file => {
        console.log(`Name: ${file.name}, Path: ${file.webkitRelativePath || file.name}, Type: ${file.type}, Size: ${file.size}`);
      });
    }
    event.target.value = null;
  };

  // Function to delete a file
  const handleFileDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Simple File Manager
      </Typography>

      <Box mb={2}>
        <Button variant="contained" component="label">
          Upload Files
          <input
            type="file"
            webkitdirectory="true"
            multiple
            hidden
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <ListItemText primary={file.name} />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleFileDelete(index)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Button variant="contained" color="primary" onClick={() => callChatGPT()}>
        Call ChatGPT
      </Button>

      <input
        type="file"
        onChange={handleFile1Change}
      />
      <input
        type="file"
        onChange={handleFile2Change}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => file1 && file2 && callGoogleCloudVision(file1, file2)}
      >
        Call Google Cloud Vision
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => file1 && uploadImageToSupabase(file1)}
      >
        Upload Image to Supabase
      </Button>

      <input
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => signUpOnSupabase(email, password)}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => buildJsonFileTree()}
      > 
      get file tree
      </Button>
    </Container>
  );
}

export default FileManager;
