import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TextToSingleLinePage from './pages/TextToSingleLinePage';
import HtmlToSingleLinePage from './pages/HtmlToSingleLinePage';
import CitationsToLinksPage from './pages/CitationsToLinksPage';
import UnbrandingScriptPage from './pages/UnbrandingScriptPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Shared Routes - Same for all platforms */}
          <Route path="/text-to-single-line" element={<TextToSingleLinePage appName="Tool" />} />
          <Route path="/html-to-single-line" element={<HtmlToSingleLinePage appName="Tool" />} />
          <Route path="/citations-to-links" element={<CitationsToLinksPage appName="Tool" />} />

          {/* Platform-Specific Routes - Only Unbranding Script */}
          <Route path="/copilot/unbranding-script" element={<UnbrandingScriptPage appName="Copilot" />} />
          <Route path="/gemini/unbranding-script" element={<UnbrandingScriptPage appName="Gemini" />} />
          <Route path="/chatgpt/unbranding-script" element={<UnbrandingScriptPage appName="ChatGPT" />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/text-to-single-line" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
