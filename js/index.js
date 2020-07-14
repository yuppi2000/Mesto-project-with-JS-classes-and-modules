
import {Card} from './Card.js';
import { FormValidator } from './FormValidator.js';

//Объявление переменных

const formElement = document.querySelector('.popup'); //Находим элемент попапа редактирования профиля
const form = document.querySelector('.popup__form'); //Находим форму редактирования профиля
const formEdit = document.querySelector('.profile__edit-btn'); //Находим кнопку карандаш для открытия попапа редактирования профиля
const formClosed = document.querySelector('.popup__close'); //Находим кнопку крестик для закрытия попапа редактирования профиля
const nameInput = document.querySelector('.popup__info_name'); //Находим место в разметке для отображения имени
const jobInput = document.querySelector('.popup__info_job'); //Находим место в разметке для отображения профессии
const name = document.querySelector('.profile__name'); //Находим поле ввода для редактирования имени
const job = document.querySelector('.profile__job'); //Находим поле ввода для редактрования профессии
export const galleryContainer = document.querySelector('.gallery__container'); //Находим пустой контейнер для карточек с городами
export const galleryTemplate = document.querySelector('#gallery__template').content; //Находим template карточки
const addFormElement = document.querySelector('.popup-add-card'); //Находим элемент попапа для добавления новой карточки
const addForm = document.querySelector('.popup-add-card__form'); //Находим форму для добавления новой карточки
const addButton = document.querySelector('.profile__add-btn'); //Находим кнопку, открывающую элемент попапа для добавления новой карточки
const addFormClosed = document.querySelector('.popup-add-card__close'); //Находим кнопку, закрывающую элемент попапа для добавления новой карточки
const addCardNameInput = document.querySelector('.popup-add-card__info_name'); //Находим поле ввода для добавления названия места
const addCardLinkInput = document.querySelector('.popup-add-card__info_link'); //Находим поле ввода для добавления ссылки на фото места
const addFormSave = document.querySelector('.popup-add-card__save'); //Находим кнопку сохранения внесенных данных в новую карточку
export const pictureBig = document.querySelector('.popup_picture_big'); //Находим элемент зума
export const pictureImage = document.querySelector('.popup__big-image'); //Находим увеличенное фото места
export const pictureTitle = document.querySelector('.popup__image-title'); //Находим подпись названия места
export const pictureBigClose = document.querySelector('.popup__image-close'); //Находим кнопку крестик, закрывающую элемент зума
export const inputList = Array.from(document.querySelectorAll('input')); //Находим массив всех полей ввода

const initialCards = [ //Массив с данными для карточек городов
  {
      name: 'Тель-Авив',
      link: 'https://avatars.mds.yandex.net/get-pdb/1608049/28890b74-7e98-4851-8a55-c85bce39daaf/s1200?webp=false'
  },
  {
      name: 'Прага',
      link: 'https://cs.pikabu.ru/post_img/big/2013/02/01/1/1359668928_1641023467.jpg'
  },
  {
      name: 'Париж',
      link: 'https://avatars.mds.yandex.net/get-pdb/989257/b3754e0a-7f09-4b8d-bd7d-857017190632/s1200?webp=false'
  },
  {
      name: 'Рим',
      link: 'https://i.artfile.ru/3400x2219_223030_[www.ArtFile.ru].jpg'
  },
  {
      name: 'Барселона',
      link: 'https://avatars.mds.yandex.net/get-zen_doc/15270/pub_5c8a82dcd1aa0c00b27f0c5d_5c8a832744a47600b4fac073/scale_1200'
  },
  {
      name: 'Лондон',
      link: 'https://avatars.mds.yandex.net/get-zen_doc/1593402/pub_5c9394eba060d700b3d2448c_5c93958362c99e00b3e1c0f8/scale_1200'
  }
];

export const validationConfig = {
  form: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_error',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error-message_active'
};


//Функции

//Функция закрытия попапа по нажатию на Esc
export function escapeClose(evt) {
  if (evt.key === 'Escape') {
    close(document.querySelector('.popup_opened'));
  };
};

//Функция открытия попапа
export function open(elem)  {
  elem.classList.add('popup_opened');
  document.body.addEventListener('keydown', escapeClose);
}

//Функция закрытия попапа
export function close(elem) {
  elem.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', escapeClose);
};


//Функция очищения полей ввода от ошибок
function clearError (elem) {
  const errorSpanList = elem.querySelectorAll('.popup__error-message');
  const errorInputList = Array.from(elem.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = elem.querySelector(validationConfig.submitButtonSelector);

  elem.querySelector(validationConfig.form).reset();

  errorSpanList.forEach((span) => {
    span.classList.remove(validationConfig.errorClass);
  });
  errorInputList.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  });

}


//Функция сохранения внесенных данных в форму редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  close(formElement);
}


//Функция загрузки карточек с данными из массива на сайт
function addElement () {
  initialCards.forEach((item) => { //Переберем элементы массива
    const card = new Card(item.name, item.link); //Создадим экземпляр карточки
    const cardElement = card.generateCard(); //Создаём карточку и возвращаем наружу
    galleryContainer.append(cardElement); //Добавляем в DOM
  });
}


//Функция добавления новой карточки
function addNewCard (evt) {
  evt.preventDefault();

  const object = {};
    object.link = addCardLinkInput.value;
    object.name = addCardNameInput.value;

  const card = new Card(object.name, object.link); //Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  galleryContainer.prepend(cardElement); //Добавляем карточку в DOM
  close(addFormElement); //Закрываем форму
}

function startValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form')); // массив форм
  forms.forEach((form) => {
      const valid = new FormValidator(validationConfig, form);
      valid.enableValidation();
  });
}


//Вызовы функций

//Вызываем функцию закрытия попапа по клику на оверлей
document.addEventListener('mousedown', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    close(document.querySelector('.popup_opened'));
  };
  evt.stopPropagation();
});

//Вызываем функцию открытия формы редактирования профиля
formEdit.addEventListener('click', () => {open(formElement); clearError(formElement); startValidation(formElement)});
//Вызываем функцию закрытия формы редактирования профиля
formClosed.addEventListener('click', () => close(formElement));
//Вызываем функцию сохранения внесенных данных в форму редактирования профиля
form.addEventListener('submit', formSubmitHandler);

//Вызываем функцию загрузки карточек
addElement();

//Вызываем функцию открытия формы добавления новой карточки с местом
addButton.addEventListener('click', () => {open(addFormElement); clearError(addFormElement); startValidation(addFormElement)});
//Вызываем функцию закрытия формы добавления новой карточки с местом
addFormClosed.addEventListener('click', () => close(addFormElement));
//Вызываем сохранение внесенных данных в новую карточку
addForm.addEventListener('submit', addNewCard);

//startValidation();//Вызываем функцию валидации данных
