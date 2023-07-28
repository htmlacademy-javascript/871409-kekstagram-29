import {debounce} from './util.js';
import { createMiniPhoto } from './mini-picture.js';

const RANDOM_PHOTO_COUNT = 10;
const TIMEOUT = 500;
const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscused = document.querySelector('#filter-discussed');

const sortRandom = () => Math.random() - 0.5;
const discussedSorting = (a, b) => b.comments.length - a.comments.length;
const removePicture = (photos) => photos.forEach((photo) => photo.remove());


const sortPhoto = (photos, currentFilter) => {
  if (currentFilter === filterDefault) {
    return photos;
  } else if (currentFilter === filterRandom) {
    return photos.slice().sort(sortRandom).slice(0, RANDOM_PHOTO_COUNT);
  } else if (currentFilter === filterDiscused) {
    return photos.slice().sort(discussedSorting);
  }
};


const onFilterButtonClick = (evt, photos) => {
  const images = document.querySelectorAll('.picture');
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscused.classList.remove('img-filters__button--active');
  const activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');
  removePicture(images);
  createMiniPhoto(sortPhoto(photos, activeButton));
};

const setDebouncedSort = (photos) => {
  filterForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, photos);
  }, TIMEOUT));
};

const showSortButtons = () => filterContainer.classList.remove('img-filters--inactive');

export {showSortButtons, setDebouncedSort};
