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

  if (defaultValue != null) {
    if (defaultValue > maxValue) {
      defaultValue = maxValue;
    } else if (defaultValue < minValue) {
      defaultValue = minValue;
    }
  }

  const rangeSlider = createElementWithAttributes('input', {
    type: 'range',
    name: `${name}RangeSlider`,
    id: `${name}RangeSlider`,
    class: `rangeSlider`,
    min: minValue,
    max: maxValue,
    value: defaultValue != null ? defaultValue : (maxValue + minValue) / 2,
  });

  const rangeNumberInput = createElementWithAttributes('input', {
    type: 'number',
    name: `${name}RangeNumber`,
    id: `${name}RangeNumber`,
    class: `rangeNumber`,
    min: minValue,
    max: maxValue,
    value: defaultValue != null ? defaultValue : (maxValue + minValue) / 2,
  });

  // Update the range number input value when the range slider changes
  function updateRangeNumberValue() {
    rangeNumberInput.value = rangeSlider.value;
  }
  rangeSlider.addEventListener('input', updateRangeNumberValue);

  // Update the range slider value when the range number input changes
  function updateRangeSliderValue() {
    if (rangeNumberInput.value > maxValue) {
      rangeNumberInput.value = maxValue;
    } else if (rangeNumberInput.value < minValue) {
      rangeNumberInput.value = minValue;
    }
    rangeSlider.value = rangeNumberInput.value;
  }
  rangeNumberInput.addEventListener('change', () => updateRangeSliderValue());

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

// function to create slider and attach it to given element
// with changable properties
function createAndAttachSlider(
    attachTo,
    propertie,
    label,
    name,
    minValue,
    maxValue,
    defaultValue) {
  const element = createRangeSlider(
      label,
      name,
      minValue,
      maxValue,
      defaultValue,
  );

  // set default value first
  if (defaultValue > maxValue) {
    defaultValue = maxValue;
  } else if (defaultValue < minValue) {
    defaultValue = minValue;
  }
  attachTo.style[propertie] = `${defaultValue}px`;

  function updateStyle(event) {
    attachTo.style[propertie] = `${event.target.value}px`;
  }

  element.rangeSlider.addEventListener('input', updateStyle);
  element.rangeNumberInput.addEventListener('change', updateStyle);

  return element;
}

// * Create and append a paragraph element
const paragraph = createElementWithProperties('p', {
  innerText: 'Every evil has a price.',
});
document.body.appendChild(paragraph);

// * Create Sliders to customize font
// Font Size Slider
createAndAttachSlider(
    paragraph, 'fontSize', 'Size: ', 'fontSize', 5, 30, 16);

// Letter Spacing Slider
createAndAttachSlider(
    paragraph, 'letterSpacing', 'Letter Spacing: ', 'letterSpacing', -5, 6, 0);

// Word Spacing Slider
createAndAttachSlider(
    paragraph, 'wordSpacing', 'Word Spacing: ', 'wordSpacing', -5, 6, 0);


// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================


/**
 * Utility function to create a color picker with associated elements.
 *
 * @param {string} label - The label for the color picker.
 * @param {string} name - The unique name for the color picker.
 * @param {string} defaultValue - The default hex value for the color.
 * @param {HTMLElement} [appendTo=document.body] - The parent element to append
 * the color picker to.
 * @return {Object} An object containing references to the created elements.
 */
function createColorPicker(
    label,
    name,
    defaultValue = '#000000',
    appendTo = document.body,
) {
  const colorContainer = createElementWithAttributes('div', {
    id: `${name}ColorContainer`,
    class: 'colorContainer',
  });

  const colorLabel = createElementWithAttributes('label', {
    for: `${name}ColorPicker`,
    class: 'colorLabel',
  });
  colorLabel.innerText = label;

  const colorPicker = createElementWithAttributes('input', {
    type: 'color',
    name: `${name}ColorPicker`,
    id: `${name}ColorPicker`,
    class: 'colorPicker',
    value: defaultValue,
  });

  const colorText = createElementWithAttributes('input', {
    type: 'text',
    name: `${name}ColorText`,
    id: `${name}ColorText`,
    class: 'colorText',
    value: defaultValue,
  });

  // Update the color text input value when the color picker changes
  function updateColorTextValue() {
    colorText.value = colorPicker.value;
  }
  colorPicker.addEventListener('input', updateColorTextValue);

  // Update the color picker value when the color text input changes
  function updateColorPickerValue() {
    colorPicker.value = colorText.value;
  }
  colorText.addEventListener('change', updateColorPickerValue);

  appendChilds(colorContainer, [colorLabel, colorPicker, colorText]);
  appendTo.appendChild(colorContainer);

  const colorPickerObject = {
    colorContainer,
    colorLabel,
    colorPicker,
    colorText,
  };

  return colorPickerObject;
}

// Create Color Picker for customizing font color
const colorDefaultValue = '#ff00ff';
const fontColor = createColorPicker(
    'Font Color: ',
    'fontColor',
    colorDefaultValue,
);
paragraph.style.color = colorDefaultValue;
fontColor.colorPicker.addEventListener('change', (event) => {
  paragraph.style.color = `${event.target.value}`;
});
fontColor.colorText.addEventListener('change', (event) => {
  paragraph.style.color = `${fontColor.colorPicker.value}`;
});
