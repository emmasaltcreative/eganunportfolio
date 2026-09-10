const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.textContent = open ? "Menu" : "Close";
    document.body.classList.toggle("nav-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });
}

async function loadCaseStudies() {
  const response = await fetch("/data/case-studies.json");
  if (!response.ok) throw new Error("Unable to load case studies");
  return response.json();
}

function cardTemplate(cs) {
  return `<a class="card" href="/work/case-study.html?slug=${cs.slug}" data-tags="${cs.tags.join(" ")}">
    <div class="card-media"><img src="${cs.heroImage}" alt="" width="960" height="640" loading="lazy"></div>
    <div class="card-body">
      <p class="kicker">${cs.category}</p>
      <h3>${cs.title}</h3>
      <p>${cs.summary}</p>
      <span class="more">Read the work</span>
    </div>
  </a>`;
}

function featureTemplate(cs, index) {
  return `<a class="work-feature" href="/work/case-study.html?slug=${cs.slug}">
    <div class="media"><img src="${cs.heroImage}" alt="" width="1200" height="800" loading="${index === 0 ? "eager" : "lazy"}"></div>
    <div class="work-copy">
      <p class="kicker">${cs.category} · ${cs.period}</p>
      <h3>${cs.title}</h3>
      <p>${cs.summary}</p>
      <span class="more">Read the work</span>
    </div>
  </a>`;
}

async function renderFeaturedWork() {
  const root = document.querySelector("[data-featured-work]");
  if (!root) return;
  try {
    const all = await loadCaseStudies();
    root.innerHTML = all.filter((cs) => cs.featured).map(featureTemplate).join("");
  } catch (error) {
    root.innerHTML = `<p>Work is temporarily unavailable. Please refresh.</p>`;
    console.error(error);
  }
}

async function renderAllWork() {
  const root = document.querySelector("[data-all-work]");
  if (!root) return;
  try {
    const all = await loadCaseStudies();
    root.innerHTML = all.map(cardTemplate).join("");
  } catch (error) {
    root.innerHTML = `<p>Work is temporarily unavailable. Please refresh.</p>`;
    console.error(error);
    return;
  }

  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-filter");
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      root.querySelectorAll(".card").forEach((card) => {
        const tags = card.getAttribute("data-tags") || "";
        card.hidden = value !== "all" && !tags.includes(value);
      });
    });
  });
}

function list(items) {
  return `<ul class="clean">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

async function renderCaseStudyDetail() {
  const root = document.querySelector("[data-case-detail]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const studies = await loadCaseStudies();
  const cs = studies.find((item) => item.slug === slug) || studies[0];

  document.title = `${cs.title} · Emma GaNun`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", cs.summary);

  root.innerHTML = `
    <p class="eyebrow">${cs.category}</p>
    <h1>${cs.title}</h1>
    <p class="lede">${cs.summary}</p>
    <p class="meta-row"><span>${cs.role}</span><span>${cs.period}</span></p>
    <div class="cover"><img src="${cs.heroImage}" alt="${cs.title}" width="1400" height="820"></div>
    <dl class="snapshot">${Object.entries(cs.snapshot).map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("")}</dl>
    <div class="split">
      <section class="panel"><h2>Objective</h2><p>${cs.objective}</p></section>
      <section class="panel"><h2>Approach</h2>${list(cs.approach)}</section>
    </div>
    <div class="split section" style="padding-top:1.2rem;padding-bottom:1.2rem">
      <section class="panel"><h2>What I owned</h2>${list(cs.owned)}</section>
      <section class="panel"><h2>Deliverables</h2>${list(cs.deliverables)}</section>
    </div>
    <section class="panel"><h2>Results</h2>${list(cs.results)}</section>
    <div class="split section">${cs.mockups.map((src, index) => `<img src="${src}" alt="${cs.title} visual ${index + 1}" width="1000" height="750" loading="lazy">`).join("")}</div>
    <section class="panel"><h2>What comes next</h2><p>${cs.nextSteps}</p></section>
    <p class="section"><a class="button" href="/work/">Back to work</a> <a class="button primary" href="/contact/">Start a conversation</a></p>
  `;
}

renderFeaturedWork();
renderAllWork();
renderCaseStudyDetail();
