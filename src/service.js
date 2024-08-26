//Python folder-api
const apiBaseURL = 'http://127.0.0.1:5001/';


export function callChatGPT() {
    fetch(`${apiBaseURL}api/callChatGPT`)
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


    fetch(`${apiBaseURL}api/callGoogleCloudVision`, {
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

    fetch(`${apiBaseURL}api/uploadImageToSupabase`, {
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
    
    const url = new URL(`${apiBaseURL}api/signUpOnSupabase`);
    
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


export function buildJsonFileTree(path) {

    const url = new URL(`${apiBaseURL}api/buildJsonFileTree`);
    
    const data = {
        arg1: path
    };

    const searchParams = new URLSearchParams(data);

    url.search = searchParams.toString();

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;  // Return the data directly
        })
        .catch(error => {
            console.error('Error: ', error);
            return null;  // Return null if an error occurs
        });
}

