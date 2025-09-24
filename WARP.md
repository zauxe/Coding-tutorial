# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

CodeLearn is an interactive web development tutorial platform built with vanilla HTML, CSS, and JavaScript. It features live code editors, theme switching, and animated educational content.

## Quick Start Commands

### Local Development
```pwsh
# Option 1: Using VS Code Live Server Extension (Recommended)
# Right-click index.html → "Open with Live Server"

# Option 2: Using Python HTTP Server
python -m http.server 8000

# Option 3: Using Node.js http-server
npx http-server -p 8000
```

### Open the site
- Navigate to `http://localhost:8000` in your browser
- Start with `index.html` for the main landing page

### Testing Interactive Features
- Visit `html.html` to test the HTML live editor
- Visit `css.html` to test the color picker demo
- Visit `javascript.html` to test the JavaScript console

## Architecture Overview

### Project Structure
```
CodingTutorialSite/
├── index.html          # Landing page
├── html.html           # HTML tutorial with live editor
├── css.html            # CSS tutorial with color picker
├── javascript.html     # JavaScript tutorial with console
├── css/
│   └── style.css       # Main stylesheet with CSS custom properties
├── js/
│   └── script.js       # Modular JavaScript components
└── img/                # Assets directory
```

### CSS Architecture
- **Theme System**: Uses CSS custom properties (`:root` for light, `.dark` for dark theme)
- **Component-based**: BEM-like naming with CSS variables for consistent theming
- **Responsive**: Mobile-first design with CSS Grid and Flexbox
- **Animations**: CSS transitions with JavaScript triggers for smooth interactions

### JavaScript Architecture
The application uses a class-based component system:

#### Core Components (in `js/script.js`):
- **`CodeLearnApp`**: Main application orchestrator, initializes all components
- **`ThemeManager`**: Handles light/dark theme switching with localStorage persistence
- **`AnimationManager`**: Controls scroll animations and page transitions using IntersectionObserver
- **`HTMLDemo`**: Live HTML editor with iframe preview
- **`ColorDemo`**: Interactive CSS color picker
- **`JavaScriptConsole`**: Safe JavaScript code evaluation with command history
- **`ChecklistManager`**: Progress tracking with localStorage persistence
- **`EasterEggs`**: Fun interactions (Konami code, logo animations)

#### Key Patterns:
- Event-driven architecture with custom events
- Local storage for user preferences and progress
- Safe code execution using Function constructor (not `eval`)
- Error boundaries with graceful degradation

## Key Features

### Interactive Demos
- **HTML Live Editor**: Real-time HTML preview in sandboxed iframe
- **CSS Color Picker**: Live color manipulation with generated CSS output
- **JavaScript Console**: Safe code execution environment with syntax validation
- **Progress Checklists**: Persistent completion tracking per tutorial section

### Theme System
- Toggle between light/dark modes (stored in localStorage)
- CSS custom properties cascade: `:root` (light) → `.dark` (dark overrides)
- Smooth theme transitions with animation support
- Theme-aware components automatically adapt

### Performance Features
- IntersectionObserver for efficient scroll animations
- Debounced input handling in interactive demos
- Animation pause/resume based on page visibility
- Lazy loading of non-critical animations

## Development Notes

### Adding New Interactive Components
1. Create new class in `js/script.js` following existing patterns
2. Initialize in `CodeLearnApp.initializeComponents()` array
3. Use consistent error handling and localStorage APIs
4. Follow the component lifecycle: `constructor()` → `init()` → event listeners

### Theming New Elements
- Use CSS custom properties from `:root` and `.dark` declarations
- Follow existing color variable naming: `--bg-primary`, `--text-primary`, `--accent-primary`
- Test both light and dark themes
- Add smooth transitions: `transition: background-color var(--transition-normal), color var(--transition-normal)`

### Safe Code Execution Pattern (for demos)
```javascript path=/js/script.js start=321
safeEval(code) {
    // Whitelist allowed characters
    const allowedPattern = /^[\d\s+\-*/().'\"a-zA-Z_$,[\]{}:;!=<>&|?]+$/;
    if (!allowedPattern.test(code)) {
        throw new Error('Code contains disallowed characters');
    }
    
    // Block dangerous functions
    const dangerousKeywords = ['eval', 'function', 'Function', 'setTimeout'];
    if (dangerousKeywords.some(keyword => code.includes(keyword))) {
        throw new Error('Potentially dangerous code detected');
    }
    
    return new Function('return (' + code + ')')();
}
```

## Deployment

### Static Hosting (No Build Process Required)
- **GitHub Pages**: Push to main branch, enable Pages in repo settings
- **Netlify**: Drag-and-drop entire folder or connect Git repository
- **Vercel**: Use `vercel` CLI or connect GitHub repo

### Testing Before Deployment
1. Serve locally using one of the commands above
2. Test all interactive features on each tutorial page
3. Verify theme switching works correctly
4. Check responsive design on different screen sizes
5. Test browser compatibility (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)

## Troubleshooting

### Interactive Demos Not Working
- Check browser console for JavaScript errors
- Verify all element IDs match between HTML and JavaScript
- Ensure localStorage is enabled in browser
- Test with JavaScript enabled

### Styling Issues
- Clear browser cache (Ctrl+F5)
- Verify CSS custom properties are supported
- Check for CSS syntax errors in developer tools
- Ensure proper theme class is applied to `<body>`

### Performance Issues
- Check if animations are causing frame drops
- Verify IntersectionObserver is working for scroll animations
- Monitor memory usage for potential memory leaks in demos