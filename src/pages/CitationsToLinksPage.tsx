import { useState, useEffect } from 'react';
import StatsDisplay from '../components/StatsDisplay';
import '../styles/pages.css';

interface CitationsToLinksPageProps {
  appName: string;
}

// Unified extraction function for all platforms
function extractCitations(dom: Document): string[] {
  const anchors = dom.querySelectorAll('a');
  const links: string[] = [];

  anchors.forEach((a) => {
    const href = a.getAttribute('href') || '';
    
    if (!href) return;

    // Try to get title from div:nth-of-type(2), fallback to link text
    let title = '';
    const titleDiv = a.querySelector('div:nth-of-type(2)');
    if (titleDiv) {
      title = titleDiv.textContent?.replace(/\n/g, '').replace(/\t/g, '').trim() || '';
    }
    
    // If no title found or it looks like a number+domain, extract domain from URL
    if (!title || /^\[\d+/.test(title)) {
      try {
        const url = new URL(href);
        // Get domain without www.
        title = url.hostname.replace('www.', '');
      } catch {
        title = a.textContent?.trim() || 'No Title';
      }
    }

    links.push(`[${title}](${href})`);
  });

  return links;
}

function CitationsToLinksPage({ appName: _appName }: CitationsToLinksPageProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for browsers without Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = output;
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
        textArea.value = output;
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

  // Auto-convert when input changes
  useEffect(() => {
    if (input) {
      try {
        // Parse HTML and extract links
        const parser = new DOMParser();
        const dom = parser.parseFromString(input, 'text/html');

        // Use unified extraction function for all platforms
        const links = extractCitations(dom);
        const converted = links.join('##NEWLINE##');
        setOutput(converted);
      } catch (error) {
        console.error('Conversion error:', error);
        setOutput('');
      }
    } else {
      setOutput('');
    }
  }, [input]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Citations to Links</h1>
        <p className="page-description">Extract citations and sources from HTML and convert to markdown links</p>
      </div>

      <div className="page-content">
        <div className="editor-wrapper">
          <div className="input-section">
            <label htmlFor="citations-input" className="input-label">
              Input HTML (Citations/Sources)
            </label>
            <textarea
              id="citations-input"
              className="textarea"
              placeholder="Paste your HTML containing citations and source links here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
            />
          </div>

          <div className="output-section">
            <label htmlFor="citations-output" className="output-label">
              Output Markdown Links
            </label>
            <textarea
              id="citations-output"
              className="textarea textarea-readonly"
              value={output}
              readOnly
              rows={12}
            />
            {output && (
              <button 
                className={`btn btn-secondary ${copied ? 'btn-success' : ''}`} 
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : 'Copy Output'}
              </button>
            )}
          </div>
        </div>

        {output && (
          <StatsDisplay originalSize={input.length} convertedSize={output.length} />
        )}

        <div className="button-group">
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={!input && !output}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CitationsToLinksPage;
