const ALLOWED_VARIANTS = new Set(['add-on', 'boost', 'progress']);

function getCellText(cell) {
  return cell?.textContent?.trim() || '';
}

function getImageFromCell(cell) {
  const imageEl = cell?.querySelector('picture img, img');
  if (imageEl) {
    return {
      src: imageEl.getAttribute('src') || '',
      alt: imageEl.getAttribute('alt') || '',
    };
  }

  const linkEl = cell?.querySelector('a[href]');
  if (linkEl) {
    return {
      src: linkEl.getAttribute('href') || '',
      alt: '',
    };
  }

  return { src: '', alt: '' };
}

function resolveVariant(rawVariant) {
  const normalized = rawVariant
    .toLowerCase()
    .replace('pillar-card--', '')
    .trim();

  return ALLOWED_VARIANTS.has(normalized) ? normalized : 'add-on';
}

function buildCard(row, mobileView) {
  const cells = [...row.children];

  const variant = resolveVariant(getCellText(cells[0]));
  const kicker = getCellText(cells[1]);
  const headline = getCellText(cells[2]);
  const subhead = getCellText(cells[3]);
  const graphicsImage = getImageFromCell(cells[4]);
  const heroImage = getImageFromCell(cells[5]);
  const heroImageAlt = getCellText(cells[6]);
  const caption = getCellText(cells[7]);

  const article = document.createElement('article');
  article.className = `pillar-card pillar-card--${mobileView ? 'mobile' : 'desktop'} pillar-card--${variant}`;

  const content = document.createElement('div');
  content.className = 'pillar-card__content';

  const kickerEl = document.createElement('p');
  kickerEl.className = 'pillar-card__kicker';
  kickerEl.textContent = kicker;

  const headlineEl = document.createElement('p');
  headlineEl.className = 'pillar-card__headline';
  headlineEl.textContent = headline;

  const subheadEl = document.createElement('p');
  subheadEl.className = 'pillar-card__subhead';
  subheadEl.textContent = subhead;

  content.append(kickerEl, headlineEl, subheadEl);

  const media = document.createElement('div');
  media.className = 'pillar-card__media';

  if (graphicsImage.src) {
    const graphicsEl = document.createElement('img');
    graphicsEl.className = 'pillar-card__graphics';
    graphicsEl.src = graphicsImage.src;
    graphicsEl.alt = graphicsImage.alt;
    media.append(graphicsEl);
  } else {
    const graphicsPlaceholder = document.createElement('div');
    graphicsPlaceholder.className = 'pillar-card__graphics';
    graphicsPlaceholder.setAttribute('aria-hidden', 'true');
    media.append(graphicsPlaceholder);
  }

  if (heroImage.src) {
    const heroEl = document.createElement('img');
    heroEl.className = 'pillar-card__hero';
    heroEl.src = heroImage.src;
    heroEl.alt = heroImageAlt || heroImage.alt || '';
    media.append(heroEl);
  }

  const captionEl = document.createElement('p');
  captionEl.className = 'pillar-card__caption';
  captionEl.textContent = caption;
  media.append(captionEl);

  article.append(content, media);
  return article;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const mobileView = block.classList.contains('mobile') || block.classList.contains('pillar-cards--mobile');

  block.classList.add('pillar-cards');
  block.classList.add(mobileView ? 'pillar-cards--mobile' : 'pillar-cards--desktop');

  const cards = rows.map((row) => buildCard(row, mobileView));
  block.replaceChildren(...cards);
}