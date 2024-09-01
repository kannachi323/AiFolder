import React from 'react';

export default function UserAuthPage() {
    return (
        <div className="flex flex-col justify-center item-center m-2 text-white">
            <button onClick={startUserAuth}>
                click me!
            </button>
        </div>
    );
}

async function startUserAuth() {
    //TODO: implement actual user auth before getting home directory
    try {
        const dirHandle = await window.showDirectoryPicker();
        if (dirHandle) {
            console.log(dirHandle.name);
            return dirHandle;
        } 
       
      } catch (err) {
        console.error('Error selecting directory:', err);
        }
    
}