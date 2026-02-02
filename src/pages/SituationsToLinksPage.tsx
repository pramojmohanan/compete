import { useState } from 'react';
import StatsDisplay from '../components/StatsDisplay';
import '../styles/pages.css';

interface SituationsToLinksPageProps {
  appName: string;
}

function SituationsToLinksPage({ appName }: SituationsToLinksPageProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      // Parse HTML and extract links
      const parser = new DOMParser();
      const dom = parser.parseFromString(input, 'text/html');

      // Extract all <a> elements
      const anchors = dom.querySelectorAll('a');

      // Collect titles and links
      const links: string[] = [];
      anchors.forEach((a) => {
        const href = a.getAttribute('href') || '';
        // Try to get title from div:nth-of-type(2), fallback to textContent
        const titleDiv = a.querySelector('div:nth-of-type(2)');
        const title = titleDiv
          ? titleDiv.textContent?.replace(/\n/g, '').replace(/\t/g, '').trim() || 'No Title'
          : a.textContent?.trim() || 'No Title';

        if (href) {
          links.push(`[${title}](${href})`);
        }
      });

      const converted = links.join('\n');
      setOutput(converted);
    } catch (error) {
      console.error('Conversion error:', error);
      setOutput('Error: Failed to parse HTML. Please ensure valid HTML format.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Situations to Links</h1>
        <p className="page-description">Convert situations or descriptions to links using {appName}</p>
      </div>

      <div className="page-content">
        <div className="input-section">
          <label htmlFor="situations-input" className="input-label">
            Input Situations/Descriptions
          </label>
          <textarea
            id="situations-input"
            className="textarea"
            placeholder="Enter situations or descriptions (one per line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleConvert}
            disabled={!input || isLoading}
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={!input && !output}
          >
            Clear
          </button>
        </div>

        {output && (
          <div className="output-section">
            <label htmlFor="situations-output" className="output-label">
              Output Links
            </label>
            <textarea
              id="situations-output"
              className="textarea textarea-readonly"
              value={output}
              readOnly
              rows={4}
            />
            <button className="btn btn-secondary" onClick={handleCopy}>
              Copy Output
            </button>
            <StatsDisplay originalSize={input.length} convertedSize={output.length} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SituationsToLinksPage;
