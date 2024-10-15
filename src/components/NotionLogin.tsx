import React from 'react';
import { LogIn } from 'lucide-react';

interface NotionLoginProps {
  onLogin: (token: string) => void;
}

const NotionLogin: React.FC<NotionLoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    chrome.identity.launchWebAuthFlow(
      {
        url: 'https://api.notion.com/v1/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&owner=user&redirect_uri=YOUR_REDIRECT_URI',
        interactive: true
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error('Login failed');
          return;
        }
        const code = new URL(redirectUrl).searchParams.get('code');
        if (code) {
          // Exchange code for access token
          // This should be done in your backend for security reasons
          // For demonstration, we're just passing the code as a token
          onLogin(code);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Login to Notion</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <LogIn className="mr-2" />
        Login with Notion
      </button>
    </div>
  );
};

export default NotionLogin;