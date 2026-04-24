const { profile, projects } = window.PORTFOLIO_DATA;

const state = {
  featuredIndex: 0,
  modalProjectIndex: 0,
  modalImageIndex: 0,
  repoMeta: new Map(),
};

const featuredCarousel = document.getElementById("featured-carousel");
const featuredDots = document.getElementById("featured-dots");
const projectGrid = document.getElementById("project-grid");
const projectModal = document.getElementById("project-modal");
const modalCloseButton = document.getElementById("modal-close");
const modalContent = document.getElementById("modal-content");

function formatDate(dateString) {
  if (!dateString) {
    return "Private or local project";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function createTechPills(items) {
  return items
    .map((item) => `<span class="pill">${item}</span>`)
    .join("");
}

function getRepoMeta(project) {
  return state.repoMeta.get(project.repo) || {};
}

function getProjectImage(project, index = 0) {
  const safeIndex = ((index % project.images.length) + project.images.length) % project.images.length;
  return project.images[safeIndex];
}

function renderProfile() {
  const projectCountElement = document.getElementById("project-count");
  const aboutBodyElement = document.getElementById("about-body");
  const aboutSkillsElement = document.getElementById("about-skills");

  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-summary").textContent = profile.shortBio;
  document.getElementById("hero-focus").textContent = profile.focus;
  document.getElementById("hero-location").textContent = profile.location;

  if (aboutBodyElement) {
    aboutBodyElement.innerHTML = (profile.aboutBody || "")
      .split("\n\n")
      .map((paragraph) => `<span class="about-paragraph">${paragraph}</span>`)
      .join("");
  }

  if (aboutSkillsElement) {
    aboutSkillsElement.innerHTML = (profile.skills || [])
      .map(
        (group) => `
          <p class="about-skill-line">
            <strong>${group.label}:</strong> ${group.items.join(", ")}
          </p>
        `
      )
      .join("");
  }

  if (projectCountElement) {
    projectCountElement.textContent =
      projectCountElement.dataset.count ||
      projectCountElement.textContent.trim() ||
      String(projects.length).padStart(2, "0");
  }

  const githubLinks = [
    document.getElementById("github-link"),
    document.getElementById("contact-github"),
  ];

  githubLinks.forEach((link) => {
    link.href = profile.githubUrl;
  });

  const emailLink = document.getElementById("contact-email");
  emailLink.href = `mailto:${profile.email}`;
  emailLink.textContent = profile.email;

  const linkedinLink = document.getElementById("contact-linkedin");
  linkedinLink.href = profile.linkedinUrl;
}

function renderFeaturedProject() {
  const project = projects[state.featuredIndex];
  const repoMeta = getRepoMeta(project);
  const heroImage = getProjectImage(project, 0);
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : "#";
  const liveTarget = project.liveUrl || repoMeta.homepage || repoUrl;

  featuredCarousel.innerHTML = `
    <article class="featured-card">
      <div class="featured-copy">
        <div>
          <p class="eyebrow">${project.status}</p>
          <h3 class="modal-title">${project.title}</h3>
          <p>${repoMeta.description || project.summary}</p>
        </div>

        <div class="stack-list">
          ${createTechPills(project.tech.slice(0, 10))}
        </div>

      <div class="featured-visual">
        <img src="${heroImage.src}" alt="${heroImage.alt}" />
      </div>

      <div class="project-links">
          <button class="project-link primary" type="button" data-open-project="${state.featuredIndex}">Open Gallery</button>
          <a class="project-link secondary" href="${liveTarget}" target="_blank" rel="noreferrer">View Repo</a>
        </div>
      </div>
    </article>
  `;

  featuredDots.innerHTML = projects
    .map(
      (_, index) => `
        <button
          class="carousel-dot ${index === state.featuredIndex ? "active" : ""}"
          type="button"
          aria-label="Go to project ${index + 1}"
          data-featured-dot="${index}"
        ></button>
      `
    )
    .join("");
}

function renderProjectGrid() {
  if (!projectGrid) {
    return;
  }

  projectGrid.innerHTML = projects
    .map((project, index) => {
      const repoMeta = getRepoMeta(project);
      const previewImage = getProjectImage(project, 0);

      return `
        <article class="project-card">
          <div class="project-card-visual">
            <img src="${previewImage.src}" alt="${previewImage.alt}" />
          </div>

          <div>
            <p class="eyebrow">${project.status}</p>
            <h3>${project.title}</h3>
          </div>

          <p>${repoMeta.description || project.summary}</p>

          <div class="meta-row">
            <strong>Role:</strong> ${project.role}
          </div>

          <div class="stack-list">
            ${createTechPills(project.tech.slice(0, 4))}
          </div>

          <div class="card-footer">
            <button class="project-link primary" type="button" data-open-project="${index}">Project Details</button>
            <a class="project-link secondary" href="https://github.com/${project.repo}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderModal() {
  const project = projects[state.modalProjectIndex];
  const image = getProjectImage(project, state.modalImageIndex);
  const repoMeta = getRepoMeta(project);
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : "#";
  const liveUrl = project.liveUrl || repoMeta.homepage;

  modalContent.innerHTML = `
    <p class="eyebrow">${project.status}</p>
    <h2 class="modal-title">${project.title}</h2>
    <p class="modal-copy">${project.details}</p>



    <div class="modal-section">
      <h3>Tech Used</h3>
      <div class="stack-list">
        ${createTechPills(project.tech)}
      </div>
    </div>

    

    <div class="modal-section">
      <h3>Project Gallery</h3>
      <div class="modal-gallery" id="modal-gallery">
        <div class="modal-image-frame" id="modal-image-frame">
          <img src="${image.src}" alt="${image.alt}" />
        </div>
        <div class="carousel-controls modal-controls">
          <button
            class="icon-button"
            id="modal-prev"
            type="button"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            class="icon-button"
            id="modal-next"
            type="button"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
        <div class="carousel-dots" id="modal-dots" aria-label="Project image navigation">
          ${project.images
            .map(
              (_, index) => `
                <button
                  class="carousel-dot ${index === state.modalImageIndex ? "active" : ""}"
                  type="button"
                  aria-label="Go to image ${index + 1}"
                  data-modal-dot="${index}"
                ></button>
              `
            )
            .join("")}
        </div>
      </div>
      <p class="modal-preview-caption">${image.alt}</p>
    </div>

    <div class="modal-section">
      <h3>Links</h3>
      <div class="project-links">
        <a class="project-link primary" href="${repoUrl}" target="_blank" rel="noreferrer">Open GitHub Repo</a>
        ${
          liveUrl
            ? `<a class="project-link secondary" href="${liveUrl}" target="_blank" rel="noreferrer">Open Live Demo</a>`
            : ""
        }
      </div>
    </div>
  `;

  const modalGallery = document.getElementById("modal-gallery");

  if (modalGallery) {
    attachSwipe(
      modalGallery,
      () => setModalImageIndex(state.modalImageIndex + 1),
      () => setModalImageIndex(state.modalImageIndex - 1)
    );
  }
}

function openModal(projectIndex) {
  state.modalProjectIndex = projectIndex;
  state.modalImageIndex = 0;
  renderModal();
  projectModal.showModal();
}

function closeModal() {
  if (projectModal.open) {
    projectModal.close();
  }
}

function setFeaturedIndex(index) {
  state.featuredIndex = (index + projects.length) % projects.length;
  renderFeaturedProject();
}

function setModalImageIndex(index) {
  const currentProject = projects[state.modalProjectIndex];
  state.modalImageIndex = (index + currentProject.images.length) % currentProject.images.length;
  renderModal();
}

async function fetchRepoMeta(project) {
  if (!project.repo) {
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${project.repo}`);

    if (!response.ok) {
      return;
    }

    const repo = await response.json();

    state.repoMeta.set(project.repo, {
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      homepage: repo.homepage,
      updatedAt: repo.updated_at,
    });
  } catch (error) {
    console.warn(`Could not load repo data for ${project.repo}.`, error);
  }
}

async function hydrateRepoMeta() {
  await Promise.all(projects.map(fetchRepoMeta));
  renderFeaturedProject();
  renderProjectGrid();
}

function attachSwipe(element, onLeft, onRight) {
  let startX = 0;
  let startY = 0;

  element.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
  });

  element.addEventListener("pointerup", (event) => {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onLeft();
      return;
    }

    onRight();
  });
}

function handleClicks(event) {
  const openProjectButton = event.target.closest("[data-open-project]");
  const featuredDotButton = event.target.closest("[data-featured-dot]");
  const modalDotButton = event.target.closest("[data-modal-dot]");
  const modalPrevButton = event.target.closest("#modal-prev");
  const modalNextButton = event.target.closest("#modal-next");

  if (openProjectButton) {
    openModal(Number(openProjectButton.dataset.openProject));
  }

  if (featuredDotButton) {
    setFeaturedIndex(Number(featuredDotButton.dataset.featuredDot));
  }

  if (modalDotButton) {
    setModalImageIndex(Number(modalDotButton.dataset.modalDot));
  }

  if (modalPrevButton) {
    setModalImageIndex(state.modalImageIndex - 1);
  }

  if (modalNextButton) {
    setModalImageIndex(state.modalImageIndex + 1);
  }
}

function attachEvents() {
  document.getElementById("featured-prev").addEventListener("click", () => setFeaturedIndex(state.featuredIndex - 1));
  document.getElementById("featured-next").addEventListener("click", () => setFeaturedIndex(state.featuredIndex + 1));

  document.addEventListener("click", handleClicks);

  modalCloseButton.addEventListener("click", closeModal);
  projectModal.addEventListener("click", (event) => {
    const dialogBounds = projectModal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < dialogBounds.left ||
      event.clientX > dialogBounds.right ||
      event.clientY < dialogBounds.top ||
      event.clientY > dialogBounds.bottom;

    if (clickedOutside) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (projectModal.open) {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight") {
        setModalImageIndex(state.modalImageIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        setModalImageIndex(state.modalImageIndex - 1);
      }

      return;
    }

    if (event.key === "ArrowRight") {
      setFeaturedIndex(state.featuredIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      setFeaturedIndex(state.featuredIndex - 1);
    }
  });

  attachSwipe(featuredCarousel, () => setFeaturedIndex(state.featuredIndex + 1), () => setFeaturedIndex(state.featuredIndex - 1));
}

function init() {
  renderProfile();
  renderFeaturedProject();
  renderProjectGrid();
  attachEvents();
  hydrateRepoMeta();
}

init();
