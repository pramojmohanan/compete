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

  const handleCopy = async () => {
    if (!platformScript) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(platformScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for browsers without Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = platformScript;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback copy method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = platformScript;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
      }
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
