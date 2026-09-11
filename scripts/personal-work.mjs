export const renderPersonalGallery = (projects, esc) => projects.map((project, index) => `
  <article class="personal-tile personal-tile-${esc(project.size)} reveal">
    <a href="personal/${esc(project.slug)}/" aria-label="View ${esc(project.title)}">
      <figure>
        <img src="${esc(project.cover)}" alt="${esc(project.coverAlt)}" loading="lazy">
        <figcaption>
          <span>${String(index + 1).padStart(2, '0')} / ${esc(project.discipline)}</span>
          <span>${esc(project.year)}</span>
        </figcaption>
      </figure>
      <div class="personal-tile-copy">
        <h3>${esc(project.shortTitle)}</h3>
        <span class="personal-open">Open project ↗</span>
      </div>
    </a>
  </article>`).join('');

export const renderPersonalDetail = (project, allProjects, esc) => {
  const index = allProjects.findIndex(item => item.slug === project.slug);
  const next = allProjects[(index + 1) % allProjects.length];
  const images = project.images.map((image, imageIndex) => `
    <figure class="personal-detail-figure${imageIndex === 0 ? ' personal-detail-lead' : ''}">
      <img src="../../${esc(image)}" alt="${esc(project.title)} — view ${String(imageIndex + 1).padStart(2, '0')}" loading="${imageIndex === 0 ? 'eager' : 'lazy'}">
      <figcaption>FIG. ${String(imageIndex + 1).padStart(2, '0')} / ${esc(project.shortTitle)}</figcaption>
    </figure>`).join('');

  return `<section class="personal-detail-intro">
    <span class="micro">PERSONAL WORK / ${esc(project.year)}</span>
    <h1>${esc(project.title)}</h1>
    <p>${esc(project.summary)}</p>
  </section>
  <dl class="personal-detail-facts">
    <div><dt>ROLE</dt><dd>${esc(project.discipline)}</dd></div>
    <div><dt>TOOLS</dt><dd>${project.tools.map(esc).join(' / ')}</dd></div>
    <div><dt>YEAR</dt><dd>${esc(project.year)}</dd></div>
  </dl>
  <section class="personal-detail-statement">
    <span class="micro">PROJECT NOTE</span>
    <div><p>${esc(project.description)}</p>${project.credit ? `<p class="personal-credit">${esc(project.credit)}</p>` : ''}</div>
  </section>
  <div class="personal-detail-images${project.slug === 'rotten-inside-banners' ? ' personal-detail-images-grid' : ''}">${images}</div>
  <div class="personal-detail-links">
    <a href="${esc(project.artstationUrl)}" target="_blank" rel="noopener noreferrer">View original on ArtStation ↗</a>
    <a href="../${esc(next.slug)}/">Next personal work — ${esc(next.shortTitle)} ↗</a>
  </div>`;
};
