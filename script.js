/**
 * Personal Academic Webpage Scripts
 * Lightweight, zero dependencies, no emojis.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Theme Toggle
  var themeToggleBtn = document.getElementById('theme-toggle');
  var htmlEl = document.documentElement;

  var savedTheme = localStorage.getItem('theme') || 'auto';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      var currentTheme = htmlEl.getAttribute('data-theme');
      var newTheme = 'light';
      if (currentTheme === 'light') {
        newTheme = 'dark';
      } else if (currentTheme === 'dark') {
        newTheme = 'light';
      } else {
        // if auto, toggle opposite to system preference
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        newTheme = prefersDark ? 'light' : 'dark';
      }
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtonText(newTheme);
    });
  }

  function updateThemeButtonText(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      themeToggleBtn.textContent = '[Switch to Light Mode]';
    } else if (theme === 'light') {
      themeToggleBtn.textContent = '[Switch to Dark Mode]';
    } else {
      themeToggleBtn.textContent = '[Toggle Theme]';
    }
  }

  // Toggle Abstract & BibTeX
  var toggleButtons = document.querySelectorAll('[data-target]');
  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (!target) return;
      var isOpen = target.classList.contains('open');
      target.classList.toggle('open', !isOpen);
    });
  });

  // Copy BibTeX
  var copyButtons = document.querySelectorAll('.copy-bibtex-btn');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.nextElementSibling;
      if (!pre) return;
      navigator.clipboard.writeText(pre.textContent.trim()).then(function () {
        var originalText = btn.textContent;
        btn.textContent = 'Copied to clipboard.';
        setTimeout(function () {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });
});
