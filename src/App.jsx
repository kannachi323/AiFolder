import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';

import { memo } from 'react';
import FileManager from './FileManager.jsx';
import FileSystemUI from './FileSystemUI.jsx';
import FileTree from './FileTree.jsx';
const content = [require('./sample.json')]

export default function App() {
    return (
        <FileSystemUI content={content}></FileSystemUI>
        
    );
}


