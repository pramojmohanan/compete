import { useState, useEffect } from 'react';
import StatsDisplay from '../components/StatsDisplay';
import '../styles/pages.css';

interface TextToSingleLinePageProps {
  appName: string;
}

function TextToSingleLinePage({ appName }: TextToSingleLinePageProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  // Auto-convert when input changes
  useEffect(() => {
    if (input) {
      const converted = input
        .replace(/\t/g, '##TAB##')
        .replace(/\n/g, '##NEWLINE##')
        .replace(/\r/g, '')
        .trim();
      setOutput(converted);
    } else {
      setOutput('');
    }
  }, [input]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Text to Single Line</h1>
        <p className="page-description">Convert multi-line text to a single line using {appName}</p>
      </div>

      <div className="page-content">
        <div className="editor-wrapper">
          <div className="input-section">
            <label htmlFor="input-textarea" className="input-label">
              Input Text
            </label>
            <textarea
              id="input-textarea"
              className="textarea"
              placeholder="Enter your text here (multiple lines allowed)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
            />
          </div>

          <div className="output-section">
            <label htmlFor="output-textarea" className="output-label">
              Output Text
            </label>
            <textarea
              id="output-textarea"
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

export default TextToSingleLinePage;
