const DEFAULTS = {
  buttonText: 'Button Title',
  buttonStyle: 'primary',
};

const DEFAULT_ICON = '＋';

function getCellText(cell) {
  return cell?.textContent?.trim() || '';
}

function normalizeButtonStyle(value) {
  const normalized = (value || '').trim().toLowerCase();
  if (normalized === 'icon only') return 'icon-only';
  if (['primary', 'secondary', 'tertiary', 'icon-only', 'disabled'].includes(normalized)) {
    return normalized;
  }
  return normalized === 'secondary' ? 'secondary' : 'primary';
}

function parseRow(row) {
  const cells = [...row.children];

  return {
    buttonText: getCellText(cells[0]) || DEFAULTS.buttonText,
    buttonStyle: normalizeButtonStyle(getCellText(cells[1]) || DEFAULTS.buttonStyle),
  };
}

function createIcon(positionClass, iconCharacter) {
  const icon = document.createElement('span');
  icon.className = `figma-button__icon${positionClass ? ` ${positionClass}` : ''}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = iconCharacter;
  return icon;
}

function createButton(item) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('figma-button');

  if (item.buttonStyle === 'secondary') {
    button.classList.add('figma-button--secondary');
  } else if (item.buttonStyle === 'tertiary') {
    button.classList.add('figma-button--tertiary');
  } else {
    button.classList.add('figma-button--primary');
  }

  if (item.buttonStyle === 'disabled') {
    button.disabled = true;
  }

  if (item.buttonStyle === 'icon-only') {
    button.classList.add('figma-button--icon-only');
    button.setAttribute('aria-label', item.buttonText || DEFAULTS.buttonText);
    button.append(createIcon('', DEFAULT_ICON));
  }

  const label = document.createElement('span');
  label.className = 'figma-button__label';
  label.textContent = item.buttonText;
  button.append(label);

  return button;
}

export default function decorate(block) {
  const authoredRows = [...block.querySelectorAll(':scope > div')];
  if (!authoredRows.length) return;

  block.classList.add('button-demo');

  authoredRows.forEach((row) => {
    const item = parseRow(row);
    row.classList.add('button-demo__row');
    row.replaceChildren(createButton(item));
  });
}
