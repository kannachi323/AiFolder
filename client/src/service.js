export function buildPrompt(fileTreeJson) {
    // Ensure fileTreeJson and its properties are defined
    if (!fileTreeJson || !fileTreeJson.id || !fileTreeJson.children) {
        console.error('Invalid fileTreeJson structure');
        return;
    }

    let prompt = `${fileTreeJson.id}/\n`;

    // Function to process only files
    function processNode(node, depth = 1) {
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                if (child.children && child.children.length > 0) {
                    // This is a folder, skip to process children further
                    continue;
                }
                // This is a file, add to prompt
                prompt += `${'\t'.repeat(depth)}${child.id}\n`;
            }
        }
    }
    processNode(fileTreeJson);

    prompt += `You are an expert file organizer. Please organize these files and folders by categories and return just the result in JSON format. The JSON should have the following structure:
    {
        "folder_name": {
            "subfolder_name": [
                "file1.ext",
                "file2.ext"
            ]
        }
    }.`;

    console.log(prompt);

    return prompt;
}

export function createTempFolderAndCopyFiles(originalFolder, structure) {
    const url = new URL(`http:localhost:5001/api/createTempFolderAndCopyFiles`);
    const data = {
        arg1: originalFolder,
        arg2: structure
    };
    const searchParams = new URLSearchParams(data);
    url.search = searchParams.toString();

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response from createTempFolderAndCopyFiles:', data.result);
            return data.result;

        })
        .catch(error => {
            console.error('Error calling createTempFolderAndCopyFiles:', error);
            return error;
        });
    
    
}


export function callChatGPT(prompt) {
    return fetch('http://localhost:5001/api/callChatGPT', { // Return the Promise
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: prompt,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return data.result; // Return the result field
    })
    .catch(error => {
        console.error('Error calling ChatGPT:', error);
        throw error; // Re-throw the error to allow handling it in the calling function
    });
}

export function callGoogleCloudVision(file1, file2) {
  
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);


    fetch(`api/callGoogleCloudVision`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from GoogleCloudVision', data.result);
    })
    .catch(error => {
        console.error('Error calling GoogleCloudVision:', error);
    });
    
    console.log("done");
}

export function uploadImageToSupabase(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch(`api/uploadImageToSupabase`, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response from Supabase: ', data.result);
    })
    .catch(error => {
        console.error('Error calling Supabase: ', error);
    });

    console.log("done");
}

export function signUpOnSupabase(email, password) {
    
    const url = new URL(`api/signUpOnSupabase`);
    
    const data = {
        arg1: email,
        arg2: password
    };

    console.log(email);
    console.log(password);

    const searchParams = new URLSearchParams(data);

    url.search = searchParams.toString();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response from Supabase: ', data.result);
        })
        .catch(error => {
            console.error('Error calling Supabase: ', error);
        });
    
    console.log("done");
}


export async function buildJsonFileTree(path) {
    const url = new URL(`http:localhost:5001/api/buildJsonFileTree`);
    
    const data = {
        arg1: path
    };

    const searchParams = new URLSearchParams(data);

    url.search = searchParams.toString();

    try {
        const response = await fetch(url);
        const fileTreeData = await response.json();
        return fileTreeData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function isValidDir(path) {
    const url = new URL(`http:localhost:5001/api/isValidDir`);
    
    const data = {
        arg1: path
    };

    const searchParams = new URLSearchParams(data);

    url.search = searchParams.toString();

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Response from isValidDir:', data.result);
        return data;
    } catch (error) {
        console.error('Error calling isValidDir:', error);
        return null;  // or handle the error appropriately
    }
}

export async function runCom(output, link) {
    const url = new URL(`http:localhost:5001/api/runCom`);
    
    const data = {
        arg1: output,
        arg2: link
    };

    const searchParams = new URLSearchParams(data);

    url.search = searchParams.toString();

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Response from isValidDir:', data.result);
        return data;
    } catch (error) {
        console.error('Error calling isValidDir:', error);
        return null;  // or handle the error appropriately
    }
}
