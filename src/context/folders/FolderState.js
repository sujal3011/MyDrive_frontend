import React, { useState } from 'react'
import folderContext from './folderContext'

const FolderState = (props) => {
    const host = process.env.REACT_APP_SERVER_DOMAIN
    const [folders, setFolders] = useState([]);

    //Fetching all folders

    const getFolders = async (path) => {

        const response = await fetch(`${host}/folders/getfolders`, {
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

    //Adding a new folder

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
        console.log(folder);
        setFolders(folders.concat(folder));

    }

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
            console.log(json);

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
            console.log(folder);

            const newFolders=folders.filter(folder=>folder._id!==folder_id);
            setFolders(newFolders);

        } catch (error) {
            console.log(error);
        }

        
    }

    const addFolderToStarred=async (id)=>{
        console.log("Adding folder to starred");
        const response = await fetch(`${host}/folders/starFolder/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });
    }


    const fetchStarredFolders= async ()=>{
        const response = await fetch(`${host}/folders/fetchstarredfolders`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },

          });

          const json=await response.json();
          console.log(json);
          setFolders(json);
    }

    const removeFolderFromStarred=async (id)=>{
        const response = await fetch(`${host}/folder/removestarFolder/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token"),
            },
          });

        const updatedFolders=folders.filter(folder=>folder._id!==id);
        setFolders(updatedFolders);
    }
    

    return (
        <folderContext.Provider value={{ folders, getFolders, addFolder, editFolder,addFolderToStarred,fetchStarredFolders,removeFolderFromStarred,deleteFolder}}>
            {props.children}
        </folderContext.Provider>
    )
}

export default FolderState