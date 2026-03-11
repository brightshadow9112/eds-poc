import { moveInstrumentation } from '../../scripts/scripts.js';

function getText(cell) {
  if (!cell) return '';
  return (cell.textContent || '').trim();
}

function isTruthy(val) {
  return ['true', 'yes', '1'].includes((val || '').toLowerCase());
}

function buildInput(row) {
  // Field order matches the model definition order (which controls column render order):
  // col 0: type  col 1: name  col 2: inputClass  col 3: value  col 4: placeholder  col 5: checked
  // Type is column 0 so it is ALWAYS positionally correct even when optional trailing
  // fields are empty and their cells are absent from the DOM.
  const [typeCell, nameCell, classCell, valueCell, placeholderCell, checkedCell] = row.children;
  const inputType = getText(typeCell).toLowerCase() || 'text';

  if (!['text', 'radio'].includes(inputType)) return null;

  const input = document.createElement('input');
  input.setAttribute('type', inputType);

  const name = getText(nameCell);
  if (name) input.setAttribute('name', name);

  const cls = getText(classCell);
  if (cls) input.className = cls;

  const val = getText(valueCell);
  if (val) input.setAttribute('value', val);

  if (inputType === 'text') {
    const ph = getText(placeholderCell);
    if (ph) input.setAttribute('placeholder', ph);
  }

  if (inputType === 'radio' && isTruthy(getText(checkedCell))) {
    input.checked = true;
  }

  return input;
}

function decorateRow(row) {
  // Skip rows that are already transformed (direct <input> child already present).
  if (row.querySelector(':scope > input')) return;

  const input = buildInput(row);
  if (!input) return;

  // Move UE instrumentation attrs (data-aue-*, data-richtext-*) from the row
  // wrapper onto the rendered input so Universal Editor can track/select it.
  moveInstrumentation(row, input);
  // Replace all raw column divs / <p> tags with just the <input>.
  row.replaceChildren(input);
}

export default function decorate(block) {
  // Find or create the <form> wrapper. Never call replaceChildren on the block
  // itself — that would break Universal Editor's reference to the container.
  let form = block.querySelector(':scope > form');
  if (!form) {
    form = document.createElement('form');
    block.append(form);
  }

  // UE inserts new items as direct children of the block (outside <form>).
  // Process each such raw row and DOM-move it into the form.
  // DOM-moving (not cloning) preserves all data-aue-* attrs still on the row.
  [...block.children].forEach((child) => {
    if (child === form) return; // skip the form itself
    decorateRow(child);
    form.append(child);
  });

  // Decorate any rows already inside the form (handles the initial page-load
  // case where items were server-rendered directly inside the block).
  [...form.children].forEach(decorateRow);
}
