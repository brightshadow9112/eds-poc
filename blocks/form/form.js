function getText(cell) {
  if (!cell) return '';
  return (cell.textContent || '').trim();
}

function isTruthy(value) {
  const normalized = value.toLowerCase();
  return normalized === 'true' || normalized === 'yes' || normalized === '1';
}

function createInputFromRow(row) {
  const [classCell, nameCell, typeCell, valueCell, placeholderCell, checkedCell] = row.children;
  const inputType = getText(typeCell).toLowerCase() || 'text';

  if (!['text', 'radio'].includes(inputType)) {
    return null;
  }

  const input = document.createElement('input');
  input.setAttribute('type', inputType);

  const inputClass = getText(classCell);
  if (inputClass) {
    input.className = inputClass;
  }

  const inputName = getText(nameCell);
  if (inputName) {
    input.setAttribute('name', inputName);
  }

  const inputValue = getText(valueCell);
  if (inputValue) {
    input.setAttribute('value', inputValue);
  }

  const placeholder = getText(placeholderCell);
  if (inputType === 'text' && placeholder) {
    input.setAttribute('placeholder', placeholder);
  }

  const checked = getText(checkedCell);
  if (inputType === 'radio' && checked && isTruthy(checked)) {
    input.checked = true;
  }

  return input;
}

export default function decorate(block) {
  const form = document.createElement('form');

  [...block.children].forEach((row) => {
    const input = createInputFromRow(row);
    if (input) {
      form.append(input);
    }
  });

  block.replaceChildren(form);
}
