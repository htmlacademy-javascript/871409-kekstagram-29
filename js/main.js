import {getData} from './api.js';
import {createMiniPhoto} from './mini-picture.js';
import {onFormSubmit} from './form.js';
import './form.js';
import {showAlert} from './util.js';
import {showSortButtons, setDebouncedSort} from './filters.js';
import './upload-photo.js';


getData()
  .then((pictures) => {
    createMiniPhoto(pictures);
    showSortButtons();
    setDebouncedSort(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

onFormSubmit();

