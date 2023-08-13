/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */

/**
 * Utility function to set attributes on an element.
 * @param {HTMLElement} element - The target element.
 * @param {Object} attributes - The attributes to set.
 */
function setElementAttributes(element, attributes) {
  for (const attributeKey in attributes) {
    element.setAttribute(attributeKey, attributes[attributeKey]);
  }
}

/**
 * Utility function to create an element with attributes.
 * @param {string} tagName - The tag name of the element.
 * @param {Object} attributes - The attributes to set on the element.
 * @return {HTMLElement} The created element.
 */
function createElementWithAttributes(tagName, attributes) {
  const element = document.createElement(tagName);
  setElementAttributes(element, attributes);
  return element;
}

/**
 * Utility function to append an array of child elements to a parent element.
 * @param {HTMLElement} parent - The parent element.
 * @param {Array<HTMLElement>} children - The child elements to append.
 */
function appendChilds(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

/**
 * Utility function to create an element with properties.
 * @param {string} tagName - The tag name of the element.
 * @param {Object} properties - The properties to set on the element.
 * @return {HTMLElement} The created element.
 */
function createElementWithProperties(tagName, properties) {
  const element = document.createElement(tagName);
  for (const propertyKey in properties) {
    element[propertyKey] = properties[propertyKey];
  }
  return element;
}

/**
 **Utility function to create a range slider with associated elements.
 *
 * @param {string} label - The label for the range slider.
 * @param {string} name - The unique name for the range slider.
 * @param {number} minValue - The minimum value of the range.
 * @param {number} maxValue - The maximum value of the range.
 * @param {number} defaultValue - The default value of the range.
 * @param {HTMLElement} [appendTo=document.body] - The parent element to append
 * the range slider to.
 * @return {Object} An object containing references to the created elements.
 */
function createRangeSlider(
    label,
    name,
    minValue,
    maxValue,
    defaultValue,
    appendTo = document.body,
) {
  // Creating HTML elements
  const rangeContainer = createElementWithAttributes('div', {
    id: `${name}RangeContainer`,
    class: 'rangeContainer',
  });

  const labelElement = createElementWithAttributes('label', {
    for: `${name}RangeSlider`,
    class: 'rangeLabel',
  });
  labelElement.innerText = label;

  const rangeSlider = createElementWithAttributes('input', {
    type: 'range',
    name: `${name}RangeSlider`,
    id: `${name}RangeSlider`,
    class: `rangeSlider`,
    min: minValue,
    max: maxValue,
    value: defaultValue != null ? defaultValue : (max + min) / 2,
  });

  const rangeNumberInput = createElementWithAttributes('input', {
    type: 'number',
    name: `${name}RangeNumber`,
    id: `${name}RangeNumber`,
    class: `rangeNumber`,
    min: minValue,
    max: maxValue,
    value: defaultValue != null ? defaultValue : (max + min) / 2,
  });

  // Update the range number input value when the range slider changes
  function updateRangeNumberValue() {
    rangeNumberInput.value = rangeSlider.value;
  }
  rangeSlider.addEventListener('input', updateRangeNumberValue);

  // Update the range slider value when the range number input changes
  function updateRangeSliderValue() {
    if (rangeNumberInput.value > max) {
      rangeNumberInput.value = max;
    } else if (rangeNumberInput.value < min) {
      rangeNumberInput.value = min;
    }
    rangeSlider.value = rangeNumberInput.value;
  }
  rangeNumberInput.addEventListener('change', updateRangeSliderValue);

  // Append elements to the range container and then to the specified parent
  appendChilds(rangeContainer, [
    labelElement,
    rangeSlider,
    rangeNumberInput,
  ]);
  appendTo.appendChild(rangeContainer);

  // Return an object containing references to the created elements
  const rangeSliderObjects = {
    rangeContainer,
    labelElement,
    rangeSlider,
    rangeNumberInput,
  };
  return rangeSliderObjects;
}

// * Create and append a paragraph element
const paragraph = createElementWithProperties('p', {
  innerText: 'Every evil has a price.',
});
document.body.appendChild(paragraph);

// * Create Sliders to customize font

// Font Size Slider
const fontSizeRangeSlider = createRangeSlider(
    'Size: ', 'fontSize', 5, 30, 16,
);
fontSizeRangeSlider.rangeSlider.addEventListener('input', (event) => {
  paragraph.style.fontSize = `${event.target.value}px`;
});

// Letter Spacing Slider
const letterSpacingRangeSlider = createRangeSlider(
    'Letter Spacing: ', 'letterSpacing', -5, 6, 0,
);
letterSpacingRangeSlider.rangeSlider.addEventListener('input', (event) => {
  paragraph.style.letterSpacing = `${event.target.value}px`;
});

// Word Spacing Slider
const wordSpacingRangeSlider = createRangeSlider(
    'Word Spacing: ', 'wordSpacing', -5, 6, 0,
);
wordSpacingRangeSlider.rangeSlider.addEventListener('input', (event) => {
  paragraph.style.wordSpacing = `${event.target.value}px`;
});

