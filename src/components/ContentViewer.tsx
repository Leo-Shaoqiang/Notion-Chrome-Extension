import React from 'react';
import { Link } from 'lucide-react';

interface ContentItem {
  id: string;
  type: string;
  content: string;
  url?: string;
}

interface ContentViewerProps {
  content: ContentItem[];
}

const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => {
  const renderContent = (item: ContentItem) => {
    switch (item.type) {
      case 'paragraph':
        return <p className="mb-2">{item.content}</p>;
      case 'heading_1':
        return <h1 className="text-2xl font-bold mb-2">{item.content}</h1>;
      case 'heading_2':
        return <h2 className="text-xl font-semibold mb-2">{item.content}</h2>;
      case 'heading_3':
        return <h3 className="text-lg font-medium mb-2">{item.content}</h3>;
      case 'bulleted_list_item':
        return <li className="ml-4 mb-1">{item.content}</li>;
      case 'numbered_list_item':
        return <li className="ml-4 mb-1">{item.content}</li>;
      case 'to_do':
        return (
          <div className="flex items-center mb-1">
            <input type="checkbox" checked={item.checked} readOnly className="mr-2" />
            <span>{item.content}</span>
          </div>
        );
      case 'link':
        return (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 bg-gray-100 rounded mb-2 hover:bg-gray-200"
          >
            <Link className="mr-2" />
            {item.content}
          </a>
        );
      default:
        return <p className="mb-2">{item.content}</p>;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Workspace Content</h2>
      <div className="space-y-2">
        {content.map((item) => (
          <div key={item.id}>{renderContent(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default ContentViewer;