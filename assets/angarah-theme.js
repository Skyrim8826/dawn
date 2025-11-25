// ANGARAH Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem('angarah-theme') || 'light';
    this.init();
  }

  init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', this.currentTheme);

    // Create toggle button
    this.createToggleButton();

    // Add event listeners
    this.bindEvents();

    // Update toggle icon
    this.updateToggleIcon();
  }

  createToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle')) return;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = `
      <svg class="theme-toggle-icon sun-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
      </svg>
      <svg class="theme-toggle-icon moon-icon" style="display: none;" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
      </svg>
    `;

    document.body.appendChild(toggleButton);
  }

  bindEvents() {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
        if (!localStorage.getItem('angarah-theme')) {
          this.setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
      });
    }

    // Listen for keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);

    // Add animation effect
    this.animateToggle();
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('angarah-theme', theme);
    this.updateToggleIcon();

    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  updateToggleIcon() {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (sunIcon && moonIcon) {
      if (this.currentTheme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }

  animateToggle() {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.style.transform = 'scale(0.9) rotate(180deg)';
      setTimeout(() => {
        toggleButton.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    }

    // Add page transition effect
    document.body.style.transition = 'background-color 0.3s ease';
  }

  // Method to get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Method to detect system preference
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
}

// Initialize theme toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme toggle
  window.angarahTheme = new ThemeToggle();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
});

// Barbecue-themed animations and effects
class AngarahEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addScrollAnimations();
  }

  addHoverEffects() {
    // Add sizzle effect for buttons
    document.querySelectorAll('.btn, button').forEach((button) => {
      button.addEventListener('mouseenter', () => {
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  }

  addScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-feature, .card, .section').forEach((el) => {
      observer.observe(el);
    });
  }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
  new AngarahEffects();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeToggle, AngarahEffects };
}
