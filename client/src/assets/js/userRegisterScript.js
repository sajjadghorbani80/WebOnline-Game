const registersButton = document.querySelector('.chooseTypeOfRegister');
const formSection = document.querySelectorAll('.formSection');
const passChanger = document.getElementById('passChanger');

registersButton.addEventListener('click', handleClick);
passChanger.addEventListener('click', handleClick);
// eslint-disable-next-line require-jsdoc
function handleClick(childs) {
  if (childs.target.matches('button') || childs.target.matches('a')) {
    formSection.forEach((section) => section.classList.remove('show'));
    const {id} = childs.target.dataset;
    const selector = `.formSection[id="${id}"]`;
    document.querySelector(selector).classList.add('show');
  }
}
