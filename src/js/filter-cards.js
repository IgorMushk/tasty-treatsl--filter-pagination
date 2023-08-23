import debounce from 'lodash.debounce';
//import { Notify } from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import Notiflix from 'notiflix';
import { createMarkup } from './recipe-cardsRender';
import { TastyApiService } from './tasty-service'; // recipe-cardsApi
import { GetLists } from './lists-service';
import { addToFavorites } from './add-to-favorites';

const galleryRecipesRef = document.querySelector('.js-gallery');
const searchQueryTitleRef = document.querySelector('.input-search');
const seachQueryTimeRef = document.querySelector('.time-selector');
const seachQueryAreasRef = document.querySelector('.area-selector');
const selectQueryIngredientsRef = document.querySelector(
  '.ingredients-selector'
);
const btnResetFilterRef = document.querySelector('.reset-filter');
const loaderIndicatorRef = document.querySelector('.loader');
const btnPaginationBarRef = document.querySelector('.pagination-bar');
const formFilters = document.querySelector('.filter-form');

//  - Pagination -
const backToFirstPage = document.querySelector('#pag-btn-start');
const pageOneBtn = document.querySelector('#pag-btn-1');
const pageTwoBtn = document.querySelector('#pag-btn-2');
const pageThreeBtn = document.querySelector('#pag-btn-3');
const lastPageBtn = document.querySelector('#pag-btn-last');
const nextPagePagBtn = document.querySelector('#pag-btn-next');
const buttonNumered = document.querySelectorAll('.pag-btn-number');
const previousPageButton = document.querySelector('#pag-btn-prev');
const btnWithDotsRight = document.querySelector('#pag-btn-dots-right');
const btnWithDotsLeft = document.querySelector('#pag-btn-dots-left');

backToFirstPage.addEventListener('click', backToFirst);
lastPageBtn.addEventListener('click', loadLastPage);
nextPagePagBtn.addEventListener('click', loadNextPage);
previousPageButton.addEventListener('click', loadPrevPage);
pageOneBtn.addEventListener('click', loadfirstPage);
pageTwoBtn.addEventListener('click', loadPageTwo);
pageThreeBtn.addEventListener('click', loadPageThree);

Notify.init({
  position: 'center-center',
});

let pageNumb = 1;
let totalPages = 0;

const testyApiService = new TastyApiService();
testyApiService.setLimitValue();
//console.log('new TastyApiService:', testyApiService.currentPage);
const getLists = new GetLists();

fetchListAreas();
fetchListIngredients();
fetchRecipesQuery();

function renderGallery(dataArr) {
  galleryRecipesRef.insertAdjacentHTML('beforeend', createMarkup(dataArr));
}

searchQueryTitleRef.addEventListener('input', debounce(onSeachQueryTitle, 500));
seachQueryTimeRef.addEventListener('change', onSeachQueryTime);
seachQueryAreasRef.addEventListener('change', onSeachQueryAreas);
selectQueryIngredientsRef.addEventListener('change', onSeachQueryIngredients);
btnResetFilterRef.addEventListener('click', onResetFilter);
formFilters.addEventListener('submit', onForm);

function onForm(evt) {
  evt.preventDefault();
}

function onSeachQueryTitle(evt) {
  //evt.preventDefault();
  //console.log('inputTitle:', evt.target.value);
  const inputQuery = evt.target.value.trim();
  if (inputQuery === '') return;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTitle(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryTime(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchTime(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryAreas(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchArea(inputQuery);
  fetchRecipesQuery();
}

function onSeachQueryIngredients(evt) {
  //console.log(evt.target.value);
  const inputQuery = evt.target.value;
  //clearRecipesContainer();
  testyApiService.resetPage();
  testyApiService.setSearchIngredient(inputQuery);
  fetchRecipesQuery();
}

function onResetFilter() {
  testyApiService.resetCategory();
  resetFilter();
  //galleryRecipesRef.innerHTML = '';
  //clearRecipesContainer();
  fetchRecipesQuery();
}

function resetFilter() {
  searchQueryTitleRef.value = '';
  seachQueryTimeRef.value = '';
  seachQueryAreasRef.value = '';
  selectQueryIngredientsRef.value = '';
}

function clearRecipesContainer() {
  galleryRecipesRef.innerHTML = '';
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function fetchRecipesQuery() {
  loaderIndicatorRef.classList.remove('is-hidden-pgn');
  btnPaginationBarRef.classList.add('is-hidden-pgn');
  testyApiService
    .fetchRecipes()
    .then(data => {
      //console.log('fetchRecipesQuery', data.results);
      //data.results.length === 0 - !data.results -
      if (data.results.length === 0) {
        Notify.failure('Something went wrong. Please try again!');
        loaderIndicatorRef.classList.add('is-hidden-pgn');
        btnPaginationBarRef.classList.remove('is-hidden-pgn');
        return;
      }
      //
      totalPages = data.totalPages;
      console.log(totalPages);
      clearRecipesContainer();
      renderGallery(data.results);
      addToFavorites();
      changeButtonColor();
      testyApiService.incrementPage;
      loaderIndicatorRef.classList.add('is-hidden-pgn');
      btnPaginationBarRef.classList.remove('is-hidden-pgn');
    })
    .catch(err => console.log(err));
}

function fetchListAreas() {
  getLists
    .fetchListAreas()
    .then(data => {
      //console.log('getLists', data);
      const markup = data
        .map(area => {
          return `<option value="${area.name}" class="area">${area.name}</option>`;
        })
        .join('');
      seachQueryAreasRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}

function fetchListIngredients() {
  getLists
    .fetchListIngredients()
    .then(data => {
      //console.log('ingredient', data);
      const markup = data
        .map(ingredient => {
          return `<option value="${ingredient._id}" class="area">${ingredient.name}</option>`;
        })
        .join('');
      selectQueryIngredientsRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => console.log(err));
}

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
  pageOneBtn.textContent = 1;
  pageTwoBtn.textContent = 2;
  pageThreeBtn.textContent = 3;
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
    console.log('btn:', pageNumb, 'currentPage', testyApiService.currentPage);
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

/////////////////////////////////////////////////////////////////////////////////
// testyApiService
//   .fetchRecipes()
//   .then(data => {
//     console.log(data);
//     console.log(data.results);
//     //createMarkup(data.results);
//     //console.log(createMarkup(data.results));
//     renderGallery(data.results);
//   })
//   .catch(err => console.log(err));
////////////////////////////////////////////////////////////////////////////////
// function createMarkup(recipes) {
//   /*
//   area
//   category
//   2 description: "A French dessert consisting of layers of chocolate sponge cake and chocolate ganache, typically topped with chocolate glaze and chocolate decorations."
//   ingredients []
//   instructions
//   4 preview "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg"
//   3 rating 4.93 + generateStars
//   tags []
//   thumb
//   time
//   1 title: "Chocolate Gateau"
//   youtube
//   5 _id "6462a8f74c3d0ddd28897fc1"
//    */
//   //console.log('Recipes:', recipes);
//   return recipes
//     .map(
//       recipe => `<li class="card-item">
//           <div class="card-block">
//             <img class="card-image" src="${recipe.preview}" alt="${recipe.title}" width="335px">
//         <div class="heart-block">
//           <input type="checkbox" class="card-checkbox" id="card-checkbox-${recipe._id}" aria-label="card-checkbox-${recipe._id}" />
//           <label for="card-checkbox-${recipe._id}" class="card-checkbox-label">
//             <span class="unchecked-heart">
//             <svg class="heartIconGrey" width="18" height="18">
//                 <use href="./images/sprite.svg#icon-search"></use>
//               </svg></span>
//             <span class="checked-heart">
//             <svg class="heartIconWhite" width="18" height="18">
//                 <use href="./images/sprite.svg#icon-search"></use>
//               </svg></span>
//             </span>
//           </label>
//         </div>
//             <div class="card-content">
//               <h3 class="card-heading">${recipe.title}</h3>
//               <p class="card-description">${recipe.description}</p>
//             </div>
//             <div class="card-bottom">
//               <div class="card-rating-block">
//                 <p class="card-rating">${recipe.rating}</p>
//                 <div class="eating-stars">generateStars(recipe.rating)</div>
//               </div>
//               <button class="card-button" data-id="${recipe._id}">See recipe</button>
//             </div>
//           </div>
//         </li>`
//     )
//     .join('');
// }
