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

## HTML/CSS Basics for Development

### Linking Files in HTML
```html path=null start=null
<!DOCTYPE html>
<html>
<head>
    <!-- Link CSS file -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Link Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Your HTML content here -->
    
    <!-- Link JavaScript file (at end of body) -->
    <script src="js/script.js"></script>
</body>
</html>
```

### HTML Shortcuts in VS Code
- **`! + Tab`**: Creates basic HTML5 boilerplate
- **`div.container + Tab`**: Creates `<div class="container"></div>`
- **`div#main + Tab`**: Creates `<div id="main"></div>`
- **`ul>li*3 + Tab`**: Creates unordered list with 3 list items
- **`a[href="#"] + Tab`**: Creates link with href attribute
- **`img[src alt] + Tab`**: Creates image tag with src and alt attributes

### CSS Class and ID Targeting
```css path=null start=null
/* Target HTML classes with a dot (.) */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

/* Target HTML IDs with a hash (#) */
#themeToggle {
    border: none;
    background: transparent;
}

#htmlEditor {
    width: 100%;
    height: 200px;
}

/* Target HTML elements directly */
body {
    font-family: Inter, sans-serif;
}

h1, h2, h3 {
    font-weight: 600;
}

/* Combine selectors */
.nav-links a {
    text-decoration: none;
    padding: 0.5rem;
}

.nav-links a:hover {
    background-color: #f0f0f0;
}
```

### CSS Shortcuts in VS Code
- **`m10 + Tab`**: `margin: 10px;`
- **`p20 + Tab`**: `padding: 20px;`
- **`w100 + Tab`**: `width: 100px;`
- **`h50 + Tab`**: `height: 50px;`
- **`bgc + Tab`**: `background-color: ;`
- **`c + Tab`**: `color: ;`
- **`df + Tab`**: `display: flex;`
- **`dg + Tab`**: `display: grid;`
- **`tac + Tab`**: `text-align: center;`
- **`fz16 + Tab`**: `font-size: 16px;`

### File Organization Best Practices
```
📁 Project Structure:
├── index.html          (Always your main page)
├── 📁 css/
│   └── style.css       (Main stylesheet)
├── 📁 js/
│   └── script.js       (Main JavaScript file)
├── 📁 img/
│   └── (your images)   (.jpg, .png, .svg files)
└── 📁 pages/           (Additional HTML pages)
    ├── about.html
    └── contact.html
```

### Common HTML Structure Patterns
```html path=null start=null
<!-- Navigation Bar -->
<header>
    <nav>
        <div class="nav-brand">
            <h2>Site Name</h2>
        </div>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
        </div>
    </nav>
</header>

<!-- Main Content -->
<main>
    <section class="hero">
        <h1>Page Title</h1>
        <p>Description text</p>
    </section>
    
    <section class="content">
        <div class="container">
            <!-- Your content here -->
        </div>
    </section>
</main>

<!-- Footer -->
<footer>
    <div class="container">
        <p>&copy; 2025 Your Site</p>
    </div>
</footer>
```

### CSS Custom Properties (Variables) Basics
```css path=css/style.css start=2
/* Define variables in :root */
:root {
    --main-color: #3498db;
    --text-color: #333;
    --spacing: 1rem;
}

/* Use variables with var() */
.button {
    background-color: var(--main-color);
    color: var(--text-color);
    padding: var(--spacing);
}

/* Override variables for dark theme */
.dark {
    --text-color: #fff;
    --main-color: #5dade2;
}
```

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

## Beginner Tips & Common Mistakes

### HTML Common Mistakes to Avoid
```html path=null start=null
<!-- ❌ Wrong: Missing closing tags -->
<div>
    <p>Some text
    <span>More text
</div>

<!-- ✅ Correct: Properly closed tags -->
<div>
    <p>Some text</p>
    <span>More text</span>
</div>

<!-- ❌ Wrong: Self-closing tags with content -->
<img>Some text</img>
<br>Line break</br>

<!-- ✅ Correct: Self-closing tags -->
<img src="image.jpg" alt="Description">
<br>

<!-- ❌ Wrong: Missing quotes on attributes -->
<div class=container id=main>

<!-- ✅ Correct: Quoted attributes -->
<div class="container" id="main">
```

### CSS Common Mistakes to Avoid
```css path=null start=null
/* ❌ Wrong: Missing semicolons */
.container {
    width: 100px
    height: 50px
    margin: 10px
}

/* ✅ Correct: All semicolons present */
.container {
    width: 100px;
    height: 50px;
    margin: 10px;
}

/* ❌ Wrong: Forgetting the dot for classes */
container {
    width: 100%;
}

/* ✅ Correct: Dot for classes, hash for IDs */
.container {
    width: 100%;
}

#header {
    background: blue;
}

/* ❌ Wrong: Missing units */
.box {
    width: 100;
    margin: 10;
}

/* ✅ Correct: Include units (px, %, rem, em) */
.box {
    width: 100px;
    margin: 10px;
}
```

### File Path Common Issues
```html path=null start=null
<!-- ❌ Wrong: Absolute paths that won't work on other computers -->
<link rel="stylesheet" href="C:/Users/YourName/Desktop/project/css/style.css">

<!-- ✅ Correct: Relative paths -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="../css/style.css"> <!-- Go up one folder -->

<!-- ❌ Wrong: Missing file extensions -->
<script src="js/script"></script>
<img src="images/logo" alt="Logo">

<!-- ✅ Correct: Include file extensions -->
<script src="js/script.js"></script>
<img src="images/logo.png" alt="Logo">
```

### Quick Debugging Tips
1. **HTML Issues**: Use browser Developer Tools (F12) → Elements tab
2. **CSS Issues**: Use Developer Tools → Styles panel to see which CSS rules apply
3. **JavaScript Issues**: Check Console tab (F12) for error messages
4. **File Loading Issues**: Check Network tab (F12) to see if files are loading

### VS Code Extensions for Web Development
- **Live Server**: Auto-refresh browser when you save files
- **Auto Rename Tag**: Automatically renames paired HTML tags
- **Prettier**: Formats your code automatically
- **Emmet**: Built-in shortcuts for HTML/CSS (already included)
- **Color Highlight**: Shows actual colors in your CSS

### Browser Developer Tools Shortcuts
- **F12**: Open/close developer tools
- **Ctrl + Shift + C**: Inspect element
- **Ctrl + Shift + I**: Open developer tools
- **Ctrl + Shift + M**: Toggle device simulation (mobile view)
- **Ctrl + F5**: Hard refresh (ignores cache)

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