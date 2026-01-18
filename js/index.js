// ================================
// Phone Usage Visualization
// Modern vanilla JavaScript
// ================================

class PhoneVizController {
    constructor() {
        // DOM Elements
        this.modal = document.getElementById('welcomeModal');
        this.modalClose = this.modal.querySelector('.modal-close');
        this.modalCTA = this.modal.querySelector('.cta-button');
        this.modalBackdrop = this.modal.querySelector('.modal-backdrop');

        this.phoneImage = document.getElementById('phoneViz');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.statusBar = document.querySelector('.status-bar');
        this.statusText = document.getElementById('statusText');

        // Stats toggle elements
        this.statsToggle = document.getElementById('statsToggle');
        this.statsContent = document.getElementById('statsContent');

        // State
        this.isPlaying = false;
        this.statsExpanded = false;
        this.currentImageSrc = 'img/avg.png';
        this.gifSrc = 'img/avg.gif';
        this.pngSrc = 'img/avg.png';

        // Preload images for smooth transitions
        this.preloadImages();

        // Initialize event listeners
        this.initEventListeners();
    }

    // ================================
    // Image Preloading
    // ================================

    preloadImages() {
        const imagesToPreload = [
            'img/avg.gif',
            'img/avg.png',
            'img/monday.gif',
            'img/monday.png',
            'img/friday.gif',
            'img/friday.png',
            'img/all.gif',
            'img/real.gif',
            'img/real.png'
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // ================================
    // Event Listeners
    // ================================

    initEventListeners() {
        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalCTA.addEventListener('click', () => this.closeModal());
        this.modalBackdrop.addEventListener('click', () => this.closeModal());

        // Control button events
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.restartBtn.addEventListener('click', () => this.restart());

        // Stats toggle event
        this.statsToggle.addEventListener('click', () => this.toggleStats());

        // Listen for when GIF animation completes (estimate based on typical GIF duration)
        this.phoneImage.addEventListener('load', () => {
            if (this.isPlaying && this.phoneImage.src.endsWith('.gif')) {
                // Typical phone usage GIF is around 10-15 seconds
                // Adjust this timeout based on your actual GIF duration
                setTimeout(() => {
                    if (this.isPlaying) {
                        this.onAnimationComplete();
                    }
                }, 15000); // 15 seconds - adjust as needed
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        // Don't trigger shortcuts if modal is open
        if (this.modal.classList.contains('active')) return;

        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                this.isPlaying ? this.pause() : this.play();
                break;
            case 'r':
                e.preventDefault();
                this.restart();
                break;
            case 'd':
                e.preventDefault();
                this.toggleStats();
                break;
        }
    }

    // ================================
    // Modal Controls
    // ================================

    closeModal() {
        this.modal.classList.remove('active');

        // Add subtle entrance animation to main content
        setTimeout(() => {
            document.querySelector('.container').style.animation = 'fadeInUp 0.6s ease forwards';
        }, 100);
    }

    // ================================
    // Stats Toggle
    // ================================

    toggleStats() {
        this.statsExpanded = !this.statsExpanded;

        if (this.statsExpanded) {
            this.statsContent.classList.add('expanded');
            this.statsToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.statsContent.classList.remove('expanded');
            this.statsToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // ================================
    // Playback Controls
    // ================================

    play() {
        if (this.isPlaying) return;

        this.isPlaying = true;

        // Update UI
        this.phoneImage.src = this.gifSrc;
        this.updateControlButtons();
        this.updateStatus('playing', 'Playing visualization...');

        // Add playing class to status bar
        this.statusBar.classList.add('playing');
        this.statusBar.classList.remove('paused');
    }

    pause() {
        if (!this.isPlaying) return;

        this.isPlaying = false;

        // Update UI - switch back to static image
        this.phoneImage.src = this.pngSrc;
        this.updateControlButtons();
        this.updateStatus('paused', 'Paused');

        // Update status bar
        this.statusBar.classList.add('paused');
        this.statusBar.classList.remove('playing');
    }

    restart() {
        // Reset to beginning
        this.pause();

        // Small delay before restarting to ensure clean reload
        setTimeout(() => {
            this.phoneImage.src = this.pngSrc;
            this.updateStatus('ready', 'Ready to play');
            this.statusBar.classList.remove('playing', 'paused');

            // Optionally auto-play after restart
            setTimeout(() => {
                this.play();
            }, 300);
        }, 100);
    }

    onAnimationComplete() {
        // Called when GIF animation finishes
        this.isPlaying = false;
        this.phoneImage.src = this.pngSrc;
        this.updateControlButtons();
        this.updateStatus('complete', 'Animation complete');
        this.statusBar.classList.remove('playing', 'paused');
    }

    // ================================
    // UI Updates
    // ================================

    updateControlButtons() {
        if (this.isPlaying) {
            // Playing state
            this.playBtn.disabled = true;
            this.playBtn.classList.remove('primary');
            this.pauseBtn.disabled = false;
            this.pauseBtn.classList.add('primary');
        } else {
            // Paused/Stopped state
            this.playBtn.disabled = false;
            this.playBtn.classList.add('primary');
            this.pauseBtn.disabled = true;
            this.pauseBtn.classList.remove('primary');
        }
    }

    updateStatus(state, message) {
        this.statusText.textContent = message;

        // Add brief flash animation
        this.statusText.style.animation = 'none';
        setTimeout(() => {
            this.statusText.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    }
}

// ================================
// Initialize when DOM is ready
// ================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    // Initialize the phone visualization controller
    const vizController = new PhoneVizController();

    // Add fade-in animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Expose to window for debugging (optional)
    if (typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development') {
        window.vizController = vizController;
    }
}

// ================================
// Utility Functions
// ================================

// Debounce utility for performance
function debounce(func, wait) {
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

// Log welcome message to console
console.log('%cPhone Usage Visualization', 'font-size: 18px; font-weight: 600; color: #d9ba96;');
console.log('%cKeyboard shortcuts:\n→ Space/K: Play/Pause\n→ R: Restart\n→ D: Toggle Data', 'color: #b8afa6;');
