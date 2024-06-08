import React, { useState } from 'react'
import folderContext from './folderContext'

const FolderState = (props) => {
    const host = process.env.REACT_APP_SERVER_DOMAIN
    const [folders, setFolders] = useState([]);

    // ROUTE-1 Fetching all folders

    const getFolders = async (path,query) => {

        const response = await fetch(`${host}/folders/getfolders?query=${query}`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
                "path":path,
            },

        });
        const json = await response.json();
        // console.log(json);
        setFolders(json);

    }

    // ROUTE-2 Adding a new folder

    const addFolder = async (name,path) => {

        const response = await fetch(`${host}/folders/addfolder`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
                "path":path
            },

            body: JSON.stringify({ name }),

        });
        const folder = await response.json();
        setFolders(folders.concat(folder));

    }

    // ROUTE-3  updating a folder
    const editFolder = async (id, name) => {

        try {

            const response = await fetch(`${host}/folders/updatefolder/${id}`, {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },

                body: JSON.stringify({ name }),

            });
            const json = await response.json();

            let newFolders = JSON.parse(JSON.stringify(folders))
            for (let i = 0; i < newFolders.length; i++) {
                const ele = newFolders[i];
                if (ele._id === id) {  
                    newFolders[i].name = name;
                    break;
                }

            }
            setFolders(newFolders);

        } catch (error) {
            console.log(error);
        }

    }

     // ROUTE-4  deleting a folder

    const deleteFolder = async (folder_id) => {

        // TODO
        //Deleting files inside the folder

        try {
            
            const response = await fetch(`${host}/folders/deletefolder/${folder_id}`, {
                method: 'DELETE',
    
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token")
                },
    
    
            });
            const folder = await response.json();
            // console.log(folder);

            const newFolders=folders.filter(folder=>folder._id!==folder_id);
            setFolders(newFolders);

        } catch (error) {
            console.log(error);
        }  
    }


    // ROUTE-5  adding a folder to starred
    
    const addFolderToStarred=async (id)=>{
        const response = await fetch(`${host}/folders/starFolder/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });
    }

    // ROUTE-6  fetching all starred folders

    const fetchStarredFolders= async (query)=>{
        const response = await fetch(`${host}/folders/fetchstarredfolders?query=${query}`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },

          });

          const json=await response.json();
        //   console.log(json);
          setFolders(json);
    }

    const fetchFoldersMovedToBin= async (query)=>{
        const response = await fetch(`${host}/folders/bin?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },

          });

          const json=await response.json();
        //   console.log(json);
          setFolders(json);
    }

    // ROUTE-7  removing a folder from starred

    const removeFolderFromStarred=async (id,isStarred)=>{
        const response = await fetch(`${host}/folders/removestarFolder/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });

        if(isStarred){

            const updatedFolders=folders.filter(folder=>folder._id!==id);
            setFolders(updatedFolders);
        }

    }

    const restoreFoldersFromBin=async (id)=>{
        const response = await fetch(`${host}/folders/bin/restore/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });
          console.log(response);
          if(response.status===200){
              const updatedFolders=folders.filter(folder=>folder._id!==id);
              setFolders(updatedFolders);
          }


    }
    

    return (
        <folderContext.Provider value={{ folders, getFolders, addFolder, editFolder,addFolderToStarred,fetchStarredFolders,removeFolderFromStarred,deleteFolder,fetchFoldersMovedToBin,restoreFoldersFromBin}}>
            {props.children}
        </folderContext.Provider>
    )
}

export default FolderState