// Typewriter effect
class Typewriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.textContent = this.text;

        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Load portfolio data from data.json
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        populatePortfolio(data);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        document.querySelector('.main-content').innerHTML = 
            '<div style="text-align: center; padding: 2rem; color: white;"><h2>Error loading portfolio data. Please check that data.json exists.</h2></div>';
    }
}

// Populate all sections of the portfolio
function populatePortfolio(data) {
    // Set page title
    document.title = `${data.name} - Portfolio`;
    
    // Populate navbar
    populateNavbar(data);
    
    // Populate hero section
    populateHero(data);
    
    // Populate about section
    populateAbout(data);
    
    // Populate projects
    populateProjects(data.projects);
    
    // Populate skills
    populateSkills(data.skills);
    
    // Populate education
    populateEducation(data.education);
    
    // Populate hobbies
    populateHobbies(data.hobbies);
    
    // Populate contact
    populateContact(data);
    
    // Update footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = data.name;
}

// Populate navbar
function populateNavbar(data) {
    const brandName = document.getElementById('brand-name');
    const brandInitial = document.getElementById('brand-initial');
    const navbarSocial = document.getElementById('navbar-social');
    
    // Use navbarName if provided, otherwise use name
    const displayName = data.navbarName || data.name;
    brandName.textContent = displayName;
    
    // Set brand initial
    if (data.profileImage) {
        document.getElementById('brand-image').innerHTML = `<img src="${data.profileImage}" alt="${displayName}">`;
    } else {
        brandInitial.textContent = displayName.charAt(0).toUpperCase();
    }
    
    // Add social links
    let socialHTML = '';
    if (data.contact.github) {
        socialHTML += `<a href="${data.contact.github}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-github"></i></a>`;
    }
    if (data.contact.linkedin) {
        socialHTML += `<a href="${data.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-linkedin-in"></i></a>`;
    }
    if (data.contact.twitter) {
        socialHTML += `<a href="${data.contact.twitter}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-twitter"></i></a>`;
    }
    
    navbarSocial.innerHTML = socialHTML;
}

// Populate hero section
function populateHero(data) {
    const heroName = document.getElementById('hero-name');
    const typewriterElement = document.getElementById('typewriter');
    
    heroName.textContent = data.name;
    
    // Initialize typewriter effect
    const roles = data.roles || [data.tagline || 'Developer', 'Designer', 'Creator'];
    new Typewriter(typewriterElement, roles, 2000);
}

// Populate about section
function populateAbout(data) {
    const aboutContent = document.getElementById('about-content');
    const aboutInitial = document.getElementById('about-initial');
    
    // Set about image
    if (data.profileImage || data.about.image) {
        const img = data.about.image || data.profileImage;
        document.getElementById('about-image').innerHTML = `<img src="${img}" alt="${data.name}">`;
    } else {
        aboutInitial.textContent = data.name.charAt(0).toUpperCase();
    }
    
    let html = '';
    if (data.about.description) {
        html += `<p><strong>${data.about.description}</strong></p>`;
    }
    
    if (data.about.paragraphs && data.about.paragraphs.length > 0) {
        data.about.paragraphs.forEach(paragraph => {
            if (paragraph) {
                html += `<p>${paragraph}</p>`;
            }
        });
    }
    
    // Add CV download button if cvLink is provided
    if (data.about.cvLink) {
        html += `
            <div class="cv-download">
                <a href="${data.about.cvLink}" target="_blank" rel="noopener noreferrer" class="cv-button">
                    <i class="fas fa-download"></i>
                    Download CV
                </a>
            </div>
        `;
    }
    
    // Add company logos if companies are provided
    if (data.about.companies && data.about.companies.length > 0) {
        html += `
            <div class="companies-section">
                <p class="companies-label">Previously worked at</p>
                <div class="companies-logos">
                    ${data.about.companies.map(company => `
                        <div class="company-logo-wrapper" title="${company.name}">
                            <img src="${company.logo}" alt="${company.name}" class="company-logo">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    aboutContent.innerHTML = html;
}

// Populate projects section
function populateProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p style="color: var(--text-muted);">No projects to display yet.</p>';
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${project.technologies && project.technologies.length > 0 ? `
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="project-links">
                    ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-code"></i> View Code</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        `;
    });
    
    projectsContainer.innerHTML = html;
}

// Populate skills section
function populateSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skills || !skills.categories || skills.categories.length === 0) {
        skillsContainer.innerHTML = '<p style="color: var(--text-muted);">No skills to display yet.</p>';
        return;
    }
    
    let html = '';
    skills.categories.forEach(category => {
        html += `
            <div class="skill-category">
                <h3 class="skill-category-name">${category.name}</h3>
                <div class="skill-items">
                    ${category.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
                </div>
            </div>
        `;
    });
    
    skillsContainer.innerHTML = html;
}

// Populate education section
function populateEducation(education) {
    const educationContainer = document.getElementById('education-container');
    
    if (!education || education.length === 0) {
        educationContainer.innerHTML = '<p style="color: var(--text-muted);">No education information to display yet.</p>';
        return;
    }
    
    let html = '';
    education.forEach(item => {
        html += `
            <div class="education-item">
                <h3 class="education-degree">${item.degree}</h3>
                <p class="education-institution">${item.institution}</p>
                <p class="education-details">${item.location} • ${item.year}</p>
                ${item.description ? `<p class="education-description">${item.description}</p>` : ''}
            </div>
        `;
    });
    
    educationContainer.innerHTML = html;
}

// Populate hobbies section
function populateHobbies(hobbies) {
    const hobbiesContainer = document.getElementById('hobbies-container');
    
    if (!hobbies || hobbies.length === 0) {
        hobbiesContainer.innerHTML = '<p style="color: var(--text-muted);">No hobbies to display yet.</p>';
        return;
    }
    
    let html = '';
    hobbies.forEach(hobby => {
        html += `
            <div class="hobby-item">
                <h3 class="hobby-name">${hobby.name}</h3>
                <p class="hobby-description">${hobby.description}</p>
            </div>
        `;
    });
    
    hobbiesContainer.innerHTML = html;
}

// Populate contact section
function populateContact(data) {
    const contactInfo = document.getElementById('contact-info');
    const contactSocial = document.getElementById('contact-social');
    const contact = data.contact;
    
    let infoHTML = '';
    
    if (contact.email) {
        infoHTML += `
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-label">Email</div>
                <div class="contact-value"><a href="mailto:${contact.email}">${contact.email}</a></div>
            </div>
        `;
    }
    
    if (contact.phone) {
        infoHTML += `
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="contact-label">Phone</div>
                <div class="contact-value"><a href="tel:${contact.phone}">${contact.phone}</a></div>
            </div>
        `;
    }
    
    if (contact.location) {
        infoHTML += `
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-label">Location</div>
                <div class="contact-value">${contact.location}</div>
            </div>
        `;
    }
    
    contactInfo.innerHTML = infoHTML;
    
    // Social links
    let socialHTML = '';
    if (contact.github) {
        socialHTML += `<a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-github"></i></a>`;
    }
    if (contact.linkedin) {
        socialHTML += `<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-linkedin-in"></i></a>`;
    }
    if (contact.twitter) {
        socialHTML += `<a href="${contact.twitter}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fab fa-twitter"></i></a>`;
    }
    if (contact.website) {
        socialHTML += `<a href="${contact.website}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fas fa-globe"></i></a>`;
    }
    
    contactSocial.innerHTML = socialHTML;
}

// Navigation active state on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!navbarMenu.contains(e.target) && !toggle.contains(e.target)) {
                navbarMenu.classList.remove('active');
            }
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    initMobileMenu();
    initSmoothScroll();
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call to set active nav
    setTimeout(updateActiveNav, 100);
});
