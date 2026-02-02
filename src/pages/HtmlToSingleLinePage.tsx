import { useState, useEffect } from 'react';
import StatsDisplay from '../components/StatsDisplay';
import '../styles/pages.css';

interface HtmlToSingleLinePageProps {
  appName: string;
}

function HtmlToSingleLinePage({ appName }: HtmlToSingleLinePageProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removeComments, setRemoveComments] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [minifyAttributes, setMinifyAttributes] = useState(true);

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  // Auto-convert when input or options change
  useEffect(() => {
    if (input) {
      let result = input;

      // Remove HTML comments
      if (removeComments) {
        result = result.replace(/<!--[\s\S]*?-->/g, '');
      }

      // Remove newlines and tabs
      result = result.replace(/[\r\n\t]/g, ' ');

      // Remove extra spaces
      if (removeExtraSpaces) {
        // Remove spaces between tags
        result = result.replace(/>\s+</g, '><');

        // Remove multiple spaces
        result = result.replace(/\s{2,}/g, ' ');

        // Trim spaces around equals in attributes
        if (minifyAttributes) {
          result = result.replace(/\s*=\s*/g, '=');
        }
      }

      // Trim the result
      result = result.trim();
      setOutput(result);
    } else {
      setOutput('');
    }
  }, [input, removeComments, removeExtraSpaces, minifyAttributes]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">HTML to Single Line</h1>
        <p className="page-description">Convert multi-line HTML to a single line using {appName}</p>
      </div>

      <div className="page-content">
        <div className="options-group">
          <label className="option-item">
            <input
              type="checkbox"
              checked={removeComments}
              onChange={(e) => setRemoveComments(e.target.checked)}
            />
            <span>Remove Comments</span>
          </label>
          <label className="option-item">
            <input
              type="checkbox"
              checked={removeExtraSpaces}
              onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
            />
            <span>Remove Extra Spaces</span>
          </label>
          <label className="option-item">
            <input
              type="checkbox"
              checked={minifyAttributes}
              onChange={(e) => setMinifyAttributes(e.target.checked)}
            />
            <span>Minify Attributes</span>
          </label>
        </div>

        <div className="editor-wrapper">
          <div className="input-section">
            <label htmlFor="html-input" className="input-label">
              Input HTML
            </label>
            <textarea
              id="html-input"
              className="textarea"
              placeholder="Enter your HTML here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
            />
          </div>

          <div className="output-section">
            <label htmlFor="html-output" className="output-label">
              Output HTML
            </label>
            <textarea
              id="html-output"
              className="textarea textarea-readonly"
              value={output}
              readOnly
              rows={12}
            />
            {output && (
              <button className="btn btn-secondary" onClick={handleCopy}>
                Copy Output
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

export default HtmlToSingleLinePage;
