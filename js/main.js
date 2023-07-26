import {getData} from './api.js';
import {createMiniPhoto} from './mini-picture.js';
//import {getRandomPhoto} from './data.js';
import { formSubmit } from './form.js';
import './form.js';
import {showAlert} from './util.js';


getData()
  .then((pictures) => {
    createMiniPhoto(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

formSubmit();

