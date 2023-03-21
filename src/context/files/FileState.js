import React, { useState } from 'react'
import fileContext from './fileContext'

const FileState = (props) => {

    const [files, setFiles] = useState([]);

    const addFile = async (selectedFile,path) => {

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://localhost/files/upload', {  //the response received here is JSON

            method: 'POST',
            headers: {
                "auth-token":localStorage.getItem("token"),
                "path":path,

            },
            body: formData,

          });
          const json=await response.json();  //response.json() converts the JSON response ot a javascript object
          setFiles(files.concat(json));
        

    }

    const editFile=async ()=>{
        
        
    }

    const getFilesbyPath=async (pathname)=>{

        const response = await fetch('http://localhost/files/getfilesbypath', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token"),
                "path":pathname
             
            },
          });

          const json=await response.json();
          setFiles(json);
          
    }

    const addToStarred=async (id)=>{
        const response = await fetch(`http://localhost/files/starFile/${id}`, {
            method: 'PUT',
          });
    }


    const fetchStarredFiles=async ()=>{
        const response = await fetch("http://localhost/files/fetchstarredfiles", {
            method: 'GET',
          });

          const json=await response.json();
          setFiles(json);
    }

    const removeFileFromStarred=async (id)=>{
        console.log("Removing file from starred");
        const response = await fetch(`http://localhost/files/removestarFile/${id}`, {
            method: 'PUT',
          });

        const updatedFiles=files.filter(file=>file._id!=id);
        setFiles(updatedFiles);
    }
    
    return (
        <fileContext.Provider value={{files,addFile,getFilesbyPath,addToStarred,fetchStarredFiles,removeFileFromStarred,editFile}}>
            {props.children}
        </fileContext.Provider>
    )
}

export default FileState