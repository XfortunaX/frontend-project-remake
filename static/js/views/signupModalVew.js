/**
* Created by tlakatlekutl on 03.04.17.
*/


import ModalView from './modalView';
import UserModel from '../models/userModel';
import Router from '../modules/router/router';
import template from '../templates/sign_up.pug';

const userModel = new UserModel();
const router = new Router();

export default class SignupModal extends ModalView {
  constructor() {
    super('Signup', template);
  }
  render() {
    super.render();
    this.errorField = document.querySelector('.danger-signup');
    document.querySelector('.signup-submit-button').addEventListener('click', (event) => {
      event.preventDefault();
      if (this.isValid()) {
        this.errorField.style.display = 'none';
        userModel.signup(this.getFormData())
          .then(() => {
            router.go('/');
            this.destruct();
          })
          .catch((error) => { console.log(error); this.showError(error.error); });
      }
    });
    this.onClose(() => router.go('/'));
  }
  show() {
    if (!userModel.isAuthorised()) {
      super.show();
      this.hideError();
    } else {
      router.go('/');
    }
  }
  showError(errorText) {
    this.errorField.innerHTML = errorText;
    this.errorField.style.display = 'block';
  }
  hideError() {
    this.errorField.style.display = 'none';
  }
  isValid() {
    this.nickname = document.querySelector('.signup-nickname-input').value;
    this.password = document.querySelector('.signup-password-input').value;
    this.repeatPassword = document.querySelector('.signup-password-repeat').value;
    this.email = document.querySelector('.signup-email-input').value;

    if (this.nickname === '') {
      this.showError('Имя не может быть пустым');
      return false;
    }
    if (this.password === '') {
      this.showError('Пароль не может быть пустым');
      return false;
    }
    if (this.repeatPassword === '') {
      this.showError('Повторите пароль');
      return false;
    }
    if (this.password !== this.repeatPassword) {
      this.showError('Пароли не совпадают');
      return false;
    }
    if (this.email === '') {
      this.showError('Email не может быть пустым');
      return false;
    }
    return true;
  }
  getFormData() {
    return {
      login: this.nickname,
      password: this.password,
      email: this.email,
    };
  }
}
