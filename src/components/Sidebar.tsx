import { Link, useParams } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const { app } = useParams<{ app: string }>();
  const currentApp = app || 'copilot';

  const apps = ['copilot', 'gemini', 'chatgpt'];
  const sharedTools = [
    { path: '/text-to-single-line', label: 'Text to Single Line' },
    { path: '/html-to-single-line', label: 'HTML to Single Line' },
    { path: '/citations-to-links', label: 'Citations to Links' },
  ];
  const appSpecificTools = [
    { path: 'unbranding-script', label: 'Unbranding Script' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Tools <span className="version">v1.1</span></h1>
      </div>

      <nav className="sidebar-nav">
        {/* Shared Tools Section */}
        <div className="shared-section">
  
          <ul className="tools-list">
            {sharedTools.map((tool) => (
              <li key={tool.path}>
                <Link
                  to={tool.path}
                  className="tool-link"
                >
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* App-Specific Sections */}
        {apps.map((appName) => (
          <div key={appName} className={`app-section ${currentApp === appName ? 'active' : ''}`}>
            <h2 className="app-title">{appName.charAt(0).toUpperCase() + appName.slice(1)}</h2>
            <ul className="tools-list">
              {appSpecificTools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={`/${appName}/${tool.path}`}
                    className="tool-link"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
