import { FechRecipe } from './fechRecipeApi';

const LOCAL_KEY = 'favorites';

export function addToFavorites() {
  const heartCheckBoxRef = document.querySelectorAll('.card-checkbox');

  heartCheckBoxRef.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });

  let selectedHeart = []; // from local storage
  checkAndReadStorage();

  function onCheckboxChange(evt) {
    const checkbox = evt.target;
    const checkboxId = checkbox.id;
    const checkboxCategory = checkbox.dataset.category;

    if (checkbox.checked) {
      selectedHeart.push({ id: checkboxId, category: checkboxCategory });
    } else {
      index = selectedHeart.findIndex(cardHeart => cardHeart.id == checkboxId);
      selectedHeart.splice(index, 1);
    }
    const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeart);
    localStorage.setItem('favorites', heartCheckBoxElLocalStorage);
  }

  function checkAndReadStorage() {
    const storedData = localStorage.getItem('favorites');
    if (storedData) {
      selectedHeart = JSON.parse(storedData);
      heartCheckBoxRef.forEach(checkbox => {
        const checkboxId = checkbox.id;

        selectedHeart.forEach(favoriteId => {
          if (checkboxId === favoriteId.id) {
            checkbox.checked = true;
          }
        });
      });
    }
  }
}

////////////////////////// Ok - favorites
// import { FechRecipe } from './fechRecipeApi';

// const LOCAL_KEY = 'favorites';

// export function addToFavorites() {
//   const heartCheckBoxRef = document.querySelectorAll('.card-checkbox');
//   //console.log('heartCheckBoxRef :', heartCheckBoxRef);

//   heartCheckBoxRef.forEach(checkbox => {
//     checkbox.addEventListener('change', onCheckboxChange);
//   });

//   let selectedHeart = []; // from local storage
//   checkAndReadStorage();

//   // Для запроса карточки по ID
//   // const fechRecipe = new FechRecipe();
//   //console.log(fechRecipe);

//   function onCheckboxChange(evt) {
//     const checkbox = evt.target;
//     //console.dir(evt.target);
//     //console.log(evt.target.id);
//     //console.log(evt.target.dataset.category);
//     console.log(selectedHeart);

//     const checkboxId = checkbox.id;
//     const checkboxCategory = checkbox.dataset.category;
//     // Запрос карточки рецепта по ID
//     //------------------------------
//     //------------------------------

//     // Idcard-to-or-from-Arr
//     console.log('arr-begin: ', selectedHeart);
//     console.log('select:', checkbox.checked);
//     if (checkbox.checked) {
//       console.log('else-inp');
//       selectedHeart.push({ id: checkboxId, category: checkboxCategory });
//     } else {
//       console.log('else-del');
//       index = selectedHeart.findIndex(cardHeart => cardHeart.id == checkboxId);
//       //if (index !== -1) {
//       selectedHeart.splice(index, 1);
//       //}
//     }
//     const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeart);
//     localStorage.setItem('favorites', heartCheckBoxElLocalStorage);
//     console.log('arr-end: ', selectedHeart);
//   }

//   function checkAndReadStorage() {
//     const storedData = localStorage.getItem('favorites');
//     //console.log('localStor: ', storedData);
//     if (storedData) {
//       selectedHeart = JSON.parse(storedData);
//       ////console.log('selectedHeart-from-Local-Storage: ', selectedHeart);

//       heartCheckBoxRef.forEach(checkbox => {
//         const checkboxId = checkbox.id;
//         ////console.log('from-card: ', checkboxId);
//         ////console.log('------------------------------------------');
//         selectedHeart.forEach(favoriteId => {
//           ////console.log(favoriteId.id);
//           if (checkboxId === favoriteId.id) {
//             checkbox.checked = true;
//             ////console.log('True: -----------------', favoriteId.id);
//           }
//         });
//       });
//     }
//   }
// }

////////////////////////// Ok - favoriteRecipe -
// import { FechRecipe } from './fechRecipeApi';

// export function addToFavorites() {
//   const heartCheckBoxRef = document.querySelectorAll('.card-checkbox');
//   //console.log('heartCheckBoxRef :', heartCheckBoxRef);

//   heartCheckBoxRef.forEach(checkbox => {
//     checkbox.addEventListener('change', onCheckboxChange);
//   });

//   let selectedHeart = [];
//   checkAndReadStorage();

//   // Для запроса карточки по ID
//   // const fechRecipe = new FechRecipe();
//   //console.log(fechRecipe);

//   function onCheckboxChange(evt) {
//     const checkbox = evt.target;
//     //console.dir(evt.target);
//     //console.log(evt.target.id);

//     const checkboxId = checkbox.id;
//     // Запрос карточки рецепта по ID

//     //

//     // Idcard-to-or-from-Arr
//     //console.log('arr-begin: ', selectedHeart);
//     if (checkbox.checked) {
//       selectedHeart.push(checkboxId);
//     } else {
//       const index = selectedHeart.indexOf(checkboxId);
//       if (index !== -1) {
//         selectedHeart.splice(index, 1);
//       }
//     }
//     const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeart);
//     localStorage.setItem('favoriteRecipe', heartCheckBoxElLocalStorage);
//     //console.log('arr-end: ', selectedHeart);
//   }

//   function checkAndReadStorage() {
//     const storedData = localStorage.getItem('favoriteRecipe');
//     if (storedData) {
//       selectedHeart = JSON.parse(storedData);

//       heartCheckBoxRef.forEach(checkbox => {
//         const checkboxId = checkbox.id;
//         if (selectedHeart.includes(checkboxId)) {
//           checkbox.checked = true;
//         }
//       });
//     }
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////
//- export function addToFavorite() {
//-   const heartCheckBoxEl = document.querySelectorAll('.card-checkbox'); // масив усіх інпутів чекбоксів

//-  let selectedHeartCheckBox = [];

//   // Функція для обробки зміни стану чекбоксів

//   function handleCheckboxChange(event) {
//     const checkbox = event.target; // елемент на який клікаємо <input>

//     const checkboxId = checkbox.id;

//     // дістати всю інформацію з картки за запушити її у масив

//     if (checkbox.checked) {
//       selectedHeartCheckBox.push(checkboxId);
//     } else {
//       // Перевіряємо, чи елемент міститься у списку вибраних перед тим, як його видалити
//       const index = selectedHeartCheckBox.indexOf(checkboxId);
//       if (index !== -1) {
//         selectedHeartCheckBox.splice(index, 1);
//       }
//     }

//     // console.log(selectedHeartCheckBox); // правильно виводиться масив з даними

//     const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeartCheckBox);
//     localStorage.setItem('inFavorite', heartCheckBoxElLocalStorage);
//   }

//-   // Додаємо обробник подій для кожного чекбокса
//-   heartCheckBoxEl.forEach(checkbox => {
//-     checkbox.addEventListener('change', handleCheckboxChange);
//-   });

//   // Перевіряємо, чи є збережені дані в локальному сховищі
//   const storedData = localStorage.getItem('inFavorite');
//   if (storedData) {
//     // Розпарсуємо дані з локального сховища назад у масив
//     selectedHeartCheckBox = JSON.parse(storedData);

//     // Відновлюємо стан чекбоксів на основі збережених значень
//     heartCheckBoxEl.forEach(checkbox => {
//       const checkboxId = checkbox.id;
//       if (selectedHeartCheckBox.includes(checkboxId)) {
//         checkbox.checked = true;
//       }
//     });
//   }
// }
