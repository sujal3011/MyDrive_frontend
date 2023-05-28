import React, { useState } from 'react'
import fileContext from './fileContext'

const FileState = (props) => {

    const host = process.env.REACT_APP_SERVER_DOMAIN

    const [files, setFiles] = useState([]);

    // ROUTE-1 Adding a file

    const addFile = async (selectedFile,path) => {

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch(`${host}/files/upload`, {  //the response received here is JSON

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

    // ROUTE-2 Renaming a file

    const editFile=async ()=>{
        
        
    }

    // ROUTE-3 Deleting a file

    const deleteFile = async (file_id) => {

        try {
            
            const response = await fetch(`${host}/files/deletefile/${file_id}`, {
                method: 'DELETE',
    
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },
    
            });
            // console.log(typeof(response));
            const json=response.json();
            // console.log(typeof(json));
            // console.log(response);
            console.log(json);

            const newFiles=files.filter(file=>file._id!==file_id);
            setFiles(newFiles);

        } catch (error) {
            console.log(error);
        }
    }

    // ROUTE-4  getting all files by path

    const getFilesbyPath=async (pathname)=>{

        const response = await fetch(`${host}/files/getfilesbypath`, {
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

    // ROUTE-5  adding a file to starred

    const addToStarred=async (id)=>{
        const response = await fetch(`${host}/files/starFile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
          });
    }

    // ROUTE-6  fetching all starred files

    const fetchStarredFiles=async ()=>{
        const response = await fetch(`${host}/files/fetchstarredfiles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
          });

          const json=await response.json();
          setFiles(json);
    }

    // ROUTE-7  removing a file from starred

    const removeFileFromStarred=async (id)=>{
        console.log("Removing file from starred");
        const response = await fetch(`${host}/files/removestarFile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
          });

        const updatedFiles=files.filter(file=>file._id!=id);
        setFiles(updatedFiles);
    }
    
    return (
        <fileContext.Provider value={{files,addFile,getFilesbyPath,addToStarred,fetchStarredFiles,removeFileFromStarred,editFile,deleteFile}}>
            {props.children}
        </fileContext.Provider>
    )
}

export default FileState