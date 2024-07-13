import React, { useState } from 'react'
import fileContext from './fileContext'

const FileState = (props) => {

    const host = process.env.REACT_APP_SERVER_DOMAIN

    const [files, setFiles] = useState([]);

    // ROUTE-1 Adding a file

    const addFile = async (selectedFile, path) => {

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch(`${host}/files/upload`, {  //the response received here is JSON

            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem("token"),
                "path": path,

            },
            body: formData,

        });
        const json = await response.json();  //response.json() converts the JSON response ot a javascript object
        setFiles(files.concat(json));
    }

    // ROUTE-2 Renaming a file

    const renameFile = async (id, name) => {

        try {

            const response = await fetch(`${host}/files/renamefile/${id}`, {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },

                body: JSON.stringify({ name }),

            });
            const json = await response.json();
            // console.log(json);

            let newFiles = JSON.parse(JSON.stringify(files))
            for (let i = 0; i < newFiles.length; i++) {
                const ele = newFiles[i];
                if (ele._id === id) {
                    newFiles[i].original_name = json.original_name;
                    break;
                }

            }
            setFiles(newFiles);

        } catch (error) {
            console.log(error);
        }

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
            const json = response.json();
            // console.log(json);

            const newFiles = files.filter(file => file._id !== file_id);
            setFiles(newFiles);

        } catch (error) {
            console.log(error);
        }
    }

    // ROUTE-4  getting all files by path

    const getFilesbyPath = async (pathname, query) => {

        const response = await fetch(`${host}/files/getfilesbypath?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
                "path": pathname

            },
        });

        const json = await response.json();
        setFiles(json);

    }

    // ROUTE-5  adding a file to starred

    const addToStarred = async (id) => {
        const response = await fetch(`${host}/files/starFile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });
    }

    // ROUTE-6  fetching all starred files

    const fetchStarredFiles = async (query) => {
        const response = await fetch(`${host}/files/fetchstarredfiles?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });

        const json = await response.json();
        setFiles(json);
    }

    const MoveFileToBin = async (id) => {
        const response = await fetch(`${host}/files/bin/move/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });
    }

    const fetchFilesMovedToBin = async (query) => {
        const response = await fetch(`${host}/files/bin?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });

        const json = await response.json();
        setFiles(json);
    }

    const restoreFileFromBin=async (id)=>{
        const response = await fetch(`${host}/files/bin/restore/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });
          console.log(response);
          if(response.status===200){
              const updatedFiles=files.filter(file=>file._id!==id);
              setFiles(updatedFiles);
          }


    }

    // ROUTE-7  removing a file from starred

    const removeFileFromStarred = async (id,isStarred) => {
        const response = await fetch(`${host}/files/removestarFile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });

        if(isStarred){

            const updatedFiles = files.filter(file => file._id !== id);
            setFiles(updatedFiles);
        }

    }

    const displayImageFile = async (id) => {
        try {
            const response = await fetch(`${host}/files/image/${id}`, {
                method: 'GET',
            });


        } catch (error) {
            console.log(error);
        }
    }

    const downloadFile = async (id) => {
        try {
            const response = await fetch(`${host}/files/downloadfile/${id}`, {
                method: 'GET',
            });
            // console.log(response);

            if (response.ok) {

                let fileName = response.headers.get("file-Name");
                //console.log(fileName);
             
                const blob = await response.blob();

                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = fileName;
                downloadLink.click();
                URL.revokeObjectURL(downloadLink.href);
            }

            else {
                console.error("Error: " + response.status);
            }


        } catch (error) {
            console.log(error);
        }
    }

    const fetchFilesSharedWithMe = async (query) => {
        const response = await fetch(`${host}/files/shared-with-me?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        });

        const json = await response.json();
        setFiles(json);
    }

    return (
        <fileContext.Provider value={{ files, addFile, getFilesbyPath, addToStarred, fetchStarredFiles, removeFileFromStarred, renameFile, deleteFile, displayImageFile, downloadFile,fetchFilesMovedToBin,restoreFileFromBin,MoveFileToBin,fetchFilesSharedWithMe }}>
            {props.children}
        </fileContext.Provider>
    )
}

export default FileState