export const renderPersonalGallery = (projects, esc) => {
  const bySlug = Object.fromEntries(projects.map(project => [project.slug, project]));
  const pieces = [
    { area: 'hero', project: bySlug['marlboro-bolt-action-handgun'], images: [bySlug['marlboro-bolt-action-handgun'].images[0]] },
    { area: 'tower', project: bySlug['hecor-orbital-weapon'], images: [bySlug['hecor-orbital-weapon'].images[0]] },
    { area: 'romero', project: bySlug['site-romero-5-underground'], images: [bySlug['site-romero-5-underground'].images[0]] },
    { area: 'landscape', project: bySlug['level-pt-1'], images: [bySlug['level-pt-1'].images[0]] },
    { area: 'quad', project: bySlug['rotten-inside-banners'], images: bySlug['rotten-inside-banners'].images }
  ];

  return pieces.map((piece, index) => `
    <article id="personal-${piece.area}" class="personal-piece personal-piece-${piece.area} reveal">
      <a href="personal/${esc(piece.project.slug)}/" aria-label="View ${esc(piece.project.title)}">
        <figure class="personal-piece-media${piece.images.length > 1 ? ' personal-piece-composite' : ''}">
          ${piece.images.map((image, imageIndex) => `<img src="${esc(image)}" alt="${esc(piece.project.title)}${piece.images.length > 1 ? ` — image ${imageIndex + 1}` : ''}" loading="lazy">`).join('')}
          <figcaption><span>Open project</span><span>↗</span></figcaption>
        </figure>
        <div class="personal-piece-label">
          <span>${String(index + 1).padStart(2, '0')} / ${esc(piece.label || piece.project.discipline)}</span>
          <h3>${esc(piece.project.shortTitle)}</h3>
          <span>${esc(piece.project.year)}</span>
        </div>
      </a>
    </article>`).join('');
};

export const renderPersonalDetail = (project, allProjects, esc) => {
  const index = allProjects.findIndex(item => item.slug === project.slug);
  const next = allProjects[(index + 1) % allProjects.length];
  const images = project.images.map((image, imageIndex) => `
    <figure class="personal-detail-figure${imageIndex === 0 ? ' personal-detail-lead' : ''}">
      <img src="../../${esc(image)}" alt="${esc(project.title)} — view ${String(imageIndex + 1).padStart(2, '0')}" loading="${imageIndex === 0 ? 'eager' : 'lazy'}">
      <figcaption>FIG. ${String(imageIndex + 1).padStart(2, '0')} / ${esc(project.shortTitle)}${project.imageCaptions?.[imageIndex] ? ` / ${esc(project.imageCaptions[imageIndex])}` : ''}</figcaption>
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
  <div class="personal-detail-images${project.slug === 'rotten-inside-banners' ? ' personal-detail-images-grid' : ''}${project.slug === 'hecor-orbital-weapon' ? ' personal-detail-images-hecor' : ''}">${images}</div>
  <div class="personal-detail-links">
    <a href="${esc(project.artstationUrl)}" target="_blank" rel="noopener noreferrer">View original on ArtStation ↗</a>
    <a href="../${esc(next.slug)}/">Next personal work — ${esc(next.shortTitle)} ↗</a>
  </div>`;
};
