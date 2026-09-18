const themeButton = document.querySelector('#theme-toggle');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    meta.content = dark ? '#191e1b' : '#faf8f4';
  });
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.title = `Switch to ${dark ? 'light' : 'dark'} theme`;
}
updateThemeLabel();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('zihang-theme', theme); } catch {}
  updateThemeLabel();
});
const announce = message => { document.querySelector('#live-status').textContent = message; };
document.querySelectorAll('.cite-button').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.cite);
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });
});
document.querySelectorAll('.copy-citation').forEach(button => {
  button.addEventListener('click', async () => {
    const text = button.parentElement.querySelector('pre').textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      announce('BibTeX citation copied');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(button.parentElement.querySelector('pre'));
      const selection = getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      button.textContent = 'Selected — press Ctrl/Cmd+C';
      announce('Citation selected. Use your keyboard to copy.');
    }
  });
});
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('.figure-link').forEach(link => {
  link.addEventListener('click', event => {
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const image = dialog.querySelector('img');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('p').textContent = link.dataset.caption;
    dialog.showModal();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && dialog.open) dialog.close();
});

// Reveal only below-the-fold rows; content remains visible without JavaScript.
// Inspired by xiyuanyang-code/whoami (MIT); see credits/whoami-LICENSE.txt.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-ready');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(row => {
    if (row.getBoundingClientRect().top >= innerHeight) {
      row.classList.add('reveal-ready');
      observer.observe(row);
    }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal-ready').forEach(row => row.classList.remove('reveal-ready'));
    }
  });
}