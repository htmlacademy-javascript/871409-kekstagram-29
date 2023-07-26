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
const uploadCansel = document.querySelector('.img-upload__cancel');
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

const closeUserOverlay = () => {
  uploadForm.reset();
  resetEffect();
  resetScale();
  pristine.reset();
  uploadOpen.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCansel.removeEventListener('click', closeUserOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showModal = () => {
  uploadOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCansel.addEventListener('click', closeUserOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    closeUserOverlay();
  }
}

uploadCansel.addEventListener('click', () => {
  closeUserOverlay();
});

const onCanselButtonClick = () => {
  closeUserOverlay();
};

const onFileInputChange = () => {
  showModal();
};

function ifInTextFieldFocused () {
  if (document.activeElement === textHashtag || document.activeElement === commentText) {
    return true;
  }
}

const stringArray = (string) => {
  const tags = string.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
};

const isValidHashtag = (tag) => VALID_HASHTAG.test(tag);

const paternHashtag = (string) => {
  const tags = stringArray(string);
  return tags.every(isValidHashtag);
};

const isValidCount = (string) => {
  const tags = stringArray(string);
  return tags.length <= MAX_HASHTAGS_COUNT;
};

const uniqueHashtag = (string) => {
  const tags = stringArray(string);
  const tagsTolowerCase = tags.map((tag) => tag.toLowerCase());
  return tagsTolowerCase.length === new Set(tagsTolowerCase).size;
};

pristine.addValidator(textHashtag, paternHashtag, 'в заполнении хэш-тега допущены ошибки');
pristine.addValidator(textHashtag, isValidCount, 'нельзя больше пяти хэш-тегов');
pristine.addValidator(textHashtag, uniqueHashtag, 'хэш-теги не должны повторяться');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const formSubmit = () => {
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

uploadInput.addEventListener('change', onFileInputChange);
uploadCansel.addEventListener('click', onCanselButtonClick);
//uploadForm.addEventListener('submit', formSubmit);
export {formSubmit};

