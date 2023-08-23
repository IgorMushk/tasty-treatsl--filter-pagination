// BLock pagination from (filter-cards) recipe-cards.js

import { pageNumb, totalPages } from './pagination-var';
import { refs } from './pagination-refs';

//  - Pagination -
// const backToFirstPage = document.querySelector('#pag-btn-start');
// const pageOneBtn = document.querySelector('#pag-btn-1');
// const pageTwoBtn = document.querySelector('#pag-btn-2');
// const pageThreeBtn = document.querySelector('#pag-btn-3');
// const lastPageBtn = document.querySelector('#pag-btn-last');
// const nextPagePagBtn = document.querySelector('#pag-btn-next');
// const buttonNumered = document.querySelectorAll('.pag-btn-number');
// const previousPageButton = document.querySelector('#pag-btn-prev');

// backToFirstPage.addEventListener('click', backToFirst);
// lastPageBtn.addEventListener('click', loadLastPage);
// nextPagePagBtn.addEventListener('click', loadNextPage);
// previousPageButton.addEventListener('click', loadPrevPage);
// pageOneBtn.addEventListener('click', loadfirstPage);
// pageTwoBtn.addEventListener('click', loadPageTwo);
// pageThreeBtn.addEventListener('click', loadPageThree);

function backToFirst() {
  testyApiService.resetPage();
  refs.pageOneBtn.textContent = 1;
  refs.pageTwoBtn.textContent = 2;
  refs.pageThreeBtn.textContent = 3;
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadLastPage() {
  // pageNumb ->> totalPages
  // if (window.innerWidth < 768) {
  //   pageNumb = 48;
  // } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
  //   pageNumb = 36;
  // } else {
  //   pageNumb = 32;
  // }

  if (window.innerWidth < 768) {
    //for limit = 6;
    pageNumb = 48;
  } else if (window.innerWidth < 1280) {
    //for limit = 8;
    pageNumb = 36;
  } else {
    //for limit = 9;
    pageNumb = 32;
  }
  //if ((testyApiService.currentPage = totalPages)) return;
  pageNumb = totalPages;
  pageThreeBtn.textContent = pageNumb;
  pageTwoBtn.textContent = pageNumb - 1;
  pageOneBtn.textContent = pageNumb - 2;
  //galleryRecipesRef.innerHTML = '';
  testyApiService.setCurrentPage(pageNumb);
  fetchRecipesQuery();
}

function loadNextPage() {
  console.log('loadNextPage - page: ', testyApiService.currentPage);
  if (testyApiService.currentPage === totalPages) return;
  // if (testyApiService.currentPage === 32) {
  //   return;
  // }
  buttonNumered.forEach(button => {
    button.textContent++;
    // pageNumb=button.textContent
  });
  // nextPage = pageNumb + 1;
  testyApiService.incrementPage();
  //loadPage(nextPage);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPrevPage() {
  if (testyApiService.currentPage === 1) return;
  //console.log('loadPrevPage --- ','on Btn ', pageOneBtn.textContent, 'currentPage', testyApiService.currentPage);
  if (pageOneBtn.textContent != '1') {
    //if (parseInt(pageOneBtn.textContent) > 2) {
    buttonNumered.forEach(button => {
      button.textContent--;
      // pageNumb=button.textContent
    });
  } else return;

  //prevPage = pageNumb - 1;
  testyApiService.decrementPage();
  // loadPage(prevPage);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadfirstPage() {
  if (totalPages <= 3 && testyApiService.currentPage === 1) return;
  const pageNumb = parseInt(pageOneBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageTwo() {
  const pageNumb = parseInt(pageTwoBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function loadPageThree() {
  const pageNumb = parseInt(pageThreeBtn.textContent);
  testyApiService.setCurrentPage(pageNumb);
  //galleryRecipesRef.innerHTML = '';
  fetchRecipesQuery();
}

function changeButtonColor() {
  buttonNumered.forEach(button => {
    const pageNumb = parseInt(button.textContent);
    //console.log(pageNumb);
    //console.log('btn:', pageNumb, 'currentPage', testyApiService.currentPage);
    if (testyApiService.currentPage === pageNumb) {
      button.classList.add('pag-btn-on-hover');
    } else {
      button.classList.remove('pag-btn-on-hover');
    }
  });
  //
  if (testyApiService.currentPage > 32 - 2) {
    btnWithDotsRight.classList.add('btn_hidden');
  } else {
    btnWithDotsRight.classList.remove('btn_hidden');
  }
  //
  if (testyApiService.currentPage > 3) {
    btnWithDotsLeft.classList.remove('btn_hidden');
  } else {
    btnWithDotsLeft.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 3) {
    btnWithDotsRight.classList.add('btn_hidden');
    btnWithDotsLeft.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 2) {
    pageThreeBtn.classList.add('btn_hidden');
  }
  //
  if (totalPages <= 1) {
    pageTwoBtn.classList.add('btn_hidden');
  }
}

export {
  backToFirst,
  loadLastPage,
  loadNextPage,
  loadPrevPage,
  loadfirstPage,
  loadPageTwo,
  loadPageThree,
  changeButtonColor,
};
