async function loadCaseStudies() {
  const response = await fetch('/data/case-studies.json');
  return response.json();
}

function cardTemplate(cs) {
  return `<article class="card"><a href="/work/case-study.html?slug=${cs.slug}"><img src="${cs.heroImage}" alt="${cs.title} preview" loading="lazy" width="960" height="600"><div class="card-content"><p class="eyebrow">${cs.category}</p><h3>${cs.title}</h3><p>${cs.summary}</p><span><strong>View case study</strong></span></div></a></article>`;
}

async function renderCaseCards(selector, limit) {
  const root = document.querySelector(selector);
  if (!root) return;
  const all = await loadCaseStudies();
  const items = typeof limit === 'number' ? all.slice(0, limit) : all;
  root.innerHTML = items.map(cardTemplate).join('');
}

async function renderCaseStudyDetail() {
  const root = document.querySelector('[data-case-detail]');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const studies = await loadCaseStudies();
  const cs = studies.find((s) => s.slug === slug) || studies[0];

  document.title = `${cs.title} Case Study | Emma GaNun`;
  root.innerHTML = `
    <p class="eyebrow">${cs.category} · ${cs.period}</p>
    <h1>${cs.title}</h1><p>${cs.summary}</p>
    <img src="${cs.heroImage}" alt="${cs.title} header" width="1400" height="820">
    <section class="panel section"><h2>Snapshot</h2><dl>${Object.entries(cs.snapshot).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></section>
    <section class="grid grid-2"><div class="panel"><h2>Objective</h2><p>${cs.objective}</p></div><div class="panel"><h2>Approach</h2><ul>${cs.approach.map((r)=>`<li>${r}</li>`).join('')}</ul></div></section>
    <section class="grid grid-2 section"><div class="panel"><h2>What I Owned</h2><ul>${cs.owned.map((r)=>`<li>${r}</li>`).join('')}</ul></div><div class="panel"><h2>Deliverables</h2><ul>${cs.deliverables.map((r)=>`<li>${r}</li>`).join('')}</ul></div></section>
    <section class="panel"><h2>Results</h2><ul>${cs.results.map((r)=>`<li>${r}</li>`).join('')}</ul></section>
    <section class="grid grid-2 section">${cs.mockups.map((m,i)=>`<img src="${m}" alt="${cs.title} mockup ${i+1}" loading="lazy" width="1000" height="800">`).join('')}</section>
    <section class="panel section"><h2>Next steps</h2><p>${cs.nextSteps}</p></section>
  `;
}

renderCaseCards('[data-featured-cases]', 3);
renderCaseCards('[data-all-cases]');
renderCaseStudyDetail();
