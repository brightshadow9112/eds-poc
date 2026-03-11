import { moveInstrumentation } from '../../scripts/scripts.js';

function getText(cell) {
  if (!cell) return '';
  return (cell.textContent || '').trim();
}

function isTruthy(val) {
  return ['true', 'yes', '1'].includes((val || '').toLowerCase());
}

function buildInput(row) {
  const [classCell, nameCell, typeCell, valueCell, placeholderCell, checkedCell] = row.children;
  const inputType = getText(typeCell).toLowerCase() || 'text';

  if (!['text', 'radio'].includes(inputType)) return null;

  const input = document.createElement('input');
  input.setAttribute('type', inputType);

  const cls = getText(classCell);
  if (cls) input.className = cls;

  const name = getText(nameCell);
  if (name) input.setAttribute('name', name);

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

export default function decorate(block) {
  // Guard: if already decorated (form wrapper present), do not run again.
  if (block.querySelector(':scope > form')) return;

  const form = document.createElement('form');

  // Snapshot children before moving them, since moving a node changes the live collection.
  [...block.children].forEach((row) => {
    const input = buildInput(row);
    if (input) {
      // Transfer UE instrumentation (data-aue-*, data-richtext-*) from the
      // row wrapper onto the visible <input> so Universal Editor can still
      // track and edit this field item.
      moveInstrumentation(row, input);
      // Replace raw cell divs with just the rendered input, but keep the row div
      // itself — UE adds new items as direct children of the block, so rows
      // must remain as real DOM nodes (not be destroyed or cloned).
      row.replaceChildren(input);
    }
    // DOM-move the row into the form. Moving (not cloning) preserves every
    // attribute already on the row element including any remaining data-aue-*.
    form.append(row);
  });

  // block is now empty (all rows were moved out above). Appending the form
  // here avoids replaceChildren() on the block itself, which would force
  // Universal Editor to lose its reference to the container node.
  block.append(form);
}
