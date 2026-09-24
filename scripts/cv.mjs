export function renderCV(download) {
  return `<section class="page-intro container cv-intro">
  <div><span class="eyebrow">CURRICULUM VITAE</span><h1>Zihang Zhou</h1>
    <p><a href="mailto:zzh2024@sjtu.edu.cn">zzh2024@sjtu.edu.cn</a> &bull; <a href="https://github.com/Zi-Hang-Zhou">github.com/Zi-hang-Zhou</a></p>
  </div>${download}
</section>
<div class="container cv-layout">
  <aside class="cv-nav">
    <a href="#education">Education</a>
    <a href="#papers">Publications &amp; Preprints</a>
    <a href="#internship">Internship Experience</a>
    <a href="#experience">Research Experience</a>
    <a href="#skills">Skills</a>
    <a href="#courses">Relevant Coursework</a>
  </aside>
  <div class="cv-body">
    <section class="cv-section" id="education">
      <h2>Education</h2>
      <div class="education-card">
        <h3>Shanghai Jiao Tong University (SJTU)</h3>
        <p>Shanghai, China</p>
        <p style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:0 1rem"><span>School of Artificial Intelligence</span><em>Sep 2024 &#8211; Present</em></p>
        <p><em>B.Eng. Candidate in Artificial Intelligence</em></p>
        <ul class="clean-list">
          <li><p class="education-grades">GPA: 4.04 / 4.3 (Average Score: 92.7)</p></li>
          <li><strong>Honors:</strong> National Scholarship (Top <strong>0.5%</strong>, Oct 2025);<br> Zhiyuan Honorary Scholarship.</li>
          <li><strong>Early Admission:</strong> Admitted one year early (Grade 11) via the National College Entrance Exam (Gaokao); ranked in the top <strong>0.05%</strong> in Jiangsu Province.</li>
        </ul>
      </div>
      <p><strong>Research Interests:</strong> Self-evolving LLM agents, tool learning, agent evaluation, and reliable and reproducible agentic systems.</p>
    </section>
    <section class="cv-section" id="papers">
      <h2>Publications &amp; Preprints</h2>
      <ol class="cv-papers">
        <li><em><a href="https://arxiv.org/abs/2606.21013">Agentic Time Machine as an Infrastructure for Future-Event Forecasting</a></em>.<p><strong>EMNLP 2026 Main Conference (Oral)</strong>.</p></li>
        <li><em><a href="https://arxiv.org/abs/2605.26186">SetupX: Can LLM Agents Learn from Past Failures in Functionality-Correct Code Repository Setup?</a></em>.<p><strong>First Author</strong>. Under review at <strong>NeurIPS 2026</strong>.</p></li>
        <li><em><a href="https://arxiv.org/abs/2605.03596">Workspace-Bench 1.0: Benchmarking AI Agents on Workspace Tasks with Large-Scale File Dependencies</a></em>.<p>Under review at <strong>NeurIPS 2026</strong>.</p></li>
        <li><em><a href="https://arxiv.org/abs/2509.23988">LLM/Agent-as-Data-Analyst: A Survey</a></em>.<p>Under review at <strong>IEEE TKDE</strong>.</p></li>
      </ol>
    </section>
    <section class="cv-section" id="internship">
      <h2>Internship Experience</h2>
      <div class="timeline">
        <article><div class="timeline-date">Jun 2026 &#8211; Present</div><div>
          <h3>Microsoft Research Asia (MSRA)</h3><p>Shanghai, China</p><p class="role"><em>Research Intern</em></p>
          <ul class="clean-list">
            <li><strong>Project: Enterprise Workflow Benchmark for LLMs and Agents</strong></li>
            <li>Designed enterprise workflow tasks and constructed evaluation datasets to assess LLM and agent capabilities in enterprise scenarios.</li>
            <li>Defined evaluation metrics and developed the evaluation framework for systematic assessment of model and agent performance on workflow tasks.</li>
          </ul>
        </div></article>
      </div>
    </section>
    <section class="cv-section" id="experience">
      <h2>Research Experience</h2>
      <div class="timeline">
        <article><div class="timeline-date">Apr 2026 &#8211; Jun 2026</div><div>
          <h3>Multi-Agent Governance &amp; Intelligence Crew (MAGIC)</h3><p>Shanghai, China</p><p class="role"><em>Undergraduate Researcher</em></p>
          <ul class="clean-list">
            <li><strong>Project: Agentic Time Machine</strong></li>
            <li><strong>Paper:</strong> <a href="https://arxiv.org/abs/2606.21013"><em>Agentic Time Machine as an Infrastructure for Future-Event Forecasting</em></a>. <strong>EMNLP 2026 Main Conference (Oral)</strong>.</li>
            <li>Evaluated the performance of agents equipped with the Time Machine infrastructure on future-event forecasting tasks.</li>
          </ul>
        </div></article>
        <article><div class="timeline-date">Oct 2025 &#8211; Apr 2026</div><div>
          <h3>SJTU Data Analysis Study Group</h3><p>Shanghai, China</p><p class="role"><em>Undergraduate Researcher</em></p>
          <ul class="clean-list">
            <li><strong>Project: SetupX &#8211; Autonomous Repository Setup</strong></li>
            <li><strong>First-author paper:</strong> <em><a href="https://arxiv.org/abs/2605.26186">SetupX: Can LLM Agents Learn from Past Failures in Functionality-Correct Code Repository Setup?</a></em>. Under review at <strong>NeurIPS 2026</strong>.</li>
            <li>Developed an autonomous agent for complex GitHub repository setup, integrating an external knowledge base via RAG to help resolve dependency conflicts and configuration errors.</li>
            <li>Refined the agent&#8211;environment interaction loop to improve automated repository setup success rates.</li>
          </ul>
        </div></article>
        <article><div class="timeline-date">Jun 2025 &#8211; Oct 2025</div><div>
          <h3>SJTU Data Analysis Study Group</h3><p>Shanghai, China</p><p class="role"><em>Undergraduate Researcher</em></p>
          <ul class="clean-list">
            <li><strong>Project: LLM/Agent-as-Data-Analyst Survey</strong></li>
            <li>Co-authored <a href="https://arxiv.org/abs/2509.23988"><em>LLM/Agent-as-Data-Analyst: A Survey</em></a>. Under review at <strong>IEEE TKDE</strong>.</li>
            <li>Authored the sections on <strong>Video</strong> and <strong>3D Models</strong>, systematically reviewing state-of-the-art methods for multimodal data analysis agents.</li>
            <li>Curated and maintained the <a href="https://github.com/weAIDB/awesome-data-llm"><code>awesome-data-llm</code></a> repository to track the latest research.</li>
          </ul>
        </div></article>
      </div>
    </section>
    <section class="cv-section" id="skills">
      <h2>Skills</h2>
      <dl class="skills-list">
        <dt>Programming:</dt><dd>Python, C++</dd>
        <dt>Libraries &amp; Tools:</dt><dd>PyTorch, NumPy, pandas, Matplotlib, LangChain, Docker, Git, LaTeX</dd>
        <dt>Machine Learning:</dt><dd>Neural network architectures, model training, evaluation, and experimental design</dd>
        <dt>LLMs &amp; Agents:</dt><dd>Tool use, retrieval-augmented generation, multi-agent systems, agent evaluation, and repository automation</dd>
      </dl>
    </section>
    <section class="cv-section" id="courses">
      <h2>Relevant Coursework</h2>
      <h3>Mathematics:</h3><p>Mathematical Analysis, Linear Algebra, Numerical Analysis, Probability and Statistics, Discrete Mathematics</p>
      <h3>Computer Science:</h3><p>Data Structures, Algorithm Design and Analysis, C++ Programming, Machine Learning, Deep Learning, Reinforcement learning, Introduction to Intelligent Robotics, Computer Architecture</p>
    </section>
  </div>
</div>`;
}