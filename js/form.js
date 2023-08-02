import {isEscapeKey} from './util.js';
import {resetEffect} from './slider.js';
import {resetScale } from './scale-image.js';
import {showError, showSuccessMessage} from './message.js';
import {sendData} from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadOpen = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadInput = document.querySelector('.img-upload__input');
const textHashtag = uploadForm.querySelector('.text__hashtags');
const commentText = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const body = document.body;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openUserOverlay = () => {
  uploadOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUserOverlay = () => {
  uploadForm.reset();
  resetEffect();
  resetScale();
  pristine.reset();
  uploadOpen.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


function ifInTextFieldFocused () {
  if (document.activeElement === textHashtag || document.activeElement === commentText) {
    return true;
  }
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    closeUserOverlay();
  }
}

const stringArray = (string) => {
  const tags = string.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
};

const isValidHashtag = (tag) => VALID_HASHTAG.test(tag);

const isPaternHashtag = (string) => {
  const tags = stringArray(string);
  return tags.every(isValidHashtag);
};

const isValidCount = (string) => {
  const tags = stringArray(string);
  return tags.length <= MAX_HASHTAGS_COUNT;
};

const isUniqueHashtag = (string) => {
  const tags = stringArray(string);
  const tagsTolowerCase = tags.map((tag) => tag.toLowerCase());
  return tagsTolowerCase.length === new Set(tagsTolowerCase).size;
};

pristine.addValidator(textHashtag, isPaternHashtag, 'в заполнении хэш-тега допущены ошибки');
pristine.addValidator(textHashtag, isValidCount, 'нельзя больше пяти хэш-тегов');
pristine.addValidator(textHashtag, isUniqueHashtag, 'хэш-теги не должны повторяться');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeUserOverlay();
          showSuccessMessage();
        })
        .catch(() => {
          showError();
        })
        .finally(unblockSubmitButton);
    }
  });
};

uploadInput.addEventListener('change', openUserOverlay);
uploadCancel.addEventListener('click', closeUserOverlay);
export {onFormSubmit, onDocumentKeydown};

