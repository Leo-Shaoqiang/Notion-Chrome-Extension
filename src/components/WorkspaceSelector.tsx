import React from 'react';
import { FileText } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  onSelect: (workspace: Workspace) => void;
}

const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({ workspaces, onSelect }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Select a Workspace</h2>
      <ul className="w-full max-w-md">
        {workspaces.map((workspace) => (
          <li key={workspace.id} className="mb-2">
            <button
              onClick={() => onSelect(workspace)}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center"
            >
              <FileText className="mr-2" />
              {workspace.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceSelector;