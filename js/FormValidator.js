
import { inputList, validationConfig } from './index.js';


//Класс валидатора

export class FormValidator { //Объявляем класс
  constructor(validationConfig, form) { //Собираем в конструктор все необходимые данные
    this._form = form;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig._inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  };

  _showInputError (form, elem, errorMessage) { //Метод появления ошибок при вводе некорректных данных
    const errorElement = form.querySelector(`#${elem.id}-error-message`);
    elem.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (form, elem) { //Метод скрытия ошибок при вводе корректных данных
    const errorElement = form.querySelector(`#${elem.id}-error-message`);
    elem.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _isValid (form, formInput) { //Метод определения корректности введенных данных
    if (!formInput.validity.valid) {
      this._showInputError(form, formInput, formInput.validationMessage);
    }
    else {
      this._hideInputError(form, formInput);
    }
  };

  _hasInvalidInput (inputList) { //Метод, сигнализирующий о некорректных данных для того, чтобы сделать кнопку сабмит неактивной
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement) { //Метод, который делает кнопку сабмит активной или неактивной в зависимости от введенных данных
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;

    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners (form) { //Установим для валидатора слушатели событий
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._isValid(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  };

  enableValidation () { //Метод включения валидации
      this._setEventListeners(this._form);
  };

};











