# AI Tools Conversion App

A React + React Router DOM application that provides text conversion tools across three AI platforms (Copilot, Gemini, ChatGPT). Each platform offers three conversion utilities for processing text, HTML, and extracting citations.

## Project Overview

This is a multi-section application with a fixed sidebar navigation that routes users to different conversion tools. Users can paste content and convert it to single-line format or extract markdown links from HTML citations.

## Features

### 1. **Text to Single Line**
- Converts multi-line text into single-line format
- Replaces tabs with `##TAB##` marker
- Replaces newlines with `##NEWLINE##` marker
- Removes carriage returns
- Shows character reduction statistics

### 2. **HTML to Single Line**
- Minifies HTML by removing unnecessary whitespace and newlines
- **Optional Features** (checkboxes):
  - Remove HTML comments
  - Remove extra spaces between tags
  - Minify attributes (compress spacing around `=`)
- Auto-converts when options change
- Displays size reduction metrics

### 3. **Citations to Links**
- Parses HTML and extracts all `<a>` (anchor) elements
- Converts to Markdown link format: `[title](href)`
- Attempts to extract title from nested `div:nth-of-type(2)` elements
- Falls back to link text if nested div not found
- Graceful error handling for malformed HTML

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main layout wrapper with sidebar + content area
│   ├── Layout.css
│   ├── Sidebar.tsx             # Fixed left navigation with app and tool links
│   ├── Sidebar.css
│   ├── StatsDisplay.tsx        # Reusable stats component (char count, reduction %)
│
├── pages/
│   ├── TextToSingleLinePage.tsx      # Text conversion tool
│   ├── HtmlToSingleLinePage.tsx      # HTML minification tool
│   ├── CitationsToLinksPage.tsx      # HTML citations to markdown links
│
├── styles/
│   ├── pages.css               # Shared styles for all page components
│   ├── stats.css               # Stats display component styles
│
├── App.tsx                     # Main app with React Router setup
├── App.css
├── main.tsx                    # React entry point
├── index.css

Configuration Files:
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── .gitignore
```

## Routing Structure

### Routes Format
All routes follow the pattern: `/:appName/:toolName`

### Available Routes

#### Copilot Routes
- `/copilot/text-to-single-line`
- `/copilot/html-to-single-line`
- `/copilot/citations-to-links`

#### Gemini Routes
- `/gemini/text-to-single-line`
- `/gemini/html-to-single-line`
- `/gemini/citations-to-links`

#### ChatGPT Routes
- `/chatgpt/text-to-single-line`
- `/chatgpt/html-to-single-line`
- `/chatgpt/citations-to-links`

**Default Route**: `/` redirects to `/copilot/text-to-single-line`

## Component Breakdown

### Layout Component (`src/components/Layout.tsx`)
- Wraps the entire application
- Contains the fixed Sidebar and main content area
- Uses React Router's `<Outlet />` to render page content

### Sidebar Component (`src/components/Sidebar.tsx`)
- Fixed left navigation (250px wide)
- Displays three app sections: Copilot, Gemini, ChatGPT
- Each section shows three tool links
- Active section/link highlighted with styling
- Responsive design (adjusts for mobile)

### Page Components

#### TextToSingleLinePage (`src/pages/TextToSingleLinePage.tsx`)
- Props: `appName` (string) - identifies which AI platform (Copilot/Gemini/ChatGPT)
- State:
  - `input`: user's multiline text
  - `output`: converted single-line text (auto-updates as user types)
- Functions:
  - `handleClear()`: Clears input and output
  - `handleCopy()`: Copies output to clipboard
- Hooks:
  - `useEffect()`: Auto-converts input to output in real-time

**Conversion Logic:**
```
1. Replace all tabs with ##TAB##
2. Replace all newlines with ##NEWLINE##
3. Remove carriage returns
4. Trim whitespace
- Triggers automatically when input changes
```

#### HtmlToSingleLinePage (`src/pages/HtmlToSingleLinePage.tsx`)
- Props: `appName` (string)
- State:
  - `input`: user's multi-line HTML
  - `output`: minified HTML (auto-updates as user types)
  - `removeComments`: toggle to remove HTML comments (default: true)
  - `removeExtraSpaces`: toggle to remove extra spaces (default: true)
  - `minifyAttributes`: toggle to minify attribute spacing (default: true)
- Functions:
  - `handleClear()`: Clears input/output
  - `handleCopy()`: Copies output to clipboard
- Hooks:
  - `useEffect()`: Auto-converts input to output when input or options change

**Conversion Logic:**
```
1. Optionally remove HTML comments (<!--...-->)
2. Remove all newlines, carriage returns, tabs
3. Optionally remove spaces between tags (> <)
4. Optionally remove multiple consecutive spaces
5. Optionally minify attributes (remove spaces around =)
6. Trim result
- Updates automatically when input changes or options are toggled
```

#### CitationsToLinksPage (`src/pages/CitationsToLinksPage.tsx`)
- Props: `appName` (string)
- State:
  - `input`: user's HTML containing citation links
  - `output`: markdown-formatted links (auto-updates as user types)
- Functions:
  - `handleClear()`: Clears input/output
  - `handleCopy()`: Copies output to clipboard
- Hooks:
  - `useEffect()`: Auto-extracts and formats links when input changes

**Conversion Logic:**
```
1. Parse HTML string using DOMParser API
2. Query all <a> elements
3. For each anchor:
   - Extract href attribute
   - Try to get title from div:nth-of-type(2)
   - Fall back to link text content
   - Format as [title](href)
4. Join all links with newlines
5. Updates automatically when input changes
```

### StatsDisplay Component (`src/components/StatsDisplay.tsx`)
- Props:
  - `originalSize`: number - character count before conversion
  - `convertedSize`: number - character count after conversion
- Displays:
  - Original character count
  - Converted character count
  - Percentage reduction
- Appears below output textarea when conversion is complete

## Technology Stack

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **TypeScript** - Type safety
- **Vite 5.0.8** - Build tool and dev server
- **CSS 3** - Styling (no frameworks, vanilla CSS)

## Styling Approach

- **Color Scheme**: 
  - Sidebar: Dark blue (#2c3e50) with light text
  - Main content: Light gray background (#f5f5f5)
  - Accent: Blue (#3498db)
  - Success: Green (#10b981)

- **Components**:
  - Buttons: Primary (blue) and Secondary (gray) variants
  - Textareas: Custom styling with focus states
  - Options: Checkboxes with labels
  - Stats: Flex-based layout with stat items

- **Responsive Design**: 
  - Breakpoint at 768px for tablet/mobile
  - Sidebar width adjusts
  - Font sizes scale down on mobile
  - Button groups stack vertically on mobile

## How to Run

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Vite dev server on http://localhost:5173

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview
```bash
npm run preview
```
Preview production build locally

## Key Implementation Details

### Input Validation
- Clear button is disabled if both input and output are empty
- All error states are caught and displayed to user

### User Experience
- **Auto-conversion**: Output updates instantly as user types/pastes
- Copy button appears and provides visual feedback
- Copy buttons are individual for each tool section
- Stats automatically update after conversion
- Options in HTML minifier auto-trigger conversion
- Output section always visible (even if empty)
- Textarea grows vertically as needed

### Accessibility
- All inputs have associated `<label>` elements
- Button states clearly indicate disabled/enabled
- Semantic HTML structure
- Focus states on form inputs

### Reusability
- Page components accept `appName` prop to identify which AI platform
- Same conversion logic works across all three platforms
- StatsDisplay component can be reused anywhere
- CSS uses classes (not inline styles) for maintainability

## File Naming Conventions

- **Components**: PascalCase (e.g., `TextToSingleLinePage.tsx`)
- **Styles**: lowercase with hyphens (e.g., `pages.css`)
- **Props Interfaces**: ComponentName + `Props` (e.g., `TextToSingleLinePageProps`)
- **Event Handlers**: `handle` + ActionName (e.g., `handleConvert`)
- **State Variables**: camelCase (e.g., `removeComments`, `isLoading`)

## Default Values

- **Text to Single Line**:
  - No default input
  - Auto-converts as user types
- **HTML to Single Line**:
  - No default input
  - Options default to: all checked (true)
  - Auto-converts as user types or options change
- **Citations to Links**:
  - No default input
  - Auto-converts as user types

## Error Handling

- **CitationsToLinksPage**: Shows user-friendly error message if HTML parsing fails
- All conversions wrapped in try-catch blocks
- Console errors logged for debugging
- Invalid input doesn't crash the app

## Future Enhancement Opportunities

1. Add more conversion options (JSON minification, CSS minification)
2. Add keyboard shortcuts for Convert button
3. Add file upload support
4. Add download as file feature
5. Add conversion history
6. Add theme switching (light/dark mode)
7. Add API integration for actual AI responses
8. Add batch processing for multiple conversions
9. Add syntax highlighting in textareas
10. Add undo/redo functionality

## Notes for Future Developers

- The app uses vanilla CSS (no CSS-in-JS or frameworks)
- All page components follow similar structure for consistency
- The `appName` prop is passed but not used functionally - it's for display in headings/descriptions
- React Router v6 uses nested routes with `<Outlet />`
- State management is local to each page component (no Context API or Redux needed)
- DOMParser is used for HTML parsing (client-side only)
- **Auto-conversion**: All three page components use `useEffect` to convert input in real-time as user types
- Output textareas are always visible (even when empty) for better UX
- Copy buttons appear only when there's output to copy
- Clear button is the only manual action button (no Convert button needed due to auto-conversion)

## Git Configuration

The project includes a `.gitignore` file that excludes:
- `node_modules/`
- `dist/` (build output)
- `.env` files
- IDE-specific files (.vscode, .idea)
- OS-specific files (.DS_Store)

## Package.json Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

---

**Created**: [Current Date]  
**Framework**: React 18 + TypeScript + React Router v6  
**Status**: Complete and functional
