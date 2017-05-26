/**
 * Created by sergey on 21.04.17.
 */

import { Platform } from './platform';
import { Ball } from './ball';
import { Barrier } from './barrier';
import { Ground } from './ground';
import GameModel from '../../models/gameModel';
import EvenEmitter from '../eventEmitter/eventEmitter';
import UserModel from '../../models/userModel';
import Player from './player';

const gm = new GameModel();
const ee = new EvenEmitter();
const us = new UserModel();

export default class MultiStrategy {

  constructor() {

    this.play = true;
    this.time = (new Date).getTime();
    this.pres = 0;
    this.timeLast = (new Date).getTime();

    this.player1 = new Player(us.getData().nickname, 0, us.getData().rating);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.8;
    this.y = this.x * 0.56;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 120 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new Ground(this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 10, z: 232.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformMy = new Platform(0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 10, z: 7.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformEnemy = new Platform(1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 10, z: 220 };
    this.radius = 5;
    this.ball = new Ball(0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 300;
    this.camera.lookAt(this.ground.getPosition());

    this.addEventListeners();
  }

  render() {
    this.keyboard2.update();

    this.pres = 0;

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.keyboard2.down('space')) {
      this.control('space');
    }

    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('touchend', (event) => {
      if(event.changedTouches[0].clientX < canvas.getBoundingClientRect().left + canvas.getBoundingClientRect().width / 2) {
        this.control('left');
      } else {
        this.control('right');
      }
      // this.control('left');
    });
  }

  animationScene() {
    this.render();
    this.time = (new Date).getTime();

    if(this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    this.controller = 1;
    if(this.pres === 0) {
      this.pres = 1;
      this.del = 20;
    } else {
      this.time = (new Date).getTime();
      this.del = this.time - this.timeLast;
    }
    this.timeLast = (new Date).getTime();
    if(this.del > 100) {
      this.del = 20;
    }
    if (button === 'left') {
      gm.sendButton('left', this.del);
    } else if (button === 'right') {
      gm.sendButton('right', this.del);
    } else if (button === 'space') {
      gm.sendButton('space', this.del);
    }
  }

  setStateGame(state) {
    // console.log(us);
    this.state = state;

    if(us.getData().id === this.state.players[0].userId) {
      this.player1.setScore(this.state.players[0].score);
      this.player2.setScore(this.state.players[1].score);
    } else {
      this.player1.setScore(this.state.players[1].score);
      this.player2.setScore(this.state.players[0].score);
    }

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    if(us.getData().id === this.state.players[0].userId) {
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    } else {
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    }
  }

  setOpponent(state) {
    console.log(state);
    this.state = state;
    this.player2 = new Player(this.state.opponentLogin, 0, this.state.opponentRating);
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
  }

  stop() {
    this.play = false;
    this.keyboard2.destroy();
  }

  resume() {
    this.play = true;
    this.keyboard2 = new KeyboardState();
  }
}
