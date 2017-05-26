/**
 * Created by sergey on 25.04.17.
 */

import css from '../../css/concede.css';

import ModalView from './modalView';
import Router from '../modules/router/router';
import template2 from '../templates/concede.pug';

const router = new Router();

export default class ConcedeMpModal extends ModalView {
  constructor() {
    super('Выход', template2);
  }
  render() {
    super.render();
    document.querySelector('.choose__yes').addEventListener('click', () => {
      router.go('/');
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      router.go('/mp');
    });
    this.onClose(() => { router.go('/mp'); });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}