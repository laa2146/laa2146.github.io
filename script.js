// Typewriter effect
class Typewriter {
  constructor(element, words, wait = 2500) {
    this.element = element;
    this.words = words;
    this.text = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];

    this.text = this.isDeleting
      ? fullText.substring(0, this.text.length - 1)
      : fullText.substring(0, this.text.length + 1);

    this.element.textContent = this.text;

    let typeSpeed = this.isDeleting ? 75 : 140;

    if (!this.isDeleting && this.text === fullText) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 350;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

async function loadPortfolioData() {
  try {
    const response = await fetch("./data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    populatePortfolio(data);
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    const main = document.querySelector(".main-content");
    if (main) {
      main.innerHTML =
        "<div class='container' style='padding: 40px 0;'><h2>Error loading portfolio data.</h2><p>Please check that <code>data.json</code> exists and is valid JSON.</p></div>";
    }
  }
}

function populatePortfolio(data) {
  document.title = `${data.name} - Portfolio`;
  applySectionBackgrounds(data.sectionBackgrounds);

  populateNavbar(data);
  populateHero(data);
  populateAbout(data);
  populateSelectedImpact(data.selectedImpact);
  populateConsulting(data.consulting);
  populateSkills(data.skills);
  populateEducation(data.education);
  populateHobbies(data.hobbies);
  populateContact(data);

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("footer-name").textContent = data.name;
}

function populateNavbar(data) {
  const brandName = document.getElementById("brand-name");
  const brandInitial = document.getElementById("brand-initial");
  const navbarSocial = document.getElementById("navbar-social");
  const brandImage = document.getElementById("brand-image");

  const displayName = data.navbarName || data.name;
  brandName.textContent = displayName;

  if (data.profileImage) {
    brandImage.innerHTML = `<img src="${data.profileImage}" alt="${displayName}" />`;
  } else {
    brandInitial.textContent = displayName.charAt(0).toUpperCase();
  }

  const c = data.contact || {};
  let socialHTML = "";
  if (c.linkedin) socialHTML += `<a class="social-link" href="${c.linkedin}" target="_blank" rel="noopener noreferrer">in</a>`;
  if (c.github) socialHTML += `<a class="social-link" href="${c.github}" target="_blank" rel="noopener noreferrer">GH</a>`;
  if (c.twitter) socialHTML += `<a class="social-link" href="${c.twitter}" target="_blank" rel="noopener noreferrer">X</a>`;
  navbarSocial.innerHTML = socialHTML;
}

function populateHero(data) {
  document.getElementById("hero-name").textContent = data.name;
  const typewriterElement = document.getElementById("typewriter");
  const roles = (data.roles && data.roles.length ? data.roles : [data.tagline || "Operator"]);
  new Typewriter(typewriterElement, roles, 2000);
}

function populateAbout(data) {
  const aboutContent = document.getElementById("about-content");
  const aboutInitial = document.getElementById("about-initial");
  const aboutImage = document.getElementById("about-image");

  const img = (data.about && data.about.image) || data.profileImage;
  if (img) {
    aboutImage.innerHTML = `<img src="${img}" alt="${data.name}" />`;
  } else {
    aboutInitial.textContent = data.name.charAt(0).toUpperCase();
  }

  const about = data.about || {};
  let html = "";

  if (about.description) html += `<p><strong>${about.description}</strong></p>`;

  if (about.paragraphs?.length) {
    about.paragraphs.forEach((p) => {
      if (p) html += `<p>${p}</p>`;
    });
  }

  if (about.cvLink) {
    html += `
      <div class="cv-download">
        <a class="cv-button" href="${about.cvLink}" target="_blank" rel="noopener noreferrer">Download CV</a>
      </div>
    `;
  }

  if (about.companies?.length) {
    html += `
      <div class="companies-section">
        <div class="companies-label">Previously worked at</div>
        <div class="companies-logos">
          ${about.companies
            .map(
              (co) => `
              <div class="company-logo-wrapper">
                <img class="company-logo" src="${co.logo}" alt="${co.name} logo" />
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  aboutContent.innerHTML = html;
}

function populateSelectedImpact(selectedImpact) {
  const container = document.getElementById("impact-container");
  const title = document.getElementById("impact-title");
  if (!container) return;

  if (title && selectedImpact?.title) title.textContent = selectedImpact.title;

  if (!selectedImpact?.items?.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = selectedImpact.items
    .map(
      (item) => `
      <div class="project-card">
        <div class="project-title">${item.title}</div>
        <div class="project-description">${item.description}</div>
      </div>
    `
    )
    .join("");
}

function populateConsulting(consulting) {
  const container = document.getElementById("consulting-container");
  const title = document.getElementById("consulting-title");

  if (!container || !consulting) return;

  if (title && consulting.title) title.textContent = consulting.title;

  const paragraphs = (consulting.paragraphs || [])
    .map((p) => `<p>${p}</p>`)
    .join("");

  const bestFit = consulting.bestFit
    ? `<div class="consulting-best-fit">${consulting.bestFit}</div>`
    : "";

  const cta = consulting.ctaLink
    ? `<a class="consulting-button" href="${consulting.ctaLink}">${consulting.ctaLabel || "Let’s Talk"}</a>`
    : "";

  container.innerHTML = `
    <div class="consulting-inner">
      <p class="consulting-headline">${consulting.headline || ""}</p>
      <div class="consulting-body">
        ${paragraphs}
      </div>
      ${bestFit}
      <div class="consulting-cta">
        ${cta}
      </div>
    </div>
  `;
}

function populateSkills(skills) {
  const container = document.getElementById("skills-container");
  if (!skills?.categories?.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = skills.categories
    .map(
      (cat) => `
      <div class="skill-category">
        <div class="skill-category-name">${cat.name}</div>
        <div class="skill-items">
          ${(cat.items || []).map((i) => `<span class="skill-item">${i}</span>`).join("")}
        </div>
      </div>
    `
    )
    .join("");
}

function populateEducation(education) {
  const container = document.getElementById("education-container");
  if (!education?.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = education
    .map(
      (e) => `
      <div class="education-item">
        ${e.logo ? `<img class="edu-logo" src="${e.logo}" alt="${e.institution} logo" />` : ""}
        <div>
          <div class="education-degree">${e.degree}</div>
          <div class="education-institution">${e.institution}</div>
          <div class="education-details">${e.location} • ${e.year}</div>
          ${e.description ? `<div class="education-description">${e.description}</div>` : ""}
        </div>
      </div>
    `
    )
    .join("");
}

function populateHobbies(hobbies) {
  const container = document.getElementById("hobbies-container");
  if (!hobbies?.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = hobbies
    .map(
      (h) => `
      <div class="hobby-item">
        <div class="hobby-name">${h.name}</div>
        <div class="hobby-description">${h.description}</div>
      </div>
    `
    )
    .join("");
}

function populateContact(data) {
  const contactInfo = document.getElementById("contact-info");
  const contactSocial = document.getElementById("contact-social");
  const c = data.contact || {};

  const items = [];
  if (c.email) items.push({ label: "Email", value: `<a href="mailto:${c.email}">${c.email}</a>` });
  if (c.phone) items.push({ label: "Phone", value: c.phone });
  if (c.location) items.push({ label: "Location", value: c.location });

  contactInfo.innerHTML = items
    .map(
      (it) => `
      <div class="contact-item">
        <div class="contact-label">${it.label}</div>
        <div class="contact-value">${it.value}</div>
      </div>
    `
    )
    .join("");

  let socialHTML = "";
  if (c.linkedin) socialHTML += `<a class="social-link" href="${c.linkedin}" target="_blank" rel="noopener noreferrer">in</a>`;
  if (c.github) socialHTML += `<a class="social-link" href="${c.github}" target="_blank" rel="noopener noreferrer">GH</a>`;
  if (c.twitter) socialHTML += `<a class="social-link" href="${c.twitter}" target="_blank" rel="noopener noreferrer">X</a>`;
  if (c.website) socialHTML += `<a class="social-link" href="${c.website}" target="_blank" rel="noopener noreferrer">↗</a>`;

  // WhatsApp (supports multiple numbers)
  if (Array.isArray(c.whatsapp)) {
    c.whatsapp.forEach((w) => {
      // If the logo URL fails, you still get a WA link
      socialHTML += `<a class="social-link" href="${w.link}" target="_blank" rel="noopener noreferrer" title="WhatsApp ${w.number}">WA</a>`;
    });
  }

  contactSocial.innerHTML = socialHTML;
}

function updateActiveNav() {
  const sections = document.querySelectorAll(".section, .hero-section");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");
  if (!toggle || !navbarMenu) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navbarMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!navbarMenu.contains(e.target) && !toggle.contains(e.target)) {
        navbarMenu.classList.remove("active");
      }
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
function applySectionBackgrounds(sectionBackgrounds = {}) {
  Object.entries(sectionBackgrounds).forEach(([sectionId, imagePath]) => {
    const el = document.getElementById(sectionId);
    if (!el || !imagePath) return;

    el.classList.add("has-section-bg");
    el.style.backgroundImage = `url("${imagePath}")`;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadPortfolioData();
  initMobileMenu();
  initSmoothScroll();
  window.addEventListener("scroll", updateActiveNav);
  setTimeout(updateActiveNav, 100);
});