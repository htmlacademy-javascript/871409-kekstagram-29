import {isEscapeKey} from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successPopup = successTemplate.cloneNode(true);
const errorPopup = errorTemplate.cloneNode(true);
const errorInner = errorPopup.querySelector('.error-inner');
const errorButton = errorPopup.querySelector('.error__button');
const successInner = successPopup.querySelector('.success__inner');
const successButton = successPopup.querySelector('.success__button');


const closeSuccessPopup = () => {
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
};

function onSuccessKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
}

function onSuccessClick (evt) {
  if (evt.target !== successInner) {
    closeSuccessPopup();
  }
}

const closeErrorPopup = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
};

function onErrorKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

function onErrorClick (evt) {
  if (evt.target !== errorInner) {
    closeErrorPopup();
  }
}

const showSuccessMessage = () => {
  document.body.append(successPopup);
  successButton.addEventListener('click', () => {
    closeSuccessPopup();
  });
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
};

const showError = () => {
  document.body.append(errorPopup);
  errorButton.addEventListener('click', () => {
    closeErrorPopup();
  });
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
};

export {showError, showSuccessMessage};
