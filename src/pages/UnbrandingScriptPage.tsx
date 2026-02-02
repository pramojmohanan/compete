import { useState } from 'react';
import { unbrandingScripts } from '../data/unbrandingScripts';
import StatsDisplay from '../components/StatsDisplay';
import '../styles/pages.css';
import '../styles/unbranding.css';

interface UnbrandingScriptPageProps {
  appName: string;
}

function UnbrandingScriptPage({ appName }: UnbrandingScriptPageProps) {
  const appKey = appName.toLowerCase();
  const platformScript = unbrandingScripts[appKey] || '';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (platformScript) {
      navigator.clipboard
        .writeText(platformScript)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Unbranding Script - {appName}</h1>
        <p className="page-description">Copy the unbranding script for {appName}</p>
      </div>

      <div className="page-content">
        <div className="textarea-group">
          <div className="label-with-button">
            <label htmlFor="script">Script for {appName}:</label>
            {platformScript && (
              <button 
                onClick={handleCopy} 
                className={`copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copied!' : 'Copy Script'}
              </button>
            )}
          </div>
          <textarea
            id="script"
            className="output-textarea script-textarea"
            value={platformScript}
            readOnly
            placeholder="No script available for this platform..."
          />
        </div>

        {platformScript && (
          <StatsDisplay
            originalSize={0}
            convertedSize={platformScript.length}
          />
        )}
      </div>
    </div>
  );
}

export default UnbrandingScriptPage;
