import React, { useState } from 'react';

function LoadingRing({loading, setLoading}) {
    

    function handleCancel() {
      setLoading();
      //TODO: remove any temp folders that may have been created in the process
    }

    return (
      <>
        {loading && 
          <div className="flex flex-col items-center justify-center h-screen">
            <b className="text-3xl p-5 text-white">Loading...</b>
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
              </div>
            </div>
            <button type="button" 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 m-5 *:dark:bg-blue-600 dark:hover:bg-blue-700 
              focus:outline-none dark:focus:ring-blue-800"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>}
          
      </>
    )
}

export default LoadingRing;