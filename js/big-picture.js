import {isEscapeKey} from './util.js';

const COMMENTS_LIMIT = 5;
let commentCount = COMMENTS_LIMIT;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const socialComment = commentsList.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const moreButton = bigPicture.querySelector('.comments-loader');

const visibleComments = 0;


const createComment = (comment) => {
  const commentItem = socialComment.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

const createRenderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const getMoreComments = () => {
    commentCount += COMMENTS_LIMIT;
    createRenderComments(comments);
  };
  comments.slice(visibleComments, commentCount).forEach((comment) => {
    fragment.append(createComment(comment));
  });
  commentsList.innerHTML = '';
  commentsList.append(fragment);

  if (commentCount >= comments.length) {
    commentCount = comments.length;
    moreButton.classList.add('hidden');
  } else {
    moreButton.classList.remove('hidden');
    moreButton.onclick = getMoreComments;
  }

  socialCommentCount.textContent = `${commentCount} из ${comments.length} комментариев`;
};

const renderBigPicture = (img) => {
  commentsList.innerHTML = '';
  commentCount = COMMENTS_LIMIT;
  bigPicture.querySelector('.big-picture__img img').src = img.url;
  bigPicture.querySelector('.social__caption').textContent = img.description;
  bigPicture.querySelector('.likes-count').textContent = img.likes;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsList.innerHTML = '';
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', buttonCloseClickHandler);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsList.innerHTML = '';
  bigPictureCancel.removeEventListener('click', buttonCloseClickHandler);
};

function buttonCloseClickHandler (evt) {
  evt.preventDefault();
  closeBigPicture();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const fillBigPicture = (post) => {
  openBigPicture();
  commentCount = COMMENTS_LIMIT;
  commentsList.innerHTML = '';
  renderBigPicture(post);
  createRenderComments(post.comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

export{fillBigPicture};
