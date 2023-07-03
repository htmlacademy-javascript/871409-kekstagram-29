import {getRandomArrayElement, createRandomIdFromRangeGenerator, getRandomInteger} from './util.js';

const NAMES = [
  'Петя',
  'Вася',
  'Коля',
  'Оля',
  'Галя',
  'Наташа'
];

const DESCRIPTION = [
  'Я считаю, что снимок получился',
  'Перед нами инетерсное фото',
  'Давайте рассмотрим фото внимательнее',
  'Это мое любимое фото',
  'я на море',
  'это мы',
  'как же круто'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const ID_MIN = 1;
const ID_MAX = 25;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const COMMENT_MIN = 0;
const COMMENT_MAX = 30;


const getRandomId = createRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const getRandomUrl = createRandomIdFromRangeGenerator(ID_MIN, ID_MAX);

const getComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const getRandomComments = Array.from({length: getRandomInteger(COMMENT_MIN, COMMENT_MAX)}, getComment);

const getRandomArrayObject = () => ({
  name: getRandomArrayElement(NAMES),
  id: getRandomId(),
  url: `photos/${getRandomUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comment: getRandomComments,
});

const getRandomPhoto = Array.from({length: 25}, getRandomArrayObject);
export {getRandomPhoto};

