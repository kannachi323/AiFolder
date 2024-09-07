import React, { useState, useEffect } from 'react';
import LoadingRing from '../components/LoadingRing.jsx';
import { runCom } from '../service.js';
import { MdDataSaverOn } from 'react-icons/md';

export default function GmailQuickstart() {
  const CLIENT_ID = '163124361067-2i8s4nedstb17jforhv1fnh8p8qojfo4.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCpzJ-n6mnKvcBWQ2ZmK398Dx3fhW578gg';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
  const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [content, setContent] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    const gapiLoaded = () => {
      window.gapi.load('client', initializeGapiClient);
    };

    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      setGapiInited(true);
      maybeEnableButtons();
    };

    const gisLoaded = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      });
      setTokenClient(client);
      setGisInited(true);
      maybeEnableButtons();
    };

    const maybeEnableButtons = () => {
      if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
      }
    };

    // Load GAPI and GIS
    const loadScripts = () => {
      const scriptGapi = document.createElement('script');
      scriptGapi.src = 'https://apis.google.com/js/api.js';
      scriptGapi.onload = gapiLoaded;
      document.body.appendChild(scriptGapi);

      const scriptGis = document.createElement('script');
      scriptGis.src = 'https://accounts.google.com/gsi/client';
      scriptGis.onload = gisLoaded;
      document.body.appendChild(scriptGis);
    };

    loadScripts();
  }, [gapiInited, gisInited]);

  const handleAuthClick = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setIsAuthorized(true);
      document.getElementById('authorize_button').innerText = 'Refresh';
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      setContent('');
      setIsAuthorized(false);
      document.getElementById('authorize_button').innerText = 'Authorize';
    }
  };

  const getNextMonth = (month) => {
    const [year, monthNumber] = month.split('-').map(Number);
    const date = new Date(year, monthNumber - 1);
    date.setMonth(date.getMonth() + 1);
    const nextYear = date.getFullYear();
    const nextMonth = String(date.getMonth() + 1).padStart(2, '0');

    return `${nextYear}/${nextMonth}`;
  };

  const listMessages = async (month) => {
    const nextMonth = getNextMonth(month);
    const before = nextMonth.replace('-', '/');
    const after = month.replace('-', '/');

    let response;
    const query = `from:me to:me after:${after}/01 before:${before}/01`;

    console.log(query);

    try {
      response = await window.gapi.client.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 100,
      });
    } catch (err) {
      setContent(err.message);
      return;
    }

    const messages = response.result.messages;
    if (!messages || messages.length === 0) {
      setContent('No messages found.');
      return;
    }

    let messageList = 'Messages:\n';
    let newLinks = [];
    for (const message of messages) {
      try {
        const msgDetail = await window.gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });
        const snippet = msgDetail.result.snippet;

        if (snippet !== '') {
          messageList += `Message ID: ${message.id}, Snippet: ${snippet}\n`;
          newLinks.push(snippet);
        }
      } catch (err) {
        console.error(`Error fetching message details: ${err.message}`);
      }
    }
    setContent(messageList);

    return newLinks;
  };

  return (
    <>
      {loading ? (
        <LoadingRing loading={loading} setLoading={setLoading} />
      ) : (
        <div>
          <p className="text-white">Gmail API Quickstart</p>
          <button
            id="authorize_button"
            onClick={handleAuthClick}
            style={{ visibility: 'hidden' }}
            className="text-white"
          >
            Authorize
          </button>
          <button
            id="signout_button"
            onClick={handleSignoutClick}
            style={{ visibility: isAuthorized ? 'visible' : 'hidden' }}
            className="text-white"
          >
            Sign Out
          </button>
          <pre id="content" style={{ whiteSpace: 'pre-wrap' }} className="text-white">
            {content}
          </pre>
          <input id="input-month" type="month" />
          <input
            id="input-file-path"
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="Enter file path"
          />
          {isAuthorized && (
            <button
              onClick={async () => {
                setLoading(true);
                const month = document.getElementById('input-month').value;

                const newLinks = await listMessages(month);
                console.log(filePath);
                for (const link of newLinks) {
                  const response = await runCom(filePath, link);
                  if (!response.result) {
                    console.log('Could not download this video');
                  } else {
                    console.log(`Downloaded video from link: ${link}`);
                  }
                }
                setLoading(false);
              }}
            >
              Get Messages
            </button>
          )}
        </div>
      )}
    </>
  );
}
