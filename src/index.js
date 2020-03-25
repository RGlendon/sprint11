// Первый файл, куда посмотрит вебпак, это файл index.js. Для того чтобы вебпак нашёл стили, их нужно подключить к файлу index.js.
import "./style.css";

import Api from "../scripts/api";
import Card from "../scripts/card";
import CardList from "../scripts/cardList";
import {Popup, PopupEdit, PopupImage} from "../scripts/popup";
import UserInfo from "../scripts/userInfo";
import FormValidation from "../scripts/formValidation";


//переменные

const placesList = document.querySelector('.places-list');

const form = document.forms.new;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;

const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort8',
  headers: {
    authorization: '1c79499c-fe85-411d-bd1a-591ef36b3252',
    'Content-Type': 'application/json'
  }
});

const card = new Card();
const userInfo = new UserInfo(document.querySelector('.user-info'), api);
const cardList = new CardList(placesList, api, card, userInfo);

Promise.all([
  api.getInitialCards(),
  api.getUserInfo()
])
  .then(([initialCards, user]) => {
    // console.log(initialCards);
    // console.log(user);
    userInfo.setUserInfo(user);
    userInfo.displayUserInfo();
    cardList.render(initialCards);
  });


process.env.NODE_ENV === 'production' ? console.log('welcome to production') : console.log('welcome to development');


const popup = new Popup(document.querySelector('.popup_add'));
const popupAvatar = new Popup(document.querySelector('.popup_avatar'));
const popupEdit = new PopupEdit(document.querySelector('.popup_edit'));
const popupImage = new PopupImage(document.querySelector('.popup_image'));



new FormValidation(form);
new FormValidation(formEdit);
new FormValidation(formAvatar);



//Функции-обработчики

function open(event) {
  //открываем popup для добавления новой картинки
  if (event.target.matches('.user-info__button')) {
    popup.open();
    form.reset();
  }
  if (event.target.classList.contains('user-info__edit-button')) {
    popupEdit.fillInputs(formEdit, userInfo);
    popupEdit.open();
  }
  if (event.target.matches('.place-card__image')) {
    popupImage.open(event.target.style.backgroundImage.slice(5, -2));
  }
  if (event.target.matches('.user-info__photo')) {
    popupAvatar.open();
    formAvatar.reset();
  }
}





function edit(event) {
  event.preventDefault();
  popupEdit.renderLoading(true);
  api.updateUserInfo(formEdit.elements.fullName.value, formEdit.elements.infoJob.value)
    .then(user => {
      userInfo.setUserInfo(user);
      userInfo.displayUserInfo();
    })
    .finally(() => {
      popupEdit.renderLoading(false);
      popupEdit.close();
    });
}


function addNew(event) {
  event.preventDefault();
  popup.renderLoading(true);
  api.addNewCard(form.elements.name.value, form.elements.link.value)
    .then(card => {
      // console.log(card);
      cardList.addCard(card);
    })
    .finally(() => {
      popup.renderLoading(false);
      popup.close();
      form.reset();
    });
}

function avatar(event) {
  event.preventDefault();
  popupAvatar.renderLoading(true);
  api.changeAvatar(formAvatar.elements.avatarLink.value)
    .then(user => {
      userInfo.setUserInfo(user);
      userInfo.displayUserInfo();
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
      popupAvatar.close();
      formAvatar.reset();
    });


}


//слушатели

document.body.addEventListener('click', open);
form.addEventListener('submit', addNew);
formEdit.addEventListener('submit', edit);
formAvatar.addEventListener('submit', avatar);


// Добрый день! Большая просьба, засчитать эту работу после проверки, т.к. я уезжаю на 4 дня, и не знаю смогу ли в дороге прислать вам. 
// исправленный вариант (у нас жесткий дедлайн).
// PS: После приезда я обязательно исправлю все ваши замечания, так что не сдерживайте себя=)

 /**
 * Здравствуйте. Ну у вас очень хорошая работа. Только Вам надо исправить в классе popup распределить классы  по файлам. 
 * Остальное всё отлично
 * --------------------------------------------------------------------
 * Весь функционал работает корректно 
 * Код чистый и хорошо читается 
 * Вы используете логические группировки операций 
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование
 * -------------------------------------------------------------------- 
    
  * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
  * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
  * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 *
 * можно лучше: Старайтесь не объявлять большое количество переменных. Чем больше переменных, тем сложнее понимать за что они 
 * отвечают и какую полезную нагрузку несут в коде. Лучше инкапсулировать(прятать) переменные в функциях. 
 * В будущем вам проще будет искать ошибки и разбираться в сложных взаимосвязях
 *
 *  
 *  
 */


