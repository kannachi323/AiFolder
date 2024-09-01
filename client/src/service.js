export function callChatGPT() {
    console.log("i got called lol");
    fetch(`http://localhost:5001/api/callChatGPT`)
        .then(response => response.json())
        .then(data => {
            console.log('Response from ChatGPT:', data.result);
        })
        .catch(error => {
            console.error('Error calling ChatGPT:', error);
        });
    
    console.log("done");
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
        console.log(fileTreeData)
        return fileTreeData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

