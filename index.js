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

