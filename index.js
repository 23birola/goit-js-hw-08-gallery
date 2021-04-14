import gallery from "./gallery-items.js";

function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
  }).join('');
};

const galleryList = document.querySelector("ul.js-gallery");
const modal = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const modalImage = document.querySelector('.js-lightbox img');
const closeBtn = document.querySelector("button[data-action=close-lightbox]");

galleryList.insertAdjacentHTML('afterbegin', createGalleryMarkup(gallery));

galleryList.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.add('is-open');
  modalImage.src = e.target.dataset.source;
  return;
});


closeBtn.addEventListener('click', () => {
  if (modal.classList.contains('is-open')) {
    modal.classList.remove('is-open');
    modalImage.src = "";
  }
  return;
});

overlay.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  if (modal.classList.contains('is-open')) {
    modal.classList.remove('is-open');
    modalImage.src = "";
  }
  return;
});

window.addEventListener('keydown', (e) => {
  if (e.code !== "Escape") {
    return;
  }
  if (modal.classList.contains('is-open')) {
    modal.classList.remove('is-open');
    modalImage.src = "";
  }
  return;
});

  let index = 0;
  for (let i = 0; i < gallery.length; i += 1) {
    if (gallery[i].original === modalImage.src) {
      index = i;
    }
  }
 
  window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
      if (index !== gallery.length - 1) {
        index += 1;
      } else { index = 0; }
      modalImage.src = gallery[index].original;
      return;
    }
  })
   
  window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") {
      if (index !== 0) {
        index -= 1;
      } else { index = gallery.length - 1; }
      modalImage.src = gallery[index].original;
      return;
    }
  })

