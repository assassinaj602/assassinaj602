/**
 * Muhammad Assad Ullah - Personal Research Webpage
 * Interactive Functionality (Theme Toggle, BibTeX, Abstract, Scrollspy)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(activeTheme);
      localStorage.setItem('theme', activeTheme);
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Abstract and BibTeX Collapsibles
  document.querySelectorAll('[data-toggle-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const isCurrentlyOpen = targetEl.classList.contains('open');
      
      // Close all sibling collapses within the same publication card
      const parentPub = button.closest('.pub-card');
      if (parentPub) {
        parentPub.querySelectorAll('.pub-collapse-content').forEach(el => {
          if (el !== targetEl) el.classList.remove('open');
        });
      }

      if (isCurrentlyOpen) {
        targetEl.classList.remove('open');
      } else {
        targetEl.classList.add('open');
      }
    });
  });

  // Copy BibTeX Functionality
  document.querySelectorAll('.bibtex-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const preEl = btn.parentElement.querySelector('pre');
      if (!preEl) return;

      try {
        await navigator.clipboard.writeText(preEl.innerText.trim());
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.backgroundColor = 'var(--accent-secondary)';
        btn.style.color = '#fff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy BibTeX: ', err);
      }
    });
  });

  // Active ScrollSpy for Header Navigation
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === '#' + sectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
});
