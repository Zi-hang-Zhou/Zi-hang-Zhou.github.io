// Applied before CSS to avoid a flash of the wrong theme. Storage is optional.
(() => {
  let theme;
  try { theme = localStorage.getItem('zihang-theme'); } catch {}
  if (theme !== 'light' && theme !== 'dark') theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    meta.content = theme === 'dark' ? '#191e1b' : '#faf8f4';
  });
})();