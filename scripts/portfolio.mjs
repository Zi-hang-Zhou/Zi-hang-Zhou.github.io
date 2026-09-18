// Layout adapted from xiyuanyang-code/whoami (MIT); see credits/whoami-LICENSE.txt.
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function portfolio(papers, timeline) {
  const featured = ['setupx', 'time-machine', 'workspace-bench', 'data-analyst']
    .map(id => papers.find(p => p.id === id));
  if (featured.some(p => !p)) throw new Error('Missing featured publication');
  return `
  <section class="hero" aria-labelledby="intro-title">
    <div class="hero-content">
      <h1 id="intro-title"><span class="title-line">Hi, I'm</span><span class="title-line title-gradient">Zihang Zhou</span></h1>
      <div class="hero-links"><a href="mailto:zzh2024@sjtu.edu.cn">Email</a><span aria-hidden="true">/</span><a href="./cv/Zihang-Zhou-CV.pdf">CV ↗</a></div>
      <a class="hero-scroll" href="#research"><span>Scroll to explore</span><span class="scroll-indicator" aria-hidden="true"></span></a>
    </div>
    <div class="hero-background" aria-hidden="true"><div class="gradient-orb orb-1"></div><div class="gradient-orb orb-2"></div><div class="gradient-orb orb-3"></div></div>
  </section>
  <section id="research" class="section research-section">
    <div class="container">
      <header class="section-header"><span class="section-tag">01</span><h2>Research &amp; Projects</h2><p>Selected papers and research software.</p></header>
      <div class="featured-projects">${featured.map(p => `
        <article class="project-row" id="${p.id}" data-reveal>
          <figure class="project-visual">
            <a class="figure-link" href="./assets/${esc(p.image)}" data-caption="${esc(p.figure)}" aria-label="Enlarge ${esc(p.short)} figure"><img src="./assets/${esc(p.image)}" alt="${esc(p.figure)}" loading="lazy" width="640" height="360"></a>
            <figcaption>${esc(p.figure)} · <a href="https://arxiv.org/html/${esc(p.version)}">Source</a></figcaption>
          </figure>
          <div class="project-info">
            <div class="project-meta"><span class="project-badge">${esc(p.status)}</span>${p.firstAuthor ? '<span class="first-author">First author</span>' : ''}</div>
            <h3>${esc(p.short)}</h3>
            <p>${esc(p.description)}</p>
            <div class="project-links"><a class="arrow-link" href="https://arxiv.org/abs/${p.arxiv}">Read paper <span aria-hidden="true">→</span></a>${p.code ? `<a class="arrow-link" href="${esc(p.code)}">Code <span aria-hidden="true">↗</span></a>` : ''}<a class="detail-link" href="./publications/#${p.id}">Authors &amp; details</a></div>
          </div>
        </article>`).join('')}
      </div>
      <div class="small-projects">
        <a class="project-item" href="https://github.com/Zi-hang-Zhou/Speechmaster"><span class="project-number">05</span><div><h3>SpeechMaster</h3><p>Budget-aware speech recognition with self-supervised representations.</p></div></a>
        <a class="project-item" href="https://github.com/Zi-hang-Zhou/NLP-project-work"><span class="project-number">06</span><div><h3>KV Cache Compression</h3><p>Quality, memory, and latency trade-offs on Pythia-70M.</p></div></a>
        <a class="project-item" href="https://github.com/Zi-hang-Zhou/ms-ms-pred-annotations"><span class="project-number">07</span><div><h3>MS/MS Annotation</h3><p>A local tool for blind and model-assisted structure annotation.</p></div></a>
        <a class="project-item" href="./projects/"><span class="project-number">↗</span><div><h3>More projects</h3><p>Research software, course experiments, and scientific tools.</p></div></a>
      </div>
    </div>
  </section>
  <section id="experience" class="section experience-section"><div class="container">
    <header class="section-header"><span class="section-tag">02</span><h2>Experience</h2><p>Research and internship experience.</p></header>
    ${timeline()}
  </div></section>
  <section id="about" class="section about-section"><div class="container">
    <header class="section-header"><span class="section-tag">03</span><h2>About Me</h2><p>Shanghai Jiao Tong University · Artificial Intelligence</p></header>
    <div class="about-copy"><p>I am an undergraduate at the <a href="https://ai.sjtu.edu.cn/">School of Artificial Intelligence, Shanghai Jiao Tong University</a>, and an intern at <a href="https://www.microsoft.com/en-us/research/lab/microsoft-research-asia/">Microsoft Research Asia</a>.</p><p>I work on self-evolving LLM agents, tool learning, and agent evaluation. My research includes automated repository setup, future-event forecasting, and multimodal data analysis.</p><p>National Scholarship recipient · GPA 4.04 / 4.3</p><p class="about-links"><a class="arrow-link" href="./cv/">View CV →</a><a class="arrow-link" href="mailto:zzh2024@sjtu.edu.cn">Get in touch ↗</a></p></div>
  </div></section>`;
}