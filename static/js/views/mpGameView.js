/**
 * Created by tlakatlekutl on 27.03.17.
 */

import Router from '../modules/router/router';
import BaseView from './baseView';
import template from '../templates/mp.pug';
import GameModel from '../models/gameModel';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';
import Game from '../modules/game/play';
import UserModel from '../models/userModel';

const ee = new EvenEmitter();
const router = new Router();
const us = new UserModel();

export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    this.gm = new GameModel();
    // this.render();
    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.time = (new Date).getTime();
      this.game.setStateGame(message.content, this.time);
      // console.log((new Date).getTime() - this.time);
      // this.time = (new Date).getTime();
    });
    ee.on('com.aerohockey.mechanics.requests.StartGame$Request', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setOpponent(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.ServerDetailSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setChangeGame(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.GameOverSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.state = JSON.parse(message.content);
      console.log(this.state);
      this.game.stop();
      if (this.state.changeRating > 0) {
        us.getData().changeRating = this.state.changeRating;
        router.go('/victory');
      } else {
        us.getData().changeRating = this.state.changeRating;
        router.go('/defeat');
      }
    });
    ee.on('print', (message) => {
      this.x.innerHTML = message;
    });
    ee.on('alert', (msg) => { alert(msg); });
    this.alreadyInDOM = false;
  }
  render() {
    super.render();
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    this.addEventListeners();
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concedemp');
    });
    ee.on('destroyGame', ()=> {
      delete this.game;
      const game = document.querySelector('canvas');
      document.body.removeChild(game);
    });
    this.gm.findOpponent();
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new Game('multi');
      this.game.gameProcess();
    }

    const eee = document.querySelector('.game-header');
    eee.style.display = '';
    this.node.hidden = false;
  }
  hide() {
    if (this.alreadyInDOM) {
      // const game = document.querySelector('canvas');
      // game.hidden = true;
      // const eee = document.querySelector('.game-header');
      // eee.hidden = true;
    }
    super.hide();
  }
  addEventListeners() {
    this.x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => {
      this.gm.findOpponent();
    });
    document.querySelector('.goright').addEventListener('click', () => {
      ee.emit('alert', 'OLOLOLO');
    });
  }

}

