export function buildPrompt(fileTreeJson) {
    // Ensure fileTreeJson and its properties are defined
    if (!fileTreeJson || !fileTreeJson.id || !fileTreeJson.children) {
        console.error('Invalid fileTreeJson structure');
        return;
    }

    const start_dir = fileTreeJson;
    let prompt = `${start_dir.id}/\n\t`;

    // Loop through children and build the prompt string
    for (let i = 0; i < start_dir.children.length; i++) {
        const child = start_dir.children[i];
        // Check if child has no further children
        if (child.children && child.children.length === 0) {
            prompt += `${child.id}\n\t`;
        }
        else {
            prompt += '\n';
        }
    }

    prompt += `Please organize these files and folders and return just the result in JSON format. The JSON should have the following structure:
    {
        "folder_name": {
            "subfolder_name": [
                "file1.ext",
                "file2.ext"
            ]
        }
    }.`;
    
    return prompt;
}


export function callChatGPT(prompt) {
    fetch('http://localhost:5001/api/callChatGPT', {
        method: 'POST', // Use POST to send data
        headers: {
            'Content-Type': 'text/plain', // Specify the content type as plain text
        },
        body: prompt, // Send the prompt directly as a string
    })
    .then(response => {
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        return data.result;
    })
    .catch(error => {
        console.error('Error calling ChatGPT:', error);
    });

    console.log("Request sent");
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
