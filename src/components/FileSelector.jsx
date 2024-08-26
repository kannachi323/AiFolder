import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/FileTree.css'



export default function FileSelector() {
  const onDrop = useCallback(acceptedFiles => {

  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
      <div className='file-selector' {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
  );
}
