import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardActions } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import FileTree from './FileTree.jsx';
import './styles/FileTree.css'
import { buildJsonFileTree } from './service.js';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

import FileSelector from './components/FileSelector.jsx';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#FFFFFF',
        },
    },
});



export default function FileSystemUI() {

    const [nodes, setNodes] = useState(["Desktop", "Downloads", "Documents", "Pictures", "Videos"]);
    const handleNodes = (event) => {
      nodes.push(event.target.value);
      setNodes(nodes);
    }
    
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    }
    

    const [content, setContent] = useState([]);
    const handleButtonClick = (node) => {
      console.log(node);
      buildJsonFileTree(node)
          .then(result => {
              if (result) {
                  // If result is an object, wrap it in an array
                  const data = [JSON.parse(result)]
                  setContent(data);
                  
              }
          });
  };




    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Grid container spacing={2} sx={{ height: '100vh', p: 2 }}>
        {/* Sidebar (Folders/Directories) */}
        <Grid item xs={3}>
          <Paper sx={{ height: '95vh', minWidth: '20vw', p: 2, position: 'fixed'}}>
            <Typography variant="h6">Folders</Typography>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Default" />
              
            <Box sx={{ mt: 2}}>
              {checked && nodes.map((node, index) => (
                <Card key={index} sx={{display: 'flex', flexDirection: 'column', maxWidth: '800px', mb: 2, border: '2px solid gray'}}>
                  <Button onClick={() => handleButtonClick(node)} key={index} >{node}</Button>
                </Card>
              ))}
              <Card sx={{display: 'flex', justifyContent: 'center', alignContent: 'center',  mb: 2}}>
                <CardActions sx={{display: 'flex', p: 1, border: '2px solid white'}}>
                  
                    <FileSelector />
                 
                  <AddIcon sx={{p: 0}}></AddIcon>
                </CardActions>
              </Card>
            </Box>
            </Paper>
          </Grid>

              {/* Main Content Area (Files) */}
              <Grid item xs={9} sx={{display: 'flex', flexDirection: 'column', mb: '25px'}}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2}}>
                  <Typography variant="h6">
                    Visualizer
                  
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', ml: '20px', p: 2 }}>
                      
                      <button className="my-button">
                        <AutoFixHighOutlinedIcon/>
                        Organize
                      </button>
                
                  </Box>
                  
                  {content.length > 0 && 
                    <FileTree className='file-tree' node={content[0]}></FileTree>
                  } 
                 
                </Paper>

                
              </Grid>

              
            </Grid>

            
        </ThemeProvider>
    );
}
