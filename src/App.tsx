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

          {/* Platform-Specific Routes - Only Unbranding Script (hidden names in URLs) */}
          <Route path="/unbranding-script-cpp" element={<UnbrandingScriptPage appName="copilot" code="cpp" />} />
          <Route path="/unbranding-script-cgp" element={<UnbrandingScriptPage appName="chatgpt" code="cgp" />} />
          <Route path="/unbranding-script-gp" element={<UnbrandingScriptPage appName="gemini" code="gp" />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/text-to-single-line" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
