/* eslint-disable linebreak-style */
// Cache out buttons container, and all of the sections
const buttons = document.querySelector('.buttons');
const resetPassLink = document.getElementById('resetLink');
const formSection = document.querySelectorAll('.form-section');
// Add an event listener to the buttons container
buttons.addEventListener('click', handleClick);
resetPassLink.addEventListener('click', handleClick);
// When a child element of `buttons` is clicked
// eslint-disable-next-line require-jsdoc
function handleClick(child) {
  // Check to see if its a button or span
  if (child.target.matches('button')||child.target.matches('span')) {
    // For every element in the `sections` node list use `classList`
    // to remove the show class
    formSection.forEach((section) => section.classList.remove('show'));

    // "Destructure" the `id` from the button's data set
    const {id} = child.target.dataset;

    // Create a selector that will match the corresponding
    // section with that id. We're using a template string to
    // help form the selector. Basically it says find me an element
    // with a "form-section" class which also has an id that matches the id of
    // the button's data attribute which we just retrieved.
    const selector = `.form-section[id="${id}"]`;

    // Select the `div` and, using classList, again add the
    // show class
    document.querySelector(selector).classList.add('show');
  }
}
