import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {

  const sharedTools = [
    { path: '/text-to-single-line', label: 'Convert Text' },
    { path: '/html-to-single-line', label: 'Convert HTML' },
    { path: '/citations-to-links', label: 'Extract Citations' },
  ];
  const appSpecificTools = [
    { path: '/unbranding-script-cpp', label: 'cpp' },
    { path: '/unbranding-script-cgp', label: 'cgp' },
    { path: '/unbranding-script-gp', label: 'gp' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Tools <span className="version">v1.2</span></h1>
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
        <div className="app-section">
          <h2 className="app-title">Cleaners</h2>
          <ul className="tools-list">
            {appSpecificTools.map((tool) => (
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
      </nav>
    </aside>
  );
}

export default Sidebar;
