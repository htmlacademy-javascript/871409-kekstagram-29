import {fillBigPicture} from './big-picture.js';


const photos = document.querySelector('.pictures.container');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoAlbumFragment = document.createDocumentFragment();

const createMiniPhoto = (drawMiniPhoto) => {
  drawMiniPhoto.forEach((img) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = img.url;
    photoElement.querySelector('.picture__img').alt = img.description;
    photoElement.querySelector('.picture__likes').textContent = img.likes;
    photoElement.querySelector('.picture__comments').textContent = img.comments.length;
    photoElement.addEventListener('click', (event) => {
      event.preventDefault();
      fillBigPicture(img);
    });
    photos.appendChild(photoElement);
    photos.appendChild(photoAlbumFragment);
  });
};


export {createMiniPhoto};


