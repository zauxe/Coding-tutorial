// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    setTheme(theme) {
        this.body.className = theme;
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update toggle button
        if (this.themeToggle) {
            this.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            this.themeToggle.setAttribute('aria-label', 
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation class for smooth transition
        this.themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }
}

// ===== PAGE ANIMATIONS =====
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupPageTransition();
        this.setupScrollAnimations();
        this.setupSmoothScroll();
    }
    
    setupPageTransition() {
        // Page entrance animation
        window.addEventListener('load', () => {
            const page = document.querySelector('.page');
            if (page) {
                page.style.opacity = '1';
                page.style.transform = 'translateY(0)';
            }
        });
    }
    
    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.content-block, .topic-card, .feature, .tag-example, .selector-example, .property-category'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== HTML DEMO FUNCTIONALITY =====
class HTMLDemo {
    constructor() {
        this.editor = document.getElementById('htmlEditor');
        this.preview = document.getElementById('htmlPreview');
        this.runButton = document.getElementById('runHTML');
        
        this.init();
    }
    
    init() {
        if (!this.editor || !this.preview || !this.runButton) return;
        
        this.runButton.addEventListener('click', () => this.updatePreview());
        
        // Auto-update on typing (with debounce)
        let debounceTimer;
        this.editor.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.updatePreview(), 500);
        });
        
        // Initial preview
        this.updatePreview();
    }
    
    updatePreview() {
        try {
            const htmlContent = this.editor.value;
            const doc = this.preview.contentDocument || this.preview.contentWindow.document;
            
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 10px; }
                        * { box-sizing: border-box; }
                    </style>
                </head>
                <body>
                    ${htmlContent}
                </body>
                </html>
            `);
            doc.close();
            
            // Add success feedback
            this.showFeedback('✅ Preview updated!', 'success');
        } catch (error) {
            this.showFeedback('❌ Error in HTML code', 'error');
            console.error('HTML Preview Error:', error);
        }
    }
    
    showFeedback(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.html-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `html-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            top: -30px;
            right: 0;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        this.runButton.style.position = 'relative';
        this.runButton.appendChild(feedback);
        
        // Show and hide feedback
        setTimeout(() => feedback.style.opacity = '1', 10);
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
}

// ===== CSS COLOR DEMO =====
class ColorDemo {
    constructor() {
        this.bgColorInput = document.getElementById('bgColor');
        this.textColorInput = document.getElementById('textColor');
        this.borderColorInput = document.getElementById('borderColor');
        this.colorBox = document.getElementById('colorBox');
        this.cssOutput = document.getElementById('cssOutput');
        
        this.init();
    }
    
    init() {
        if (!this.bgColorInput || !this.textColorInput || !this.borderColorInput || 
            !this.colorBox || !this.cssOutput) return;
        
        // Add event listeners
        this.bgColorInput.addEventListener('input', () => this.updateColors());
        this.textColorInput.addEventListener('input', () => this.updateColors());
        this.borderColorInput.addEventListener('input', () => this.updateColors());
        
        // Initial update
        this.updateColors();
    }
    
    updateColors() {
        const bgColor = this.bgColorInput.value;
        const textColor = this.textColorInput.value;
        const borderColor = this.borderColorInput.value;
        
        // Update the demo box
        this.colorBox.style.backgroundColor = bgColor;
        this.colorBox.style.color = textColor;
        this.colorBox.style.borderColor = borderColor;
        
        // Update CSS output
        this.cssOutput.innerHTML = `<code>.demo-box {
    background-color: ${bgColor};
    color: ${textColor};
    border: 3px solid ${borderColor};
}</code>`;
        
        // Add a subtle animation
        this.colorBox.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.colorBox.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== JAVASCRIPT CONSOLE DEMO =====
class JavaScriptConsole {
    constructor() {
        this.consoleInput = document.getElementById('consoleInput');
        this.consoleOutput = document.getElementById('consoleOutput');
        this.runButton = document.getElementById('runConsole');
        this.clearButton = document.getElementById('clearConsole');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.init();
    }
    
    init() {
        if (!this.consoleInput || !this.consoleOutput || !this.runButton || !this.clearButton) return;
        
        this.runButton.addEventListener('click', () => this.executeCode());
        this.clearButton.addEventListener('click', () => this.clearConsole());
        
        // Enter key to execute
        this.consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.executeCode();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
    }
    
    executeCode() {
        const code = this.consoleInput.value.trim();
        if (!code) return;
        
        // Add to history
        this.commandHistory.push(code);
        this.historyIndex = this.commandHistory.length;
        
        // Display input
        this.addToConsole(`> ${code}`, 'input');
        
        try {
            // Create a safe evaluation context
            const result = this.safeEval(code);
            this.addToConsole(this.formatResult(result), 'output');
        } catch (error) {
            this.addToConsole(`Error: ${error.message}`, 'error');
        }
        
        // Clear input
        this.consoleInput.value = '';
        this.scrollToBottom();
    }
    
    safeEval(code) {
        // Simple safe evaluation for basic JavaScript expressions
        // This is not completely secure but good for educational purposes
        
        // Whitelist of allowed operations
        const allowedPattern = /^[\d\s+\-*/().'"a-zA-Z_$,[\]{}:;!=<>&|?]+$/;
        
        if (!allowedPattern.test(code)) {
            throw new Error('Code contains disallowed characters');
        }
        
        // Prevent access to dangerous functions
        const dangerousKeywords = ['eval', 'function', 'Function', 'setTimeout', 'setInterval', 'fetch', 'XMLHttpRequest'];
        if (dangerousKeywords.some(keyword => code.includes(keyword))) {
            throw new Error('Potentially dangerous code detected');
        }
        
        // Use Function constructor for evaluation (safer than eval)
        return new Function('return (' + code + ')')();
    }
    
    formatResult(result) {
        if (result === null) return 'null';
        if (result === undefined) return 'undefined';
        if (typeof result === 'string') return `"${result}"`;
        if (typeof result === 'object') {
            try {
                return JSON.stringify(result, null, 2);
            } catch {
                return '[Object object]';
            }
        }
        return String(result);
    }
    
    addToConsole(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `console-line console-${type}`;
        line.textContent = text;
        
        // Add colors based on type
        switch (type) {
            case 'input':
                line.style.color = '#ffffff';
                break;
            case 'error':
                line.style.color = '#ff6b6b';
                break;
            case 'output':
                line.style.color = '#00ff00';
                break;
        }
        
        this.consoleOutput.appendChild(line);
        
        // Limit console lines (keep last 50)
        const lines = this.consoleOutput.children;
        if (lines.length > 50) {
            lines[0].remove();
        }
    }
    
    clearConsole() {
        this.consoleOutput.innerHTML = `
            <div class="console-line">Console cleared!</div>
            <div class="console-line">Try typing: 5 + 3</div>
            <div class="console-line">Or: "Hello " + "World"</div>
        `;
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.consoleInput.value = '';
            return;
        }
        
        this.consoleInput.value = this.commandHistory[this.historyIndex];
        this.consoleInput.setSelectionRange(this.consoleInput.value.length, this.consoleInput.value.length);
    }
    
    scrollToBottom() {
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
    }
}

// ===== BUTTON COUNTER DEMO =====
class ButtonCounterDemo {
    constructor() {
        this.countElement = document.getElementById('clickCount');
        this.incrementBtn = document.getElementById('incrementBtn');
        this.decrementBtn = document.getElementById('decrementBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.colorBox = document.getElementById('colorBox');
        
        this.count = 0;
        this.colors = ['#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6', '#1abc9c'];
        
        this.init();
    }
    
    init() {
        if (!this.countElement || !this.incrementBtn || !this.decrementBtn || !this.resetBtn) return;
        
        this.incrementBtn.addEventListener('click', () => this.increment());
        this.decrementBtn.addEventListener('click', () => this.decrement());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.updateDisplay();
    }
    
    increment() {
        this.count++;
        this.updateDisplay();
        this.animateButton(this.incrementBtn);
        this.changeColor();
    }
    
    decrement() {
        this.count--;
        this.updateDisplay();
        this.animateButton(this.decrementBtn);
        this.changeColor();
    }
    
    reset() {
        this.count = 0;
        this.updateDisplay();
        this.animateButton(this.resetBtn);
        if (this.colorBox) {
            this.colorBox.style.backgroundColor = this.colors[0];
        }
    }
    
    updateDisplay() {
        this.countElement.textContent = this.count;
        
        // Add animation to counter
        this.countElement.style.transform = 'scale(1.2)';
        this.countElement.style.color = this.count >= 0 ? '#27ae60' : '#e74c3c';
        
        setTimeout(() => {
            this.countElement.style.transform = 'scale(1)';
        }, 150);
    }
    
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }
    
    changeColor() {
        if (!this.colorBox) return;
        
        const colorIndex = Math.abs(this.count) % this.colors.length;
        this.colorBox.style.backgroundColor = this.colors[colorIndex];
        
        // Add bounce animation
        this.colorBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.colorBox.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== CHECKLIST FUNCTIONALITY =====
class ChecklistManager {
    constructor() {
        this.checklists = document.querySelectorAll('.checklist');
        this.init();
    }
    
    init() {
        this.checklists.forEach(checklist => {
            const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                // Load saved state
                const savedState = localStorage.getItem(checkbox.id);
                if (savedState === 'true') {
                    checkbox.checked = true;
                }
                
                // Add change listener
                checkbox.addEventListener('change', (e) => {
                    this.handleCheckboxChange(e.target);
                });
            });
        });
    }
    
    handleCheckboxChange(checkbox) {
        // Save state
        localStorage.setItem(checkbox.id, checkbox.checked);
        
        // Add visual feedback
        const listItem = checkbox.closest('.checklist-item');
        if (checkbox.checked) {
            listItem.style.background = 'linear-gradient(90deg, rgba(39, 174, 96, 0.1), transparent)';
            listItem.style.borderLeft = '3px solid #27ae60';
            
            // Add checkmark animation
            setTimeout(() => {
                listItem.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    listItem.style.transform = '';
                }, 200);
            }, 100);
        } else {
            listItem.style.background = '';
            listItem.style.borderLeft = '';
        }
        
        // Check if all items in checklist are completed
        this.checkCompletionStatus(checkbox.closest('.checklist'));
    }
    
    checkCompletionStatus(checklist) {
        const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
        const completed = checklist.querySelectorAll('input[type="checkbox"]:checked');
        
        if (completed.length === checkboxes.length && checkboxes.length > 0) {
            this.showCompletionMessage(checklist);
        }
    }
    
    showCompletionMessage(checklist) {
        // Remove existing message
        const existingMessage = checklist.querySelector('.completion-message');
        if (existingMessage) return; // Already shown
        
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = '🎉 Great job! You\'ve completed this section!';
        message.style.cssText = `
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-top: 15px;
            font-weight: 600;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        `;
        
        checklist.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===== UTILITY FUNCTIONS =====
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    static getRandomColor() {
        const colors = ['#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6', '#1abc9c', '#34495e', '#95a5a6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    static animate(element, properties, duration = 300) {
        const start = performance.now();
        const initialStyles = {};
        
        // Get initial values
        Object.keys(properties).forEach(prop => {
            initialStyles[prop] = getComputedStyle(element)[prop];
        });
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            Object.keys(properties).forEach(prop => {
                const initial = parseFloat(initialStyles[prop]) || 0;
                const target = parseFloat(properties[prop]);
                const current = initial + (target - initial) * easeOut;
                element.style[prop] = current + (prop.includes('translate') ? 'px' : '');
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// ===== EASTER EGGS =====
class EasterEggs {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.userInput = [];
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            this.userInput.push(e.code);
            
            // Keep only the last 10 keys
            if (this.userInput.length > 10) {
                this.userInput.shift();
            }
            
            // Check if konami code was entered
            if (this.userInput.join('') === this.konamiCode.join('')) {
                this.activateKonamiCode();
                this.userInput = [];
            }
        });
        
        // Double-click logo easter egg
        const logo = document.querySelector('.nav-brand h2');
        if (logo) {
            logo.addEventListener('dblclick', () => {
                this.logoAnimation();
            });
        }
    }
    
    activateKonamiCode() {
        // Create rainbow effect
        document.body.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 2s ease infinite';
        
        // Add CSS for gradient animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = '🎉 Konami Code Activated! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 24px;
            font-weight: bold;
            z-index: 9999;
            animation: bounce 0.5s ease infinite alternate;
        `;
        
        document.body.appendChild(message);
        
        // Remove after 3 seconds
        setTimeout(() => {
            message.remove();
            document.body.style.background = '';
            document.body.style.animation = '';
            style.remove();
        }, 3000);
    }
    
    logoAnimation() {
        const logo = document.querySelector('.nav-brand h2');
        logo.style.animation = 'spin 1s ease-in-out';
        
        setTimeout(() => {
            logo.style.animation = '';
        }, 1000);
        
        // Add spin keyframes if not exist
        if (!document.querySelector('#spin-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spin-keyframes';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== MAIN APPLICATION =====
class CodeLearnApp {
    constructor() {
        this.components = [];
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize all components
        this.components = [
            new ThemeManager(),
            new AnimationManager(),
            new HTMLDemo(),
            new ColorDemo(),
            new JavaScriptConsole(),
            new ButtonCounterDemo(),
            new ChecklistManager(),
            new EasterEggs()
        ];
        
        // Add global event listeners
        this.setupGlobalListeners();
        
        console.log('🚀 CodeLearn App initialized successfully!');
    }
    
    setupGlobalListeners() {
        // Handle theme changes
        document.addEventListener('themeChanged', (e) => {
            console.log(`Theme changed to: ${e.detail.theme}`);
        });
        
        // Handle visibility change (for performance)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden, reduce animations
                document.body.style.animationPlayState = 'paused';
            } else {
                // Page is visible, resume animations
                document.body.style.animationPlayState = 'running';
            }
        });
        
        // Handle errors gracefully
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// ===== INITIALIZE APPLICATION =====
// Start the application when script loads
const app = new CodeLearnApp();