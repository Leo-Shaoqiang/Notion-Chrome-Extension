import React, { useState, useEffect } from 'react';
import { LogIn, FileText, Link } from 'lucide-react';
import NotionLogin from './components/NotionLogin';
import WorkspaceSelector from './components/WorkspaceSelector';
import ContentViewer from './components/ContentViewer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Check if the user is already logged in
    chrome.storage.local.get(['notionToken'], (result) => {
      if (result.notionToken) {
        setIsLoggedIn(true);
        fetchWorkspaces(result.notionToken);
      }
    });
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    chrome.storage.local.set({ notionToken: token });
    fetchWorkspaces(token);
  };

  const fetchWorkspaces = async (token) => {
    // Fetch workspaces from Notion API
    // This is a placeholder and needs to be implemented with actual Notion API calls
    const response = await fetch('https://api.notion.com/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28'
      }
    });
    const data = await response.json();
    setWorkspaces(data.workspaces || []);
  };

  const handleWorkspaceSelect = async (workspace) => {
    setSelectedWorkspace(workspace);
    // Fetch content for the selected workspace
    // This is a placeholder and needs to be implemented with actual Notion API calls
    const response = await fetch(`https://api.notion.com/v1/blocks/${workspace.id}/children`, {
      headers: {
        'Authorization': `Bearer ${chrome.storage.local.get(['notionToken'])}`,
        'Notion-Version': '2022-06-28'
      }
    });
    const data = await response.json();
    setContent(data.results || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!isLoggedIn ? (
        <NotionLogin onLogin={handleLogin} />
      ) : !selectedWorkspace ? (
        <WorkspaceSelector workspaces={workspaces} onSelect={handleWorkspaceSelect} />
      ) : (
        <ContentViewer content={content} />
      )}
    </div>
  );
}

export default App;