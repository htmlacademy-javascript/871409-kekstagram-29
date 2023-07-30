import {isEscapeKey} from './util.js';

const COMMENTS_LIMIT = 5;
let commentCount = COMMENTS_LIMIT;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const commentItem = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const currentCommentsCountText = document.querySelector('.social__comment-count');
const moreButton = bigPicture.querySelector('.comments-loader');
//const commentsCount = document.querySelector('.comments-count');

const visibleComments = 0;


const createComment = (comment) => {
  const commentElement = commentItem.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const createRenderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const moreComments = () => {
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
    moreButton.onclick = moreComments;
  }

  currentCommentsCountText.textContent = `${commentCount} из ${comments.length} комментариев`;
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
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
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsList.innerHTML = '';
}

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

const fillBigPicture = (post) => {
  openBigPicture();
  commentCount = COMMENTS_LIMIT;
  commentsList.innerHTML = '';
  renderBigPicture(post);
  createRenderComments(post.comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

export{fillBigPicture};
