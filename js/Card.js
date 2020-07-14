import { galleryContainer, galleryTemplate, pictureBig, pictureImage, pictureTitle, escapeClose, close, open, pictureBigClose } from './index.js'

//Класс карточки с городом

export class Card { //Объявляем класс
    constructor(name, link, cardSelector) { //Собираем в конструктор все необходимые свойства
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
    }

    _getTemplate() { //Метод получения доступа к разметке и template
      const cardElement = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
      return cardElement;
    }

    _like() { //Метод лайка
      this._element.querySelector('.gallery__link').classList.toggle('gallery__link_active');
    }

    _zoom() { //Метод зума
      pictureImage.src = this._link
      pictureImage.alt = this._name;
      pictureTitle.textContent = this._name;
      open(pictureBig);
    }

    _close() { //Метод закрытия зума
      close(pictureBig);
    }

    _delete() { //Метод удаления карточки
      this._element.remove();
    }

    _setEventListeners() { //Устанавливаем классу слушатели событий
      this._element.querySelector('.gallery__link').addEventListener('click', () => {
        this._like()
      });

      this._element.querySelector('.gallery__image').addEventListener('click', () => {
        this._zoom()
      });

      pictureBigClose.addEventListener('click', () => {
        this._close();
      })

      this._element.querySelector('.gallery__delete').addEventListener('click', () => {
        this._delete()
      });
    }


    generateCard() { //Метод добавления карточки в разметку и подготовки к публикации
      this._element = this._getTemplate(); //Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
      this._setEventListeners(); //Добавим слушатели событий

      this._element.querySelector('.gallery__image').src = this._link; //Добавим данные
      this._element.querySelector('.gallery__title').textContent = this._name;

      return this._element; //Вернём элемент наружу
    }
  }
