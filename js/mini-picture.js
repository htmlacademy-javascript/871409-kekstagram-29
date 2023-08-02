import {fillBigPicture} from './big-picture.js';


const photos = document.querySelector('.pictures.container');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoAlbumFragment = document.createDocumentFragment();

const createMiniPhoto = (drawMiniPhoto) => {
  drawMiniPhoto.forEach((img) => {
    const photoItem = photoTemplate.cloneNode(true);
    photoItem.querySelector('.picture__img').src = img.url;
    photoItem.querySelector('.picture__img').alt = img.description;
    photoItem.querySelector('.picture__likes').textContent = img.likes;
    photoItem.querySelector('.picture__comments').textContent = img.comments.length;
    photoItem.addEventListener('click', (event) => {
      event.preventDefault();
      fillBigPicture(img);
    });
    photos.appendChild(photoItem);
    photos.appendChild(photoAlbumFragment);
  });
};


export {createMiniPhoto};


