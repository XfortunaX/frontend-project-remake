/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_api_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
* Created by tlakatlekutl on 07.03.17.
*/





const api = new __WEBPACK_IMPORTED_MODULE_0__modules_api_api__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_1__modules_eventEmitter_eventEmitter__["a" /* default */]();

class UserModel {

  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }
    this.user = { isAuthorised: false };

    UserModel.instance = this;
  }

  isAuthorised() {
    return this.user.isAuthorised;
  }
  getData() {
    return this.user;
  }
  logout() {
    return new Promise((resolve) => {
      api.logout()
        .then(() => {
          this.user.isAuthorised = false;
          ee.emit(__WEBPACK_IMPORTED_MODULE_1__modules_eventEmitter_eventEmitter__["d" /* LOGOUTED */]);
          resolve();
        });
    });
  }

  getUserStatus() {
    return new Promise((resolve) => {
      api.getUser()
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 403) {
            this.user.isAuthorised = false;
          }
          throw new Error('User not authorized');
        })
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          resolve(json);
        })
        .catch((err) => {
          console.log(err);
          resolve();
        });
    });
  }
  login(data) {
    return new Promise((done, error) => {
      api.login(data)
        .then(response => new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(response.json());
          } else {
            reject(response.json());
          }
        }))
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          ee.emit(__WEBPACK_IMPORTED_MODULE_1__modules_eventEmitter_eventEmitter__["e" /* LOGINED */]);
          done(json);
        })
        .catch((json) => {
          console.log(json);
          error(json);
        });
    });
  }
  signup(data) {
    return new Promise((done, error) => {
      api.signup(data)
        .then(response => new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(response.json());
          } else {
            reject(response.json());
          }
        }))
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          done(json);
        })
        .catch((errorPromise) => {
          return errorPromise;
        })
        .then((json)=> {
          // console.log(json);
          error(json);
        });
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserModel;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by tlakatlekutl on 19.04.17.
 */

const START_USER_UNAUTHORISED = 'start_user_unauthorised';
/* harmony export (immutable) */ __webpack_exports__["c"] = START_USER_UNAUTHORISED;

const START_USER_AUTHORISED = 'start_user_authorised';
/* harmony export (immutable) */ __webpack_exports__["b"] = START_USER_AUTHORISED;


const GAME_PAUSE = 'game_pause_event';
/* harmony export (immutable) */ __webpack_exports__["f"] = GAME_PAUSE;

const DESTROY_GAME = 'game_destroy_event';
/* harmony export (immutable) */ __webpack_exports__["k"] = DESTROY_GAME;


const TEST_EVENT = 'test_event';
/* harmony export (immutable) */ __webpack_exports__["l"] = TEST_EVENT;


const START_SINGLE_GAME = 'start_single_game_event';
/* harmony export (immutable) */ __webpack_exports__["g"] = START_SINGLE_GAME;

const START_MULTI_GAME = 'start_multiplayer_game_event';
/* harmony export (immutable) */ __webpack_exports__["h"] = START_MULTI_GAME;


const LOGINED = 'user logined';
/* harmony export (immutable) */ __webpack_exports__["e"] = LOGINED;

const LOGOUTED = 'user logout';
/* harmony export (immutable) */ __webpack_exports__["d"] = LOGOUTED;


const VICTORY = 'victory_event';
/* harmony export (immutable) */ __webpack_exports__["i"] = VICTORY;

const DEFEAT = 'defeat event';
/* harmony export (immutable) */ __webpack_exports__["j"] = DEFEAT;


class EventEmitter {
  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }
    this.events = [];

    EventEmitter.instance = this;
  }
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener is not a function');
    }
    this.events.push({ event, listener });
    return this;
  }
  emit(name, payload = null) {
    // console.log(`EVENT: ${name}`);
    const handler = this.events.find(x => x.event === name);
    if (handler) {
      handler.listener(payload);
    } else {
      throw new Error(`Cant emit no event ${name}`);
    }
  }
  off(name) {
    const i = this.events.findIndex(x => x.event === name);
    if (i !== -1) {
      this.events.splice(i, 1);
    } else {
      throw new Error(`Cant delete no event ${name}`);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitter;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(65).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router_router__ = __webpack_require__(5);
/**
* Created by tlakatlekutl on 31.03.17.
*/



const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router_router__["a" /* default */]();

class ModalView {
  constructor(headerText, drawFunc, parent = document.querySelector('main')) {
    this.isModal = true;
    this.parent = parent;
    this.drawFunc = drawFunc;
    this.alreadyInDOM = false;
    this.headerText = headerText;
    // this.generateBase();
  }
  generateBase() {
    this.modal = document.createElement('div');
    this.modal.className = `modal ${this.headerText}`;

    const content = document.createElement('div');
    content.className = 'modal-content';
    this.modal.appendChild(content);

    const header = document.createElement('div');
    header.className = 'modal-header';
    content.appendChild(header);

    this.close = document.createElement('span');
    this.close.className = 'close';
    this.close.innerHTML = '&times;';
    header.appendChild(this.close);

    const title = document.createElement('h2');
    title.className = 'modal-header-title';
    title.innerHTML = this.headerText;
    header.appendChild(title);

    this.bodyModal = document.createElement('div');
    this.bodyModal.className = 'modal-body';
    content.appendChild(this.bodyModal);
  }
  render(data) {
    this.alreadyInDOM = true;
    this.generateBase();
    this.bodyModal.innerHTML = this.drawFunc(data);
    this.parent.appendChild(this.modal);
    this.onClose(() => router.go('/'));
    return this;
  }
  destruct() {
    this.alreadyInDOM = false;
    this.parent.removeChild(this.modal);
  }
  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
  show(data) {
    if (!this.alreadyInDOM) {
      this.render(data);
    }
    this.modal.style.display = 'block';
  }
  hide() {
    this.modal.style.display = 'none';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModalView;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_userModel__ = __webpack_require__(0);
/**
* Created by tlakatlekutl on 24.03.17.
*/



const userModel = new __WEBPACK_IMPORTED_MODULE_0__models_userModel__["a" /* default */]();

class Router {
  // singleton class Router
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    // this.root = '/';
    this.routes = [];
    this.history = window.history;
    this.goto404 = () => { console.error('page not found'); };
    Router.instance = this;
  }

  addRoute(re, view) {
    if (typeof view !== 'object') {
      throw new TypeError('handler is not a view');
    }
    this.routes.push({ re, view });
    return this;
  }

  checkPathExists(url) {
    return this.routes.findIndex(route => route.re.test(url));
  }
  updateRoute(url, view) {
    const i = this.routes.findIndex(route => route.re.test(url))
    console.log(i);
    // debugger;
    if (i !== -1) {
      this.routes[i].view = view;
    } else {
      throw new Error(`Cant delete route ${name}`);
    }
  }

  navigate(url) {
    const i = this.checkPathExists(url);
    // debugger;
    if (i !== -1) {
      if (this.routes[i].view.isModal) {
        if (!this.currentView) {
          this.routes[0].view.show();
        }
        this.currentView = this.routes[i].view;
      } else {
        if (this.currentView) {
          this.currentView.hide();
        }
        this.currentView = this.routes[i].view;
      }
    } else {
      // alert(url);
      if (/mp$/.test(url)) {
        this.go('/');
        return;
      }
      if (this.currentView) {
        this.currentView.hide();
      }
      this.currentView = this.goto404;
    }
    this.currentView.show();
  }

  go(url) {
    this.history.pushState(null, '', url);
    this.navigate(url);
    this.currentUrl = url;
    return this;
  }

  set404(view) {
    this.goto404 = view;
    return this;
  }

  deleteRoute(url) {
    const i = this.routes.findIndex(route => route.re.test(url));
    if (i !== -1) {
      if (i !== -1) {
        this.routes.splice(i, 1);
      } else {
        throw new Error(`Cant delete no route ${url}`);
      }
    }
    return this;
  }


  start() {
    return new Promise((resolve) => {
      userModel.getUserStatus()
        .then(() => {
          // setInterval(() => { this.checkUrlChanging(); }, 50);
          resolve();
        });
    })
    ;
  }
  checkUrlChanging() {
    const url = window.location.href;
    if (url !== this.currentUrl) {
      console.log('url changed!');
      this.navigate(url);
      this.currentUrl = url;
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 15.04.17.
 */
class GameObject {
    constructor(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    setPosition(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    getPosition() {
        return {x: this.X, y: this.Y, z: this.Z };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObject;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(44);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Created by tlakatlekutl on 27.03.17.
*/

class BaseView {
  constructor(classNames, drawFunc, parent = document.querySelector('main')) {
    const el = document.createElement('div');
    el.hidden = true;
    el.classList.add(...classNames);
    this.drawFunc = drawFunc;
    this.node = el;
    this.parent = parent;
    this.isModal = false;
  }
  render(data) {
    this.setContent(data);
    this.addElemToDOM();
    return this;
  }
  setContent(data) {
    this.node.innerHTML = this.drawFunc(data);
  }
  addElemToDOM() {
    this.parent.appendChild(this.node);
  }
  destruct() {
    this.parent.removeChild(this.node);
  }
  show() {
    this.node.hidden = false;
  }

  hide() {
    this.node.hidden = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseView;




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_gameTransport_transport__ = __webpack_require__(56);
/**
 * Created by tlakatlekutl on 19.04.17.
 */

// import EventEmitter from '../modules/eventEmitter/eventEmitter';

// const ee = new EventEmitter();

class GameModel {
  constructor() {
    // if (GameModel.instance) {
    //   return GameModel.instance;
    // }
    this.transport = new __WEBPACK_IMPORTED_MODULE_0__modules_gameTransport_transport__["a" /* default */]();
    // GameModel.instance = this;
  }
  findOpponent() {
    if (!this.transport) {
      this.transport = new __WEBPACK_IMPORTED_MODULE_0__modules_gameTransport_transport__["a" /* default */]();
    }
    this.transport.send('com.aerohockey.mechanics.requests.JoinGame$Request', '{}');
  }

  sendButton(button, frameTime) {
    this.transport.send('com.aerohockey.mechanics.base.ClientSnap', JSON.stringify({ button, frameTime }));
  }
  exit(){
    this.transport.closeSocket();
    delete this.transport;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameModel;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__network_net__ = __webpack_require__(57);
/**
* Created by tlakatlekutl on 07.03.17.
*/



class API {

  constructor(
    baseUrl = 'http://62.109.3.208:8082/api',
    headers = { 'content-type': 'application/json; charset=utf-8' }) {
    if (API.instance) {
      return API.instance;
    }

    this.net = new __WEBPACK_IMPORTED_MODULE_0__network_net__["a" /* default */](baseUrl, headers);

    API.instance = this;
  }

  logout() {
    return this.net.post('/logout', null)
              .catch((error) => {
                console.error(error);
              });
  }

  signup(data) {
    return this.net.post('/signup', data)
              .catch((error) => {
                console.error(error);
              });
  }

  getUser() {
    return this.net.get('/user')
              .catch((error) => {
                console.error(error);
              });
  }

  login(data) {
    return this.net.post('/login', data)
              .catch((error) => {
                console.error(error);
              });
  }

  changePass(data) {
    return this.net.post('/change-password', data)
              .catch((error) => {
                console.error(error);
              });
  }
  getLeaderBoard() {
    return this.net.get('/leaderboard')
              .catch((error) => {
                console.error(error);
              });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = API;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(6);
/**
 * Created by sergey on 15.04.17.
 */


class Ball extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(side, pos, radius) {
        super(pos);
        this.radius = radius;

        this.side = side;
        this.move = false;
        this.vectorMove = { x: 0, y: 0, z: 0 };

        this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
        this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return this.radius;
    }

    setSize(radius) {
      this.radius = radius;
      this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
      this.model = new THREE.Mesh(this.Geometry, this.Material);
      this.model.position.set(this.X, this.Y, this.Z);
    }

    getSide() {
        return this.side;
    }

    getMove() {
        return this.move;
    }

    getVectorMove() {
        return this.vectorMove;
    }

    getModel() {
        return this.model;
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setMove(state) {
        this.move = state;
    }

    setSide(side) {
        this.side = side;
    }

    setVectorMove(vector) {
        this.vectorMove.x = vector.x;
        this.vectorMove.y = vector.y;
        this.vectorMove.z = vector.z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(6);
/**
 * Created by sergey on 15.04.17.
 */



class Barrier extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(pos, size, angle) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.angle = angle;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.Material = new THREE.MeshLambertMaterial({color: 0xF2F0BA});
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getSide() {
        return this.side;
    }

    getAngle() {
        return this.angle;
    }

    getModel() {
        return this.model;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Barrier;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(6);
/**
 * Created by sergey on 15.04.17.
 */



class Ground extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(pos, size) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.Material = new THREE.MeshLambertMaterial({color: 0xF7F6EE});
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);

        this.goalMy = this.depth - 0.5;
        this.goalEnemy = 0.5;
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getModel() {
        return this.model;
    }

    getGoalMy() {
        return this.goalMy;
    }

    getGoalEnemy() {
        return this.goalEnemy;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ground;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(6);
/**
 * Created by sergey on 15.04.17.
 */


class Platform extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(side, pos, size) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.side = side;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        if (this.side === 0) {
            this.Material = new THREE.MeshLambertMaterial({color: 0x1D870D});
        } else {
            this.Material = new THREE.MeshLambertMaterial({color: 0xC70A00});
        }
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    setSize(size) {
        this.width = size.width;
        this.height = size.height;
        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        if(this.side === 0) {
          this.Material = new THREE.MeshLambertMaterial({ color: 0x1D870D });
        } else {
          this.Material = new THREE.MeshLambertMaterial({ color: 0xC70A00 });
        }
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSide() {
        return this.side;
    }

    getModel() {
        return this.model;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Platform;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multi__ = __webpack_require__(54);
/**
 * Created by sergey on 21.04.17.
 */




class Game {
    constructor(state) {
        this.state = state;
        this.play = true;
        if(this.state === 'single') {
            this.games = new __WEBPACK_IMPORTED_MODULE_0__strategy__["a" /* default */]();
        } else {
            this.games = new __WEBPACK_IMPORTED_MODULE_1__multi__["a" /* default */]();
        }
    }

    gameProcess () {
        if(this.state === 'single') {
            if (this.play === true) {
                this.games.animationScene();
            }
        } else {
            if (this.play === true) {
                this.games.animationScene();
            }
        }
    }

    stop() {
      this.games.stop();
    }

    resume() {
      this.games.resume();
      this.gameProcess();
    }

    setStateGame(message, time) {
      this.games.setStateGame(JSON.parse(message), time);
    }

    setChangeGame(message) {
      this.games.setChangeGame(JSON.parse(message));
    }

    setOpponent(message) {
      this.games.setOpponent(JSON.parse(message));
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 22.04.17.
 */

class Player {
  constructor(nickname, score, rating) {
    this.nickname = nickname;
    this.score = score;
    this.rating = rating;
  }

  getNickname() {
    return this.nickname;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getRating() {
    return this.rating;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_loginModalView__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signupModalVew__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_profileModalView__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_concedeModalView__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_victoryModalView__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_defeatModalView__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_mpGameView__ = __webpack_require__(61);
/**
 * Created by tlakatlekutl on 23.05.17.
 */















const router = new __WEBPACK_IMPORTED_MODULE_4__modules_router_router__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["a" /* default */]();
const userModel = new __WEBPACK_IMPORTED_MODULE_3__models_userModel__["a" /* default */]();

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["i" /* VICTORY */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["i" /* VICTORY */]);
  const victoryModal = new __WEBPACK_IMPORTED_MODULE_7__views_victoryModalView__["a" /* default */]();
  victoryModal.render();
  victoryModal.show();
  userModel.getUserStatus();
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["j" /* DEFEAT */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["j" /* DEFEAT */]);
  const defeatModal = new __WEBPACK_IMPORTED_MODULE_8__views_defeatModalView__["a" /* default */]();
  defeatModal.render();
  defeatModal.show();
  userModel.getUserStatus();
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["g" /* START_SINGLE_GAME */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["g" /* START_SINGLE_GAME */]);
  router.go('/game');
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["h" /* START_MULTI_GAME */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["h" /* START_MULTI_GAME */]);
  this.mpView = new __WEBPACK_IMPORTED_MODULE_9__views_mpGameView__["a" /* default */]();
  router.addRoute(/mp/, this.mpView);
  router.go('/mp');
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["f" /* GAME_PAUSE */], (game) => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["f" /* GAME_PAUSE */]);
  const concedeModalView = new __WEBPACK_IMPORTED_MODULE_6__views_concedeModalView__["a" /* default */](game);
  concedeModalView.render();
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["d" /* LOGOUTED */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["d" /* LOGOUTED */]);
  const loginModalView = new __WEBPACK_IMPORTED_MODULE_0__views_loginModalView__["a" /* default */]();
  const signupModalView = new __WEBPACK_IMPORTED_MODULE_1__views_signupModalVew__["a" /* default */]();

  router
    .addRoute(/login$/, loginModalView)
    .addRoute(/signup$/, signupModalView);
  router.deleteRoute('/profile');
  // userModel.getUserStatus();
});
ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["e" /* LOGINED */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["e" /* LOGINED */]);
  const profileModalView = new __WEBPACK_IMPORTED_MODULE_5__views_profileModalView__["a" /* default */]();
  router.addRoute(/profile$/, profileModalView);
  router
    .deleteRoute('/login')
    .deleteRoute('/signup');
  // userModel.getUserStatus();
});


ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["k" /* DESTROY_GAME */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["k" /* DESTROY_GAME */]);
  router.go('/');
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["l" /* TEST_EVENT */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["l" /* TEST_EVENT */]);
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["c" /* START_USER_UNAUTHORISED */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["c" /* START_USER_UNAUTHORISED */]);
  const loginModalView = new __WEBPACK_IMPORTED_MODULE_0__views_loginModalView__["a" /* default */]();
  const signupModalView = new __WEBPACK_IMPORTED_MODULE_1__views_signupModalVew__["a" /* default */]();

  router
  .addRoute(/login$/, loginModalView)
  .addRoute(/signup$/, signupModalView);
  ee.off(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["b" /* START_USER_AUTHORISED */]);
});

ee.on(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["b" /* START_USER_AUTHORISED */], () => {
  console.log(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["b" /* START_USER_AUTHORISED */]);
  const profileModalView = new __WEBPACK_IMPORTED_MODULE_5__views_profileModalView__["a" /* default */]();
  router.addRoute(/profile$/, profileModalView);
  ee.off(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["c" /* START_USER_UNAUTHORISED */]);
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_about_pug__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_about_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__templates_about_pug__);
/**
 * Created by tlakatlekutl on 04.04.17.
 */





class AboutModalView extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('About', __WEBPACK_IMPORTED_MODULE_1__templates_about_pug___default.a);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AboutModalView;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_gameTemplate_pug__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_gameTemplate_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__templates_gameTemplate_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_game_play__ = __webpack_require__(15);
/**
* Created by tlakatlekutl on 04.04.17.
*/







// const router = new Router();
const ee = new __WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["a" /* default */]();

class GameView extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {

    if (GameView.instance) {
      return GameView.instance;
    }

    super(['game-window-container'], __WEBPACK_IMPORTED_MODULE_1__templates_gameTemplate_pug___default.a);
    this.alreadyInDOM = false;

    GameView.instance = this;
  }
  render() {
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      ee.emit(__WEBPACK_IMPORTED_MODULE_2__modules_eventEmitter_eventEmitter__["f" /* GAME_PAUSE */], this.game);
    });
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new __WEBPACK_IMPORTED_MODULE_3__modules_game_play__["a" /* default */]('single');
      this.game.gameProcess();
    }
    this.node.hidden = false;
  }

  hide() {
    console.log('single game hide');
    this.destruct();
  }

  destruct() {
    const root = document.querySelector('main');
    const gamePage = document.querySelector('.game-window-container');
    root.removeChild(gamePage);
    const game = document.querySelector('canvas');
    const body = document.querySelector('body');
    body.removeChild(game);
    this.alreadyInDOM = false;
    delete this.game;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;




/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_api_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug__);
/**
* Created by tlakatlekutl on 04.04.17.
*/





const api = new __WEBPACK_IMPORTED_MODULE_0__modules_api_api__["a" /* default */]();

class LeaderBoardModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Leaderboard', __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug___default.a);
  }
  render() {
    api.getLeaderBoard()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('error getting leaderboard');
      })
      .then((json) => {
        console.log(json);
        super.render({ data: json.users });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LeaderBoardModal;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
* Created by tlakatlekutl on 27.03.17.
*/









const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();

const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();

class MainView extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {
    super(['main-vindow-container'], __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug___default.a);
  }
  render() {
    this.data = {
      authorised: userModel.isAuthorised(),
      nickname: userModel.getData().nickname,
    };
    super.render({ user: this.data });
    this.addListeners();
  }
  show() {
    if (this.data.authorised !== userModel.isAuthorised()) {
      this.data = {
        authorised: userModel.isAuthorised(),
        nickname: userModel.getData().nickname,
      };
      this.setContent({ user: this.data });
      this.addListeners();
    }
    super.show();
  }
  addListeners() {
    document.querySelector('.btn-left').addEventListener('click', () => { ee.emit(__WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["g" /* START_SINGLE_GAME */]) });
    document.querySelector('.btn-right').addEventListener('click', () => {
      if (userModel.isAuthorised()) {
        ee.emit(__WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["h" /* START_MULTI_GAME */]);
      } else {
        alert('Вы должны быть авторизированы');
      }
    });
    document.querySelector('.leaderboard-button').addEventListener('click', () => { router.go('/leaderboard'); });
    document.querySelector('.footer-help-link').addEventListener('click', () => { router.go('/about'); });

    if (this.data.authorised) {
      document.querySelector('.profile-link').addEventListener('click', () => {
        router.go('/profile');
      });
      document.querySelector('.logout-link').addEventListener('click', () => {
        userModel.logout()
          .then(() => {
            this.show();
          });
      });
    } else {
      document.querySelector('.login-link').addEventListener('click', () => {
        router.go('/login');
      });
      document.querySelector('.signup-link').addEventListener('click', () => {
        router.go('/signup');
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainView;




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/**
 * Created by tlakatlekutl on 27.03.17.
 */



class Page404View extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {
    super(['page404-container'], () => '<h1> Not Found </h1>');
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Page404View;




/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Created by tlakatlekutl on 31.03.17.
*/
class PreloaderView {
  constructor() {
    this.node = document.querySelector('.preloader-page');
    this.onLoad = new Event('onUserStatusLoad');
    this.node.addEventListener('onUserStatusLoad', this.hide);
  }
  hide() {
    this.hidden = true;
  }
  dispatchLoadCompleted() {
    this.node.dispatchEvent(this.onLoad);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreloaderView;



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.concede-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.choose {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    font-size: 24px;\n    margin-bottom: 25px;\n}\n\n.choose__yes, .choose__no {\n    font-size: 36px;\n}\n\n.choose__yes {\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.choose__no {\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.choose__yes:hover, .choose__no:hover {\n    color: mediumpurple;\n    text-decoration: underline;\n}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".modal-content {\n    width: 50%;\n}\n\n.modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.defeat-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.defeat-modal__text {\n    margin-left: 30%;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.change, .rating_score {\n    display: inline-block;\n    margin-left: 15px;\n}\n\n.defeat-modal .change {\n    color: #8b1700;\n}\n\n.rating__change, .new__rating, .change, .rating_score {\n    font-weight: bold;\n    font-size: 28px;\n}\n\n.rating__change, .new__rating {\n    margin-left: 10%;\n    margin-top: 2%;\n}\n\n.rating {\n    margin-bottom: 10%;\n}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports
exports.i(__webpack_require__(32), "");
exports.i(__webpack_require__(31), "");
exports.i(__webpack_require__(30), "");
exports.i(__webpack_require__(29), "");

// module
exports.push([module.i, "@media all  {\n    .main-page {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        height: 82vh;\n    }\n\n    .name-game {\n        font-family: 'Archivo Black', sans-serif;\n        display: inline-block;\n        -ms-flex-item-align: center;\n            -ms-grid-row-align: center;\n            align-self: center;\n        font-size: 100px;\n        padding-top: 60px;\n    }\n\n    .main-page-center {\n        -ms-flex-item-align: center;\n            -ms-grid-row-align: center;\n            align-self: center;\n    }\n\n    .start-game-buttons {\n        height: 150px;\n        background-color: white;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        padding-top: 40px;\n        /*align-self: center;*/\n    }\n\n    .button {\n        font-family: 'Patua One', cursive;\n        transition-duration: 0.4s;\n        border: none;\n        color: white;\n        padding: 15px 32px;\n        font-size: 48px;\n        float: left;\n        position: relative;\n        display: block;\n        -ms-flex-item-align: center;\n            -ms-grid-row-align: center;\n            align-self: center;\n        width: 225px;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n    }\n\n    .button:hover {\n        /*border: 6px solid darkcyan;*/\n        width: 280px;\n        height: 120px;\n        cursor: pointer;\n    }\n\n    .leaderboard-button {\n        display: block;\n        margin-top: 20px;\n        margin-left: auto;\n        margin-right: auto;\n        background-image: url(" + __webpack_require__(50) + ");\n        width: 100px;\n        height: 110px;\n        color: black;\n        border: none;\n        font-size: 0.1px;\n        border-radius: 50px;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n    }\n\n    .leaderboard-button:hover {\n        box-shadow: 0 0 10px 8px rgb(255, 184, 24); /* Параметры тени */;\n        background-color: darkcyan;\n        cursor: pointer;\n    }\n\n    .btn-left {\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        background-color: #4CAF50;\n        border-radius: 50px 0 0 50px;\n    }\n\n    .btn-right {\n        background-color: orange;\n        border-radius: 0 50px 50px 0;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n    }\n\n    .btn-right:hover {\n        -webkit-box-flex: 2;\n            -ms-flex-positive: 2;\n                flex-grow: 2;\n        cursor: pointer;\n    }\n\n    .main-page-leaderboard {\n        text-align: center;\n        display: inherit;\n    }\n\n    .main-page-footer {\n        text-align: right;\n        /*font-size: 32px;*/\n        /*margin-right: 2%;*/\n    }\n\n    .user-state {\n        /*background-color: #0D47A1;*/\n        display: block;\n        /*text-align: center;*/\n        /*align-self: flex-end;*/\n        /*position: relative;*/\n        /*display: inline-block;*/\n        font-size: 30px;\n        padding-top: 15px;\n        text-align: right;\n    }\n\n    .dropdown-link {\n        text-align: left;\n        /*background-color: #4CAF50;*/\n        /*border-radius: 50px 50px 50px 50px;*/\n    }\n\n    .dropdown-content {\n        position: fixed;\n        right: 30px;\n        top: 76px;\n        display: none;\n        background-color: #f9f9f9;\n        width: 160px;\n        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n        z-index: 6;\n    }\n\n    .dropdown-content a {\n        color: black;\n        padding: 12px 16px;\n        text-decoration: none;\n        display: block;\n    }\n\n    .dropdown-content a:hover {\n        background-color: #f1f1f1\n    }\n\n    .username {\n        font-family: 'Patua One', cursive;\n        background-color: #4CAF50;\n        border-radius: 50px 50px 50px 50px;\n        position:fixed;\n        padding: 15px 70px 13px 25px;\n        top: 17px;\n        right: 10px;\n        text-align: left;\n        display: inline-block;\n        z-index: 1;\n    }\n\n    .dropdown-list {\n        position: absolute;\n        right: 20px;\n        background: url(" + __webpack_require__(48) + ") 100% 100% no-repeat;\n        background-size: cover;\n        width: 50px;\n        height: 50px;\n        border-radius: 25px;\n        border-style: none;\n        z-index: 4;\n    }\n\n    .user-state:hover .dropdown-content {\n        display: block;\n    }\n\n    .login-link:hover, .signup-link:hover, .footer-button:hover {\n        color: mediumpurple;\n        text-decoration: underline;\n        cursor: pointer;\n    }\n\n    .login-link {\n        padding-right: 25px;\n    }\n\n    .signup-link {\n        padding-right: 10px;\n    }\n\n    .footer-help-link {\n        padding-right: 20px;\n    }\n\n    .footer-button {\n        background: url(" + __webpack_require__(49) + ") 100% 100% no-repeat;\n        background-size: cover;\n        width: 100px;\n        height: 100px;\n        border-radius: 50px;\n        border-style: none;\n    }\n\n    .footer-button:hover {\n        box-shadow: 0 0 10px 8px rgb(255, 184, 24); /* Параметры тени */;\n    }\n}\n\n@media screen and (min-device-width:480px) and (max-device-width:800px) {\n    .main-page {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        height: 75vh;\n    }\n\n    .start-game-buttons {\n        padding-top: 5px;\n        padding-bottom: 10px;\n        height: 100px;\n    }\n\n    .name-game {\n        -ms-flex-item-align: center;\n            -ms-grid-row-align: center;\n            align-self: center;\n        font-size: 80px;\n        margin-top: 2%;\n        margin-bottom: 3%;\n    }\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".modal-content {\n    width: 50%;\n}\n\n.modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.victory-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.victory-modal__text {\n    margin-left: 35%;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.change, .rating_score {\n    display: inline-block;\n    margin-left: 15px;\n}\n\n.victory-modal .change {\n    color: darkgreen;\n}\n\n.rating__change, .new__rating, .change, .rating_score {\n    font-weight: bold;\n    font-size: 28px;\n}\n\n.rating__change, .new__rating {\n    margin-left: 10%;\n    margin-top: 2%;\n}\n\n.rating {\n    margin-bottom: 10%;\n}", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.game-header {\n    font-family: 'Patua One', cursive;\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    text-align: center;\n    padding-top: 20px;\n    margin-bottom: 45px;\n}\n\n.game-back-link {\n    font-family: 'Patua One', cursive;\n    padding-left: 20px;\n    font-size: 28px;\n}\n\n.player1, .player2, .score {\n    font-family: 'Patua One', cursive;\n    text-align: center;\n}\n\n.player1 {\n    padding-left: 15%;\n}\n\n.score {\n    padding-left: 10%;\n    padding-right: 10%;\n}\n\n.score {\n    position: inherit;\n    font-family: 'Patua One', cursive;\n}\n\n.player1_score, .separate, .player2_score {\n    display: inline-block;\n    padding-left: 5px;\n    padding-right: 5px;\n    font-size: 100px;\n}\n\n.player_rating_score, .player_rating {\n    font-family: 'Patua One', cursive;\n    display: initial;\n}\n\n.player_rating_score {\n    font-size: 32px;\n    margin-left: 12px;\n}\n\n.player_nickname, .player_rating {\n    display: block;\n    font-size: 52px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n}\n\n.player_rating {\n    display: initial;\n    font-size: 24px;\n}\n\ncanvas {\n    position: absolute;\n    top: 18%;\n}\n\n.goleft, .goright, .result {\n    display: none;\n}\n\n@media screen and (min-width:1000px) and (max-width:1200px) {\n    .player1 {\n        padding-left: 13%;\n    }\n\n    .player1_score, .separate, .player2_score {\n        font-size: 90px;\n    }\n\n    .player_rating_score {\n        font-size: 24px;\n        margin-left: 12px;\n    }\n\n    .player_nickname {\n        font-size: 40px;\n    }\n\n    .player_rating {\n        font-size: 20px;\n    }\n}\n\n@media screen and (min-width:800px) and (max-width:1000px) {\n    .player1 {\n        padding-left: 10%;\n    }\n\n    .player1_score, .separate, .player2_score {\n        font-size: 80px;\n    }\n\n    .player_rating_score {\n        font-size: 22px;\n    }\n\n    .player_nickname {\n        font-size: 36px;\n    }\n\n    .player_rating {\n        font-size: 20px;\n    }\n}\n\n@media screen and (min-width:650px) and (max-width:800px) {\n    .player1 {\n        padding-left: 8%;\n    }\n\n    .player1_score, .separate, .player2_score {\n        font-size: 70px;\n    }\n\n    .player_rating_score {\n        font-size: 20px;\n        margin-left: 12px;\n    }\n\n    .player_nickname {\n        font-size: 28px;\n    }\n\n    .player_rating {\n        font-size: 16px;\n    }\n}\n\n@media screen and (min-width:520px) and (max-width:650px) {\n    .player1 {\n        padding-left: 5%;\n    }\n\n    .player1_score, .separate, .player2_score {\n        font-size: 60px;\n    }\n\n    .player_rating_score {\n        font-size: 20px;\n        margin-left: 12px;\n    }\n\n    .player_nickname {\n        font-size: 28px;\n    }\n\n    .player_rating {\n        font-size: 16px;\n    }\n}\n\n@media screen and (min-width:400px) and (max-width:520px) {\n    .player1 {\n        padding-left: 3%;\n    }\n\n    .player1_score, .separate, .player2_score {\n        font-size: 50px;\n    }\n\n    .player_rating_score {\n        font-size: 18px;\n        margin-left: 12px;\n    }\n\n    .player_nickname {\n        font-size: 24px;\n    }\n\n    .player_rating {\n        font-size: 14px;\n    }\n}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".leaderboard-table {\n    border-collapse: collapse;\n    width: 100%;\n}\n\nth, td {\n    text-align: left;\n    padding: 8px;\n}\n.leaderboard-table th {\n    border-bottom: 3px solid black;\n}\n\n.leaderboard-table tr:nth-child(even){\n    background-color: #f2f2f2;\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "input, select {\n    width: 100%;\n    padding: 12px 20px;\n    margin: 8px 0;\n    display: inline-block;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    box-sizing: border-box;\n}\n\ninput[type=submit] {\n    width: 100%;\n    background-color: #4CAF50;\n    color: white;\n    padding: 14px 20px;\n    margin: 8px 0;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\ninput[type=submit]:hover {\n    background-color: #45a049;\n}\n\n.login-modal {\n    border-radius: 5px;\n    background-color: #f2f2f2;\n    padding: 20px;\n}\n\n.input-error {\n    color: red;\n}\n.danger {\n    display: none;\n    margin-top: 15px;\n    margin-bottom: 15px;\n    padding: 4px 12px;\n    background-color: #ffdddd;\n    border-left: 6px solid #f44336;\n}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".modal {\n    display: none; /* Hidden by default */\n    position: fixed; /* Stay in place */\n    z-index: 1; /* Sit on top */\n    padding-top: 100px; /* Location of the box */\n    left: 0;\n    top: 0;\n    width: 100%; /* Full width */\n    height: 100%; /* Full height */\n    overflow: auto; /* Enable scroll if needed */\n    background-color: rgb(0,0,0); /* Fallback color */\n    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Content */\n.modal-content {\n    position: relative;\n    background-color: #fefefe;\n    margin: auto;\n    padding: 0;\n    border: 1px solid #888;\n    width: 80%;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\n    -webkit-animation-name: animatetop;\n    -webkit-animation-duration: 0.4s;\n    animation-name: animatetop;\n    animation-duration: 0.4s;\n    max-width: 636px;\n}\n\n/* Add Animation */\n@-webkit-keyframes animatetop {\n    from {top:-300px; opacity:0}\n    to {top:0; opacity:1}\n}\n\n@keyframes animatetop {\n    from {top:-300px; opacity:0}\n    to {top:0; opacity:1}\n}\n\n/* The Close Button */\n.close {\n    color: white;\n    float: right;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.modal-header {\n    padding: 2px 16px;\n    background-color: #5cb85c;\n    color: white;\n}\n\n.modal-body {padding: 2px 16px;}\n\n.modal-footer {\n    padding: 2px 16px;\n    background-color: #5cb85c;\n    color: white;\n}", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"about-modal\"\u003E\u003Cp\u003EТут какой-то текст\u003C\u002Fp\u003E\u003Cp\u003EАвторы этого безобразия:\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli\u003EБуклин Сергей\u003C\u002Fli\u003E\u003Cli\u003EБуторин Сергей\u003C\u002Fli\u003E\u003Cli\u003EЯкубов Алексей\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"concede-modal\"\u003E\u003Cdiv class=\"concede-modal__text\"\u003EВы собираетесь покинуть игру! Вам будет засчитано поражение!\u003C\u002Fdiv\u003E\u003Cdiv class=\"choose\"\u003E\u003Cdiv class=\"choose__yes\"\u003EДА\u003C\u002Fdiv\u003E\u003Cdiv class=\"choose__no\"\u003EНЕТ\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!--Created by sergey on 01.05.17.\n--\u003E\u003Cdiv class=\"defeat-modal\"\u003E\u003Cdiv class=\"defeat-modal__text\"\u003EПоражение\u003C\u002Fdiv\u003E\u003Cdiv class=\"rating\"\u003E\u003Cdiv class=\"rating__change\"\u003EИзменение:\u003Cdiv class=\"change\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"new__rating\"\u003EРейтинг:\u003Cdiv class=\"rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"game-header\"\u003E\u003Cdiv class=\"game-back-link\"\u003E\u003C Back\u003C\u002Fdiv\u003E\u003Cdiv class=\"player1\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"score\"\u003E\u003Cdiv class=\"player1_score\"\u003E0\u003C\u002Fdiv\u003E\u003Cdiv class=\"separate\"\u003E:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {pug_html = pug_html + "\u003Cdiv class=\"leaderboard-modal\" style=\"overflow-y:auto;\"\u003E\u003Ctable class=\"leaderboard-table\"\u003E\u003Ctr\u003E\u003Cth\u003EМесто\u003C\u002Fth\u003E\u003Cth\u003ENickname\u003C\u002Fth\u003E\u003Cth\u003EСчет\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var user = $$obj[index];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = index+1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.rating) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var user = $$obj[index];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = index+1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.rating) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"danger\"\u003E\u003Cp\u003E\u003Cstrong\u003EОшибка:\u003C\u002Fstrong\u003E неверный логин или пароль\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"login-modal\"\u003E\u003Cform\u003E\u003Clabel for=\"login-input\"\u003ENickname\u003C\u002Flabel\u003E\u003Cinput class=\"login-nickname-input\" type=\"text\" id=\"login-input\" placeholder=\"Your nickname..\" required=\"true\"\u003E\u003Clabel for=\"password-input\"\u003EPassword\u003C\u002Flabel\u003E\u003Cinput class=\"login-password-input\" type=\"password\" id=\"password-input\" placeholder=\"Your password..\" required=\"true\"\u003E\u003Cinput class=\"login-submit-button\" type=\"submit\" value=\"Enter the game\"\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (user) {pug_html = pug_html + "\u003C!--Created by tlakatlekutl on 27.03.17.\n--\u003E\u003Cdiv class=\"main-page\"\u003E\u003Cdiv class=\"user-state\"\u003E";
if (user.authorised) {
pug_html = pug_html + "\u003Cdiv class=\"dropdown-content\"\u003E\u003Ca class=\"profile-link\"\u003EProfile\u003C\u002Fa\u003E\u003Ca class=\"logout-link\"\u003ELogout\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Ca class=\"dropdown-link\"\u003E\u003Cdiv class=\"username\"\u003E" + (pug.escape(null == (pug_interp = user.nickname) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cbutton class=\"dropdown-list\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fa\u003E";
}
else {
pug_html = pug_html + "\u003Ca class=\"login-link\"\u003ELogin\u003C\u002Fa\u003E\u003Ca class=\"signup-link\"\u003ESign up\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"name-game\"\u003EFastBall\u003C\u002Fdiv\u003E\u003Cdiv class=\"main-page-center\"\u003E\u003Cdiv class=\"start-game-buttons\"\u003E\u003Cbutton class=\"button btn-left\"\u003ESingle\u003C\u002Fbutton\u003E\u003Cbutton class=\"button btn-right\"\u003EMulti\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"main-page-leaderboard\"\u003E\u003Cbutton class=\"leaderboard-button\"\u003ELeaderboard\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cfooter class=\"main-page-footer\"\u003E\u003Ca class=\"footer-help-link\"\u003E\u003Cbutton class=\"footer-button\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E";}.call(this,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cbutton class=\"goleft\"\u003ELeft\u003C\u002Fbutton\u003E\u003Cspan class=\"result\"\u003E50\u003C\u002Fspan\u003E\u003Cbutton class=\"goright\"\u003ERight\u003C\u002Fbutton\u003E\u003Cdiv class=\"game-header\"\u003E\u003Cdiv class=\"game-back-link\"\u003E\u003C Back\u003C\u002Fdiv\u003E\u003Cdiv class=\"player1\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"score\"\u003E\u003Cdiv class=\"player1_score\"\u003E0\u003C\u002Fdiv\u003E\u003Cdiv class=\"separate\"\u003E:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (user) {pug_html = pug_html + "\u003Cdiv class=\"profile-modal\"\u003E\u003Ctable class=\"profile-table\"\u003E\u003Ctr\u003E\u003Cth\u003ENickname\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.nickname) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003Ctr\u003E\u003Cth\u003EEmail\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";}.call(this,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"danger danger-signup\"\u003E\u003Cp\u003E\u003Cstrong\u003EОшибка:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"signup-modal\"\u003E\u003Cform\u003E\u003Clabel for=\"signup-nickname-input\"\u003ENickname\u003C\u002Flabel\u003E\u003Cinput class=\"signup-nickname-input\" type=\"text\" id=\"signup-nickname-input\" placeholder=\"Your nickname..\" required=\"true\"\u003E\u003Clabel for=\"signup-password-input\"\u003EPassword\u003C\u002Flabel\u003E\u003Cinput class=\"signup-password-input\" type=\"password\" id=\"signup-password-input\" placeholder=\"Your password..\" required=\"true\"\u003E\u003Cinput class=\"signup-password-repeat\" type=\"password\" id=\"signup-password-repeat\" placeholder=\"Repeat password..\" required=\"true\"\u003E\u003Clabel for=\"signup-email-input\"\u003EE-mail\u003C\u002Flabel\u003E\u003Cinput class=\"signup-email-input\" type=\"email\" id=\"signup-email-input\" placeholder=\"Your email..\" required=\"true\"\u003E\u003Cinput class=\"signup-submit-button\" type=\"submit\" value=\"Signup and play!\"\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!-- Created by sergey on 01.05.17.--\u003E\u003Cdiv class=\"victory-modal\"\u003E\u003Cdiv class=\"victory-modal__text\"\u003EПобеда\u003C\u002Fdiv\u003E\u003Cdiv class=\"rating\"\u003E\u003Cdiv class=\"rating__change\"\u003EИзменение:\u003Cdiv class=\"change\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"new__rating\"\u003EРейтинг:\u003Cdiv class=\"rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 44 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./concede.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./concede.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./defeat.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./defeat.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./victory.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./victory.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAn8AAAKACAYAAADtih43AAAABHNCSVQICAgIfAhkiAAAIABJREFUeJzsvXd4JOld7/t9Q1V1UitLo4matDsbZmfjrDc74oxtjMFgbJLhAoYHDOeYcB6D4XAAH7gcMvfBcLlczkO0ccJcjLG9zpvXm3d2Z3dy1Ch3qqo33D+qSiq1OkqdJL2fZ7Wjrn7ft6qru6s++v3eQGAwGAwtgBBCon8joudUSCPtcM55IpFMJlPpbP/A0Eg609efTvdlmZXoKwlrIJ3JDiaSmYFkqm8wkeob8CRLXZpxE7bjJCm1EpTbCcasBON2gjJuE0IZCKGEUEYIY4RSRgihhBCqlZJKSV8p4WslfSVjvy9tE75S0tdK+loJ3/eFPz5kFyEL08X8wkyxMD+dW5ibtpk/67v5+XxucT6XW5jP5xbmPNctuG6p5Hme1+g5pJTS+LnTMaLHzb0zBoPBsBJSv4jBYDAsE4ldXFK01loIIRqpn0pn+rZNbN81ODS2gzhDk6NjO/f2D47uOj9LxpmTHUuksiOJ1MDY1FzJggYICS5UlBIwSkFo7FhAwDlFOsGDgp1Aa+RLAkIoaAQephUglYJSwRatARBgbCAhXDc367v5ObeYm1V+fma0zz195eLZF2evnHtJunNnLl08f3b6yuWLje6ec87j511KKaPf2/BqDQbDJsTIn8FgqEgkGIwxFv0upZT1InjZ/oGh3Xv2HeTJ4b2jE/sOZ4Z2XHNp3tqdHRrfBZYZm54tgDEGRgOhIwSghCKTtMAYgQJAAdg2B6UEWI53aejV+9YAlEaohFoTEtfDla+o+lFXFiettapUjxKoVRsDJWbB74BSGp4nEB0wBSClRq7oQ+lAFJUiEFIimeDIJpGbnb50Om0VzqbZ4okLZ08cc/NTLxcXp89cuHDuzNzs9FT1418thUopFY8YGgwGQ4SRP4PBsCqaVy+S5yQSyX37rro2NbDjmondh44u+IOHE5mxfVZqaPfUbBGWxUAJAaME3KJIJyyAAJwS2JxBE62hlFSAJgjUS+vQpwilAMiysnQqpNcqyo88FEitlAY0JRQkdFpCKKMgVEgFXypAA64vUXIFlNahIGr4QiGTsqHcqeOOmn7OXzz72NzUicenL516/tTJl47VOhpKKWWMMSCQdyOEBoNhg11UDQbDeikXPaWUilKH5XBuWVddfe2R7Ojem4a2XX3nnNd/zdC2yeum52WGAGCMgjOCdMoCYxSMEjicQUErrZQkQBD50oroII5HdHgUHXvBPc+SiGmilNKUahbJIQDCKCeaEF8qCKHg+hLFkoBUCp6vkE5asEn+YmH+/HN9bObJi6effzg/f+65l48fe8bzPLfSHhljjFJKTYTQYNiamAuwwbDJIYSQKHVbK6I3NDQytmPy6ptGtx+6IzGw7xUeH7+xKJxxpQGLU9gWQzppgRDAsRkooKVWQmsAWhEgjNiFe+3gS9wCBGJGlJKRHIKAUMK4H0YNpVTIF3wIqSGlggYwlCG5wtyZJy3/7Dcvn3n6/lPHn35otkr6OEobGyE0GDY/5gJtMGwy4rJXrY9eKpXOXH3tkdsHJ669VyX33Gv3Td42X1Bp22JglCKZ4HBsBsfmIForpZUMut4FETwAxAher6B1EChUCoRqQgBGKFcA8TwJXyrkCj6kVPB8ib4kFkXu9KO0eOqrsxee/eqLzz/1cC63uFCpZcuyLMCkiw2GzYa5eBsMG5y47Pm+71cqs//AoesnJg/flxq97o06setowbdHNQhsTpFJW7A5g2MxKC2F1tBag2gNCmIkb+MSxGRJKIU0jBS6voQnJHJ5H55QINBI2f4V5p57KD/1/FemLzz/9ZdeePox13VL5S1almWZyKDBsPExF3WDYYNRL7JHKaXXXHfTHeN7bnwdMgdfJxM77/A8RSyLIZ3kcGweRvSUlForaEWUppQY0dsCBKOmKQmEkBFCNaHM9QRcT6JQ8uELHQghzZ9mpZe/OHX60c+88Owj9y8uzM+VtxaXwUbncTQYDN3HXOgNhh4nGqDBGGPVBmdcc/3Nd+w8cPSttO/Qm1w2esTzJWyLI5O2kLQ5OKOQSvpKA9BgJqJnWCaYRIcQKEKgKaFME1DXlcgVfRRdAaI1EnTxJC289IWpU4985oVnH/1KPp9bLG8pksEoTdyNV2MwGOpjLv4GQw9SL5V74Krrbtp54NY38YHr3irtHbcXfYlETPYYJUpqJcM+esyInqE5wn6EBDKIDhK2Qgah4ej5l0jh+H9MnXr0s8eefeQrpWKxEG8hmmLG9Bc0GHoPc0MwGHqESPjiqzZEDA4OjRy47o43D+8++q4c3fNapaljl8me0kpqI3uGtlAmgyDM9VbKoK1mj5HC8S9cePnBTz37xINfLG/BRAUNht7B3CAMhi4SRUeEEKL8hnjVNTfctuPAnd9Dste9zaODBwkhyKQsZFIWOKUQSvomsmfoDloTAg2slsFCyUfC5tC5k98Qs4//w7Env/apy5cunI3XjvdZNSJoMHQec8MwGDpMJHzl6VzGGDty671vGdj1ih/wE1e/VWrqJBMW+lI2HJsBWvlKg2jAyJ6hx9CaQMloEIlQYCVPYDHnwfUVHMyfsgrPf+rci9/4h+eeefyBeM14etgMGjEYOoO5gRgMHaCa8A0ODo1cfeS+70qM3/oDNL3vHtcTyKZtZNI2OCVaKCUAMK3NAA3DRmJZBjllVskXWMh7KBZ9MKJKvPDcp2ZOfetvn3j0q/8WrxV1fTARQYOhvZibicHQJqoJ39DwyNjhW7/jPc7Y0R/Oq5HDjBNkMzYSNgenkFJpbaJ7hs1DOL0MheSUcqE0yeU9LBQ8MEqRUae+cPnlr/3t04/d/4n4oBEjggZD+zA3F4OhhVS7YQXC97rvd8Zu/5G8Gj7MGEW2z0Y6aQFK+cr03TNsEbTWihBITgmVGixX8JEr+FBSwRanv7Zw5hsfe+qRL/6T57lL6xKbPoIGQ2sxNxqDYZ1UG6WbTmf6brrjje9LTdz544tq5AbOKPqN8BkMMbQmgGSUEE0Iyxd9zC2UwBlDQpz4wvTLX/mLR771hU/Ehc+MGjYY1o+56RgMa6RaWvfWO1/7XYlt93xAJ/e9mhrhMxgaJOgnyCgjUoMt5j0s5j1YFoVVOPbp88//xx8/88QDK6aQsSzLMgNFDIbmMTcgg6EJqqV1Dxy68Y6dh173AZ098n1SazqQTRjhMxjWzHJEMC6CBN5CIv/4Xx977N/+/Mypl49FpU3/QIOhOczNyGBogEpRvuGRsYlDt7zp/3Am7v6JkkiMZ9MW+tI2GIGUSmojfF2A0qVf4ye+2TdBl/0LAFBL/zN0lEAEOaPME5rMLZRQ9ASomH2Zzj38sSe+9a9/MT8/OxOVNtFAg6E+5sZkMFQhiiYIIUR8+613vva70jte/UGZ3H23xRkG+2zYFtVSamlG6bYASkGrPBX4V3hP1wpqydJ08AMd/ho9Dp+ONC7cVh4aItH/SfDv0htICAgh4VPhbDvh20vDY23qmA3rQmutglHDzCp5AvOLHoqujyw59e9nn/7c78XTwiYaaDBUx9ykDIYyKkX5Jnbs2nvd0bf/nOi75cc8zZJDYVpXKeUrBUYIqXbvN8SpIElRgEYpBWgFrTS0UlBaAdDBf6HYEUJACAWh4Q9hIBQglIExCkI5CKVgjIFQBsIIQCgIliUOhIBQAkoolFYgSkNFUhhKo9YKWmsoqaCVCP6VEloqSCWgdXCMWqnl37UCQEI3DCSREhq8ZkLCfxEcD6UrLr4KwUuFNpLYKJEIEkKtxbyL+ZyPFHenihe+9mfPPvyvfzY7c+VyVNayLKvSKjoGw1bFyJ/BEMI55+VRgltuf/XbspOv/2Xf2XG7xRmGswlwZtK6VQmlJjopgc+oQOzCf7WSgTCFYkcZA6UUhDFwboHZDrhtw7IT4AkH3HHALQvMtsEsC5Rb4JYFyjiYZQWStxShI7Hfy94dUvuCp8t+CX0zONYlKQz/VRJCSCjfh5Q+lO9D+ALSdyF9Ad8rwXddSLcE4XmQngvhCSgloKWEkhJaA4SGkkgpKGWBIFK6SpJN9LAWYf9ARpjrKzK36MEXEjT38pfmTn7+fz752Dc+H5WMRuWblLBhq2NuXIYtTaXU7sDA0PAt97zjZwqpoz/D7PTQQNYxUb5yYnKySvCkhNISWmoQAlDOQZkFy7HAEylYTgJ2KgUnlYKdCh4zx4Fl2SDcCkSQElAaelgkYeHvOhaZg9IrU7pal/XTW889niJ6kUEwb9kmSXgOyArZJFHWGFFxrQElw0imFBC+D+kGYugVCvAKebilAkSxBK9UgnBdKOlDCgGtNAgLIp2UMpBIkmNRQyOFK4migZRSK1/wMbfoguvcRXn5q7//0Fc+8ceu65aispX+2DMYtgpG/gxbkkqp3b0Hrr3l4K3v+tVFuv87kw7HYH8CNqdaSCE1GO/m8XaTFbIRRe+WolcKWgOMUzBugSeSgdSl00ims3AyadipNKxEEoxboIyBMARXHrksjks/4eN6gysC+Vr6X/cIj7kmobAB4bkkFJRREApAB5KoFKCkghI+/FIpkMJ8HqX8ItxcHl4hD69UhPQ9qOjvFEqDqCnjK6Rw6RxuacJpYxhnrifJ/GIJBVciWXrib44/+snfjo8UNilhw1bEyJ9hS0EppdFKAdG2V9zzhu9N7X79h4t6+LqBrIO+tAOtt2aUr1wglJRQQgSRPKVBGQOzLDjJNJxMBslsPxJ9WSQyfXDSKVBug/FAbLQOurApKYP+cojEbrWYkHoiF88jl2/rJk3rgqrcrS8S7DD9SxkN+ysCUEH0UAoBr5iHm8uhuDCP0uI8Srkc3HwO0g+ihQQElNFACDlfJe5bEa21YhQKhPKFnIu5BRcJdfGx3OnP/+Yj3/riJ6NynHOuQrp5vAZDJ+iFy6fB0HYoDUIv0YXdcZzEHa/53p/3+u76BWpnhgb7HaQTHFIqsWVG7MZStyouekqG0TwG7iSQzPQh2T+A1OAgkpk+2OkMuO2A8uAU6TBqpaVYiuDFiaRmFXGha+Bsx5uI9ytc0RZi07SUidnKx428vUGF8k9C/HGlT0mlcRsrTkk9YawUTQz7AhLGgugpDYOnCpCuC69YgJvLoTA3g/z8PNzFeXjFIqTvAyAgjIKVCeHWSxlHfQMpz5cEZueLUN7CRXX5y7/1wJc//sdRqfJrhcGwGdn8NzjDlqb8Qj4wODx63Z3v/nXZf/tPpsLUrsWoklpB600e5QtlTwGAEBBSQkkfWmpQzmAlkkj2ZZEeGERyYADJ/gE4qQyYxUEZoGUoiUJCKblCHCoKXiNXl+VudctCF9bTiM/gQqDCFLOUgNIaWgJyqQ9gUE6q5cfQwSHqsM0lIdOAbmC+PgK6PEiEAlQDOjpeAhBCQAlAgwHFoDQY6cto8ByhACMIhwVRELIsk3FpXDqNKpboriaI5WJYQQqhAelLuMU8SgsLKMzNojA/h9LCHNx8AVLK8HgDGaSUBQNPsHXSxQRScMaZLxW5PFMEp9pXl7/ye49+7Z9+d3FhfhYI+gMTQoiRQMNmxMifYVNCKaXxi/bY+MTOa+98z/9wU0fe15eyMZB1AK2EVKCbNrUbyZ7Wy1E9IQCiwSwbiXQfUgODSA8NIT04jERfFszhwUAFGaRrlZSrUrWkPARX/zCCf2N1ouiY0gRKKkgVHKcUgFQaUi7/G6SPw/6AmixF8CoF8lZFBOscUy0aueWvKBI7oKXZXgAQosN+foEMBrO+EHAOcEpAGQHlgTTSUBLjghgdh1Kr97O06/JoaxjhY5yvFML8IvJzc8jPTiM/O43S4iKk50ErFfQftOyl/oOV2t1saK0VY0RLCTa3UES+JJAsPfW3zz/4j7924dzpE1E5zjkvn+/TYNjIGPkzbCrKL9I7du3Zf+2d7/1ojl/1zr6Ug4GsA62UrwG+6VK7q2TPhxISIAC3HSSzA+gbHUVmaBiJgQE4iRQYJ9AApB+MRtWx+9uqaF6tsxVGxOLRu2AwLoFSCiKUOiH00u+B6KkwahdGnmL7iftZI7LWy5SPX4lH+MKpB0GIBiUUlAKMAYwRWBYBZwScAZRT0EpiGEUMy6WwLEpIOA/6bIaDbpQAfLeE4sI8ctNXkJueQmFuDn6puEoGKaWbPE2sNSEQhFBrbsHFYsHFAE589plv/O0vnj55/LmolJFAw2Zhc938DFuW8ovyrsmDh6+/672/M4+9b8pEkT6lhNpk/fkopUsDKYTvQfkilL0Ekv396BsZRWZ4BOmBQVipZDAQQwJKCEghlm7mK0SvztmJR/J0JHmKQAgVCJ6v4QtASg1fqKXnl0SELIvdRpe6VqPKBVEvRw+D6f8oeCiGjkXArCCCSOmyGEbtVIoUrojkRYNLLA7KgnCs77oozM8jd2VqSQa9UhFQGpRzcM5BeDDwXW/KSam1poAEDQeH5Fyw/MtfOv/0P3/oxPFnHo1KGQk0bHQ2zU3QsDUpvwjvv+rw0W3Xv+ujKjn5yoGMg77MJpO+KLqnNJTwIYSAVhLMspDMZJEZHUP/2DjSQ0OwEkkQBmgBSOFDyeV+eo2mbildjkxpBBInhYKQGp6v4Yeip6SCClOyUfQuGsBr/K51LKWAgSUxpFSDUgqLA5YVRAstRsCsQAijt7quEBISRPu4FQzmicng4uVLWLh8CYX5WUjPByjAuR32GdycUUECLaLBIVfmirDcsw9cfvbjH3r+mUe/FpUxEmjYqGz8m6FhS1J+0b328G2vHLnmnR/17R1HRwaSsZG7ZOPPz7ckfApCeFBe8LLtdBqZoWH0j40jMzqGRCYLxgmUAqQvoKRYLXvNip6vliTPkxrCj1K1QSSPkuW6hu5RLoWUBFLIOIXDCewwSmjFhFCr6H1GQzKoNeDm8shNT2Ph8gXkrkyhlM9BSxmsumLbIOEw5M3UV5BACsZ4IIEzRdjywqMXnvqHn33h2ce+EZUxEmjYaBj5M2woygdy3HDz3a8fPvTO3yth5PqRoUj6hNjokzIvdbgXAkL4kL4AtTiSfVlkx7ZhYGI70oPD4DYHCCA9CSn8pmUvGrmqdCB6vtTwvCCq5/kKShGocCoWk6rdeChVWQhtTpBwCCxOwC2y1I9wKTpYSQbDASRBtA8QQqE4N4f5Sxcwf/ECCvMzEJ4PRhmobYOxINi+WUSwXAK5d+ab55/8+w++9MJTD0Vlyq9PBkOvYuTPsCEon7Jl38Hrb9t183v/1GPbb9ss0kfC9cykFFCeB6kUuG0hMziM7MR29I+OI9k/AGYRSKGhfH9ptYelPnv1ZI/G+uj5Cq6n4XoKvg8IGUb0jOhtaiIhJDroS8gZhWUR2DZBwibgFgWlurIMKhXURfB5ZbYNyim0BEr5HBanLmHuwnnkpq/ALxUAQsFtC5RZoIRsiommyyWQlk7cf/bbf/fBUy8//23AzBNo2BgY+TP0NOVzbU1s3zV5+N4f/ZN57H3ztpE0kgkOqZTaqHP0kdDGpJSh8AlYTgJ9I2MY2L4T2fFtSKRSAA1H5PreUiSlXnRvhexJAs9X8ELZW4rqKSz1yzOitzVZShmHMsgohW0BjkPrymB5VJDZPOgrWHKxeGUKM+fOYPHyJXj5AsAouM03jQiulMACaP74f5x+/G9/+szpEy8CgQTqkG4fq8FQjpE/Q09CCCGMMRb1o8lk+vpve92P/6GbuvEHsxkbg9kkhPA2ZqSPUhANaCngex6UUrAcOxC+iZ3IToTCpwEZG5VbL7q3Io2rAN/XKLnLsidl0G9rabSukT1DBaJpaZRajgzadiCDth30H6Q0Ns1MLCoYDPYJ+goy2walgFfysTh1CTPnz2Lx0iV4xXwYEdwcqWECKRi3eS5fwuyCC6fw1P9+5It/8bML83MzQNAfUEopjQQaegkjf4aegzHGorV3GWPsrje8/7fdvjv/60BfAv1ZB1BSKNCNJX3RmrlKQXgepPDBbRt9o+MY2rkL/WPbYKeSgAaEEFC+D2jdWHQvnG5F+BquFwmfXkrjRhFAg2EtxCODlGgwRuEkCJIOhWMH085UjwoSUL4sgn7Jw+KVKUyfO4OFixfhFQvBSGXbBuE8qLpBRZBACkI5n19wMbdYgrP4rd/7xr9/7Jfi17L4muIGQzcx8mfoGcpHzN312nd/0Nrxpv/JuMVHBpLQWkulNd1IU7ZQSmOjdH1QzpEaHMbwrl0Y2LYTib50IHyegJL1hS8e3ZOKwPMUSiWFoqch/GC6lWhwhhE+QzuI9xmkVMO2KRJOIIQ2X44K1hNBr1jC3MWLmDl7GotTlyBcD8wKRw1TumGjgZRAEkLYlbkipPB979znPvTN//zHP1h63gwKMfQAG+Ymati8lF8Mb3rFG96b3vuOP+B2ZmhoMAlOtVCabJx5+igFCfvxCc8DoJHKDmBwx04M7tyFVHYAhAHSE5DxCF8DffeECKJ6xaKC6wUTKUepXCN7hm4QiR6lQYrYSRCkEkGKeHmAEVaKYJga5rYNEKC0mMfshXOYO3sauekrUEoFaWHL2qBpYa0p0VIowmfmiygVFq6UXv7HH/32w/d/BjD9AQ3dZ2PcTA2bkvJ+fdffeMdrtx/5gT8v6oED40NJMEaVVIpsFOmLohVRWtdKJDE4sR3Du/eib2wMlAUTJKtwLdWGhE8F6dyCq1EqKXiegtTh1BxmAmVDj6GW+goCnBM4NkEySeHYBIxVF0FmWWA2h9ZAYXYWV06dxNz5MyguLoJQBttxgu8XAGwoX9KaUaqFUHRqtgCVP/n1Ew/91Y+eO3PiBcD0BzR0jw1xUzVsPuL9X7L9A0OveOPP/c089r5lfCSNpMOUkBqEbIARvPEon1sCIRR9wyMY2r0Hgzt2wkkloQQgvFIgfGGdqindUPh8oVEoKhSLwRJpSpm+e4aNRVwEGQtEMJUkSCQYKNVlIqiCleJoOBDEovBLAgsXL+DK6RNYuHwR0vPBHQfUskA2WDRQa60sTmm+4GN2sQQ6/9hfPfj5P/tp13VLgJkk2tB5jPwZOkp5ivfVb/mRDxf7X/kb2YyDoWwSQooNMW3LyiifgJ1KYWjnbozs3oP08DCIDtO60geJ8rKNCF9BoVDSEEKHqTQjfIaNj0IogjoQwYRDkEotRwTjfQQjqaOcg9k2CAGKCznMnD2J6dOnUFyYAyEMVsIBoWxDSSCBFJRyPj1XhILWxROf/Llvfemf/wgIMiEAYKKAhk5g5M/QEVaneO98ffrAe/6fZHpg2+hIGkQrGfTr62WCdGvQl68EognSw8MY3bMfgzt3wk46kEJB1knrlvfhKxSCKJ9vhM+wRRChCHJOkEwsp4bLB4sopUAJAQ3TwtKXmL94AVMnjmPh8iUoIcETNhizoIN15br90hog6A+oNOGXpgtg/uxL5x7/yx948fknHgBMFNDQGYz8GdpOPMU7ODg8eu29P/k3pO/QG8eHU+B8A/TrIwQEgPR9CN8Ftx0MbN+Jkb37kB0eA2GAKHlQUgZRPlbZ3Fg4TlkIjUJRo1hScD2T0jVsXeKpYYsH0cBUKlh2LviuIJBAKBBFQBkFcxwQCuRn53Dl5AnMnDkFt5AH4xa442yglLDWjEK5vmLnp/JIu8/83Tc/90fvd91SETASaGgvvXvDNWx4ylO8d77uB39Njbz6IyODaWRSHL5Qqpf79RFKobWGcF1IIZDMZDCydz+GJ/cikU5Bx/vy1YrykWA5tZIrkcsHwicVCdda7fzrMmwOom9WlCPUOvagAtFTlFQvRhBO8hyvRJafq1gx/NOt/OPf6GebYjktHI0aTjgUqRRFMsHAmK4YDWSOA2ZReEUfs+dO4/JLx5GfnQYlFDyR2DDTxRCtFbMYnZ0rYSHnKnnuEz/x0Fc//THApIIN7cPIn6EtxMXv8E13vyFz1Xv+31RmYHRkIAmlpdSa9myKN4oceK4LKIXM0AjGDhzE4M6d4La1NEVLtShfvB9fNC1LoaghpIYmADfCZ6hAXObKs5caoWCRYNUNQgBGKCgBCAMYCT63S6PAIxkj4R8Z4XZCsBTJDmYdX72foONd+LjseaWXJU1rDamCMloHAzikDo492KagNKA1WW4y1l5cDpdWncGyCOqwf2AquTItvCoayBl4woYSwPyl87j80gtYuHgxmC4mkQBjDBvBnSjRUhPKLk/lwcTlp1964P/6/lMvH3sKMBNEG1qPkT9DS4lL39Dw6Pg1d//k35C+q14/PpwC40SpYBbinvzckXC9Ub9YBOUM2fEJjO8/iP5tEyA0TO0KUTfKJyRBoSCDtK6rg5URTFp3yxMtmxaXu0jqKNWgBGCMgjGA0UDaOAcoI+A0+HwyFnzGGKUg0MtCCCx9JitpjkZM5PTKMhW/jGQ50hf3UKKXn4+XU3r53+V9kUAAFSAkoJSGlIBUGlIAUgf/KgWoUBShyVKwMVo1JNpxwqFIpyhSydXRwCj6HkT8gNzMLKZefhHTZ85AuiXwhBP0C+x5CdSaUaILRUmn5gpI5R/8gy99+k8/CJgooKG19ORN2LDxIIQQSimN/jq95/Xv+S9q9I2/25+1kU3ZPZ3iJYQEgzhKJTDbwtDO3RjffxXSQ4PBoIxS9dQuBUB5cDP3PI3FvEKxJE1adwsTrYARiR4hwbJohAKcUjAOWCzo18Z5EN2yePBcFNUj5SKnl9fQLZfHlb80xlrtoWntoCs8EfErQBAdDH8UgZQKUgVSKEQwv6VUwe9SqUAgpQZjBOkUQyYTRAOBmCTKcN5AxwHjFMXFAq6cPI7LL78Mr5CH5ThgltXz8wVGo4KvzBVRyM1NzT371+9+7qmHvgSYKKChNRj5M6ybeLRvfNvOyf13/fQnWXrnjdtHMlBQUvfoKN5A+nyIkgvuJDG8ZxLj+w8iNdAH6StI1w1zT9VTu1IQ5IsS+aKC55q07lZCxaJ4UbSKMg2LUXAOODaBbRFYlIBFchdG+HTsyhvVj3dPU1g5RszNAAAgAElEQVTbBN666oM11G+0ToOVahVbkQKO2iTReSFQWgUSKDU8oRH0yFDgjCCVpHAcujKfoIN1rZllgTkcfsHF1ImXMHXiOIqLi2C2A6vnJTAYFSwl4eencnCKT//91z77+++T4SAQQggxUUDDWjHyZ1gz5dG+21/9/b9Mt73ht8aHU3AcKqVET67DSwiBFD78kgs7lcbYvv0Y23cATjoJEfXnI3plmCIkGrHreRr5vEK+JCGEGa27GYl3iVvq54blNC2nFNwCbB7MW2cxAtsKUrKU6CXBi+QOamUKFViWxti4ijVH5aqxHiFs9liaUZG6RWMFgsnRQyEOv2dKAVICQgYFOa9wqdGAVhqUM9gJG54rMH36BC4dfxGF+VlYlgVmOz0tgVprZVmUTs+VIITwp578v7//6Ue/9HHARAENa6fnbsyGjUE82rd95+TBvXf+zCft9LbrxobSPTugI5A+Ab9UgpNOY/zA1Rjdtw9W0oEsCUhRXfo4De5FJVdjMSdRcoM+R5x3/nUY2kvQBw1LRkaphs2DFKNjEzhWkK7ljIJSvdzXriyCF4kejfeTW4dftEpN1iqD3RbBSmUowdIQZbVctHL9UAJ5wob0FWbOnsbFF55DfnYGlm2BWb0tgZQooRTh56fySIsXP/3lT/z2u4TwfcBEAQ3NY+TP0BQkJBK/O173vl/F6Gt/fWw4hYTNlOzBAR0rpC+VxtjBqzC27wCshB0O4pAgS8Mjl4mieSocwLFQUPA9HUZ+uvNaDK0h8jCFUNpCcaNUgzOKhA0kbArHIUhYQb88SldG8MqnWom3XWl7Q3QoVVu1jTbJYCdEsKF2wsEhlDFwx4HSGtOnTuLiC88jPzcbSqDdwxKoNeeUTM+58Equv/jCX7/rsQe//GnARAENzdFTN2lDbxO/uOzas/+aPXf8zKes5OhVY0NpKCWEBuupOFjQp0/AL4bSd+AgxvYfgJVwGpI+4WvkCgq5vEntbnTisqcUlsJEjAdRvaRNkEgQ2DaBzSgYDdO2ZaLXDhpWjDZG6arWbUF/vlVlW9VmKyVQakyfOYELLzyPwuwMLCcRDAzpSQEEKNVSCrDzUzkkvWMfv/9ffvt7lVLKjAg2NIqRP0NDxNMK97zxR39TDN7333o12rc8ZUsBViKF8QMHMbb/IKyUA1H0w+laqkgfAXxPY6GgUChISGmkbyMSz7CKSPYIwJhGwqZIJSiSCQKHUzCul+VQtVf0mqWhO3gbBK1ivV4VQd1AmRrPaxlKYCJYnnH69ElcPPYMCvMLsBIOGO9VCYyigCW4xWJx7tm/eueTj339/wNMFNBQn565YRt6k3jfvsn9h27YdfSn/oUnhvcHffuU0rp3pm9Zmpy5VASzLIzuPYBtVx8KBnIUfSgpQCosRbA0iMPVWMgpFEoSCsSM2t2gLA3OIAAjkewRpBIUCZuCMb3cTyyM7JVPX9cM3dCCZgZLrKNI7Xot3kcjftWKaGDNPoGMgicdSE/i0onjuHTseXj5HHgyAcZ4T0ogJUpEI4LpwiN/+Y1//aMfA4wAGmpj5M9Qlfjaknd9x/s+LIZf+xsTIyk4NpVS9dBI3nA2WM91QSnB8O5JTBy6Fqn+PoilgRyVpY8CKLgaizmFgisBI30bhvJonUYwn55jUyQcgnSSIukEc+pFS0csDeaIN1KLFt/r26kOjUTH1lmkep0Wtt+qaOB6JdBOOnBLHi69eAyXjr8I4ZZgJZOg4bKPvYTWWtkWo5dmCoA7e+b413//DadPHn8WWL3MpsEAGPkzVCCe4k2lM323v/W/fV4n9twxPpzqsWhfsJyV77pQUmJoxy5sv+Y6ZIYHIT0B4deQPgIUigoLOYWSawZxbBRWpWdJMMVHyiFIpwiSTjC3XrR+rYpF97ry9rZ5apV1tVdnZ02P7m2iYitFsG0SqDUo4+BJC16uiPPHnsOVE8chpYLtOOEajr0lgYxqWXQVuzRTAC7+24ce/NI//C5gBNCwGiN/hhXELxI33nbfWxL7f+QzQ4NJkk5aSuve6dtHCIH0fQjPRWZ0FDuvvxH928agfAXhuktrmMZZkr6SwsKikb6NQqX+eLZNkE4QZFIUqWSw7Bl0sMBD+S2u51O5be6z13A7NXbQbRFshQTWK1NLApllgdsc+bl5nHvmKcycOw1KOSzHCY+tdySQEK0oofTSdAEonvj6w5/7nTfnc4sLZjCIIU5P3MgNvUG8j8idb/rAn+vBV/zEzvEMAN0zq3QQQqCkgFcsIZntw/ZrDmNkci+gAOEWg8VHywKTRvo2LiKchoWGfffSqUD4ElYgfFoDSq6ePLkXaMkdto199+rWb5EMNiqCrYoGtlMCue2A2hTz5y/h7DNPIHdlCtx2enBksNaEEJ0v+nRmvoTCsY+9+clHv/ZvgIkCGgKM/BlWpHnHt+2cvPpV//ULPDl2YHw4Bc+XvbEmLyGAArxSHtyyMX7VIWw7eAjc5hAlF1oqgK38OEejd4sljYWcRKlkpK+XiSJ8kfAxppFwKDJJikwymFyZ0uA5sUluXWvWhRanbOvW7UERXFc0cM0SGIwk4okkQIArJ1/G+eeeRnFhEXYq1XP9AQnRkoCwk+cWkCo+9If3f+ZPfw5Y2Z/bsDUx8rfFiUf7br/vbe/nu777Y8MDSSQdKqXqnWif77rQUmJoci92XnsDEtkURDGcq6+K9HmuxnxOoVBURvp6lHhKN/B3jWSSoj9NkU4SWFbw3q5YXq2bB9xhmtKIFqZta9ZrpQhuVAmUGoRR8IQD4QlcfOE5XDz2HJRSsJLJxg+sI2jNGSMXp3PQxQtPPvH533rN3OzMFcCsDLKV2UrXUUMZ8fD/HW/9pU/xgevetm2kDyC9MagjvjJHZngEu47chIHxsaqDOSgNUryerzG/EMzTB0KM9PUYq0bpUiBlEfSlKfrSwRJqiD1fyfh66cLVk1O91CnYCRlsOI3bYIVWiGCrJVBLDco5rKSF/NwCzj71BGbPnga1bFi23VNRQEa1LJQUm5otwD3+1297/KEvfwYwaeCtSi9dQw0dIv7X3sFDNxwdufGnPz84MDCQzdgQUumuD+qIpm4pFmElEpi49nqM7zsIQgn8YrHiYA7OASEI5hcE8gUzT1+vEh+0YdkE/alA+pJ2IOkyjAACVS5OvXzF6kD/vHW33UIZ7JYI9pwExvsDcorZc+dw5qlvozA3BzuZAO2h+QEJUZKAspPnFtDnPfZnX/zkH34AMHMCbkV6+VJqaAPxL/ndr3/fh9XI635jfCQNi2qhQLu+PFs8xTu6dx+2X38DnFQSoli5Xx/nwdq7izmBhVywIgfv+qswRCz14xPBDdmyCDJJgoEMRTJJwEiwXax3puWNRBvSs2tur0Uy2DYRXGc0cD0SWLftSjvTgJVMQiqJi88/hwsvPAclZJAK7hEBjKeBVf7sYw995iP3lErFgokAbi02+2XWEGPFaN63/+rn7cFD3zE6lIKSquuDOoIl2QS8QgnpoWHsuelm9I+NQXgC0veD5dhiMAqAAIWCwtyCgu9rI309RtSPjzAgkwiEL5Nk4JaGluHADrT3IrSetrt2q66w41YdSydksNUi2IpoYLsksGoqmDHwlI3iXA5nnnwMM2fPwEokwHjvRAGjNPCFqXmx+PSf3Hvs2ce/BZh+gFsFI39bABKilFJj23bsuf51v/pNK9m/faDP6Yl1eQkh8IpFUEYxceg6TBy6FgQEfqlYsV8fJUDJ1ZhfkGbalh6iPMpnOwQDaYKBPgrHJisGdkTlG2lzo9Lyu2cbpHAtMrguEdwqEriUCrZBLYYrJ0/izJPfhlcowE4me2aCaEK01IqwC1dy8M9+9ucfuv+f/hdg+gFuBTbytdXQAPEv8c1HX/WdzoEf/vToYAqJBJWqy6N5owEdwi1hYNtO7LrpJmQGsvAK1VO8wteYnTcjeHuNqC8fIUAqQTDYT9GXYmBUV5x4GTAXH6BFgqhrPlxPU3Wf7KoIbggJ1MEfQqkkfNfF2SefwNSJl0A4g2U7PREF1ForyiidmimgePmJTz74uY9+F2AEcLNjrr+bmHia9943vf9/FPvu+ZW9O7LQUFJr2j3xCwONXqEAK5HArsM3YnTf3mB1Ds9dFe3jPJCHxUVp+vX1CCvm5JPB4I2BFEF/liLpBG+eEFunG187WLMWtEgGuy2Cm0kCtdJgnIM7FuYuXcLpxx9Dfnamh+YG1JoxoucWXOrlp08+9rkPH52fm5kyArh5MdfkTcqKgR3v/Mh/2tmrXjM6nIaUsqujeZeWZXNdDE3uw54jN8FOJiBKxeBCHDu0+CTNs3MSnunX13VWpHYBpBMEg1mKbIaB14jyteM4GtvYYtrYH28dh9B0pZaN7l1n+62KBtZLCa9HAludCraTSUipcP65p3Hh+WdBKA2Xieu2AAKUallyFbswlcfi03941/PPPPZNwPQD3IwY+dtkxNdv3LZ99/7Ju3/pm0PDI2PB2rzdWds+PDAAgFfIw0qmsPvITRjZvQfKExBi9YAOiwfz9c2ZFG9PQBD01RMK4FSjP8MwmKVIJ8K+fGL9S6yRqg82OLrir+3axZoqtGR07zrbbkU0cENIoNQgjMNKWVi8fAUnHnsE+ZnpnokCRv0Az1/JoXTi4z/12Dc+/eeASQNvNjbTJXbLE//r7PpbXvmOoevf/y9D/SnYDFKhe/37gr59PoTnYmTPPuw+cjOshAO/UAw+gbFoHwsFb8GkeHsGFUqfzTUG+xiGshS2TdY0Ypes+sUAYMkQWnnbb6qtdQhqLSlquGytMptRAsMooOUkoYnG+WefxvnnnumZKKDWWnFG6YUrOeiZhz/2tc/+4Y8DZj7AzYS5BG8S4l/K+9784x8t9t31ocnt/VBaSqB7/fsIIXDDaN/kkVswPLkLoiQgy6J9lAY/pZLGzLyE55oUb7eJ+vPZDsFwH8VAH4PNNUQ0hUuVer0keOs9hK7nuVoohZ2QwUZFcE3RwI0ggWuKAlJYKQeLU9M4+fjDyF0JooCk6yOCtWaMksvTefgLpx/8+id++RWAEcDNQg9cng3rJR6Ov/07P3J/avjgfePDGYgu9u9bWprNLWJ41yQmb74VViJRMdoXTNQMzM5L5AsqfE3dOOqtzYpBHApIOQTDAxTZFAVnQT8/VRbmI0BbryIb+QLV1tt2HclosImmC3ZLBOtFA9spgZ2OAp575ilceO4ZUM7Be2CJOEah8kVBr1yZunzsi7924+z01AWTAt74bORrqwHLf4Vl+voHj77jd56wk8O7+vscJaXqmj4RQuCWimDMwu4jN2Fs3z4oT0IIb3W0jwCFYjCgwxcm2tcNygdxZJKB9PWlaLDSXqw/Xyv/lDAXnxYL4jqFsKG6rRTBNkhgvXZ6SQJrRQHnLl7GiUcfhLuwCCedDvfd1SiglArs/OUc5p74P19x7NknHjSDQDY2XZ3nzbA+or++dk8evG7Pff/9xeGhoaF0ikmluvS+EgKtNdx8Hv2j47jqrnsxOLENolCE0nKF+HEOSKkxPSsxv6CgATDzaewo0bsRTMocDOLYMcYwPsSQsAmkDEfuhtOAr0X8SI0fQ4vPT+x9imZLaqadhvYdK9TMsVYsV9ZAI+2ter5ChVptLD1XpVDNujW+A1XrkdrHsgJKAA0Iz0e6fwAje/ZDuCUsXLoIwihoVy+QhDKqZSbtUDZ89P1DifyLF84efwpYHmRo2FiY2+0GJFqxQ2utj9xyzxvHbvmFb+zYlmWWRaXW3RnYQQiB8FxoX2Dn4SPYe+vtYNyCXyoFF7Xw+kApwCmQyylMzQi4AuCs22uMbE2EAKTSGMgw7BznGB2ksBiBUMvp3Wbel7YKXlnDpId+2vWi1y2Flc7VGvddr1Cjx1e1XNnGRiWQlG+o3mTl59oggZU2Vjv3lWQ2mg6LUoqRPbuRzPZj/uIF+K4LbllVjqoTEApA9aUcssAOvnPfjgGcfunbXwGCQISJAm4szC13gxEPtd989zs+QHe87U/27eiHVLpr6/MSQuDm80hm+zF52x0YGBsKVunQasVVklNAKI2ZOYlCQYNydHHuma1LkN7VyGYYxgbD6VrCEb2N0nKxa3WbPUq9tOO6211DxZZO81JWYE2p3Fa0s5Z0cCdSwc2kgcO+gE4qiWKhiJOPPIC58+d7YDCI1pwxcnEqD7Lw+P/+8id/972AmQpmo7EVrrebhviX6zVv+6nfK2bu+IXdO7LwPdkV8SOEQAkB3y1heHIv9t50OyhnwZq8Ffr25QsKM3MCUhNwY30dJ+rTl01TjA1SZJJkaRqXWrTkIrGFBG+ttFIM19REG0VwTaN7q2xseHBHlcIbTQK1CtcI5gznnn0G555+sicGgzAGfXm6SIozL9z/wKc/8qpgmxkJvFEw1+INQvxL9Yq3/OInU6NH3j46lIJUqisjegkh8EslEEqw+8ZbMX5gH/ySDy1EYHohnAapxZk5iXxRgxIzkrfTiHDARjZNMDbI0FdH+tb1YeohyWvFMfRKHmu9/f07IYOtFMHNJoHrjwJqEEJhpxzMXryMkw89ALeQh51KdVkAqZpfLNHi3LlnvvpPv3BYa60551wIIbp2UIaG6IVrtKEOcfG757s/+mhiYM/NQ/2Okqo7WdNg7r4c0gPD2Hf7HUj190MUitCxji0UweyC+aLC7KyAMNG+jiPCpdb6koH0ZdLBm1N+WV7zRaCJPmTr2MWGpd235PUIYdPVWimCrUgLN9FGLQlsqG6z4tiuKGCYBraTSQjPxcuPPIyZsydhJ9NdTQMzquV8TjDhzl186JO/eP3C/Oy0iQD2Phv52roliFK9A4PDY7e+7bef4M7Atv6M1R3xIwRaCPilEsYOXIU9N98KojV8112V5oUG5hYkFnNmabZOQhBMwCwlkE4SjA1RZNN0aSqXqMyaGl5r3frNbllafbteqxA2VaUNItjLEthrUUCtNDjnoI6Fi8eO4fQTj4My1tU0MKValkqKnb88757/1n8/fP7syRdNH8DeZqtfe3ua6Muz7+C1Nw3f/KFHJ0YyJJGgUqnOj+glhMD3XADAnptuw/i+vfCLPrQUAIuleTnglTSmZsN5+8x48o5AEKR2fQE4FsH4EMVQH4Uma5S+Fkb12jE4pCdp4X23VU21XQabEMGtKIFNRQGbTQNrAjuTwNylKbz04DfhFwuwk91LA0drAp+5tIDZb//+7S8898RDJgLYu/TypXRLE43qvfm2e17vHPyxf98x1gdCdVemcomWaEtm+7H/6F3oGx5AKV8Eiad5afDrwqLC/KIAQEy0r4N4AmBUY3SAYXSQg1MNPxzg0dCXvAWy14q+gh3ZV4tZSwq1Y/uqVL/JRnpVBHtNArsVBbSTSfiui5cffgCz5852dTQwIUpKRdmFy4sovfAX3/H4I1//gpkMujcxcZkeJPqyHDpy3zv7rv2xz0yM9oFSrToufkuTNucwvGsPrrrrlXBSKXjFcDRveAfmNJiw+cqMxGJegTFi5u3rAATRXH3AcJZizzaOwQyFlsG2qEy1ymuZ/y2+76bnn6s2cV2F+d3q/fQSjR7zqjnp1vDC1nsuCLB6jsIm9lmvYKOfp5rthU/W22fF52MbG6lf+UHtuqRC+bp1qjxRcXON81e+PZoTkDOG0X37ABDMnT8HQgHKurFcEqGUapVOOcRN3fDeDJ19ZuriyWfNRNC9h5G/HiMSv8O3vf592Wt+6O93T/RBK62Azk7lEq3NK10Xu264CZO33AItJaS3cok2zoBCSePytA8hzSodnYAgGMjhCyCTIti9LZigmYDAr5VgaaHsNVW4wg15I0hdO1izGDbZZlPH004RXE97HZDAiue+7Pmq9ao0XG1/1SaHrnb8jU4MTQiBVgpaKgzu3I7UwBBmz5+H9DywrkwKTQig1WA2QUrJ675nOOWeuXj2xce7cCCGGphbdY8Q/8volrvf/lOp/e/+2J6JLKRUutNz+EXTuFDKcPDOezC+fx/8QinoSxKKXzR33/yCxMycBIhJ87YbguV+fbZFsHOMYccog2WRcIm21dGMtUb3GpaJJiWvk9QTzUZ/un28VZ9soq2G9x/7vDSzj1qF1h0N7LIE1q1XQwIr1qnyRLXXXmvf5Y0K10dmeAiDO3Zi4fIllBYXwG27SgvtIwpiDGWTpGhf9baJYb5w7uSzD3T8QAxVMfLXA8T7RLziNd/3IWvn2/7X7okshJS6+qWibccSrNYxMICr730N+oaH4OaL4RJtQZkozXt5RiKf1+C800e5NRECoNDYNsSxe5whnSDww7Rv/MbVNtlrQvRaRS9IWy/uv/YT9dtoeL9tEsFG2qr2RK9KYDUBrFSnqTWCGxVABNdv6flwkimMTO5DKbeIxakpMNsGaemnshEIUVrpwWySLJLJ1+/ZntWnX3riK+FxmjtGlzHy12Xi4nfvG3/41/Xod/xmV8Qv3r9vchJX3fVKWLa1NJFzRDzNK02at+0QhCleCQz2UUxuszGQIZAymMcvfoNu59qt7RK9lgnUeiyxTWbXTjlsWAgbqN/w/poUwZplGvi8tk0CV/9asW61gjXFscpBVRPAhqOANc5XJQFU4WT7o3v3Agj6AVJKQTt+wV4WwDm141V7dw7SU8cfvz88TiOAXcTcurtIXPxe+/YP/L7bf88vdUP8SGz+vl033IjJm2+BEgLK80HCaVyiNO/cgsT0nAQxad62oxGM4rUtgl1jDBNDDCCBCIKEwdg1Cl/dAlVkby2sSYDaIGMtpQXH1uqXs1YZbHbfjYpgo+9zoxJYUeTWIpEVPt9165UVrFevmgBWk8Cq7VTYWE0AV75GAigF7SsM7toOp28As+dOQ0oFxjs9EGRZAGfl9vv27x6xT7742JeCZ4wAdgsjf10iLn5v+J7/8hf55K0fCMRPodPi53suoDX233E3Jg4eCPv3qaX+fZwCShFcmRHI5TUsk+ZtO0IBWgGjgxST2ywknCDFG3W7bPgmjRo3qjbIXsMis06Za9YN2/mz7oNtsEqzVKzf5L4b2kcoYI2IYK0C600Jd0sCq9ap0mg1AWxqMEiN/a5sNOgHmB0dRv/EDsyfOwe3WAC3Ot0PkBClNQazCcyIbfcc2DuWPHns0f8MnjF3k25g5K8LUEppJH43ve5n/46P3PqD28fSWkrd0S8BIQR+sQjuODh076sxMD4e698XHArnQMnVuHxFwBfapHnbCEGQ4vUE0Jcg2DPBMZKlUDrs19fEzbEh6Sp72OyHryFBadKYWiZcHWTdx9xghfWeh7oyWKdOQ+038f5WLbMWkYs9Ubf98uebkMBKD+rWaVAAgerf74oCWOUclW8jhEB4PpLpDIb37MXi9BUU52bBbafKUbSPJQH0xu8+uG88feLYI18Ij7HXvtabHnMr7zDxJW+OvuWXPzuy+9Z3jg51R/zcQh6poSEceuVrkezrW56/L4QzIJdTuDIrgoiTSfO2lWii5h0jHDvHGSxG4Nebrw/rE75GWbPoNVisF6Wu1TQthw0UXM85bJcIRhLYsmhgvX1V2diIBFZrrJbMrTpf1dqLF6vy3lUs36gAhhurCWB8ezAfoAC3LIzu3Y9SfhGLly+HA0E6SySA0974XVcd2J498fzD/xEe42a/BPQURv46SFz8XvG2D/9H/8ThNw72OUpK3VGt0gDcfB7Du/bg6rteCc4YfHd5YEfUv292XmJmQYGbSZvbBsHygI6hPoq9ExzZNIWUgCqfuqWsXqPCtxY5aIXodVPw6olWMz+dYs1S2NzTDe27mX3UbTcSwTr7rlWgXRJYtV6d41olgbXaixerIIAV5a3KOat2vDX3udQmgQ5XWhudnAQUwdzFs6CMByuCdJAlAXRH7zgwOeKcfOGxL4bHaO40HcLIX4eI9/E7+pZf/tf+icNvGOxzlFTo3LcuHNHrFQvYcc112Hv0KKQQUMJfIX5aEUxNC+QLQf8+Q/vwBGAzgj3bOCZGKAACUWOi5rUIXyO0WjhadQVvubCtoVK3pbFu23UKrFcGK29YXbZum5HQVClc9xg7KYGxDXWFrkKhmvup8h5VLF/jXJVvaKhsNBBEBANB7GQfZs+chiYErMN9eqJBIDP+tnsmd2T16ePBNDCGzmDkrwPExe/W1//8Pw7uuuUd3RA/JQRkqYTJm2/DjsPXQRRcaCWXrhqcA74X9O9zhQY3n462QLC8QsdIP8W+HRwph8CrNFEzGpeydd/gqz1ZRybWIzoNC9RaDayZA23xPtZzKPWo21aD71+z+1qxoV65Wu3VKVjz6VB0au2n1jmpJ3OrPne12iyvU+H9r3p8Vd6XVWUbFUBUPy+rBFADwvMxsG0UqaFRzJw5CSVFh0cCx6aBkTtetWMsUTh74ulvmuhfZzC39zYTF7973vrBv06OH33P6FBKdzLVGyzV5kH7EvvvvDtYsSNXDBYJj8SPAYViMH+f1gAz/fvahicATjV2T3BsG2ZQOkj7VpO+VbRD+JqQvbVQU4DWK229RoOvp5UvtW47LXpvV5StUbGRNiMJXHNKuI4E1vv+NCyPFd6zmnXKCjUjgNXK10oDV9pYXwCD+4JwPWQGB9E/sQOzZ89CuKUOLwm3LIAL2P268QFcOX/quYeMALYfI39tZMV0Lu/64J+qgdt+bHwo2dHBHYQQ+G4JlFJcde+rMLR9YvWKHQyYX1SYmZWg1Mzf1w4IlqN9Q1mCvTtsZBLL07eQWLlGbt5ruVlXvKG1WPbWJHlroBG/6tRPS19AC/fT0GepxnvfVPs1KjbSXqMp4WpPrlUCa7Vb9TvTaB1SZXtZ+UYFEMC6+wGWl10eCdyHod27MX/xAkq5XIeXhFsWwBzb96bhjHf24pkXHjMC2F6M/LWJuPi95u0/+bu55NGf3TGa1lKt/X6xhmOAXyqCJ1I4dN9r0Dc4BLdQXDWwY3pWYiGnwDE0x6oAACAASURBVFnli4th/XgCoFRj9zjH9lEGXRbtq3WDqiQFtWjopl9lczNvf1VBWYe9tFW42kRLj7lJKVxrs1WfrL+5ZvurH1QpU6udTkpguLGeBFba0FCdskJVhazG+V9Vvsa5Kd/QyGsihED5PiwnieE9+5CbvoLC3EyHp4KJC+DB78yw6SevXDz1XHxaNENrMfLXZu590w9/xMve+yt7JrKQqrMRP7dQQLJ/ANe88jVIpNLwSitH9EIHAzsKxWB9XkPrUToQv4E0wf4dHH0putS3LxjeUftm3Anha5SGRa/JdnpV6lrNul53g0K41mOp+ET9zTXbXU9b3ZTAhuqUvQd165Aq28vKV5PmVdtIZQmsKICNyCIhkEKAUY6R/ftQyuWwePkyLKcLAtifJG7iuu8d5Ofvv3Th7EnGGDMC2HqM/LWBKFx9x2u/70N6pPNr9RJC4ObzyI6O4ep7XwPGOXzXXSF+SmpcmjIDO9oFASAEAKKxazSYtw8kGMlb9cZV4abeyH4aEb61SEJDstdE/U4KXi3Ravanm8fbVKVm61dpqvbG5kVw9YMqZaq1sU4JrNV2xTo12qx4juocR7VzsF4BBBoUwLBc1f0tlSHQSoJIYGTvJPxSCfOXLsDq6GoghCilVH/GIaXUkR+yCs/+y8z01EUjgK2nU9e2LUOU7r3t3u/6aWvXO/64K+KXy2Fgx04cvONeAArC9xB1n+Ac8Eoal2d8KGX697UDDcD3gb4Uwa5xhoQd9O0Dakjf6l+rUq+NZtpaS7vrKLYmat3cu06N21G77lQNt1uhYLPHVLH8OtrVVR801o6uU6hW/VrqUOt1Vqu2ansz5XWV7eVFdIVtlco2ei515e0rj02DEAor4eDkE9/Gheefhp3MdLRLECFaSQV6/lIOL3/pl/ZcvnT+dHyeXMP66YXL56YhEr8b73jzj6b2vfsvOy9+QCmXx/DkPhy4/Q5o34eUYmn3nAOFgsaVGR+AEb9WQxAswyYUsG2IYvsIgw4fV4zOrf61ZtuNbFy38HVB9tZ6DBuKFohYk83XLdRNEeyaBFaRn5r1mqnTqNQ1U7bB81NNbitJan0BDG4bVjKBs888g7NPfhtWKoVOjsGIBPDs+dnSM//2wYl8bmHOCGDr2IyX2a4QfSivu+U17+676of+fnJHh8UPQKmQw/j+q7H3ttsgih60js3hFy7VNj0nQWmnjmrrQBCM5KVMY3LcQn8fgfArXGR7QPqala1WfFS2hOCtlXVKWQNNtny/jYjgRpXAjkYBGzhnXRVAEFhpBxePvYCTjz0CK5kAIZ2cnlZJIQg7e/7i1MMf/6kxYOVKWYa1Yy7BLYAxxqSU8vojt92TufZnvrpnRz9kB8VPA/AKOUwcuh6TR26EX3KhtVohfnMLErMLCpbp39dy4mnePdsYHGs5zbtEE9LXauFbi3it54NbqU9Uq+mlC1fbOiI1EBlaQ1MNFVhTGrfGxoYkbr31GxWf+HNrSAW3KgrY9TRwIwIIQCsgkUng0ssncOKhB8AdB4Sx2ievhRCiZaEkWWHm9ONf/odfuDnYtjybhmFtGBVYJ9FfIeMTOyfHj/7KEzvH+6CUUqRDfx5F4rfjuhuw58Yj8AsudBSzB8AYMDcvMb9oxK/VEARz9wkJTAxTTE5wUBKI35L2V+iMX6u9iqJGVj9stLP9qs7mdTrON9J21XpRB/u1NFTlOKr99BJtO+ZY5ejcrrW9uvXKCqz5c1ZlY6OffVKlcEP1qxSqVbfeqOBKG2u2V2XHlcqv+n7W2i9i56beMaJy2KHStaXacZW3JVwfA+OjsDNZTJ86CUJIIIAdgVDbItLT6e0j2/Zef+7Fb/5zcFwmf7UejA6sg0j8EslU+uBrf+fUzolBi1KtgM6K387rb8Tuw4fhF0vBX21k5Rx+i3llRvS2GIIgzcuoxt4JC+ODFL4IpnZZIUCofbOo+Pwabp4VyzUhfI3SCtHbKFLXalryumsI4VqPo2aBJo6zYpk1fI5bIoGNHl/4RK3RsNVeU8PSWEMAV2xv4DxVE8CKZRsVwAaEmRAC6froHxuBkx3sigBm0ly7ZOS6/buHnRPHHv2ikb/1YZRgjcT7Hdz9vX9wfGR4ZMSyiNSadOScagBePo9dN9yEXTdcD7+wUvwAYHpaIF8wc/i1Gg3A9YFsKpi7L50kcKM0byukr+xhozdLsupB9XKNXjWryl6z9Zuvuq6dkBb/tPuFtEIIWyGD9Z5s+vNYvrGRfZZXWYsEVpGaqG61J5oSxxrnmtHl9kh4TSYI/iCveUwVzlPFso2IHRoUwCrlVpUNBTA7Ooxk/yCunDrRUQFUSqMvbZMpd9s9w+nSyYtnX/y2mQR67Rj5WwPx/gZ3f/dvfj01sPtwOsU6Kn5+Po/dR27BzuuvhZ8rIZo+Opi8GcHkzSUjfq2EIOj/4ktge5jmJYQEK3U0eINs5sZY71iaFb5GWI/stdSPmhG5Vu63/uGsOkd1ZbGF+2ym4lpksFERbPSYqn7Wm/i8r1cCa30vqtWp9f2t1BALn1AKkBIQPiDF8o8QQfcQpYJrSPQHOqXLXedWnadq+4x22wYBrCqbsULC9ZEdHkJqcAjTp08GmzsigMF9d7A/SfL84Nv76ZkvXr547pSZA3BttOM6uamJi99tb/jg3w3svP37BrOOUhodS/X6+Tz+f/beO0qS5L7v/P4iMrN8ez/dPT3erp91s36xJLAAARqBEEEDSuRxTzoaiO5wlEQKoihKPPIkvXdPj+90T+/uRHPiEynw7kQCBCAQjiQIASDMOiywZmZ3XE/39LQpl5kRcX9kZU2ZtFWZNd0z9X2vuivDZWRWZsYnfxHxi6V77sO+E8cd8Gt9kEjg6pqNmq2gDV25JCYCYEmAQWFlTsd4iWAK53y3Ql9Q/uCAaDejXwPRS1ldaWNkSuTBEeG83arym+3ZV1kxEifi5sUjIvYM3x7KCDp3oZMxYk4KCZsQQtSAPdu5jrmmkMky5PLkLJfJCJwDtq1gWYBlKVgmUKtJCJug4Dy3Na0BXwqQPsfY70SQJH0BKqmQyeewcekKvvUXnwbTNDBNG8gkEKWUJBC7uLqNb33yQ8tXVy+96U66TH3nt5Bux+duX3Lh7+l3P/fP5eST/3BuOqdsezDn0e3qXb7rPuw75QV+hCvrFkxrCH5JigDUbSCXIRyc58gZTjcvJQB9NxX4BgV7tzHk9aIw9yWR8sdM3NfsXo/IXQ2BcWcFe8CQC32mBWQMhbEJjolJhkwW0DTHh2rn70jk7FtKgmlJVMtAuSyxvamwU5YQwgFFTXO6h4W6sf+wOvYDgJ5powJgIYeNi5fwrb/8DBjXBwaAjg9AYq+fu7z1/H/54LRlmebQBUw8DZ/HMeS+Xdz90Lt+LHfoB/798lwJQjaH+Kcqd3LH0h33YPH0qS7wk1Jh9aqAKYbgl6QUnAf8eIlwYE4HQcFS0bqqggKSgr443XlxMvR8QQd0mSWp3fTgGkR/Uz9AGDlbUiA4QAjs1UVMv1ZA0wSMjMLsvIaxCY6MoSAa3brux0ut3b2M3+itqVYVrm8obGxIlHcUlAI0vaVbOArYeUSk7gpGKhiFHK5duIBv/cVnoekGaGAACFmtC1bfvvTNT/yHnz4ODH0AxtFwzF9EueB3xz0PP6Ov/MgfHlwaGyz47exg8fRdzuSOcjf4XbkqYA3BL1Ep5czoXZhk2D+rQcJ5G2+M5faU7xgnv/igMgIGVkUdx9UcGxQhQ+yxZY1MnePv+hVF+OwmRalvv3V2f8d+x2JGSRh1nKBvuS0RUfbdzz3TFueRMDBfwL3lmadhubNNYGyScOCIhtFR5jwnLECJG2DkOxa0IaUa4wBt57thEEZGCdPTDGNjzkO8VpWwTAI1QDGsjl7W/KBjCT1un/u5/bciCNNCaXLCmQX8xutgRKDBLB9FukaibmenJxeOPnjhlc/9nlJKDWcBR9MQ/iLIfZtYXD5wdP6BD31xcWEEQgzGlx8BqJd3sO/0nVi+804H/BoRjAFCKKyuCQihnBlmQ/UtgrMkm1IKK3MaZiY5bOE8pCNb+2JCX1sjGQJ8kRrlVkiIut8wtcJBn7A3MLCLSmYDIMwkd9PM3wmEMesQljDqb+xbXkvEQCEwSt1w4xyG1gUNi54AFlc4FvdzQBEsq5G+hx+zFQilbACkAjJZwuQUw/gkg64TahUJs96AwJZnfBwA9EybIADapoXR6cmmH0CmcQyGwYgV8oasqrGjRw8tTr720l9/dAh/0TSEvxC54FcoFEcOvu1fnJufGmEABgN+RKiVy5g/fgr777m7y52LEAqrVy0IieE6vQmJ4Fj7dE44sqhhtOj474vV8PQAfUGJIwMf0gG+Xl2IdO6rL+CJAW1hM4EjfzrBKuonoUPrqZzO+sbYd1CiqLDvW15LYKx7wiMg0r3okSgwX8i9p5Qzxm/5AMfULINZb7wMJogZrSBo24DGCWPjhMkpDVxTqJQl6pYzLpC1nEuvOvsdi98+A9P5/O6tYdSYBTw6MwU9X8L6+dfBuDYQAJRK0UjRUOv1qQdnRsTFi+e/+eXhDOBwDeEvQK0zex953796aWpialI3mADSd+lCRKjt7GD20BEcOHMGVrXuA340BL+ERHAmdhRzhEOLOjIZNMHPL70fuMVq4AIaqihlRGnsI/OABzxFVV8AEwZzwUn6gqY+q+cJjUlUsJ9ja61LL1bBoERxu4X9ApOAwKC8fjsJvJ89IpUCpA0sHeCYnGYwayE7T0DNLmbbed6PjTNMTWlgTGF7W8KyCVy7Ue+u/IgIdlHTxQDAsdlpaEYW6+fegK7r3jtIWEopjJWytMUOvduovfSRa+tXLw8BMFhD+IugB7/rf/zDwuShs8WCNhBffkSE+s4OJldWcOjBh2HX6lCNPsfm5I41MbT4JSilANMGpsYYDi5o4OT45fJ9sHYG+MUF5Q2AviA106QBfGFpfcqPnK8HuNuL6gkOeyg3Vn2SBMGO3y5KWX476AcCg/J23WthdXLjWssnwKwDc4scM/MM9dpAWKatLk0I5MDEhNMdbFnAzo6CgrOEZ1D+KPCbLADaGJufBTEN1y6cB9eNAdzHRFIqOVrMUL1w999d/eZHf0MIIYZOoP01hD8fuRfN2Wfe/wvZuSc+OD2WVUIOpqu3XiljbG4RRx55DMKyoKRsAz93csdwjF8yUspx3Lw4w7E0w51Zex7j+3pthLri+4G+kFY5TeCLDR4RIe92VFJQ2Mu5bAXBOMMEghJEsQb6xvcDgRHq2IyLCELNpARYJlAcISytcNhWQOVSVisEGgZhaoqhWGIoVxSqFQcA/QwBzWPvDPPYh2fejoBwAASkaWN8YR7Klrh+8S3oGcPnyJITERExJbKZrLFw8N53vfH8J/7dcAKIv4bw5yF3nN+J02cex+L7f39lYQS2dF16picH/CooTs3g6GNPQgobSjgO5Vw/fqtX7eGs3oREAIR0QO/APMfshPNG7fWa6Ad9XXEe+fqBvi4wCEoTUI6bMA7wxQKLCKCXpPw46WZ80j6uQcJgUKbQcjt++7ByfPMHVyPwngqDwDh5lASIKxw47DjeUyKkYgMQ0Y0xgfkiYWaagTFga0tBCn8r4KABEACkLTCxvAirWsfm5cvQMxnvyiUqYhmDyc16bt/xw0tTrw4ngPhqCH8d4pxzKaUslUbHV5761ZeXF0YghEp9ggcRwaxVkR8dw/HH3wZGgLQsgFHTF9SVdRvmcOWORERwZvQSFA4t6hgvMtQ93uz7aWj6hr6Q1jZt4IuaMGnQGzRw9au069tVXo8wGHlfLghGKDcowSAg0K+wyPdlQHm2CSwsaRgZdV4KdxNCEDnLxgFOV/DYGEO5rFApOwDo1VoNAgDbMigHACeXllEvl7G9egXaAADQGf+XwaXKxINTue0XLl947cXh+L9uDeGvRUREroPIs9//r14eHRkb0zVKfYIHEcE26zAyWRx78hnoGocwTQf8yLFEXV2zUR+CXyIi3JjRe3RJQynXWLGjI01X4+IX55evX+gLKD9Sw5sk8AXAXi/qG5SiENegPoM43qDyIhYYd79JWQPThEDP+5RCym2N60jkbkoJGBnCwn7uO/b3ZsuFNNsGMhnCzBwDY4TNTQkpydMK2DzmzjCfsgPTefyuXb+FcmBscnk/djbWUd64Bs1IuwuYSDYmgFjF0++rX/nr/3N7e3NjCIDtGqJEQ60ze8+++5f+2ChM7s/nWPoTPIhgmyaIcRx57ElkMllYLeAHAtauDdfqTUoEZ0ZvNks4tsyRzXiDX9tGnMbEJ2FYg9vWiIeV75MgUeDrIIV+YCU28CQEXANTn/VN4vD6hcHQsmOAoF9k2LjAQAgMKd8TAiPUi7q+ON+lBUzPMTDu9LrsZhE5PgJtC1hcYjh5WkcmSzB9JqcMGgCVsKEsC4cffhyFsQlYteoAXMA4E0AmRjJYefyXvwIAQggx7AK+oaHlryF3gsdjb/+RX9JnHvnJqdGslKnP7CUoYUNKG0cefRKlyUmY1SqIOXcUYw3wqylow1+qb7ngN5onHFnUoTFnoge1xPsBXBi4eeXxCeqOTwL6gtJ0lBUF+HqFkVggkxAo7ZZPzxWPmDyO2vJFKCTqfsKu19aygiLDgMwLMtzAyHkj3sOd50laQDZPWFh2JnnsBVxotQJm885YQGEDW5sKDD4rhHg8q/zKDUwXloYISkhoGsfY4hLW3zwP2zTBNc3/gBIQEZHOmdSNbH5m8eSjb778md9xw1Pd8R7REClwY4LH6bsffFosfP9/WFkYgRjABA+lFKxaDYcfPIvJfftQrzTAD864jfVrAuWKQsr3yG0hBaBuAVOjjisXwB3z59GYdDQYURsNz7igvBEaf9/8hP6c7nok6AU0IgFKn9DTKwANWj0DYo/nppd6xQHB0DIp2jXsGZ0QBAbVzy9P0P5ADkDNLHDkioTGfLs9o9axgFPTDLk84fqGhBDd3cBJAmBoGiIIWyCTzWF0bh7r516DlAosyE9NAlIAZXUmd+TIoeW5EZx/9aufGbp/cXTbw58LfqNjE1PLj334+eX5AU3wAFCvVrByzxnMHD6Eerkd/K5fF9jekUPwS0CuD7+5SYaVWQ5bOmv0ekJfxEYiDeiLAglxBuOnAXyhABIBZPYq3CWhyMfdw3mMvf8YsBlaZq9A2ScExspHnl+785DC3D4O2qNXZKsVsFQijE8ybG8q1CqApnekbf7pCPMpMyhdWBoigrAsZEtFFCamsPbaqwNZB1hBYayYpVVz9skJ/crnr1x687UhAN7mY/5aJ3jc955f/+p4KQOCEoOY2VsrlzF/7CTmjx1DfafWBD+NA5tbAptD8EtErg+//TMc+2c4rMYavQw9Ngw+iZKAvqDMPTvT7YyMCXyxISUkOq3mNAgo0/gMov6hieJFB+83ARB0ywl6OUkFAkPq1nWf++UhB5iKJQYjSxDCp8A9IiKgXgcyBuHkaQ0zc46T6k7kSRQAvfK1fmcEs1LF+OwMDjzwEKx6YwGDVEVk2UKu7BvD6B0/9cnSyOi4lFIydnsvkXBbH7yrs+/+0H/WsmP78jme+gQP14nzxNIy9t9zD6xqvXlTaRzY2ZHY3JLDMX4JSClnlY6VOY65SYZaY+H0yI1BRzK/RGlBX5Su3aiw0CvwBUZ6nIekISk2jA2I+HrIksixByYIiI6zv7CMUcpMAgIj5+24hyPn6f4KJYHSGHN8/AXUYa+IyJkIIiVw6AjHwUMcwnbWKabOc9AjAHZmigKAtXIVMwdWsHjHXTCr5dQngBARIygxXsrg7nf+078CACmlvJ3H/922iOH683vg0e/6AJ9/+pdmJ/NSyvTBz6pWkZ+YwNFHn4S0bSjp3IUaAyp1hbVrInC5nqGiSUlnTN/KPMfMmAN+fVn7AgDAN1+f0BekwDLSBD6f4H6eoKHw1COgJa4e6pF0VXuFwTj7bksXAS4Dy3Kv5bgg2cgXBoFehYXelx4bBOeZwXWFuUUd8lbqEGwcoxDA2BihUGTYuCa6xgH2CoBev0MoABI5q4AsLqBWrmD7yiB8ABLLGCQqtjF9cGk6//orX/7k7dz9e1tiBuecCyHE5NTM/Oz9P//5halC42ZP7y2AGi5deCaDE4+/DVzjkI2pZIwBlqWwum6BiPbUAOPdKCmdlTsOLHBMjTDU7Q4Td8dDP6ihaP8SLU9a0BcV0PoGvogQEVc9A17CGggzRoDDJOoRGQajR/mn66OsoPsioOhQCPQ97pA6UecGORMlSiWOsSmCtH0y7nHZNlAsEsbGGTY3FOp1tA0vGiQAAgrSVphY3o+dtauobl2HpqfrA1Ap0EghS5eqk4/k7dc/tr52+a3b1f/fbdftS0QkhDOa4863/5O/HC9lAILovpwT3alj5YPCsbOPwcjnYJtmE/ykVFhdF4Bq+PYbqmdJCQilcGhBw2SJwfQCv+6v6Ezi19hFyuMT76eeu8haIntqzCNE9AonsSGvj3LjfgZZbqwDSaDcfkAwatlBGXYNBHac09A8zPEIkC8RFJznyK0odxxgNks4daeO0RFCrcMfYFQA7CrbIyAwHxGUEoAQOHz2MRiFIqx6LeUuYGf83/75Ucw/+LOfAhz/f7fj+L/b7oDdPv7H3v3Tv02ZsZXCAMb5KSVh1es49MDDKLb48mMEKEVYXRfOtPfb7tdIVlICUikcXtAxXiKYrc6bPRrYTnVBil+cR75eGtZ+x0W1Ql+Q4gJBErDnGRihwEQBa8Dqu+4RgbDX+nhGhAf7l9sHUEaBQL+I0HvRoyKheSTASCGbJ0iJW/pZ7DqFJlI4dlLD3BxDrWMiSBQATMYJtNMjpuk6jj7yBBjTIOx0/esQESOCKOTy+ce+75f/BABuR8vfbdXt647zO3Hn2Xdk93/Pv5mfLiohVUgT3J+ICPVyGUt33IX5o0duuHQhgBFwdd2GZQ3Br1+1gt9Y0QP8ur+2yQsSPTa78vTSxZvUjMjQxtUrTULAFwn2YuTfC3DXr3o6Zo8MScBgcGB8EEwDAqPcB4F16gwMqIuSADcYpuc55B6f5RtFRM4xKwBTMwwaEdavKTB+A3wHBYCOCxgbuVIR2ZFRXH39VTBNS9sCyHJZLjfrpaMLY/a5t85986u32/i/2wb+XH9+2Vwuf/CpX31x33QBQiqVplsXF/wml1ewcuYMrEoNaPHlt7EpUK6q4QSPPkRwxvcBCkcWdYwWWsCvpRWIZC0IedC1ht9M6AtSWBleQVEesf3A3iAgr2sflOAn5frHhsIEYLAXEIxSXt8QGFS2R0RYV7BXQV7HLQRQLDKMTrLbAv4ANE+CFMDYBKGQZ7i2JiDVjYkgXgDYVUxEAAwKcsbEWyhNTwDEsPHWeegpTwBRSmGkYFDVOPY922999rerlfLO7QSAt4W9qdWf39nv+dXPuuP80gY/q1ZDfnwcB+9/CHbdgoJzTWkc2N6WjhPnIfj1JbsF/EbyHeDXUCDEtX3pCPfJE7txu1nQ59GY9wp8XQEhDXVSoBQV5gZNZ1FgMendRkoYNY9H9rDAKOX2DYEB90ogBIbVpzOwI1wpIFt0xvvhFh3v5yelgFoNmJginDipg0ihtee18/x5neukfABa5RoWT53C5Moh1Mtpu4AhAkGMljK469lf/jxwe7l/uS3Qo7lu77N/58Nq5K73T6a9bi8RhG2DMcKxx5+GZmQgbBPUmOBRrUusbwxduvQr1+J3bFFHMRcf/LwSBDYiAQ2aX6bYMxVbIqI2tBQSmBjwhaTv9YkZBHipwFzaCgJEJHCegsrohNQoeTyyBgcOBgKDrjmvwH6sgFIAEzMchkG3lpuXiCJyZgLnC4SxMYb1NQHbbrEARnhOJuEDEFCQAphcXML11Yswd3bAdd0jV1Jy3L9ULWNqbmai9NarX/n47WL9u+Xxwx3nd/DIqfuMlR/8/f3zYxBSIsKl2rOUUhC1Oo488jhKk5Owas4KHowBQihcXXNeq26P94t0JL3Ar6XB8Gs7/BqloMaoEyhD8wwI+sICewK+EFroB/b8IG+QgNdZ/4HzpR8Y9lCH2DAYJb13tvbA4CDv+B4g0L1Wkrr3fO8bAFAKE7McjFHXChi3i1wAzOWcJeGurSuYZosrmB4A0Ot8B157RFBKgmkaxmYXsHb+DSgpQSlaSlz3L9fF3Nm8/frH165eevN2cP9yS3f7MsaY69Zl8eFf+Ozy/CgsW8g0wY+IYFbKWLzrLkzsm4dZaZ3ZC6yuCaihS5e+1Jzcsc8Bv3rH5LDQt/8IDzE3PK6172ZDX0+Ne0imvmAvYcgLgrcon5tVdtQD6wcIewXBqOUG7WhXQmBAea2SCuA6oOnsduvx7ZLrCiZjEE7fwZHLEer1ludaSgDYuk1EsOt1ZIsFHHrgYdh1EypV3ztEpi3kvpkiJu7+4J8Dt4f7l1v64Fxyf+K9/+Rj+Vwuzwcwzq9eKWNyaQULJ07CLN9Ys5cIWLsmIMRwZm8/Ug0HzocWdIzmo4GfX8MT1uD0YnHwU6LQ10Pj25UtYeBrpu+EvZhKFbBSVuJ19wHCXuoSlCBqHT3T+FyHgSDnW1hECPSJ8wqMagXUNAbG1G033s9LRI4rGE0jnDqlo1iMD4BdZXoEBAIgI5jVKib2zWPxjjthViqpjv8jIsYYifHRfOaJ9374Y8Ct7/7llu32dbt773/0nT9MU0/84sxkPtVxfkQEy6zDKBRw/NGnoISAUo6RkXPg+pbATlkOx/n1IaUASwIH5zkmS6wN/PwaDer64rnZFu4FLmHQF9rYeQT2DH0dm1HKoM6AKGlD1Ap7cQlnL8Jdv0rkmDtAsBcY9I2MWC/PNHHumda4AAj03X9ccAy5P5UAtAxhbJLdss6d44rImQHNOTA9w1AuK+zsAM3hdyHP06RmAEtTYGzfPCqbm9i5tgbNSG8FeGHTmgAAIABJREFUEAWwXJbL67Xikans1guXLrz24q3c/XtL2qDc7t5MJpPVV97/OwvTBdh2ur+flAKQCkcefBRM0yCFQyacAZWKxNa2bFtGZ6h4IgVYNrAyxzE92g1+nnm6vkRIH6MhutnQFyRP4AtoMKO+vfdi2UsF8joK7MmFSx+fJA+m5/PTeewx9xdYkYh1SRMCQ/P5RPoCYMA5YgzALdnE9y53DCAAnDiuYXLyxmogXs/KXgDQ6/doDVOQkHULB888iGyxBMs0U7UA2rbCwnQBuaN/5z+5HHGrdv/ekgflkvoj3/srHx0tGiCi1Lt7zWoV+++5H4XJcVi1CtCY2WsJhWvX7WFXbx9SAOo2sDTDMTvGULMigl9EaGo2JFEbHwpueHzzBNTXM29S0OeTJi7w9Qp7PSkM6pLYRx9q238YIPZbfoxMcUAwsPyWyCj1uGkQGHKNe0V01lMB4DziSbvN5FoAbQkcPa5hcoqhWvUHQK/8wQlCiiCCLWxouoFDD54FpHQMLSnJWf2DxGjRwCPf/UsfAW7d7t9bDklcM+2ZR97xg3Vt+cnRkqGkSq972xnnt4OZg0cwe/ggzHIVxBiInG7KtcYEjxRfVm5pKQCmBeyb5liYDAe/tkakI9xLfg+woMYmsCyfCqUJfW2Ns09LnSbw9QViIXC3lxUEh3EPLvY59jifUcv3jYyw/6gQGJo/BtC55zjyfexxPuJYTm9HSQnYFnD0GMfUVIcFsEWev0/Y7x9SDhHBrFUxMj2J5bvPOMujptigSgU+UjSkLBx/z/E7H/pOpZTi/NYbsHVLwV9rd2/mwA/93sJ0AZaVHrU7s5JqyI9OYOWeM7CqZnOCB2PA+oaAOZzg0bMIDvgtTDIsTjGYIhgMqOuL52YzLFVrXwv0BcFiEtAXlDgN4OsZ9nwgb1DqrLfXZ6B18QLCiJXoBwajlh0U0S8ERskfdE377jPqPeCej0broIZzPUKlFCBs4MhxDROtXcBRnrcRADAoiBihtlPF3NFDmFo5hHolXQfQ0laYnSxg9t6///8BzuzfW8358y2FJa559uz3/OM/GRlAd6+UAooIBx98GCCCUo45WuPA5pZEpSqh3VJneHAiADULmB1jWJrhqAnn4RP04G//EgKJcRqVAEjZjdAXFQp6Bb5ISgn0ogBcP2CXdvmR9t0JhDHrHZo24u/hW2ZLRJoQ2IwLuMY988WBRnIaQSXVQOF/r0pKQNrA0aMaJiYI9Zr3+Y50HXZuhwEgEeyahQP33IdcaTTV8X+KiGkahKYZxjPv/dDvprKTm6xbBk2a3b1n3/5+U195ehDdvWa1iuU770NhfAx24y5gDKjWFDa37OHSbT2K4IzxmxphWJnnsITzhu4Hcl4NRCCsxWgY4lr7dgP0BSk14EsQ9NIErDSVRr17gcHI+43xe/mWN2gI9IjzzeOT3hNmFYYTPiJKSudz9JiGsXHHDQyLAIC9TgBpjZS2DabpOHj/Q1BCQKY4PVtK4lNjOewYp37o2Ml7zt5q3b+3BPy53b2GYWQyB3/49wfR3VuvVDC9fwVzhw/BLjuOnImcm2J9QzS7f4eKJwJg2kAxRziwwGFJf4sfdX3x3GyGxenm9WsQfRuPkAbUM09IHbrifVr1ONCXGPAlAHuJA14QfSX1SbhqPZUTAwZ7+T2jlOcXkTYExr3+o8wIJmosFTl8ZEeW42gfOHZcw9hYfwDYmSEQCBnBqlUxMjOJxTvvhpl696+U89NFTN/7kx8Fbq3u31uGYgHg8b/14T8rjM4czBiaANLx6UdEsE0TRj6Po4882eXPb31DoG4p8FsCqwcrgjOrzNAJx5Z1EJyHTBLgF9lqENAA+qb3i0NwYxcb+sLK9oqPAAk9AV9Y2oB9xAafCFDmNQM4lU/r+Qz6DOK8eNUp4r4C00X4jX3LcX+PkP143hf+m935IoBGMzzg/gEcgx+BMDLObtul3XqRck4cpqcZdnYUymVA18INqElMAJF1G6NzcyhvXkd5Yx2anpL/PyLSOElTsOzivoWZ86988U9vFfjb84jidvfe+9B3vM80Vt6WdnevlBJSCBy+/yFwTYO0HYdzGge2tofj/PqRLQGCwpF9HJyrxna3vMDPr7GJA35JWvuCoM9v/11J+4S+mwl8PQFNH1A3aEWBxF4r2+vxJQ6CMSAw6P6IDIEe90jQ/dX+JThP8zfxCGcAhJAQgoaT82JKNsZiHzumNVcC6ez08nvWBqYJeWYrUpC2wMqZB5DJ5iFM0/sHTkBSKpoay8Eq3f8/7D947M5bpft3T1/qbnevrhtG7vAH/mAQ3b1mpYJ9J09jZHYaVq0KsMY4v/pwnF8/UsrpRji0qCOXIdi298XpB35e8gI/38bBpxDP4JBGLehBFpbPr1ELywtEa/jTAr5YsBID8vayfNmvTyCMvO+kQLDleohSjldgFAj0KygQ6HwS+N5jXmmZs2xkmuPHbmU1HUGf0JHPEyzLOaetinLddqYJfjEh2JaJTCaL/fc9ANuyoFIbtEnkdv/ue+AffBy4Nbp/9zSquLN7n/z+D39sEN29VrWK4vQMDj7wEOxavflQBIDVdeGMTdvTl8PNEcEZ53dgnmOixGDa/g97r4bBK13kGWgBjVpQQ+aX3q8RiwV9EYG1GR/SMEcCh5jA1w/s3QzI8wOxXVOXGBWJW99eQNA3PsI10isEet4//pvd4RHvm+b5bpEShPwIQyZLwyXeYsod665pwMQEYW1NwbYBrqGtD7gL7sIuXo/rrHWbiCAsC6XJCVh1E1uXL0EzMj0fR3BdiDQOYQq9ND8znnvz1a98kjHG9rID6D1r+XPNrqfvfey76vrKM4Po7iWN4cCZB26M84Pjz+/ahoA99OfXkwiOS5d90wwzY97g1/aG3xHuVZ5XhGdan0bMr/EKa7j8CkgD+toa9Cjl+yToFfgiJWopOym4igNxve5zEPuIst9eYDDSPiKAYORrJ2xfXoEh5QfdF4FAB+9I3/3QjQRKAfWqclrEIfzFFhFgWYBhEE6c4GBMQbQswRmUr227K4FHntbvjGBVLSzddQ/yo+OwzXpqE0CkBJsaz4HNPvmh6Zm5fVJKqWl7d9HWPYkrRERCCAEAk6d//A9mJwsQaXf3VstYuuMeFEdHYDfGF2gcKO8Mx/n1KoLj0mV6jGHfNEfdCnjT6xH8fBsLn+eD58MnoJHrKj9CQ9WWrEfoS7vh7iwrKvAlAURpAlaaBJd0sb3AYM8gGKEOfgmiQKBnoSH19LuvgvK1naco6d0IBphV5UxiGD7LexIRYJpAvkA4fkIHoCBF+/UV5Vns2wb4SAkbjBzDjBQyxe57IqWEGC1mcPKpf/CHAGDbbqf33tOevMzdhZYfefYn/meuZfKaBqFScuZMRKhXy5jYtx+zR47ALNdAjXF+lq2wsWWD7enO85sjF/xG84QDcxy2j8Wv/Uvwm3+kB35AY+fVSEUCuI6KhcKbT6J+oC9yIx0B+qKU1YQ9ipA+wn5ilREGcP1QWErlJgGFgTAYkj60bPe+iACCfpFB15ZnXvcaCii3La4jYdCzwO954JeeMcCsq6Gvvz5FBNTrQKlEOHJUhxDOWO62NFHK6djwbRsAgDvuX0ozU9h36jTMSiU1659SjJfymhKZxYdO3/3IO4EbvZB7TXsO/jRN04QQYmJyeo6mn/jFqfEcpEzvOIRtQ8/ksHLfGUhTQDXWAyI43b1KUeyH+O0uAmAJIJchHFrUoRS6XCxQ15cQCPN40HslDGwsIqT1TB+xjl7H5Lv/1rgIDbyv0gC+KPsN2Udo3pig1Suz9fqJXYEYhxlVbXlinJ/QMhvXTNh+/SLTgkC/QkKfCxGeDZwDti1hmcPhO/3KBcCJCcLhwxy25ZHGI09woR55Wr8zglWpY+HkaYzOzMKq1VIDQGErNTOex8QdP/5/A3t38seeI1bZsOk+8J5f+cTI2NSirkEgpduViGBVKjhw5kGUpqZg1esg5nT3bm5L7JQl9ibz31xJBRAUju3XYGiALTpu5K4vAdAW8eEeNL6vu9D4jVCkhitiXZtxERrzoLw9u+nwSBAXTiJDTQRY6gnGUlbsOvUBhHHrkxgIuhDYyzXYKwQGlNmVhwLiOsMj3HfKJmTyhGxuOOmjXxE5s4BHxwjECdfWFcJGx/Uy/q9VSikw4ihOTWHtjVcBYukAIBFxTrJmUnZmssguvPa1T+/FyR976h3HNa/ece9j3yUyiw+V8rpSKp1OV3cVj4nl/Zjavx9WpQoip7u3VlfY2rZDL+ahuqWUA3sH5jXkdILV0d0bB/y8IvzAz0teD5fQRiRi/dryBACNZz4KrnMU6AvSIIAvNEFHwt0Edkkp9HgiHmzc89ELCIaW1ycEBpXtVVjg/RFQQGCeoHuQAEVArRywgPhQsUQE1GrA4iLD3BxDvd5+LUS9lqNuOwsw1JEfH8XCiTtT7f6VUtHUeA7a3Nt+pTQyOiallO5wtL2iPWO3IiJyrX4nvuNX/2Z6vKhDQaX160ohwDUdRx99HKSYM7uXORfb1XXhWK+GD4lYIjjj/BanGeYmOOoJgp9nY+HT8PimDai3V+ZIDVQc6EOP0EfJQV+vkOGZPgboAQAaS0YpJaGUivkhkPKveBBcDho2YwFhSP44+wrKGKXMfiAw9gtNyD3WCW5hz4xmuEeBrZtSYrjSR4IichxBT04yVBqrgLQaTbpgLuyi9nhOdwKgsgRG5uawdXUV9a0tcF3v/QD8K0IEKYhxNrNw+N43Xvz076awk1S1Z+DPXcnjkWef+0199PATxYImVIo+/cxqBSv3PYCR6em27t7rWwKVmhp298aUC34TIwwH5jgsuzu+/Us88PNK6Ju/MyAgbVfDHLTP1jwhjUxXnpBG2S9jX1277rFTyH5ilgcCZAfAoeWjlPPORozAiDUmUBGYxqBp3PnoGjRNg6Fr0HUduq61fDh0TYPONWgaB9c4NI2B80Z5RGBETrdGy/nprJPfB1AgUiDQwKCxVxjsGwQD0gWW0w8EhtTPKyAQ6Dw2gqDRq0D3mGwbKJQYtAxBDbt+kxMBk5McGxsSNRNtiyGEAaDfi4FfkFIKjHGUJidx9fVXQSyd7l8FYnmDq/VK4XBRnvvk2uql8y6nJL6zFJT8GUlBmqZptm3bU9OzC8ef/V8uLEwXIWU6tjdndm8FEwtLOPLoo7DLVSgiMA7UTYWra/ZwQHBMEQBLAhlOOHnAWfxRejn/vAngF6lRiVC3tvCI0AcEX8GB0BdQZtg+wxrUqGVJyLbZkYwxEAGMNWCMOWDXBMxGvaUAbKGgpIQQAkopSKkcNw1KQUoBJRSEVFBCQioJuMBIDMQduCNyxhNRA/iIAE3jYBoHhwOXRATGmdO4c2eci2ocUIPznENQgJIK0oVA97tUUHD+Ay2rQER8vDu7ajww+nhu+O7OJyJq66N8N6KXpUISBdXdL84zXAWX53csgelbIwmw6sDEHMP4LIddxx4bGLV7pRSg64BVV/jG8xaEJMeAEvCbdiJU5+/bmad1W0kFo5jDxRdewPmvfRXZYhFpMBkpJW0Ftnr5ypW/+IO/PwcARER7AQD3xKg115fOHU//3EfyRQNKCYGUHKwI24ZuZLD/nvsgTRuKqPkA2NgUaezylpdUAJTCoX0aGDkg6AJF0uAXd3xfaNq0oC8gQSrQlwDwNcGHARpvsbxxcpbIEoBpCVimhY2tHdQqNZh1C9VqDfVaHdVKDfW6CbNmOv/rFuqmDUhnGIWCAinVWOqv1RKHttVzqEGRhO7/RATOCJxzcJ2Daxo0zpz/GoPGNXBdg2HoyGQ1GEYGRkaHYRjQDQ5d16EZjoXRMHRonIExDUxngEbg5Dx5Wmeot/2XyvERLKVz3TfgEUADJNFspaQT2NbIefkoY2Bdy2U1s5BXoG9wl9rSuRs+M+/9ynGvZT8IJL+8jevZq5n03GejIL/y2sJbNgLTt0YqgDOgsq0wOosh+CWophPoLOHYcR0vvmBDyZZ7GjG97BBAHQDYWgYxgl2pY/74KWxcvIjK9WvQMlnvi60PKSJmcEijMDL78NN/+2f/6lN/8K/dZWcT3VEK2vWWP845F0KIO+974j0jp37i/1mcKShbpFNvIkJtexsHH3wYM4cOwSxXm929G5sCm9tyuHZvTCk4N/2hfRxTI6xtnN/tCH49QR/CbdxJQF9nGhdEGGPgOoeua9A0glKAWReoVqrYur6FjWvbuLZ2HZWdMso7FVSrdViWDdsScJ/wDpih0d3LwBgDY9TokumsCYtuXVdON0/bup4NeHS7mN3vDozJBqSoG/9d8GzUiTXrx6BxDt3g0HQduqFD1zj0jA7DcD56y383nje6pzWdgzEOzgjEmWOtbHRBMZDTtUwExnjTcgnm+C6QjrETwlYQwoZtizYwbB1bHmQlixjsnSYFS2AiVsAeLYB+eTqPVwpg/rAGXR/O+k1aSgHZLHD1isQrrwjoWQfimvEe6du2Y8QrpaAbWZSvX8NLn/oEeCaT0hQBpYgxOn9xE3/zR89lTbNeZ4wxucsXi97V8NdqPn3yR/+vysRoKccZZCoOnYlg16ooTc3g2JNPQ9TqztgBDpimwuqwuze2CM7SbfOTDCuzHDVrsODn13Xru5+IadvCE+ji3U3Q5z6vNE2DntGg6wxCKFQrNWysbWH1yhquXl7HxrVN1Co11E0L1OiS5bzR5cpvwFOwnO7eVMQci1lcucfv/lcKUFI2LZFSKgcg1Q0rnmqQSytAOlDnjj8EVKObmgGNsY4cTGPgjIM3LJJMY9B1jkIxj9JIAcVSAYViHvliDsViAZrhwIiwBOp1qw3OXUUFwYFAYA9dwbHyJNgN3Bpm14HxOYbxuUbX765uJfeeXAB84zWBty5KZDMt1nOf9G3bHRth3b+ZYg5vfOVvcOmbLyJbSKf7l5EUOxXBty5/+Q8//8e/8f17oet3V3f7uifw0Wef+03GjJymQ0iZziQPJSUAwvLd90IJCSUkwJ27/tqwuze2CM4Ej7ECYXmGt63Zu6vBb7dY+0K6ePuFPj/gyxay0DhQNwXWLq/jwptXcPH8JWxsbKFWq0NJBc45dEMD1zhGst0LqXcC1E2RbIxJ7FGtQMV0hjh9gK3H7cCt6ogHpLKh7IbVsWVSjJTOWEh3BjPTCLqmoTRWwtTMOGZmpzA1M4GxiVFkMwymJVGvmZBSOrDZsp+uruGY3cKt17kXCIZ2BzcS+HXrenbFNiJCu3VbApLoBm49FqYB5esKI1MIv5GGii13GbjlFY5KVWHjukLGaAztQPLdv1bVwuKpO7F58S2YtVoqs3+lYnykxLF+/eR79x84evrc6688785VSHxnCWnXXtqu2XRkZHTs9Hv+143F2ZFUJ3nUdnawePpOLN15B+o71ZbZvRLXN8XQp18MEQBbApwRTh/QwUhByBtx7V/6AD8fQNpV3by7HPqIETKZDDIZhlpd4sqlK3j9m2/i0oUr2NragRISXNdhGBo45y3dJnLYJdanHL4MhkopnbVKbVvANi1IqcA1jtHxEpYP7MOBw4uYnJ6ErhGqNRO2JUCKuor1s5qFBPmniZn/ZnYFx7EAuuGiDsysaMiNEOSubb73sBTANUBKwte/bsGyFHTN3wLYT/cvhIKez2Hj4gW88vnPIFMopDP5A8Ku1JRmbr/51U/87s/dk/gOEtauH8H24Lt+/j+WxhePZ3SIVBbecR1Djozi0ANnIeomAGdQt2UprG/Y4HzXMvKulAIghMKxRQ25jLOUG2Fvg1+z/tSd1jd9TPCLvSJCS4RvvEd+KSUYEXLFHHJZHevrm/jGV17GX3/2y3j+q9/E+uo1KAVkshlkc1no+o03nxsuUQJ2dpPkHiNjuDG7uNX1C3MmgzCPD/f5dKZruqWhlhnHpHp6i261+vm7nXFeTnVdh5ExkMlmoGkc1aqJi+cv45UXX8e5V9+CZdqYmB5HqZSFVIAQom18E6HjGvG4YLrSBJzjoPy++XwSBF3bke7dloDAe7cjQdC9Kxr/S2MMUvgkHKp3kWMB13VgZIRwZVXAHRfsmTykPQjcZgRhWShOT6C+vYXttavQDKO/+nuKsVyGqbUdbX6ELnz66pUL5zRN03br2L9deUm75tKllcMnFx765RcOLI3CtlNqbYhglss49uRTGJuZh1WpAtyZhr66ZqNeH671GEcEZ5zf0jTH4jRrjvPbTeAXp+FoC78J1r5kLX0KnDPk8hlIAi6+cQkvfP1beOvcJQhbIJsxoGf0BjQM3rLXDgisDaC9jlPCASjZmMThdJc2ZtHKhvsYKKebVUoIiRZwVY08Tlmq5W97nZw9M+Z8J0Zu9cDggKDGnfF9nKEx1tGBztbHhtv56+y7/3PrdktLKWGaJuo1C6VSAcdOHsSxOw5jZCyPyk7dse76XJBJWAN7sujBf2xf3LGAaY4DlFJh/pAOTRtO/EhLSgG5HHD5ssS3vyWQCRj/F2b9Cxz/pwCuabAtC9/4xEcBpcBScNZLUti2ZNqlS2++/oU//ODBxHeQoHYl/Ll6+wf+zde04r478xmyFXjiHa/OEm5lTO0/iMMPPYR62VnCTdOAnYrE+jUxdOYcQwTAsoFCnnBiWYNtt4y9aP5p2fbIP1DwC6lPW3jUtD6WDb8MYVYWv8C4+RQUcrkMuMbw2itv4etffhGrV9ZAxJzwhtOtJCZgxIE4B+BkG6BJqWALCSElbLsBcUp1WMoAkILGnRm5nLMb1jpO0DlDxuDIGBoyBoOha8hmNOicwDh3QI2o4Rja8QXouIhxtgFA2BKWLWBLBctWTterUBBCwrYlbClRNyW2yzVUajYsW7Z8bADUYnWEM1NYYzAak2J0jTmTQeCCYW9QyBiDUgq2ZaFaqSOTzeCu+07grvtOgHGGcuO55qd+IbDXiSGxwXHA3cC2CYzOMkzMctgmdnlruXflTgD59rcELl+WyLZ4ZIkFgBEmf2TzOVx45RWc+5v/ltrkD85IXlzdZpsv/fvv+/qXPv0R12NJ4jvqU7vucnZP1Km7H3l2/PTf+9PFuWJqrl2kEAAUTj3zThgZA8K2HX9linB5te4sGbXrztDulWw8zU/t16FrBFt2dBM1tBfAL21rX2znzr1Cn1TQshpyWR2X3rqKL3/hG3jrjUvQDB25nOP6wK9XojlrNWCfQLsFzl2ezYU5W6gmxAl5oztTKqduIIKuseZH0xhyGQ0jBQPFvIFiQUcxq6OQN1AqZFDKGyjmdRQLzv981kAuy5HP6tB1jqzuOJi+GarWLWyXTexUbeyUTWzt1HF9u4bN7TpWNyq4sl7B2kYF167XUKlZKNdMSEHQNIKhc+QMjkxGc2ZLox2Mo4o4wTZtVMo1TM9O4KFH78XygVlUynVYQjbB1k9+YBQQ1B0XN99NsAJGAUApAcYU5g9nAHJNykOlIcc5PPCNr9momTfG/3n+dn0AIIHAdAMv/vnHUd3chNZqakxKSkkpwdavrV/7zO/+xCSAXen4eVehTesJeuyH/t3a9OTUJGOQSMG1izvJY/me+7Bw/HjTpx/nwPo1gXJVgg+7e2PJ9PDnN1DwCwCkXQN+cbt4e4Q+wLH2FYo51Gp1fPGzX8UrL73mjPUr5Jw1Nz2sfLxx0QshUa3bqNUFbCEcv3ONJ6vD+KrZjUlNC1xjeTbuQFw+w1HMGyjkDRRzOkaKBkaLWed/KYOxUhYjBQOFnIFiQUMxbyCXSWMdzsb5aDE1SQDkTPBvbnuJNbIo5s6hcDL0+1K4Va7j4uoOzl3cwqvnr+PNK1s4d2kLV6+VUa3ZYIwha3AUcjoyBgcjcsbyRSRBIkKtVodp2rjznuM4++S9sG0Bs2I2vRgEadAQmJQVMGkAtC1gYoFjdILBtrDLWsxbR0oBugFUdhSe/4YFrt0wvMTt/g2GQwUtk8PW2iq++en/Cj2bR5ujwYTEGckLq9tMvPVHz/3Vn//x/74brX+76lJ2T9DZp7/3Ob7v+/63hZmSFFKlNskjWyzh1DPvgDTNpk+/et3x6Tfs7o0uguPWZWaU4eACbx/nFwJQexn84nbz9mLtC7tBvc6Vcy0zFIsZnHv1Ij73qf+G7c0yCsUcGGfNpcpaxTmDkBKbWzVU6gK5jIb5qQKW5kcxN5nDSCmLXIYjo2swDOb813mzazWf1ZHPaijkdORyOoyErG/OUmuA9DgR3WDWcUYinL8kpFpopxUqWzGNKYAYQp3Mrl+v4tXzG/jGt9fw0qvr+Nab13Dteg0EQj6noVgwYHAWCQSJCEopbG+WsW//HJ555yPI5bKotHQDRxrT57nhG9QdFwcC0+gGjjoO0AMApQQ0jTB/RBvO+k1ZbvfvWxck3nhNpNr9mynk8OpffwFX33gNmXzys39JKSkk2PXtcv1T/8ePZIHdZ/3bNfDXemLe9mO/Z44Wc3qaDp3NchnHHn8KY3PzMCtVZ71QBqyu2jDt4SSPqCI01u3VCaf2a41uP2+I2i3gF2p5CwFEYBda+9y3ZKWcpco0jr/63Ffw/FdehpHVYWQNKOEBfYwghMTaZhUA4f5Tc3jbQys4c3IOk+O5gBrEkx/EpWVZ281qTjhpnI8gMJRS4YVX1/DFr1/El1+8glfObaBWt52u77wBXWOQIV3DjBHK21Xk8ll857sfw+z8JLa3q21dwP1A4KCsgEl0A/cCgLYFTC5yjIwNrX9py1mfG3jpJRub1xUMHc0xsa3y+s0jA6ByJn+YlokXPv6nACiVyR+MpH31Wk0Tlz/2Dz/7sd/5F7vN+rdrLmP3xDz29h/+kDb/7L+cnsjaUrF0JnlUy5hY2o8jZx+BudOY5KEDW9sS166L4RJuMaQUYEuFk8s68lmCJVqsMHsN/Pro5k3E2tcH9AEOYOWyWUgh8MmPfg5vvHoBI6PFpgWoU5wRrm3XICyFR+9bxI9+9x04uDjwiq9AAAAgAElEQVTalkapho/GgEr5ARxwa0Nc0lJwlqUj6Xx3xly2p1m9VsZnvvQmPv3FN/HyG+uwTInxkQxyOQ1K+Y/fJE6oVeogEN71fU9hbnEKO1sNC6BPl6dfHf0S70YrYBLdwEICmkGYP6ANZ/0OQLzhZu1rX7OcMXqNBiXJ7l8lFYxCDpdf/ibe+JsvIVtMY/KHUowxeuPCJr74H3+UgBv+ixPeUU/aFZhDROSekLn7f/7z+2ZLENIJT3pfquH64PBDj4CTBqUEwAlSENY3LOdteNhgRZLb3bs0rWFqlMG0o4Ef0A0FNwv8onZPN9NGBT8Ktg76HW8QnHYdU+txKYVcPovKThn/5SOfwpWLaxgZK3q2cq4PvAurOziyfxK/9QtP4XvfdhTjI1kAjo9GahwsUbtfO6+Ps15vq9+7G/sYKroIaKz/S03wcybSOLObGSMUcgZOHZrCux4/hHc8sgJd53jjwiYuXd0BoJDPaABRNzgpQNc1SCnwyktvYG5hBuNTo7BMywHAlmsp7OWDPDciXr9xX5zi3G8++/UKiPrMAABGgFkHjAwhmx+6fUlbUgK5nHMPrK8puAtydBkQQp7ZQdtEBGULFGdmcP3iBZi1CljiKzkQkVK2VGCL+2ZGz73ypT/bTV2/uwL+XEeIj77zud8oTBx+JJfRBJD8Mm5EBLNSwfzxk5javwyrVr+xksd1gWodw+7eiCIApg2MlQgH5vieBT+vSN+0fTZEnukpOL1vnpavSilk81lUdqr4f//TJ7GzVUahlPcc20cEWLbE1fUK/vazJ/DPfvoxjI1km1Yn1xkyEQXWaajByJkF6fwmACAa3eeMEYp5A2dOzeF97ziBpdkRnLu0hdcuXAdjDDmDw8trj6Y5APitl97A/gP7UBotwbJaALDlekwLAr0S+OVJ4oXL88UpYH9eG0SAWQOK42xXOji/leRMRnOcP29tK1Qr6K03LuwBJhQ0Q4eey2P93GvQ9OQdPyuA8jmDNu2Zh69++2O/aVmWyRhjuwEAbzr8McaYEELoumHsO/NTH5udKkIqlYrdQNo2tFwOhx54GNKWABqTPEyFjc2hT784khLgTOHYkgYFujHOLwz8wtIkBX6dlrGgdN1Z2tPGaawC6u93rKHWEo8A96tSCkbWgGVa+JM/+hQq5TKKxZznTF5GgGlLbGzW8M9+6nG87x3HATiWJdeKN9TulgvngAOCUE7YoeUxfPfTR7A0N4Jvvr6ON69sI5vVoWvdsKJpGmzbxvk3LuDYyQPQNR1CiPZHbq8Q2BEXmCcq1CH+Pei3386NyM8a5vj9Y5yQLw2tf4MQY0CpRLi66iyx4vVs7XvlD1ugMDmO8toGqpsbKaz7SwSlLFsofmBl/9KrL/zFH+8W699Nxx33RDz1PT/zb/XS8pmswS2kZfWrVrD/7vtQmpmGXTMb3SvAtQ2BzmffUP4iOFa/A3MaSnkGW/QGfl7pQt/yfR7afo1QHPDzUlLdvF0BPpDYEu0Z0BmnaRqIgI9+5M9xbf068sW8J/gRAbYtsb5Rw6/9zKN44sxyc2C9CxND7S253eyu82siwqGlMfyt7ziGfE7HF752EbWahUJO7wJAXdewvV3B+uoGjp086Mwc9mqOYkBga3qfze48PlAXmN5v361hSb1EuhvKeXmq1yQKoxoY8x+TOFQyEgLI5wlghPX1G92/Yer87YIAkCDBiCM7MoK1118Dta1fnphYPmfQenX0rsrFz/12pVLe2Q3Wv5sKf+7gx2wul5+58yf+8+xUEUopljiGEcGu11GYGMf+u+931u8lx5RcqUpsbcuh1S+iXPAbH2FYmna6e3cD+Hlt9AN+FKU+LYG+ZfikDWzgPArwyqOgUChl8Ok/+wLOv3YRpdGiZ1cv4MDB2kYNv/pTj+GJ+5ehoBC0luZQe0fO+EpyZkVKBwJPH57G2x7ajxdfXce3z19HqWB0AUs2a+DSpasgMBw6soB61fLv7g+4DluTxIXAZrjHsyHN+7JzR5HSMUBYBCiF/Ohwzd+05Xb/jo0RNjcVajV3mcXudP3sRNg28mMjqJUr2L66msK6vzesf0tLi/Pffv7zH9kN1r+bOsLNndBx9h3P/VYuq0NJaSUOfnAuFmnbWDx1NxgjSOEsPSEUsLklhw1gDAkFcK6wPM2aK3iEaS+CX6IWBjfAJ21LtGcBXnmUUiiVcnj566/jlZdeR2m06DvTk3PCpas7eO7778KTDyxBSWA4ou/WE8Gx4rqWwH0zJfzbf/yd+MC7T+OtKzuwrPZ1fqVUGBkp4qtfegEXL6wjV8g1Zzz6vbj0BIEdcX55YlkBkwTAGOk0DdjZkDCrzpChodKVM+EJOHCAN1cSAsLbj85naVC7QUQQpo2FU6ehZbIQInmHjgrQJsZy2OYnfjifLxSllJKxmzvD4KZdvk2rXzabm7nrv//jtKx+RASrWsXYwj7sO33K8enHHNcu2zsS5crQ6hdVBMfqtzKrYbTAYNvoGovjeZPdwuDnJc9G06eMrvAoDaxUyOYMbG3s4ON/+jlkDN23q0LjhNW1Ch64Yw6/8HcfDK37UHtfriVQNrqC7zs1h/mpAv7rF843ltC78eMzxiCExOqVdZw4fch5MW4tC+EQ6FsPn0ISswL6wKIn2EW5pyNaAJUAbKFQGGdQw7F/qUsIoFAg2BZw/Xr07t82hVyoUghkinkoW2DjwgXomUyv1fXbSdP6t7AwPfrGy3/9p5xzfjPdvtw08nStfg+/47nfTNPqp6SEArBw4hSU3bDyMcC2Cds7NhKf3X2LygW/8RJhZsxx6zIQ8AsI84oMBLqwdAk0Jn4NSmBj11GpMKsKCDB0jr/67Fdg1y1oPhcxY0ClYmO0lMWvffBJAA0H3EPwuy3E3PGAAN75+CH81i8+ia1yHaYtb/hOUwrZfAarF9fxtS+9iGIx4+nvLAgCb6YVsN+XtV4AkOlAdUuhuqWQvCfaoTpFBFgWsLSkIZtTsBuGubC2JNBY0LFNRLCrFmYPH0WmWISwrP4r3iHX+mcWzvwk55zbtm3fTOvfTdmxO8M3k8lk64UzPzkxloMCUnHobNarmFxeQWlqEla9DoCgMWB7x4Ythq1gVAnlzO5dnuWQsvuh63kmwx7eSTyMe7Dk9dwwRKlPa4BP2q70ESwpbhIlFXLFHM6du4zzr19EoRS0NBFhbbOKn/3AfcgaHEKqIfjdZnKHJSilcN+pefzy3zuLq9fKaF1nQEmFfDGLr3/lZWzv1GDouu9ix/1AoFcBkdJ7hXfufsAASARsXRX+BzBUohIC0DSFlRWt98mZodY/G1rWwNyxE7Dq9RQmfhBBKZHL6njwmR/9p4DDQgnvJLJuyo6bVr+3/3e/kU/R6ielBOca5k+chDCF4zOLA5atsFMeruQRVQTAsoGFKQ05nWB3DHSOAkM9pdll4BdrfF9AnXqy9jW+MI2BAHz5L78OTdd8M3FGuLZZwz0nZ/H4meVm2FC3p4gISgJPPbAfP/2D9+HKtZ2260HTNFQqNXztSy8hV9AAUtEteq2BUfOQT7hX+gj3MDBYAGQ6UKsq7FyTTu/RcOZvqiJyHG1PTjJMTBLqde/ncf/WvzpmDhxGfmwUwjI9cvQnqRSbGM0B00/9IwCwbdtOYzGLKBo4/LlWP845N0sP/szEaHpWP6taxdSBQyiMjcBu/JBEziQPqYYNYVRZNjBWIMxNtIzzC5DXA7srTdgDfReCn5f86h0KiTGsfe4XKSVyuQxefeUcLl28imwu4zu7V0gJ07Lxcz/yAAB4un8Z6jZT40L7gWdP4oE7FrC2UQXnTqBSCvl8Di9+/du4tr6NTFaHhPS9DzuKbA9IwwrocS8nfT97vZj53scK4BqwuWrDsoaTPwYiciyAKyscXENvvhZDrX8SnDPMHz8FyzTTmH5KgLQNjeGRZ37wF4GbZ/27KfAHAA++7QMfzmd1KKRj9RPChpbJYu7YSdh121mmigP1ukKlKsCHK3lEkjNGzOnuVa4rsIAHdhToSmSFj7CwlMHPz/IR2uB1bERqIBtyHPwCLz//GnTN3x8V5wxr16v4jocP4ODSaHNpsKFubxE5q7gAwP/04w+DGKFu3WhBNZ3DNC288LVvI5PV0JwRTt5Wlma5GIwV0CvS936NmC7KS5pfGkaAEITrV2QKnmmH8pJtO0u/LSwwmGYK1j/uuIWbXFpBcWLKGSqWMJ5ICTY5mkPh4Lt+DQCEEOJmWP8GikBERLbtDNdUM0/8o4nRHKRMfsaxY76tYfbwEWSLOWfwZuMBtrUdskr9UE0RnEkeCzMa8hmC3XHqkgA/r51Gspp5lB21Dn718IS5iOmC6u1X98D0nQmkRCaTwdrqdVy+sIpMLuvr2kVICaUIH3jP6UbWodVvKEfOJBCF6fEcPvCe01jbqEBrWP+kVMjlM/j2y+dQ2amD6x2P5rgQ2HJfRHrJCXkpars3vMroDIuQLurzxq/+mgZUNiWqm3I4+WMAIgJME1hY0JDLU2+TP0LaICUkGCMsnDwFKazkaYGIaRpEpSKNs09/33OAs8Rt0rsJ00Dhzz3Ap97x/g/qXCdGShBR4nUQtg09n8f04SMQDceljAFmXaFal8P1eyPKkkApT5gf6+7u9XuQBmx6Zor6lt25MRDwC6tLS7pI9Y5gDfFK4G4aGYZvvfwGbFuA+5iuOWe4vlnDmZNzWJ4faYQNX3aG6tb733kCo4UM6qZoNgSapmFru4JXXj6HQtbwfsGICnQdAZHShz1jEOM+90nX070e9HLHgY0rEkoEUOJQiUlKx9fs/v2s58kfgdZATrBqdYzPL2JkajYd658CzUwUYOx7128AgGVZ1qCtfwPDICIiy3LmT9Ps2//51GgOtkp+4B0Rwa7VMHPoMDL5LIRtN99YN7fF8N6MISWBpWkOqPDxzIE3UyMgMI3PD7MXwM9LiVj7WjaJMdTrEudefQtGxt8DvYJCtS7wg+86AQAQYmj1G6pdRAQpFTTO8NQDy1jfrIEaLxNEhGxWw8vPvwbbVtAY83/RS9AK2BaeMAAm6ePPKw3ngGUqbK4OXYcNQq71b3KKYXycYPYy+SOM06Uzk3vu+ElIO3nrn1LEdJ1JG8bYPQ99x/uAwVv/BgZ/7oGdeeTZHzIlL+g6k1DpWf1mDx2FXbWa6/fWagrVmhpa/SKI4HT3To0yjBZ66+71KjNoOzRNGPhFCbvJ4BeYNsBCIaWEkTGwubGJzc0dGIbmaZFhjGFnp47Dy2O49+ScEza0+g3lIdc70Hu/8xgYUfN6cq+19asbuHJ5DZmG9c/X0kfeDW9LtGdAnPshCBijACDQ370fmkYBug5sbUhUy0Pff4OSFMDyMgexHid/dKjd+sdg1WoYW1hAaSYt65/EzHgBpUPf+6+BwVv/BoJCrVa//Mp3/9bMeAEyBdfoN6x+R6DnM5AtVr+tbTH0cRZRQgEaV1icZqFuXaI8gHsZ5xcb/EKsBYMAP09rh0992sIjNGCGznDpwipsW8BvchgnYHPHxNMPrgBwxnANL/mhvOROANq/MIq56SJqdbv5YsyIQULhtW+/Bd1ov9YCIdBnX71YAb0yBgJgFFjs8RkQ9f7nDNi4LJxukuGNl7osCyiWCLOzPU7+CIF9ks4Mx/ljaVv/Sgun7j77DmCw1r+BwB/nzgJqd9z90FMmcnO6zqRK1ep3pM3qV60p1OpDq18UERo+/SY1ZDRC62pPfg/9gM1IS7cF3lQBkQMHP4qXzrc+bnjERovBOYaLb61CC3BOaQsJw+B4+yMHAABDb0ZD+YnoxkSgI/vHUKlauDH8WsIwDJx/7QLqpoCmdT8407YCtt0LUQDQIzJVAPQIYxywqgpba0Pff4OQu/LH4pKGTEa1OS7vuczWDc5g12oYm1tAaWYOVr2avPVP2nJiNIv9d73v1wHH+pfoDgI0EBxyZ/gunH7vv5wcyUNKO3GzHxHBMmuY9bD6bQ+tfpFlSaCYI8yNM1ghPv2ivCEHBoWBVMBDP0nwi+rywXcfPun6bajccK5rqNYsrK1uQDc0x/9ahzhj2CqbOHFgErOTeSdseNEPFSD3Krr3xBxqLZM+pAQyGR0bG9tYvbiOTDbjOcygVyugV0Bo+ggASB6RqQGgV72VM/t3a81GraLAelmDdqhYEgLQDYV9+zRYVvLWP3c5q4VjJyBtmbz1D4wX8zrWzYl7Zub27QcGZ/1LHf7cA5mdW1y5LmYeKBV0KPDED04IASObx8yhw84M36HVrydJCSxNcYAAGQZfIXdClLfnsDyB5SQEfl5p+gU/L/nV27cxI2dcCOcMlXIVtVodjGneS28RsFMx8cxDKwCcheeHGipI7iNxZWEUxKjtsqKGS5jz5y5B1xzn+EGOzj3hKeClquu+oXgvTIH3WIIAGBjkdb8TQCBcuzDs/h2EiADLBGZmGQotrl/6KrN1o2H9G11YQGl6JoWxf0RCSmukYOD0wz/wKwCg/NfrTFSpI5F7IHc98YFfHykYEFImbtZ0xvpVMb3/APSOGb7bO0OrXxQRGpM8RhjGSuRY/VriPDP4b6Y6zq8zImnw6wwIbZRaNkKtEj00YFzjKO9UYdUtaJp3LtHo8j17zyIADF92hgpXo4kp5jVwxqA6xmHruoZLb12FLdEcZxoGgV6BSVgB4744JQWAUYatdIYxDbDqChurIgUzx1Cdcly/AIvLDHZK1j9SwNzRY5BWGmP/oI2PZGEW7/4xYHBOn1NtItyl3DKZTLaSOfH+8ZEslEp+KTcpBHgmi+lDRyDqNog5lr5afWj1iyqpAM4U9k2F+04Ks+j1Ms4vlqUtAfALfatvBERquGI2Wn5pm+EdkZwTtq/vNNrq7pyMMVRqNpZmR5pdvjdpucih9pBU47lYKmSh8fYZk1LK/5+9N/uRJEnvxH7fZ+4eHneeVZV1V3VXd0/3sHtOci7ODIfkDMHVkEtyl0sBOpY6+CSuKEACVoIWAvQH6UGAXgUtBD0IiwVXByXuQRGzZPdMn3VmRoS7m5kezD0yDr/dIjOryn5AdaeHm5tZeJh99t0f/MDDZ58+xvMnp/D99Qhzm1rAvA8q91IVDci5cWEMoAY8Hzj9XGH2Qrv0LzvGauqXyZSQ1nTo1ufqBTPixQJ7J7cxPDjcifaPoGIiwg9+8g/+M+BiTL87ZYuyQI+vff+P/nEgvJ2UciMixPM5ju7eRX88NNU8wKnWz76N/lVEpvU7OfAwCAiJXr+32baU8L4kjF8VA1vE+K2dOysXXRk/AnLLUgEmivfJk2eFFE2QMfl+7d3rAFyUr0M9ZMR/PPTBzFvpMjzPwyKK8PHPP0UQbJ9FtrSAW8u+Yk8VaQFz59CSAazTJm/Oax8x8PgjaQIRnAJip9BpLto7d8Qy8MOa9o8ALSWYCdcfvQ2ZJNbpqwLE8d4A+ujX/wlwMWlfdrYkV9O79G7/+n99MA2htf1SblopsO/h2htvQUYKIFNkexFrzOfSaf1qIFHAICScHDAidb4Jqhi/PFQyVTUerqUhqNnGNuOXd1GX8Svg7Qrfa9ZeAzg7W4AK3oKCSeb8na/cAnCew83BoRxmPQ1CH8cHQyziZKsGNBHh459/DlFCuXdiBqaabXfEALYSLDfmywyoWOPxL2Tp+3PoDiIgXgB7+4TDQ8Ii6q5mWn2cmJEsIhzcvYvBZJoqmexBa+IgYB3p3rX33v/m94Fz5dmusDPWKFNbfu1bv/EHcUyBEJBGFrIHIka0mOHg1h0M9qZI4gUo0/q5Gr61QACkAu4cMQQb829p4+LLbn5+Jc/WIfS1iLxlxq+Smas4mNbabny29pEGZM7BnCGOE0xGAX7prWsAnL+fQz2YgCKz4e/fmmA+T7bcBXzPwycfP4aUJqK8cB0XaAFz90jatomw1kTAym13WQygB5w9UTh74mr/7homfRFw+7bhmbRurv0r7hxQMoHwBI7feBPxYmHdtUbKRB5OB7jx3u/99+baRvKaYuzsmMi0fje+9NN/sj8OoZT98EOtFRiM62++DZUoQButXxxpzGZO61cHcQJMB4T9MSOSFVq/kusizdXqRR2tYB3m0Bbjlzd4E8avoIt6Bw2Qa+bdbsvQGkji7YMZMAfy6SLB3esThIEhes7fz6E2UlPv2/cPjeZv9ZZS8HwPT548xex0DpHm+ytixgA7WsAi2nIRDGDdvVuFNQZQAI9/kUAmzv9818gSPx8fnSd+boKyM4qYkcwjHN9/gN5oZF/7BxbjoY/n+uYP9g+OrmmtNRdl9LeAnXScaf1u3Lzz8PP5/gejHaR3MT/EHJMbJxgeHSBZLEDMYAJenCk4b7960ABuHom1fKR1mKvNBqWMXRXjVcFQVWrQWjJ+deZYl/FbHoh1D48qZjkFs7kRJxKUo/kjAuazBG8/PABwnrjXwaEOMje/d+7tQ+vtLEKeJ3B2FuHx42fwfH896APF2rFavrfph6X7aePhXTOAbQXJsrkSA1oSHv+ttGz7cthEpv07ucVg1tAq57fqov1LJLwwwPH9h8bSuJO0Lz187ft/9N8AJmjW4gBr2EnHWXqXL3/7H/y3u0rvorWG0hLX3nhkKJbWAAOJJJyeSeQkpXdYAcEEeeyNCdMhIS5TMNchmCXXpV1WEfUqgt5SUrfN+OXdbHIAlWlStNaI4wR5Pn8EU9njl942Jl/H+zk0QXa0vHlnH2HgQ8p19o/Sur9ffP4UfkGaoSZawNy1XiIcXmUGsPSjjfvsAbNTjaefSngu+fNOEcfAeEw4OhKIWoSYlmv/CHKR4Oj+Qwg/hLJsmdUa3sG0j7PBN/4RYApk7CrwwzqLRESU2arng6/88U7SuxAjWSww3DvE9PoJkrnR+nkCOD2TkNJp/aqgATABtw9FlsQcQHPGrnM+v+LH7DB+NYi0bcavUCOS00nZwZnNXWtAyRwRFkCsFILAw3tvHAJw/n4OzZAJFAf7fRzth1hEydYaYiZ88flzCIHCiPQmDGBu+wJt4VbbHTGAddrUoX1ltMXzgGefmvQvzv9vdyAylT9ObjJI6LXzbbVNcQfl92Qcoz8e4uDWbcTRHGSV6BKBtPR9n771/Z/+Q2B3aV+sHxXZRL/7o9//EyICSFdkjWsOgoZMIlx78xHYI2hlnNWkBF6cKncAViDT+h1OGKM+IVbnn2+2q9oIpR+VSPSrjVsxhzUatUnPUNSmy2GznEsDxq9yXjCMXhQpHE56ODkapW2c4ONQH5lmGQDunEwwW8iVGr8GQgg8ffwsTaFhgj6K1nORAFbXDGyt1GJDBrByzILPGjGABBADX3wkoa2HPzqsIo6B0Yhw7Ugsy76VoYnSg7SGTBSuvfEmCAydU/qwC7SSen8SYnDvt/47YHf1fi1H356ndwlu/ugfm/Qu9svLyzhGbzjGwe17SOaR0fp5wGyukDin2koomITONw8Ycb5CKReNtIJVDEwV41dCmG0R5cq+LR0yjQ6+grb5fTMWUYIbx6O1PhwcmiAr7HH7+hhxLDfWmoLnCTx9+hxxvC5YFwmHTYSa3LZXiQFsKWQWzYkFkMQaX/zcBSTuEqvaP2Fb+ydM2pfR0SEmN06QzO1q/zSE1+95mOvJ/fsP3/oysBvtn9Xll+WluXv/0bsLTB/0ex60tp/eJYkXOL7/EF7oQSVG66cU8PxUucOvAgQT4Xs8FRj0CbKm1q/Rxil6pskky56p0KDVZrbKrndwuJS2rWCWc8v5ErCIEty7OTVtXD1fhxbIanjfPZkgkeuhcqZ0FmN2tsDsdAbPE2vJoNtoAbc+y2t7hRnAtrQEgKn+4QGzpwrPP1fG/89t250gjoHhkHBoSfu3dk8raAVcf/gmlJawXY5XKhkPQw8PP/h3/gwwijWrA8Ay85cFerz19d/5L4ehD6mk/UAPmUD4AQ7vPYRcJACMpm+x0IhcKbdKSA14ItX6yZIF3lAqKjR1FNzP68YKIa7DbBUcLFXzW/usBePX5UAsGiNKFB7d2wdwfog7ODRCem7duj4GsC1oMDPiOMF8toAnRE4Lu4LO6gcXwQDWadOZ7mx8F+EBTz9JMD9z/n+7wlL7d8Jg0rl5/xr1t3rBjGS+wPTkJgbTAyTxApbt+N5kFIIPvvnHwG4qflib7Xqgx1d3EuhBzIiiCPsnN9GfmFJuxCap84szp/WrQqb1u7Hvoder0Pq1va76DcoYv6pHaxDgyn6rDpQdMn55qKulzJMrlTbO+A9u7QEA2GkQHFogE5hPjoYIfIbeiPhlZiSJxOmLGViUJHpe/ifn883PqObavwAGsI4mL+/DrX6aMIBkHvjiI2mYEnd27QSZ79/BoUAUmSDHVXRJ+6KVBAvC8f2HkIsYZFGFqzWRLyDPFgm///Uf/BSwb/q1xvxlE/vGd378hxoavINAD601oBQO778Jrcw1CyBJCHOX1LkSUgE9X+P6vlhq/Rpr32r8om0Yu82GrZjDGg2uCuPXxAmeyfzbJC1SKYSBwN2TiXnWrX+HFsiChK4fjRD2PCQ5DuwEwrNnpxCcXRev/67BTZfGAFYxd3XaNKCPzECy0Hj8c+m0fztCpv27ecssXNVQ+1d2DplcwwkO7tyF3+/DdkEOqaTeG4e49taP/wwwaV9s9m/tuMgmdvTmb/1X+6MQ0rYDEqfpXQ4PMDm+hmQ+BzODGTg9S6Dsx5W8UiAAsQRuHnjwPQ1ZFKBU8RqrtH51tIJNGc62RLdqbnn95GEXjF/pOBtt8zYSMxAnCqNBgL1xr6QHB4d6CDzG4d4Ai1ghL7fs8+enoA0mpYkWsJBhvCQGMLdNHQawAnVoYAaRln97/oXz/9sVzrV/ZF37p2SM3qiP/Zu3kFhO+6LBYtz3Mffv/ygMw77tih9WOmJm1lrrg8Pj619ER98wFT3YalFi0hoyjnF872Ga3sWE70hFODvTTm1eAamAMCAc7zPipETrV3ZdU/seN+wAACAASURBVJrPRRnjV9XnRTB+VfPbIeOXeygWaAbPwYhiiaO9fmnfDg5VMOlezN/X9vuII7m91wVhdrYAaWwt2DItYN6Nq8IANpnzWpuqfV5DCF69Fh7w9BcJopnz/9sVlAJu3hQgNE+EX6r90xoyVji6/waIyHLaFyJNWgoCPvj2T/8EOA+qtQErzF82oW/86u//aT/00ooedo8iKSWC/gB7t+8u07swA/O5ROzSu5Qi0/pd32cIzo8cXTZscy+9X4dxatq3DUfryiEvmfHL+7DylREQRRLH+wMAgLIcbebweiErC7g/7SNW28UxmRnz+RxKFu/ror3RJNVRZbuODGCteWzcqDPXxnQpZ8DPPnT+f7sAkdH+TaeE6T4hSXJ+v7ZnHzNkFGF8fITx4TGSKLKaaT/L+Te688M/Bezm/Os8y9Xcfsn0m39yMOkBgF2tX1rHd//WbYSD85IqRMCpS+9SiczX73hPIFEttX5l11WSblkfJUS2DfGuPe7GxcvE+GXPxlLh5rU0x5/dPKMOrxmy9Xm434fM8dhhZszOojTIiHP3R87lev+29kkHBrDuvq7VpuL7VDEUq7dZAHKh8fgj5/+3K2gN3LjBuTn/NlH7LCJAK8ODHN1/AzJJQBYFcQ3hhT2BmZq8cXLr3huAvcCPzsxfpvV78MY7H5xGwXEYCG07t59WCiQYx/cfQCZqGegRRxpzl96lFJnW79qehyD19WvKhNXiRsomkNNFrc3VhbimD7Rh/PIa75zxIxRWN8hb3saRWeH2DRPs4dK8OHRBJjsc7Q0g5aYbjQIzYT5brJm1lvzcBmNXyADm3LyqDGBjIbIATegee8DpU4Xnnzn/P9swlhJgb48xHJHJ+9elv9W/mZHMI+zdvI3eYLCDwA8VD0MPj776d/4RAGs5/6xo/gDgja/89p9ORgESpaxGpIAZSRRhuH+AwcERZBSZQA8CTmfKKTwqIDUQeBrXViJ8m8KG1q9Wx6u3WjB+VfPKa1yHqbsQxi93kiXfQZuzYdXnz8GhK472+lB6naoqZVIKxYlEnCRbwSBFzNRl7Zs8BrCwTRUDWEHMOpl/c+55Lv/fzqC1schev86QOblIOgV+JBJB6GPv1i37FT80xGQUwjv6lf8UsJfzr9MMV02+evr1/3Ay7AGwnNsvDfQ4vHsfLLAe6DHT9osTv0IgAIkEDvcEen47rV/VhmjDYHW9LiWoJfPaJLpXmfErOjwzSA0IZhxMQwAux59DN2R09GAawmPGtt86QSkNlRgT16bTfBFDc1UYwDr0IA+16EELQbVwbmQe+Pxvnf+fbRABSQIcHQmEIRkGsMnzJdcEU+/38M79XQR+cOCRnkXcf/+r3/4RYCfwoxPvlNme3/3g2z+eRcoLPNJa2w/08MM+Dm7dQRIly0CPxUK6Or4VyGr4Xt8vqeZRQZiaoorBqnW/StquuK7zTKc2F3lwAdC0bQFSSsH3aMn8abcPHDogc1Pan4TwvO3DyzB8EolSYKJcYWMpsLzEDGBbgbArzVq9Zk7r/34kLefMcJAS8H2N42uUW/Kta+DH6OgYw8MD64EfsUyS/WmIgzd+/c+A82pqXdBpdkoZCnHjrR//53vjELG0nISQGUk0x97JCYJhHyoNdCECTl16l1IQTDWPw4nAIKBirV/b6xxiWvvnaLDBGknR6QNV887tN6dxHcZ014wfKH+TKgX4PmNvYsy+jvdz6ILsnDqY9OB5jDyvJSU1VJKABEFjOyI4w3KfVGnMcm7Y3k912tgQJiv7aMhUeB5w9lThmav/axVZ5O/1awzf15XBH7XXBhmrJDNweOe+qT5mNQMDe+O+j6T/zk+FEEJKKbuaflufGavl3KLw0W+P+z5g2UtBaQ0o4PDuA2gFQBtNX5IQ5gtX0aMMGgCT0foVqrcta/02n7XKbBbMqY50X3teDaX7XWsq8tplpiApJUaDHsJA5D3t4NAQZv0MBgF8z4PaSPfCzNBKI0kUaCUyaYPH2+gNlXtq1wxgLQEr50YdwW/r8YaCaxXtWvP/88vHdqgPKYGwb0q+xTE6kc7VR4kZSZRg7/Yd+GHPcuAHEZGWGhpf//aP/xDoHvXbmn3KBv76t37z72lokO1ybkRQcYz+dA/j42tI5gtTx5eB+UxCuvDGQhCAKAH2xwLDPiG+SK1fDc1cq3st5pQ3rzaEH6gm7HltctvVZfwKxgA0iAiJ0hj1/a1nHBy6gIkQ9oTJ57dxOkil1pnCOoxd3XYXxQA2EABzx+ooIDams5n/X87v4dAeUhrtHwFbWtVOgR9xjHA4wOTGCZJoYTXwI1FSTUchJre/8x8B55bXtmg9s2zgvbvf/Y+noxCJKiwY1gpEhCRaYP/WLYiAodPsoloDL+Zqq0SLwzmyJPwnB7yelHUVu9L6FXRRRTg7Sc1N5tBwXrX7uRDG7/yeTBTCnr/2mYODDYS+0fytripmkwg6kRJi9UBbUf1dJQaw9KOCzVJHUKykY/ld12uQc4+F8f/7/OfO0mULWeDHaEwYTdKkz02eL7upNbQCju7cB7Q6d6a1AmP6nfsPfgMAupp+Wy2nVZPvovfmb+3C5Gvs5x4Obt+FipUxYzIQRRpx5AI9ikAwC3tvTBhdktbP6ni5H2zfryPt53bb4lDaanOBjF82oNIa/dCYfF1xD4euWF3D/VAgUZkImYGhlYJKjIxPqL92ixjAKgGxsL8a+81Wre82J2tXQXbtWgOeD8yeKjxz+f+sQSnzO1y7ZtyittZdgx9+tSktK35cRzgYQ9oryAGsmH6/8s0f/i7QzfTbioXKBvzqL//o93Zi8k1z+w0O9zGY7q/l9pvNXW6/MmiYKN/r+wLrsvsKGkiftRm/KnTQNDZlRvMat5l3ncPoQmuSrkBKjX5g9r1yp4GDRfR6PpTSW+tOA4jj9dpYXRjAvLZWGcCyeaQXhXSgSrtXITQ2pWmlN7Tx/3v8SYL5qfP/swETOwAcHAj0Qiq2kKWoo0zI7qkkgR96mN68hSSKdmL63bv7vT8Gupl+W80qG3D/3q/+Jzsx+QKQcYz9W/dAvJLbTwMzl9uvFIkChiFhMshXZzfWutVFW61fRym5ZCrVc2pA4OvMLXd+O2D8AMPwjQaBaeOkIQcLyDTIYeBBKp27/pNku5xmk7Vca1/VaAPUUDdUCYZl4xcNunqrin6UXDcVskGA4HP/P2f56g4pgSDQOD40Z2WTw6+KUVSxwv7tOyC2nfMvjfodvPO7QDfTb+MldBFRvjpJ4PUC7J/chIxN9hhmIFpoxC63XyEIZkEf7xktaa5CqIygXYbWr6xZC+Jee44NJfc2h4g1xi/7Q59fKqUxHPj1J+fgUAGVZm4e9MVWtO8SOv/zojVd2HZHDGCdPVhHi1MlQNZBU8G1inaxAOJE4/MPpQv+sACTNQE4usYQApWBH+s3Sy5Ty+Xo4Aj9yRQqSSxy60REUFJpfOUb3/tNoL3pt/GMsoE++MYPfqp2YPKl9MWNj47RnxqbOTGDyJh8tTvoCiGVKeV2MBZIVA2tmq2ByzRsZdJxxQSqiHZrol7B+LWJ7N0547fRXmtgnGr+HBxsIFvTg55f7EhAXM7U5VzUZQDrtGm7F0s/qrNXi64bCpFrtxowFwAADfg+cPbc+f/ZQpIAwyFhMiEkUflv0kTZoZWCCBj7t26ZqF8bk00htZKjvo8bj77/x0B7029j5i8b6Pbb3//3Rz0fUmu7RietIZXC/u27y2sQoBRhNncm3yIQjMn3YGxKuSV5v8plaP1qoooxbDReGTPadB55bS6D8duAlOeaP2f1dbCJni+267elYMZSpVe0dinnog4D2FZLmIc6gmYdBrBqwEoB1/I1NCBS/79Z5v/nGMDWyNimo2sM2fA9lv1WhNT0e+su2POsmn5Nrd8e4vDdvw+0N/024qVWTb7z4O2/Ox71oDWsFqCRUsLvhZhcv2HKucEQnEXkyrmVQcMQuGtpUufN1/RSaf2qJleDGa1DyKvmnPt4i7ltdduQ8ctXAiiMBs7z28E+hMe5AoVe+QeglGFqtN4tMIBtA0BqP1PyHZp2mvduak0mBRPAqf+fSsiVgOuALPBjf8/U+1UbeZm7lnvr7+1jMNmzXO7N1Po9WyjvnS9/7TtAu1q/jWaTDfD2lz74ldOF8gOPNCx6HxAzVBRhfHSEcDAw5dxSk+/ZmXYm3xIkCTAeEIYhGZPvZoNdaP1qatisXlcxfgXfs5aEvqMDxjbjBxiF+LDvzL4O9uF7ojB9kCDK3Y+d130LBnCrTVehsYx2VF030P616n8DLIAk0vjiw9j5/3VEVu93/yANkqzS9JZcr97Iyr3t3bwFlcT2FC4AEqWS0SDArbd/+MeAUcw17aOx5g8Abrz5q//eeBggUcpqLV9oQKoEeye3zVtdMfm6cm7lUBq4tpf/gnam9StDW4mpy+RaMqN5H7Zi/KraWGL8FAAmxjCt8OG2hYNN+H75iioSLLswgJs3WjOJFfu4DgNYZ35N59alakQuNOD1gLPnGk8/Tf3/HFohC/w4Ps6v+NGor42/VaIwvXELzGInpl81ev/fBYA4juOmDGDtc4OIKI5NxkL/8P0/HA58wLrJN1kz+QKpyXchISW5Q64ASgH9kLA/YkR52cobEJeXWuuXc119ox1zXOcdt2X8ijQpGbTWEEwYhI7iO9iHL0Qmd2+B6LyCUOP1XdKurvBTZ6+2CQCpPU4VA9uk09VbbeiwBrwAePpxgtkLbTnnxuuFZcWP8XaKtNaMe2r6HRzsoT/djel3FvPw4Ztf+grQ3PTbiPkDgJu37j6YJYNrPd9DAX1ohczkOzo8QjgyJt8syne+cCbfIhCAWAJHE4bI+TVbM0tdJ9XiXlMCWKffSom8Yk6V8yqYWxfGL69N3phCuE3hYB++R0Ahdafiq3Sh7poBLBVYC9BUyGzdRxWtaXBdF8SEzz909X+7IE0ljKPj/IofZShTOBjTL+3M9DseBrj9zq/9QwCNTb+1l0rGVT56/4d/5HkEpWS8fSx2g1QS+yd3zNtcmnzhonxLoAD4QuNoWuDrV4Y20ubKH12JW20JqgBd55P34dYzVfOqYvzqfFbGEK9erFTcImiwK3DtsAP4PqPIQpVp/tY+22pUnwEsbNNQYLO+b8uEzS7broFgXJces5f6//1cuuCPljiv+EHwfd0s8GMDtPG3ShT2TnZj+h0OfIj9934PaG76rc1TJUmSAABNf+n3J8MQ0MrqyaMTCT8IML5+AzJK1mr5uijffBCAOAH2xwK9gLYIdlNJ1NqkWtxrSohrf5e2YyJ/w9c+ICra1NZy5A0KE2clnJjvYBEZ+ShbV0IQKMcpqhUDmPcc6u2NPAZwq58qDWHV/m57bVH7V5dGewFw9kTh+Rcu/19bSAn0eoTJRBjTbwl5ra24yEy/+/sIp3tIEpumX1Doe1io6d3JdG8faKb9qzULIiKttWZm1uGtb/R7DG1TxmBGkkTo7x8iHA2hkmRZy3e+cImdi5Dt7+MpF6XlKkYFk2Zd61ch1bZGmQahweFRZwqNNXwdGD/KmePmfaf5c9gFinQTWhOEEIWMRWMGsICWFH2W26ZiD3dKdN9FkC3b2y37rRKC2QOe/iJBvLB6Or82yCLcj47J/G2DgaY04TMTJteuQ0WJRSsmkVIyZiZ8+Svf+ztAM7+/WvPIqnq8+8G3fxzHEkywW9UDgIwT7F2/sVbLV2lgtnAm3yIkChj0CMOCOr5dJNBWaNmJba1fre+2a61BGVO6cb+K0c7vSJ/7/Dkp38ECMjqbn7dfQQiC8EwrqqnZq9SOVzGAVcxd1fhVqKIvLQThFlNodF3YDxuD3GcfyhXp0aEuMtPvdCrQ622bfstQ9aql0tg7uQkAUEV5lFpAaYXxKIB/9P4fAM2qfTTiq248/JW/Nxzar+qhlYLwPUxvnEAmat3kGzuTbx4Ixh9yf0y1Aj1q39wBs3XRWr+qe03nm9dB1YFROk4djWNZGwUQGJxN1O0PB4vIO5uUMppmwabuL4BqzV7JZ3X2y/Kzqv1Spd1rIchVNal1fRnaPx9YnGo8/USiXcXX1xtSAkGgsTcVWzn/Wvv9MUPFMYb7hwiHQ5O/2BpYDEMPYvz2T4Bm1T4qj43VFC+YvPt3h33LKV5Sk284mqA/3YOKojWTb2Nz5msCDZPp/WDMULIZQWstLbclWA3G7ip1VxLdivt5qJpTXuO2jF+d+av0Dxft67Az5CwtYoLn8Va7tvkt6zKAmzeq9nTu41UMYo25Vc2rC2xp/6ABzwOefaZw9kI7BrAhtDb/Do6qJeomSgyVJPB7HsbH15HEMdhiyhdfMGYL7t+7/+Y7QH3Tby3mDwCu37h5Zx6Hh7ZTvDAAFSWYXL8BwbQ0+WoAi4WGc2vKR6KAYUgYpBU9VtGacOSghhKs/Lrt4BY0kEX9lt5ueEg0mkdDxq8MBG051t7BwUDnSNxKmcTizJxb97cuA1inTR3BKbefhkLdZgdd6U1jQXMX2j9K7zPwxYeycdqS1x3G4ghMJoReSOb91UQV3VcKmNw8gdYK2qLpN1EyDkPG/Xe+9bsAagd9VDJ/GRf5xnvf/R1igrac4iWzf09PbkIqvTT5SkmIYuVMvjkgGPX04ZRbEbnCyzKtVplk3lbrV8Fo1e6o4F5jYl01nxoHXFvmMI/xq9Iw2pMeHRzOke/TY/KVeSwMjc5p0TY6vjGTWNys/JkW+7vzvQaP2RTamU36l8cfSwin/WsErQHfB/b3CHIj6reL6VcmCSaH1+CHfcgmXGUVtKLRIASmX/49wJh+6zxWeXpkDoTj6+//zmgYQNl194OKYwTDIUZ7+1CpOpRhqnoou9lkXhlImNx+eyOCrKjj24WgXKTWr+qQsC2FN0bVnKoOrRLmuTHjB4A0L6N9nWeEg01oXcDcCQZ7DK01NPIFzzrMnS0Bqc0e72r+rdJK7lL713Qung88f6wwe65c9Y8G0Nootw8O0l1QwvLUOQMyqDhB0O9jtL+/LGJhAxos+j0Gwju/AhierY72r3R0IqKMi0x6D35tEHqAxSByZkaSJBgdHMILAyiTShCaTGJnl+JlGwQTkTQZCYSBYf4275c+XHS5Y63f1mNtf1tL0nlTrUCd91pFjAsfrTn2KpNHbEq8AS7ew8Eu4ni7ur3WgABBeAStz4Pw8piZyq1dxQCW0ZuNG42ZrRpzu0jsUvsHAIKBLz5SJi2vO09rgRmII2A0ZhP120DfVbpmtQIYGB9fh0x5HTsgYoKMYoX3v/qtXwPq+f2VnhtZB/fuv/nOWaT9QDBgsYCMBqCVxOTayTl3TcY2vohcipdCaOBgTPkqnypGY0foQsQuROtXdl2ldcuZfO0xGmoqyhjszXvsnP4cdoBFpEwlj5S+MJt60iwYnuCtaOA6DGBjJrGrQFV2/apo/2pcswDihcbjTxIX/NEAxvSrsbfXLep3FQRT7WNyfAPs2a32IbVWo6GPgzvf/AMzRwuaPwC49/Y3fyvwGFJJmzHKaYoXH+OjI8jEmKmZgSTWkK6qRy6kAno+YW8otgtQb7StvUYtELS8PgtvXbLWr+mYTQ+DtlPI1YYUPKgVIDfVvg4OFjCPkq11lzF/QnjQtL3ubDGAm3srD7XoXMM9b1sAbT12k77q0Dxtqn88/1xh9kI7829NZFG/+wfVTEjZml27ZIaMEvSnU5PyxaL2Lyv1xtN3fgrUK/VW+s0yf7/B8fu/M+gH0DZLujEjiU2Kl3A8gUyMDZwJmC1UmZn9tQXBRPnujQm+p5u9ozoapg7zanJdeK8t0a3SrpVdN5Ss69ysYpyXn5VpA3LmtgpNGrE0Khi3VxxsYhHJDY8+hlIage8ZP1OVvzbraLTaCEGFz1Tt+7L7Nrm1nHs2tX+daFR6nxn4/CMJrWo84LBM+DyeMIKgWcLnMmiVwAsERofHSOLIZtCeKfWGyd3pdP8AqNb+FY686u8XB/d+MOx7AFn094PJfTM+Pobwydh6KU3xErkUL3nQMPv2aMKQefl2GjBBZWjKcFV2sHprF1q/XTxX8Gxt5rLsHWzcb8r4AabUVpLm+HFbxcEm5osk52TQCAIfq+dJHQawcwRwGTOVd6MEjQS/l1j7l/duhADiucbTT13y57qQEgh8jUlOwucyVAkrWgHjazeMdtHGRE3npJSMCYT3vlqv1Fsh85c9+PCNt798tpDsC4bW9pyMTJ4bwvTa9TWuWkpC7FK85CJRQD8kDPsmBH0VTTRUdYhvdaf1HmlCxK6U1q9qPjXfW2PGOWdeGTJCwWRKcMnMZ8Sp/hwsIPPli2K5tUSV0ggCAWasOcDvkgHcbNyVPjRGSwG3rvavSZ+t02Kl0Cvm32jmXKrqIDP9Hh5uv+32KV8AmSQYHR7CC3xom6ZfAP2eh+nJ+79dp32p5g8Abr/5td/Yhb+flBJer4fh/iFklIDAJsFirCCl02VsgpGWcxuROfwbPGvzbVYydw2IWxfptqpJJWNYMZcmzHTdPko1HA3agIzmL86ye7vt4mABGUNghG9eozGG+fNTi8y6tFHnILRVMrHo2aJmnQRAC9dlsKY5bCI4a+Dxx9Ji2Oari6Xpdyzg++Wm39prFSbfXzgaoz+ZIkkS2OLEtYYYDn1E3p3vAdV+f4WjZv5+vYN3fjzoW87vxwyVJOhPpvDDPpQyZgYmIIqUS/GSg8xVY2/EUA1NvmUoJBIF0muTAWoTNwtaP6uoo80oui57bxs36nyn7X6MxlxrhcQFfDhYhVltkdzW/GmtEQQemAsElBqCXRtmp+m+q9VJE1y09q+k+1ZfY+Mh9oDZc42zZy73Xx0oZWr9jkYMKVGbaS6l/0qBCRgdHkMlic2sJhT6HmZ6eLsXhn0ApX5/ueOu+fv5d3912Lec3w+AkgnGR8cgD+v+fguX4iUPiQL6AWGYU3KmiZaqvoRSjSopurRx20HqzGPjQ6vSfg6jWvhggznlfVj21TUIUrr0zg72kO0Lo/mjpXmB6FzzBxhTWCsGsIZ2rw4t6yooXmntXwMa2nZcEsCTj5UL/qiBzMVhssfm7xWS28UJTmlgfHQMkLbq9wetJBPhS+997TsAwCURJYXMHwAcX7txcy69kS8YsLhMspJuo8Mj6A1/P1fSbRuZyXdvTBCMrTxbZbBphrAptTbhEy9b61d1z8Z86/r0ZEE/WsNp/hx2gjiRy+oxqwgCv7sAU6VVr8EgFqJK+KrZTZN+r4z2r+y9bsyDBRAtNJ5/rlzwRwUyH9e9KUEI3ejsXcXqz5OVehvsHcDze1YTPkutle8z9m9++deBFpq/LNjjzXe+9gNfZP5+Fuv5SgmvF2K4t7/h7+dKuuUhE9CmozTKt4Qi1H57LTVYFh+xMg+rUn7VwVN2XUDo89DpINJAloHXaf4cbGF1JcWxWvtMa4BIIww96Ez6SFGHsWmk3Uof2In2rYw5tKz9a4I6DHLRvVbjasDzgGefJYgjF/xRhSQB+n1Cv89QJXxabSEFJtNJMBwgnExMvj9bP4JWNOr3QMM3fgSU1/ktHXF87b2fhIGwWzu0xN9vEdlUgb46UAoIe4SRzSjfhqgkdh0Ia5Nxdqr1K0MXjUPXwzJnlxrNn8Xi4A6vN1YIbyTVluZPa0IQeNA5Of7aMEI2NHGNBb+q644avtyPyuZas7suAn2ZsCoV4cknCmTNoevVhFImVc5kYsqpdvb7SzsVDIwOjuz6/REL32P4k/uVdX63xiQiiuM4BgA1eOOHg74PAPb9/Q4Ot/z9IpffbwsM4+83GRC8izD5lmmwWpoqWrVtq328DK1f2XWVVraOliSvnJbWSFySZ4cdIIkzs+/5ytIa6PWC80YV+7NzycQa+7F48Jb3Kppa1/51ESgtjOV5wNlT6VK/1IBSwN5++pIqUh1Vgs77HB9fA4isKb20Jur5jKcvFrh7/423geJ8f4U/ued5nhTTe4HP0NqermXp73d8vO7vp1x+vzwoANDA3tBE+ZZRnC4SYhN0kZibqMZbMVOWUPsg6jCJtrm7CMZh2Pn8OewCsVQbFT4AIhPtmwV71NmLlRrCqgVfY99ZF9h2of1r8Xjpq7Ggec2gNOHpZ077VwZmk/B5NGL4gUbbkryrv8vS729/H57vWc33J5WMA1/g1v33fwCg0O9vi9XKuMQHb777tUUUQxAVFPNpOzMJL+ihP9mDTBIQ0pcbK+fvlwOlgMAnjAapynnlXhcC0QRdNHldtI9NYFvr12r8JvOp02dJI00a87k9guHgkCGOFWjDyqA1IQx9KJWnht76s/DDRvuyChYZtbpNW9E3C8daF61n2Zw9Dzh9JhGdOe1fGZQCfF9jNDQpX4rUZk2UGypJEIQD9IZj48JjK98fgDAQOL77lZ8AgNb59sJcsy8AXL/z3vd834PStqrawdTzlRK9wRBBf7B0dGQG5rHGJl153ZGZfEcDgi/QSOLownTVIeJtxtl88KKYyk59t9U+1NBqlM6h4nkmwtnCat51h9cahvgmiUIcy7SKjLmjlILwCJ4QWPVByBPWWgk5Zddl+29X1x2YysbavjLmueThVkxzUSNJePq5spjM7dVDdvaOJ5x5qlnpVHiEwf4+VBJb8/vTGmIw8HHKN78LAEmSJHnav+0KjimX2Dt49INB37ea3NnU840x2N+H8Gj5RrV2/n550DDvZm9YzXk1kQytagEtEahaRLNmB021frUnVfdeRdPO5jAABDI1WFERteXg0ACn8xhSq62C855g+L63pfmro61v4/9XGy+Z9q+LwNsETZ71AmD2XCJaOO1fEShlV6YTArOpz7t6r/C5ihtapSnv2uaQKeg99D3MZXh9PJ5MzRwrmD8ioiRJjc+9O78cBgybyZ0Bkyl+dHh0/vJSCTOOnNpvExqAJzTGw5fT5GtrQCvEt+ZwVq67aEJyGuTRY2bCbO40uzD1fwAAIABJREFUfw52kJHj2TzeSiGklGEG/UBAq+0k/G0Et0b76hK0f6WoaNxF+2el36Y0lAAlCS8ep9o/dxRvgShN+TJgBB38/tb6BCClwmC6D2YBZaNT0zNpJRMmwoNHH3wXyA/62GL+AKAXhv2ZCm/0fC+boxUYIiIwmO5DSgWNtH6e1EikC/bYRJIAg5AR+vTymXwrtG2NhfKXVOtX9WydQ2mTFmep/s7mLtWLgx1QSl9OzxJIte5+pDUghIDneamGYptQ1xJ6Gu6p2gxgC9pVda91OptaWvv697pU/Kg9uDYqnhdPJJKELOb2eLWgNeB5GqORgExQmPKl7IxZu2SGkgnC8Qh+vw+1mcetAxSgfY9xcv8rv1nUZm36WSmQNx699zU2iWStBnsomcDv9xGOR1AyAbOJKYtjDe0K+q6ByUjj0wHnMgBlhLYQFUxXjccrPqh1q7htC8L5Umn9qg6UBl9GEHDmNH8OtpCuvdN5DKkUKD0amI21RmRmX61BBfV9V/vZ+LPeteUjYKfavzZ9Wfh+rehqDbAA4pgweybhMZz2LweZZXY6pdaVPrb6TCREEGAwnUIlEmQx2fOg30PSu/s9ID/Zc67m7/DWl74rBFkN9iBmqERiMN2DFwTQiUzHNCZfx/utw7jWGJPvZgnG1hq3htgJoWnIgFa2bSu9X4bWrww1NB8ZNADwuc+fI9QOXZEZFk5nMZTUa3vHaDwEfF9gNclZK+apheZ79eLKaP+6aDHz7pUJ822E7BpzWLvWRqB8/kRVjvm6Iiv1NhqRCYiqaY0rf5Vmrw33D6EsxtZqMAceg4e3PgDykz3nspmHN976Vs+3W9mDACglMdjbT0fVyP4bxdt+JK87lAICjzHsUWlJmU100bg1IZy2GNAuEvOV0wJ20fqVXedsDgYvNX/abR4HSzidRdBYZf4YSiv4PoM5dT+pYkYaaP/yO7CHS9f2FTxkTQBuI+wXNBIeEJ1qLGYa7Gr+5iJJgLDPCHrrfn9dkj1rBcMXQdsU5KnnM56fxv7h0bUbZo4FzN9qZY9n8uCDMLRb2cNErmoMp/vnyZ3JJJmMXbqyNSxTvPQJnrBXwcGqFrCNNNpogB0S6obax6oJND3wmrxLEAC93YQZWERZtK8T0x3s4MVZDN48ybSG5/nr66yKidmVILRj7V/VXGv3WX37yrU157HR/nFKdxy24Xkaw5GAKvH7K8Pqb0Js8v2F4wmE5xtPOysgUlomvi9w697bXwO2gz5yp67FwcPQcmUPrRSE76M3mUCl5meTOVtBumCPNWQpXqYdU7zUNlNUPWurbQXTdWFEu2yIssOlxpSqB6i+vcXobd7UGsyERWQIhW1fKYfXD9kae3EWbdX1NYnmve29UcBsddE+1e+gPmzu59rP1hBmyxpYEbabzkEb7d/ZMw3pAj9ykWn7JiOCLGGO65+9DKUUeoMhvF7f5D62BK2hBTOu3/nSd/JHTpFxhXfvPXw0ixIIJm3zWFFJgiAI0RsMoeS5Y6ML9tiGBiBYY9TvluKlSdMmjJd1M0QNXAjBbtLJ6scdtH51Ko/ojfsmSp4QOZW5g2U8P4tARBvVPRT8wEt9nlTuVshd5zveF7n3L1r712CIzUbWBOw2NLdgDibwQ2P2PA38cBUkt6AUMMrJ99cWOkkgfIH+ZAolE2tBH1or6vd9iNH9b5nr9TCVNbMvANy4/eirvseQuomnWTmIGUpKhOMxRM+DTtlnZiCO4YI9NiAVEPqMfm93KV6aPGRFCi1r21FK3rrVVqtw0Vq/DtoPZsJ8ce4gbDdHqMPrihenMcTGBtIa8H2xtq/K9u4aLlDDVwYrAmDesx3pSd17Xdo2Qhr4cfpUmXPZWeTWkAV99PuMwK+f76/y92JgsLdXKFy1gQZzGDCUf/JVYLvSx9ZPu3/y1rc9wVYPEwIM8zfdMwRks7KHvaFeejAZ5m80IAi+nBQvO2lbMYcumsedawF3pfVrMxcQtNbwmHC2cJo/BzvI6P2Ls2jNj8lUNtAIfK9YqCrQInW+7qj9y8UF0JROKKPvbQZqSPsBgD1gfqaQRK7iRx6UArxAY9DntQCoTkEfEiYeQmubrpbU8z28iL2DMOwPzBxzmL8sD8wZnXxzPOwBWllb0zr9N9rfB1aCPbQGksSpLFah05c1GnTLJdT5x6tJJMtudmGsGvdT59mGh8Jla/0Km2iABWG+iLfKbTk4tEF2yJ/NYjDz2gGktYbve2v1foH89Zm7ZxqYVG0yUo33ryVrQq1xq/Z49TC171W1zftNZEI4e55G/TrT7xqUMozTaGwsc13L0i6VY5M06MNipQ9orQiEB2+89S5wnssZSJk/IiKV1haZ7N18h9ioDC3NwAR7sEBvNIaUajmwUgSpXLDHKow/l8YovAB/vxYEyLrJt00/DQ6TJnNoon1s2pdNLaAGQGDEkcI8kiufOji0Q6YQmC0SCKat5RT0RLruNp7b+qNogLbzKummTKvVQqjclcWjybOt+Qibgrc2wsDpU2UYP3c+b0FrYDgiU0qjgPSWKR7WLlO3uGDQhxf07Fb60EoKQRgd3H0fKND8mTkwv4j9w8DjnOl2mIBSEL0AveEIOnNoZCBOlAv22IBK/f3CwJ6/nzXNWdt+K0wPTZiunXyXFlq/TY1G/cGq79X5jsyA1AqnZxEAJ5w72MF8EYOZznk/nfr8eTUSvxUIk3U0TWX3m6CzQFdmdu06btvOujVr3BYwpt/FqTJuWY75W4PJUgL0BwThaysuclopCC9AbzSC2qyv2KVfAB4TTu6+88ub9xhYjfR98GgRSXg2I30zrrY/gPCDZfFi8wI1nNXqHFl+v2E/jSTabNCGMDX8FW2x4pfRT+uM/A3HqXrWppYPyBe8mY1v6Is00TM57s+hJVYPr7OFhLeS5C37L3upG0qOcLIrWrR8zKL2r5O2r4Mk3Ja+bD3XxvLSYnBiQGvC2VNn+s2DlEAvIAQ+N1LSFEIpsAeEo7T0rYUuAZgyb8MensZHHwDrZd6WZl8A2L9270u2I30ZpqZvfzSC8Og8UY42IeVWnTxecmT5/caDbbNLE3SWCNto3TqYWxt1c5GSeZkmw5LWr+ogK+6KIaXG2VlcPaaDQ03MZjFYrBd3JQIEp0nfqmjDS6792wlNKbpR8K6ajFl2sxYZKppD6st29tyZfosgBDAYEJLkXFFXJiBUrQ+tgHAyhU0XHg1mn4Hh9Oa7wHqZt7WfdP/agw8oV+XUdQYK4WS67kQMk+bFralzZPn9hhfo79eo2zYLu2KAiyLMTRpepBawLZiMO0Vm9nVwaA9DmZNEYb5IIBgb2gxKtYHLy/breBfaP9tTaClg2ppDpXBZs5+uYA9YnDnTbx6y/TEcdQvMXIVWQH88AUA2LaLUCwS+OMVkM+J37SedHN77IPTZKu+XabP6073zhIhkysi4SN91KAX0PLv+frtCE+bKmsmjrG1bbVvROGUMaNnhYFHrt0QO4SUCpNZLs6+zyjh0xYtZhEQqcM5Jz4LXF1mZltqS9q82asyl4vH6Q3WgM23RiMY06afGA1oTZi+c6TcPWgOjIZl0SC1YmTXlDhsLaW84gvA8O9mjTc9EgBaCcP/hoy8B5xG/DJjkfwDwOJq8E4a+3TQvSkF43rKyRzaoi/RdByFNHhkW5Pdr2elOtGUVD+6M2bNk8m2CnZufOowtiPD81Gn+HLohO2ZenMW5Jau0NknFCZYYmpZaLev7+IItDGVz2BmjWHmjHEzA7JkyvIg7q5c4D/owtX6LmL9NAb+kRyilTGxEEFqN+JVKJYII/cnJO8CK5o+IKCv70R9ff+QLBoitVfVTSkH4AYLhCDor68aAdJG+ayCYFIjDMH0nm4x/Tcan8xttQRBbEcuih2wT5IqJdzlgGmku2s6jzNROhBenRvPn6LJDW2TBQi9mUVpnfXs1CSG2FT8Xrf1rqznPuXEVBc26/ZSO0UAQr0P72AMWM4UkdqbfTSgF+D7D99iKVnSpKBsOrUb8AgAJwsmdN99f/YwzLjDsD4ZfPF14gWexugcztJQIwj6E5y0jfQkm0teVpDpHlih82Cezjur+7g2oTRNG59JMDW3G6PAOmjTaNPk26cKmFgM418Y8PV107MnhtUe6GE/PEiipc/cTpz5/jdatBYnRpnBmra0letOEAbXQrF0HBKiEMD9NmT9n+l2DEBr9AaAk1irjtEIW8ZtaSW2xfkorDEIfkTh+Dziv8btk/u7cvffQ9wRA2lqaF2PelQiGQ7CgpZckMZAkLi3tKhQAT2gMeiZ0fM0fwPZgHTtsYupoe/symM+LOmg2H2zLKApBePp8bi7cZnJoiaXZ93QBqVVuxQKx4otSpXHret2EMHTeoxdpaWjYb+lzF0gPNQGz59rV+t2AUoZTGoTrARqtIn5TaA0EoxFsctmkQYHHkN7BW8B5jd8l8zcYX7vPTJDSXpoXANBSoTccrS0arYE4cWleVqEUEAYMT9QvFg3swBzbFB2IcdvnrHznMjNRUb9lpqBS82ztprUbagBMjKcvjM+fdkTZoSOen0a2srt2Qmsh7KqbfotuUPMxrI5fAWZgcaZhlzN4NaC1SfbcWfjOfhsF9EcTuy5xzMITjN7o2sO1j7M/xge3v8Rdi9TlQEMjHI7WavoCgFTaCREpOFWKDnom2MMK2vyULaTgVkSxggh2GaPswSYm3y47oQtzV/mOMmiTZ+o0zfMnrsKp7fBSIiM5z04jiBLb1er5Vlv7V7CfNoWpLXTQnlxIW0um37bPlfZpeW7MJidvPE+jfh0AmPeilGH+mOwE6Cql4A/6YMFLN7mu0BoIPMYXTxZiPJnuAwARne/0G7cevLtW1scClAaICL3REHrFwU8pY/Z1SJGWUBr2CnIG1ZRAd6bpuwATQ9vnbPE8OzMPVzCgVeMW3Tc5IRmzuYv2dbCD56cRqOQM2KWwbnNPNRmnrINdmX4bNa3ZV+dzoUzoJQAamJ2mLgHO728JpYBejyH8Yotd3d+GmKGkQtAfmnQvlpg/gEhDK98XuHP3wZvmEyJWKXv5yfPBo9EgsJrmBVqBPQ9+f3he1g0md5ByaV6WUDDav0Hf+A7YMAsWNq3xjC2zaofbhY13an4pa25bS9H5JSt4HuN0Fi8/cQFUDl1gNH8lJqwNet1V+1f8YetmV8b0W7PLC3nOBpiAxWkapOnO7SWUMqlewl7NMm8VP6LWCn6vt1YK1waUUlIQwRscPQQ2mL/B9NoDo/mzx5IppSA8H0EYrqV5SVyalzUoZYI9ej5v5Qt6md7SZRO1JtJ3l4Oo7JGdaRA3oQHBhNNZ4pg+h07I1s+z5/PuEYsNULn+r7jpt1U/FS4vtiwyti1EzEA0V5Au5csatDLpcHo9U5ih67vRSoGFQDBIFWYWXzYz4ej63beX18s7YnziMYPI0vpnBpSE3wvBng+9wsUq5dK8rEIB6PlXM9jDum9JBfFrMsSu/G4avY8GjZturLL2SpuAj3mUYB5lPhRuUzk0R+brfTqPIbhZhacq7d9mQ2tmV9um3xZtL8Lvz3qfbSfCgEwIi7m+UAHhqkMDIA30+5Y6VAosgF7Yh1L20r1oAMTAwfGdR9lnDABh2B98/vQMNnP8EQAlFfx+CBbnBIUZSKQzUWUw6XCA/hUN9rA9zEX1uSvTz87n0EADYByO1bLKh3PFcWiDjIk5Wxjmr4z7a+pjW9V8J0xbGRNa1K8FwtPE8lC3aeu52WZMKU35cpqfB/J1htZAL1z31++U7oWAYDCwyyRpRaNBgE+e9R4CgFJKMQAcX7t+IgRnK83KT0tmAAS9Pljg3HlRp3866WGJtWCPkhP8UnxOWhIeW1rJy/a5uQpti5AJUhnzR477c2iI1eNlNpMQXnXQX2nqoo4Le+em346M1GX7/bXtsy6DV9aWYVK+OAPDOjLlTRb92xrZi5eG+dMWmT8NZmZCf3J0F1hj/m7cYiJomwXl0iGDYX+NgdUAksStngwKhpiGRZU9alKJSzcBt8ROiGkHAm+NgWtjlmpo/iKY6LDnZ1GDQRwcVrBCis/mMURBOGeXfVFLq33Bpt8G3drvp2KAi6bBdcEMJAuF2Pn9LZExfEFoqn3YkL81gGAwBMEen00E8phB3vR29hkDgPamt5kJyjJPr7VGMBid05J05SqX428NgjV6AluVPUpxQaZdG123NateBDHvxOy10UrUMDvXnZPR/Gln9nXoDA1gHkkwF6SbQkmev5zrJrgM068tBtSqCfQCaXrjx9IoXxUTogWc5W4FSpk8ekKgMxEmpO5yvT5IiLVYiS7Icv19/vQM/cFwBKQ/4cHRyQPbCZ4zjZYf9tfUl1obU5WDgVJAIBiBvx0qfhFSXusxLpn5bOVT0cZfyYLmteM0ysEaz17Mbfbo8FrB0OY4koijBEzFft9r530FZ2WVGbRk+i176ErT2pZ9WqWDAJC6g0ZnLt/fJkho9LPSrA3X19o9Zmil4IU9CM+3musPZMo03rhx8zaQ7ue9w5P7XJbfqQ2UAgsPfq+/lq/G5fg7h/GLBHoBwNzs5V+EaeBlNQE3HqPFwBdq8i3pQBDj6XOj+XNbyqEtzhaxqbrUYBF18bnblenXUtPSh2vTRUtzayKE1u60TV/qvNSbq/N7jiwjix9SIfO3hor7Wit4QQ/seVA2/f6UTJgIB4fHN4D05/vkuX9nNAygbSZ4TvPVeGEPWikQs7GPa+UifVMQG+EpDMieJHXZRKKiu0ZD7ZjglvbTofFFmHwBo0VnJjx5sWjwlIPDOTKSczZLtnKMVsKiz50tzflV8/u7SrDy3pb5/jqqd19BhIGdF5Ll+vNT3smWpkwBmpmgvcktIGX+vGB8RJbjtxUAYg+e56+bfSVcgucMKi0MnYWJXzVJ6gowkl1x1bSgjedT8YAQhKfPU7OvE6ocGiKLEJ/Nk8aav/KOL44ZbDsHa7ThAlxQ6j66a3rHDCQxQUbOercKrYFez152FmKC5/es+fxlYCZM9q/dNX8zc28wOUpHtPNzEgFKwQ8CkBBrdmupXI6/DFlZtzCgSqn7spmYi+bpLtsHx5appYvJtwoaJtHz0xfG7KsdMXZoinTtGbOvAjWUQK2bflsMZJVWtDE92xzK8rtpjJp9zefa+f2tQGsg6FHG+nRD6hbnBwGUVvZ0QhoAEa5dv3kPADgMw7A/nB4RAGuJZcj49YleAN7IGG/Thv0qQLBG4COf+au5EWsxbTvkptqO35bBumhJe1ddVZl8K8fRgBDAaZrqRbjsqw4NkZ1Ts3kMraoT+G7dtmj6LevAut9fDReMXeCV2KEERLO0CL0TOJfpXnx/3Xe/S6JnECDCsIAxaAelFfqhj6eL0AR89ML+8NmZGga+gK3CLYxzp0XKSljAvCTpqnssoZSJvgkE7z7Ni01c9vgtcRGSdhnzafu1aQCCGbN5bLlnh9cNpzMJpSuYv5RuN6FTu3KJuBQrxQX7INfFRVtzGEA0d8meV6E1EAQm3YsNS61WgN8LAbL3kgmgnseYJQMT8DEcTffni8SU9bEIrRT8jPlbgavucQ6lgcBvHulrC1eJhyvTKFw2U3wZB029fhU8QTidnedOcoKVQxuczhfljJ9ts2uNh2z5/bW9fZVcXVq7obQZrKo5AzJSSCS5szyFUeRoiK41WrMXrbM0eZ2nttK34TSG4/3rQgjBk8l0n3fkuen3e+uT14CS7nQC0pq+Ggj9NNJ3A5dNlHYhTV6Y30zHe/UaVKOJv1+ZVrIQGmBmzJ3mz6ElMsp/ehY39vdbooHpt7FrQ83Gl00vryx2wDCuBX281i93HcxAEKBeupcKaAB+rweCRQWrNqG2/eHkIAzDkKd7+weU3uk+5ZVxoOH1+msOoRqA1K/5ZtxALzBv3lZQT+N3e4nS5FVF66/RxveoQ1uljdn3LEoQx5n2zwlXDs1xehZDiPyVtlxRK7zhTrXxbfz+bKLF+J38u15SRC7oY4llUQu/Zq6/Cmil4AUBiC1W+QBx4As8PZWDoBcOWPj9aVrSx+6poQnCD7Y/buLb9gpDp//p++ZtWFG+viKMXFsi26pDi12V+ft1HahoczKbckAvnPbPoQNezCKjZShYaIT222hXfn9tH7zsoI+6uGjrS93vzmwaR5HT5CyhMuave1dmH2qw74Msq1YFM+aLBIPheMrzWEwEM2wmlNEASGt4vn9OTNLvYCug+GVHGnWNoEaaF1t41fdpY8J2gYzkrg5AhkmfdHpqmD8nhDu0weksBhdo/lZRRKp25ffX9vGXhdZZo0s7QKHFIVXgxPNUY+T8/gCYvRH4xbWxa69XBrTSYOGb7HvWc/0xxuPJHveH46mdGN9zaKVAgsG+j1WFok3z5qsAZg2PrUZzt8ZVlTIvApc2TxudM0MqhRdzk+6F3P5yaIDsoDI+fx2wI7+/q0QnANSeUK3vdFUtNTX6IgbiCIDFomAvPTSQY+zMR+lrY0AreL4AM1sU6M/tZqPxdI/D/nBqre/VYZghhL+mUNRw0YgZlAIEA55nOO+XigA2xUv/BfJh6zfr0g+RCaJ6cZo0H9jhtUfmbhLFcisnax6o4O8Lww609TsXYF/BPUkMJIlCkrhKH6vwSzR/TaABEHsg4VllmrRWUjBhOBrvcS8cTe37iKe1fH0BrfX52tcEpZ1qAjA/rscMwTpfG/oaSZhWiO9lf8cdBXtUgQmQSuF0Zur7ut3l0AxmNSZS7Y5HIXuBaK+CpeGisYv3QgCUJMgYzuybIkv0bCXXnzI8lOf5WRF3K3OE1pqZME+CAx6MxlPbpXZNtIvYmrjWdr/HywytAd/rHhX0SsLCO7kypmpLjGRZN5qMFO7g0BQZ/UlkmuK/gyLAFil7nUniy8TckgbihTa832tOfpjNmS6Enby9JiaAwb5nXWHGRAjC0Z4XS2/S6wnryj8SDPZ8aL1a3eM1XyEpshx/npfWAgQg6j78ClFGlYpHWz5AZJxSz6/PWzDrpRBR1u+mVjDXXJX+weDOtW12ZQLWynyfsv3JAOax21sO7SETDarl7LX7ubQGAUoCGSeytmc2ClLojT80eF0pQZsdGCil1j7fHIN2rdkomNeF95UyO7GL+F1Ca+PGldX37boUiAHhF9V+7dIxEPYHE+/Tp3J8464PpTVb00IpBfZ8EBH0ysSNzx85bVe6KHp+um8uoerJhWrGtCn3l60EZjZl7XwfggVYGIaPyEiTmgAtAaU0AA0tlbFvaqTaCQLxyngaIEFg0kZaYuNPibQvs/DSpimtUkpDaWXG0BpKpaFJK/r6TSaSNr7k2r0ih/cck9cm85nH/GaSXz/0MBiI5fvJo9ZEhChKtj53cKiLRElwYVoJDaUUZKIglYbeiCpaY6qKzqki5iu9UFjfB3ql0WaXWm8Kh2avEAHCIzCZs4eZQJyeNyktIJzvVZ3uM0iTf1Ypk41Ca6wxRmYvmn6IDY0iSgMYdRbIaN5RHEtIqTYENs7I10uNNV4xZW7iCC7idwVG82fJ7EsACw8aRrtqMx1LLxyOvSDohValiXRTCk+c75AMTjlhoNJagMKOc+hVRMY4MTOEL9DzQwgvTfQda0SLBZ59forTF2eYn81xlv6bn84QxwkSKSHjxDgVS5PAmAjgVEVHlOop+FyYYGb4vmf+eQJ+z0cQePADH0HgI/AFgl72t4+g58P3BXo9H77vGR8L9sDCHCQgwOMVZiz9btlvRqt/ry11jaWmnszJlkW9a63BoCWxZFCqdSR4TGAGKN06UgKzswj/yz/9Szx5fIog8FOGeBOEKE3y7GiwQxsk6brKW11MhNEwxMEhwwuGhsSvcGtrTN0GjV820+vkn7Byrdbks/M+VzVsdL7flFr9v4ZMGS8pJaJFgiiKEUcxolhiEcWIFjHm8whxlCCRCnGcGBoTS8RJAhkbGiMTiUTKtXRklP6XmOD5Ap4QEJ4Hz2OEYYjROER/OMBgGCIMexgO+wj7PfgeQcGkYYqjBEmULC0du6qoVQib5/tGv0msbZaffamRlXhj5gI63QxG2GD7UbKZ5o/Y79nt2WxII4nR2qF5FVKaXAVkBNH3zZ68NB9Iy0ESOpV2WTD6gz56PkFK4PR0hk8++hQf//xTPP7iGV48O8Xpi1NEKVHUMIo9StVbxEZSBmX/z5moPmeoVq91qsHLzDMaqSSf/T8tZMPM8ASDmZaaSC/w0Qt8eL5nGDGP4XkeBDM8X8D3BIQn4PuG+PueB89n+MKD8BmeJ8BEEMt+hdFEMMET4lwbAUBpDa01lNTQWiGKEswXMeZnEWaLCE+fnuKzz5/hk0+eYHa2QL8fFr56ZmC+cJo/h2ZYpc0yUanmb51IK6UQ9Hz8s3/+b/BXf/2LVMPMxabPnDFqTaSkrVIScayQJAmkVEgSmf5fQSqJJJaIogRxHBtGMNW8qfTvpYY9Vd3T8tr8kTFj5vvnG781jJpPmQlBIdMSmn9MZv/7gYfxZIjpdIyDoyn2D/dwfG0fo/EQQgBxohEtYsRJAiMDvmTi2soSIQJUAki1K+7y5QMR4HlAFBm6vKn/WmuLirdGgBCedd6PieD5w4knvIz5ywxi3aG1Bnnb0QxueayAgMBrrvm7ak6/QKrlY0IYhgh6jCRS+PgXn+Fv/r8P8fHPP8PTJ88wm80BrSGEYaA8TyAMe+BBv8YIRS+p/TdWUIDK1PMKSgPz2QKz0zk09FJyy0zPq8zm8jdbKYuTaQsIKQNLmalo++/sea01lAYIGolUhnHVmc8jwfOMVnI8HpQmR9cwmdsdHBphhftLSiTzXuDhL//VR4h35VrAa/8rAC2Zt8w8nTFrTJl5l+AJAvteer+6V5swDKfCky+e47NPHuNf/UsjgIZhgMOjfdy8c4yTWzdw7cYBptMBFguFxXwBpfXFawMtIEv3oqSCEORy+CKj3eZvG+Zf9uyG+zfJAAAgAElEQVSmepFKYTQM8PMPo7HHwjB/RDZTPWsI5m2FjbavwXxZIcj4peXR3Et3iaw5AaVMbcdwEML3GZ998gQ/+9c/w8/++iM8/uIJlNTwA2OGnYyHa8JAZgJRnXZH98W0ekD4PsPuYaG2Nn9RBe1N4p9JhUqp8qo42gRSHR/20xGd6dehOWSS1mkt8CkdDkLQEOcMY82td3HkfnuvZYLdRYKZEfY9AOcGtSRJ8OknX+CjDz8B4S8wmY7w8K27ePTufRwe7UFL4Gy2gJRqydhm77jsVV/0vby2WboX4dV86BWH0fyRlUpmGgAJtssQELMRlnpDj4Vn1ezLQOqAnzJ/K2EvtssHv6wwr0TDe4k3jNYaYRgg6Al88tHn+L//xV/iZ3/1N5CJhN/zMRj0lwyNUgqqKkT3CuAiDouiYKe2TLBSRtC6d7IHALCQZcDhNUSiZPHiRFch7fXC5rtiZvQHIfowdHMRRfjzf/b/4P/683+Jm7ev4Z0vP8KDR7ehNDA7nUGBYLmk685AMH5/4YBee5d+pc7NvlaOOm3MvruA5/cGS82fTWhoMHtbHOsVP/svFB4zPOZSc0sjXBCxyPxbRpMQn3/6DP/if/8/8W//+m+hNNDv9yCESVqTmUAcdgdmxrPTOe7fnOCdBwcATNSzg0NTGM3fKxCSuoLzCHmujrDPeV6v/l9n18aU25Rsr9LCIPAQBAGkVPjobz7Gv/3rj3By6zq+/q0v4+6DGzg7Mz6BtVLvXCbSWIQkS/TszA4ALPrwa4CFgN1Nadz7mIXviV0wf0qDPV5buld8GV8oFIx0QC9ZmJTWGr2eh17o4y/+j3+Nf/6//TniSKE/7EEIXqY7aIPM/Jq69SANtq0/t9X/rxDql0Dh2BpEwBdP5vgv/oNvAkjN8C+LysDhSkEpk+T5Km+V1MUPBMZKwPwSGoYpM4InoNNUTolKIBOVulEY+5NWgF6hD9tWKUqzFaQZC5jgeWmgGBNYGOF9NYWLSjuuYgwzCwMRMBgZf95PP/0C/9P/8D/jnffewC9//6sYDPo4O52t5Ti9qlBSX+2Fc8Gw6b5pUr3YQ+bex8IPPGLhZx9bHAOaNmzVqTPB675GGIbw+N7Lke/wPL2JRjgIES8i/NP/8X/Fz/7Nz9Af9jGc9qDleYBEFUwEFC+ZO6mN03AcSyRJjETpNIpPLyN1s2jdbEa0Kr1nEXxp34IZwiMToctpdG2a+49TYr362nX2TwMvC7NoGG2Fv/qbJ/j7P34bv/ntBwDgGD+HVtBKI0kkgp64FAKdBvYDMK5Cq4Kfiao1jupRYnINRmlN2WTJ5Ok0eh7wBMP3CL7H8DxGz/cwHQcYDnx4Io3ITRk5zxPwvYyxEwh8E/WfJBJRrBAnEnGiEEUSz88ivDiL8eI0wjyWWMwizBcJpFIQbOhNP/TQ8wWCQEAQpXPf9kVcRSYs9wc9QPXw//7FX+HDDz/GD3/yHZzcOsLp8xlqi8GXEXTLRvOn078dANHV+rI8dNOI9B38psz/P3vvGSbLdd9nvudUdZp4My5wcZEBgkgECCKQRAYBkhZFSSvL0gevJVmWLafddZCDJEqivd61FbyUKD7SY61omRYlKq0oiQRJEEEgmAAiEIHI4eY8M52rusI5+6GqerpnOnf13Lm3z/s8JG53xamqPvU7/2hnbTGhkuSywwPb9g6fYqLsTJrdPU73b6bfo5oIv2q5xsN//SjlYoX5xfmozEHY/4ZasegKlMJtKBy3QSMuhiotQSGXYW4mw9bFAguzWeZnsyzM5chlLfJZm1xWks3YKK3xg5AgiLJj/UATBiF+GGWcuV5Ipe5Tc3zqjkfN8Wn4iiBoxOtH20gBQkZZglKsvihsOxKMUamW6EXUem8UtGT96th6sDFIKbFElJW5VKxTdwN++oev4x/+yPVA90QSg6EfvorE0yS0QyLsWq11WjTLXxKGilApAl/jBz6+r/DDEKWickhKabIZQTaTIZexmJvJsHexwJaFPDsWC2zbWmBxLsfiXI4tC1nmCllmC5HYmy9kkRMIg9BoiuUGx5drHD9V4/DxKoeOV3jzYJGjJyocO+UQhFDIWszOZinkLED0FIJJM4T5xVnceoMv/tlD3PGBW3nHNRdRKbup/w2pEFfRibrDGIBm+9rUDAhp5uG2IC07O6HusvqMMFefFuJ7udGhWaMeLkrsyONUHL7yFw/TcFzmFmb7WvqkjAoy+4GiWHGp1j2ytsXWLXmuu2IX77h4G1devJ1zdsywe/ssC3OpRx8AkUui6nrUHZ9qPaBS91gq1lkuOpwsuqyUHEqVBsWqS7HSwHF9PCcqFOvFcVCR1VBgSUHGtiKRaEmsxJrYwaII3VzR0DmpJC5eDW2WTaXBDxTVukvN8QG48erd/P0fuo5rL9/Z3Nr83AzjUG8E5HIZchlJGLdI6zS5aYZltMTStVniY1RsrQtCReCp2JKmou4XWhOGGiEFuYwkl7WYKWQ5Z/sc27bk2bGlwDnbZ9ixdZad2/Jsmy+wdSHPlsV8KiIj8SQoQMRFVzv+IjVoGf0yW99nAsHWhTxbF/JcedH2tm3CUPP24RKv7DvFk88f4YXXT3H4eBUpBVvm88zkLbQWhF1UoFaaXD5LGIQ8+pVv4Hk+17z7cipl57TEAPabECTF6I1NZxVr4F6t/ZmQ9ovEX7olXlowb6POxL956/R4WIbGtm1CFfDQFx7FdRxmZmd6xvVFbl1B3Q0olmtkMzaXX7iV227Yw23vPp8Lz1vse0ytI6uaGuIRag7Uon2IlJZgYTbHwuxg4jIMNcVKg2IlEoNLK3VOrtQ5ueywUnEpllyWKw6Vmo/TCKKirX6walFMCjmL6CVhxa7ntf9b8wfHsUqaQMXFa0NNEGik1MzNZDlv5zzve/ce7r7pAi45P8rsbSnTZjAMTVRzUpO1JT/24av4vT97jtnZDIWcTTZjY1mRxU4mJani0AilINSaIPAjgRdoQqVW25xpjZSQz2bIZi3mChn27i7Ewm6G3TtmOWfbDDu3zbJ1Ic+2LQXy2eHemFFnD9p+AEmliUSwtWZ3tEUgxQrWgmZT9UFfgq1dfJLszuR7yxJYluCyC7Zw2QVb+MgdlwHw/Gsneew7+3n4yQMcPFphdi7Llniy22kSrbXGsi1mZmf4xqNPks1nuPzKi6iWHTYsDXhQM7CI+imr8HT4nDcnqfpSU9dR8bRN2ll7IiY6zeQbXJ/BRG7fzZ9Zp9HkCxm+9pVvsrxcYmFhrqfws61I9C2XXHZtLfC/fv81/NA9l7Nj20z7fuOXRFLwWMbtzVor7wtrPHd4e4hB91m+1Kz2/yQawLdvybN9S/eOGgmuF1KuNihXPUpVl1KlwVIpsiaWax4NL8BxAxpeiOsF0f8aIQ0vaL44kpdGIWuTy1kUcjZbFwrs3D7DeTvmuOzCrVyyZ5GZQqbt2GGox48tMUw9yfD/M3/net5/wx6++o23ee1AkZPLNRzXR8UFzwUSISOPTsaymMnbzG3LMjeTYX42z/yMzZb5PNu2zHDujhm2LxbYtqXA9sU8ljX4L3ntxE/SPkY0k8GEwE7RwjIoq29L0dHCk4xtsDoRvu6KnVx3xU7+yY+9mwe/8TZ//Tdv8MKbp5ifybI4m+1Y8UHr6PddmCnwtQe/zcLCPDt3b6daczqGVJ0uJKDjjiqWNIWeIWXLn5iMqDaWv9OFTvcBmQRaa+YWCrz24lu8/srbzPcQflEcj+DoyRpzs1n+xY/fxA/dfTmiZZYahsmAGAmtSQuX1WSQ6B+DzPKTWb1CrxeKOjLBWy3PdT5rkd82w6414nZSBCrqo5lYGAyGNLn28p1toQSNRkAjiFqrCRElSVhSMrtmIjIoYSzsZBLrvMZK1+yEM+bE73SydmxrnehaluTDd1zKh++4lMefPsjv/Ml3OXCkzM7tM9iWXFcYWGuwbYswkDz24Df5gR/7EFnbJgjCjf6zuiMhDETU0/lMvWkpI8Twnbs6oYk8WZO5sEJMKOaPZl9fQzuJp8LexD8UraO4k+VTZZ58/GkKM/muFcuFEPiB4uRKjQ/ffjH/x9+9qWmlUkqjRSSYzgSx0rT+IXoKRd3yf73ihqROYjaGy+wOQ72aDBTvQwiBbbJ5DRMkmaAlv9VcziaX619ktlOYxqqwi74U8TgwrJv1TKdVDCZC0LIEt9+4l9tv3MsffOF7/PfPv0A+azE/m23egwStNbmZHMXlMk998zlu+8B7KBeDTRVTLwToEDiDmxakRdqJdxNLpRFCTM7yZ+iJJTe68dDgSCGxbIsnHnuKMAjJ5rIdxZ8Q0PACihWXf/dTt/B9d0YxLqFKEiU2zwCVJq0lZoaNG+qa8d4Sl5S8LMwP07CRrLVYtZQ1XvMsrgq66L9ntrVuo2gVgklNzr/7kau58Z27+bef+BtOFR12LBYI17iBdaiZnZ/hlRff4LJ3XszWHVtx6+6m6QccJfdAJin0POWkqssneIul1moiNmStTfp3N5qDwCb8oSilyc/kOPDGIY4dPEphttBR+Ekp8HyF6wZ84t/dx/fdeVlcL09jyTOjhuHpIMmOXPe/031iBkMLTResEFjxf1f/Z6J6xkVKEVsC4Z2XbucP/vNHuPDcRU6u1KN48DVYlkQDz3/nJTIZubksf4lr+3SfyCYirXIvIq0OYGv3C0JqFQYT2XsnS1Hz/6YbIWhWht8cc7dVkk4dzz/1Aplcpuv9CkPNqZU6v/RPb+OGK3ehlGoGYhsMBoOhN0JEIiEMNQuzOX734x/i/HPmWSm768JklNIUCjkO7DvMyaMr5PI59CbJrtCADuJXxeY4pdNOWnX+lNZM6qJKNQnxJ1j3YOq4LoWRBu3ibzOhlKJQyPHWS29y6sQSuVyuWXy0FVsKTizV+em/fT3vu35P1M5vk7ggDAaD4UzCskTkBhaCT/y7DyAtidNY/1q2LAulFG+88hbZrGRTvE0loKNaf5vOknGaSF6F4wpA0dzJBO6zEEJqpeKnLO2mVl0sf1OOAqTQiE2Y7SulRGl49aU3yWayHa14UgpKNY+L9y7w4z9wTfSlsfYZDAbDyEgpCJVm60Ken/2Jmzm14qyLmdYocvks+98+jOMEWJOsdTOAGmhdRSnTu3USdEu0HB8hpNaTcPuKzidtNELUEkeAJTY246PfI6SUIpvPsnRimZWlFbL5bNfSLuVqg5/+4Rvi7bTRfgaDwTAmSazfPbdcyI1XnUOx3GiL/9MKMpkM1XKFoweP9Ryj06Kv9Ihjl7Rx9wITMKFN6LpqrcLJuH2jva/76nS0p9mMCCGRQm+a8IjEsJyxJfve2I8KVUc3rpSSSq3BlZds57Z374m/M/fUYDAY0iApEP33f/Bd1F1/3WtUCIFAcPjgUYaonT1xmhp0E53TWcGE1J9WYTCxhA/drTGk0Qpx3bbTfRbtWLZNwws4vP8w2Wy28zoCyjWPO2+6AKBjZXqDwWAwjEYymb7+nbu4eO8Wqo63biJuZzOcOHoK318zST+Nw3Gn1/00ksp7Xbf+U6esmaLphFKBL5UK/TR3DdHsRIVq3cOwSUJUTyttGb6b5deiFJZlUSvXqFVq2Fm7ozshCDVZ2+Ku9+wFokKuBoPBYEiPxPp3543nU643aE38VUqRzWYoFytUy1UymczEXb89id8BEwtNOwNJWneOnQMpQAXBRDSTVqEvw8BzALROz76YiL+14mazWbvOKsb48SnAzliUVsoEQTeXL7iNgN07Ztm7ewGgrX2bwWAwGMYnEVI3X3MeWgnWOliklIRBQKlUmWzSx4BI6FgVYlpJ6jeOjQClQiZhMlMqDGToN+rxkVI5goKo1EsYRA9xi5AQEkzTt80pgqUFyyeX6ZaFIpC4QcCOrVEf27Tb2BgMBoNh9ZV5yd5F5may+MH6yKxQa4pLJeTp135A1OXDvA9SRkA4oT7OWoW+DGLLX7oIQqXaTcEqSnSYer/vAGy0PBZEMRvVSg2ry2giBASe4qI9kdXPzPQMBoNhEkQvydlClq0LWfxQr3MhWkJQrdS6vk57jc6jLuuKiPMSNksG42lEiPRc4ALQYTgRQaDCwJdoz1Far6/KPAZCiPikV886sQga7TfeDCn1H26CgNAPut4gISBQii0LOaC9ibvBYDAY0qH1/TA/k8f3FWJNGq2UkkbD2+AzMwyC1umVP1NhMBGTqlKhL/dsz9erNQ8rxQ4NQgi0Ctf19036mm6SrjSnhU1lL4tPRsT/DoKgZ3s2rWEynaANBoPBkJDYTXJZ2bFmrpAC12lsfKLFpnqBbU5a70mv+zNIDUUdqFQtZkluRxg06jIInKpK8wmKlV2owg6BYToK/JtyNl+P4+ieRPEF3U9MGMutwWAwbBhSiKjcRwdE/N6W/YrrGcG2oYQpGUi0hlD1NsgMT7QzFXqO9Fy3lvrDIQU6iCx/reJPCKP9mhWVTzPt4ZjR7CKXz9Et6VvruMhzPXI1mDIvBoPBMBmS16bTCJBCdnxFi/hlqjYo2K5fyNEUO/TaSMezKdE6SpxNvTmGBs9169JxKsX0xYhAKYUK/bYTF9BWs2haGUv/TlB0zczmUT3EX9aWHDxeBUyZF4PBYJgErUO864VYlmDtwK+1RtpjJlCm+S4x2b5NUrH8yeidG/g+SJGasJYCVXd9dm3N1KVTLS+nLSiiuj8hoR+CFDTnBIKUTZiGtBBAbqaADjs/DBrIZiWnlqPKQOY2GgwGwwSIh+Ag1JQrDTKWXBc8prSmMJPfDE4kQwtRTsP4CR9RBQ6FCiLLb1oIoBGE5OywKl2nspxqzB+AlNGJh34k9hTNB1rK6TUPJ8/DQBVvUp6V9SNUsLBlofsulCKXsTi1UsdpRHWnOgUiGwwGg2F0kt5YpapLpd7AtuW6Qs9KafKFfPNFsqGlXbrta1pf7GvoUJZxeKREoyLLX8pZskKDU69XZSETFFVUoTHdDnIqOnHREq8gAGuTFKU8bWhAr7/Uk/jxDvPDDvyAHbu2k81mO7YL0kAmY1OsNnjpjVPAdGdtGwwGwyQQ8bj66tvLNHyFZa23/AgNC4vzm0pwpVgw5IwmrfeiDkJ0qNJ3swnwPacmnXqlFCqNEOnVChdSokOFCvx2TSmi7KVpzz7abEkvUkoCP2Bmfpa5xTl8z+/c4o3o/j3z0jHAuH4NBoNhUjz78jGkXFvhL+rvKyzBlm0LBEGsNDbYU7QWsT4scSrResCYvz7XSghJGAZoFY6XI9AFx6msyGqlUmo5o1RunwC0EIS+v86/KSRT+5Akf7ZW3ZL3N+b4HZcphW0LdpyzHd/zO64TapifzfJULP6kSfowGAyGVJFxVuSLbywxk7NZG4atAkU+n2N+YY4wCDtO1NNgKK+SeRU0LZ/dYv4Gvp5KIWSkn5RWqZtUtYJqubgka7VKOdU9rx6C0PPangmlIrfvVFuMZBRf1+Q0z9haUQFceOmFCCE6Zv0qpZibyfDa28scPFYBIOySIGIwGAyG4UjiqF3PZ/+RErMFu635lpQSL/DZtmMrhdk8QYcAs42K8WvdqYQxy1icPQTBeGF6migKT/lBmo3XmoRKkbO8ZVmtlItak15DuhghBH6jse6BkFOt/GKrKEzM+jn0bpMNpMRreOw6bycLWxYJGkHHGaUtJYFSPPiNt6Ivpvt2GgwGQ2okhoGX31qhUvXI2Pa6MT3wA87ZsyvuI5vei2TUPWloebFNN2EYib9xjXVCSALfQwchIs3ua1JaSmkCr16STr1W3rFoO44XpG6R81133T4tCUJM91OidJz30WOdDZ+9AWEYkMlK9l6yh0aj0bGyfKhhy0KeR548AIAlhfnNGwwGQwok7/mHvvUWtr2+pZJSCtu22LN3N74/gFVoozxLJpQfKUFrQRiOb60TAoKGi069q1akvqqVSkm6ruN4TulEvCS1+yeEJGis7z0oLTnVbl/BqpH1dF+GtTdbIGk4AZe/8zKy+Wzc7q0dpRSzhQz7Dpf4+jMHo/0Y16/BYDCMhdarnrGvP3OYxfl8W8clGXtntm7fwvZd2/Ea3ujxfkMO2V1Xjw+feheKM5QwHNOJ2lIapZPxbDxWz6xaLRWlUkpVyiuR+EvJwayIMn59r4EOaU5nVJy1LOV0lwlRKqUHJG0k+L7P4tZZLr7iEty627mThxbMzWT5oy+9HG1m2rYYDAbDWCQu3D//6mssFV0KOavtPanR+J7PhZfuxbZpluQ63R4krUFap9+YcboRAsJQodLI0ZDgN9yOZeHGJQxVZPkDmMm4JxqBQqf1POgoEzT0vCgtvWWREDrVitVnIlor9CA/lRTuhl73jz7ra43nBVx57eXYGRvVwYQdKsWW+RwvvHaCV/YtAaCM9c9gMBhGQuvV6gmfe+BltizkWNt8IQxCcvkcl1xxEW4jYDNkWEiIWrslpzLFRp1I/EWuX+ht4On3thQ6Fn8pmv6EAM8P2bqQV65bq0iAxVzjsOP66YmyOD058BqRMbFFBgthCj1D/GCsua+nfQZH5FpoNHy2bl/g8qsvo16td6z/LYQgl7X53T99DjDWP4PBYBiVpKvH73/+eY6dqjI/k2mz+kkpcZ0Gey8+n8Wts/gNf/W1ehorRiTNuyyLqTb9JV7NICAFy59EKQjdzvV2x0CHSiFV7YTrOHUJsHTq2EG0TvnmCVQYEATeOvEgU2xUfCaidWT9Ox2xj4P8toUQuK7Pde+5mrmF2Y51/0Kl2LZQ4Innj/LsK8eBqL6RwWAwGAZHaY0lBKeW6/zBF77Hru0zBGs8KWEYIizB1e96B76vumb5pmkIGGZZx/CgKUMI8H09fuEUGdUC9n0XpExPK+noDV2rFE/4vu9LgJWl44fSb+8rUWFI6DaiVGWlIvMwYE2zlUiCRjRndanLpZR2GPgBhUKO6266BtdxO3f/EzA3k+F3PvddwBR9NhgMhmFoTfL4xU99HSkkmTXt3IQQODWXSy+/iF3nbsV1GiNZhCbpPZrmJM5WPG/8fQgp0SrSTjLlBAmtNb5bPA6xyz50V/YrpZFp2v5i8ec3oj+g+XAlbt8pNf1JYstf65Ue4ZeX6g+5wwZCCGq1BpdfdRnnXXAeTs1ZJwCV0izO53jxzZM89K19ze8MBoPBMADxkPrpv3iB5147ybbFPOEaS4xSCjtjcd2NV+E1FGJQS81GDMWqxe07pe/0BCHA8zp392ijb2s3ge97BIGXcsyf1NWax7lb9VGIxV9x+fihUGmEtOy0DhSJHI1Xb48ZUwrsae/yoRmoIfdG/HZ7HSMMFUEY8t67b8KyrdU+kmv2sH2xwCf/6GnCUCOlSLteuMFgMJx1qNgT9thTB/j0XzzPeTtmCddMnoUQ1GsOl115Mdt2LtBoNNoCykYyAoxS5qXHNiJO+NCwGXJQThtad7f8DdfaTRI4DipMuXWfiEIMqsWThyC+VUePHj4YhmFyl1Os9Sfw3Nq6B8K2xVSLv6ShyliXYJS7NOQ2Ugo8x2Nx2zzvfv/1OLVaB+sfzBZsVkouv/nZp0Y4KYPBYJguQqWRAl4/sMIvf+qb7NySR3RIhAyCgFwuy7U3Xo3rBKmV/kh1fi7Asqe72H9U4DmK+RvHUxslXVr4jQbKD1Lt7pEc4NSpY6viz2s03O2LM3hB2kkIIrb8rX4TZcLIqe7yoXU86xvkWqdg4R/mSq8r/CwFtYrLlddezsXvuIhapbYuuDcINedsn+Xzj7zGGweKcV/D6b2/BoPB0A2lNJYUlGse/+q/PMJMwSKXsdd5g6JYP4cbbrmOhS0zUeLdWi1wmodZTVy712bq3b5Kge+n0doNvHptAt09okmHV1s+CC2PkgjLh3yl0J16eo2IlBLfdVBrGkUIobGknNpCz1pDEHQ2/W1USZehVtbQaPi87+5bWdgyj+s0OmZwz+SyfPy3v978bNy/BoPBsIpSUWiMUpp//n99FccLmJ/NrovzS9y9ey44l6tvuIJ6df2Yu5ax3x16iHVbthFCj1/U+AwnsvaN2dotufASPGd9jP24WFLaSmvc+lJk+ZOxU7m4dPyQgJY81PFodvlwXLTSbXJYSkgvuvDMIrkKgYr+PRH9m7ZLWEDgBdgZizvuvw20JgjCNbGcmi2LWd4+VOK3//jZEU7AYDAYzl6U1s2KCD/z8a9w8FiZ7Yt5wg4F8lWosC3J++66iSAIOxbb78kQ74BxPEMAworauU7zXD8q86IIw/6Wv74FnoFGvUq6dj+t0UKEgeLokcOR5S8RfzsXvAOO44OQ6dxDpRCWhd9wUcF637U1xbX+NOAHHb4cYT+jLBtlP0m5gZ3nbuW9d92CU3PWVaAPAs3unbP80QMv89Kbp4z712AwGIgtfvFk+R99/Cu8cWCZXdtm1iV4QBRqU63UuOHW69i6c4GG43WsozfSyJqyYUApsKRESj1QEuPZSFLU2fchCPp39+hJ7BENHBdppVjjj6g2bz6foVRcWYIWt29t5fDLrq9S1ZpSSkLfw3OdOGsl+lOEjpI+pnKqIOM2MMmPXm2MqzcNovg/hyuuuYgb33c9tXJ13TqWhPnZDB/75ON4gTLuX4PBMNUkrl6Af/wfH+TVfUvs2jHX0eInhKBWqbP3ovO49oYrqQ3g7u3ERhgGkhWEnPLqHUR/v+tGV2scF7hAooIQz3GQ0kqzxp92A8VCIVxKvmieZvHUgRd12kF4QhL6AZ5bR1hWNDPQoCVkptTtm0j5IIh/MOPESoxi2h9gm94Dh6Badrn+lqu58rorqFRqbenoSsHCbJalksPP/8ZjQPR3GgFoMBimjTB29XpBwD/6+Jd55a0ldu+Y6xgbFlXH8JiZK3Dn/e/DD0PClnfyuiF0E4ypWkfJHp0ylacJIaDRGEAE96vxZwl8v4HfcMbPHGndL0oJYOXU0YMAQgghddwnplo88rpSGsuS6dX6E6DReLVa0+QNUY07y0BCWt4AACAASURBVBJMa0MICfgq/uEMsoHu+M9eqw2zy+FX1uDUGrzvrpu54OLzqZarbbPTINScu32Obzx7iN///PPAVLd9NBgMU4jSYAnBUtHlJ37uAV4/sMI5O2a6JgWoUOEHAXfe/z5m5vI0XA854Mh5WpI94vXtjGCKi3c0aTQ6X4ThavxZBPU6YRCkXONPasfx2TXv7QewLMtqir8D+/e96Qch6HTtNAKBU6nAmpmBbU9nuRcFUQJF2D2tOpWrkmJsx7qvRVQAuuH73PWh29i2c1vUAaSlbV+gFHt2zfP//tnzPP3SMRBRv0KDwWA424natsFbh0r85Me+yFLR4ZytMx1dvRC7e6s1br7tBs6/YBe1yhjZnhuY7IECOxMvm9KYv6Sun+umUOPPkrgTKPAsgEag8OonXk++a4o/p16rblvM+V7UxSE98SclXq3atscoQHJ6y70IAWE4eVfoxCyBRINV4AVIAfd+/50UZvO4tfb4FCkF27YU+MVPPk65FgUtd2tIbjAYDGcDSe27p186xj/6+JcJQ8WWhTxBl8mvlIJKucpl77iUd914JdWK2zHBY+0xhl6W8tCb7M6yJ1CQ7gxDKYHnpVPjr1GpTCSGUoWaE0f2v5p8boo/ALd6/M0gVIiUgv8UICyLRq2GCtrLvQgRJ31MIQJQWqHWVmsf1PI24LJJ0ZoB7LoehdkCH/jo3dgZG9ddFYBKaWYKNo1A8W9+/dHmNkb/GQyGs43muAh89Zv7+Je/8jCFvM38bLZr1YMoia7O7nN3cvv9t+A4fscJclrxfkMbBPq8fKL3ONHLfkpr/UkJQaC6tD9tp58wFxIatQppq2kppaW0xq8dewVAa60lQCaTyQDYYfFNL1DotDq1KIW0rKjQ85pyL4Ko1t8UGv6AyPKnlGrq4ZEv+EYlfXTZRgiBU3XYtn2RD/7gPViWxPO8pgAMQ82OLQVefP0kn/ifT8XbbIpYZYPBYEiF1nadf/TAy/zybz/O9sUC+azd09XrOi7zi3Pc/9E70UoTBMGq92TAQfJ0GgCSmL9pjehJyrw0GhCGotnmbSSkRIVEORKWlaI20logZBCEHDyw743om1j8JVj+iRfrro8U6Ul4KSWB7+E59fbUZQ2ZjJhK9SclKC0Iw/7rNtmopI8RHtykBMz2nVu4/6N3g2aNAFTs2TXHnz74Cn/x0GvDH8BgMBg2KUrrppvuU3/4NJ/87FOcu2OeTEZ2DXMRQuB5Hrad4YM/cBeZXLZtzEzLGDDQu2LEZA+Iu3vYI258liAlOI5uCsFREVISBiFurZZ2mRcCpcjnbJZOnTgGHcTf8tE3nhm6kngfhJCowKdRqyJtq2lKVkDGElNbH0gpCFV3S/npSPoYWVTqVQG489zt3P/Ru9BKtw9mGs7dMcuv//6TfPOZw7Hre7jzMxgMhs1Ea/HmX/7U1/nDB17i/N3zcYH7ztsIIQj8gDBQ3P+R21ncMo9TdwdO8Dgd8X6dNldxskfaxYjPNISAel131DK664e1qLgjWp3Ac9PN9AXtBYqCrB5s/VJCpAIBlk/sezFUGkumV+4luSD1cmn14sT/te0o8WMa0UQt3pDjGz9PR0xgp/0KKaiVHXbt2ckHvv8uwlAReJEbI8lk2rGtwC988nFe27+MFKzraWkwGAxnAkkNvyDU/NP/9CCPPLmfvecu9nT7Rcl+IY2Gxz0fvo3d5++kVu2d2btZ4/3Q0ZhuST2VHjyg6eZ1XXoK/k60Xl6tQMb5EaHvp9r/VqCUUppq6fhbALZt203LXxhGDsi3337zVRV1nEi5LK+kUS6vij8dt4WxBJY9fRm/kqjLiefr9Za/EZI+hmEScX+tixIL4J4LdnHf992B7/sEfiwAlSafsZkp2PzL//IwS0UXSwjTAs5gMJxRaK2bNfx+/Oe+wMtvLHHers7Fm1sJQ4VTb3DXh97HpVfsoVpeL/z6Cq+1624wyTGVhkyGdWXcpg2tI7fvuMY6KQRupYxGp1sDWUhdrXtsz5dfgqjAM6zxOqowDLfk/ZMNL4SUnisFSNvCqZajGLe1Gb/WdPp9tYCGH1/i1TDIEXfW8+Mwm/bcwaD7FUJQKTvsvfhcPvCROwi8VQEYas3sbAY/VPzz//QgfhgipRGABoPhzEDpaIw7cKTMT/78Fzm5Uuec7d1r+DW3Uxqn5nLnfbfyjqsvpFwavpZfv/Cbgddds9JQo2/LynY2LvA8ZQacBCnB8wRBoEYPYUsyfS1wyiXE2iogYyKIEi+PHHrzhdbvm25fGTuZ6+Wjr/oqMhWmcmSlkJZNo1Yn9P02X7bQkJ3iTCEvAET3INFelreBL1mKcX/DbJgIwAsuOY+7P3IHXosAVKFm23yeY6dq/Iv/+2GAuAfwlD4IBoPhjEDpqHjzq28v89NxDb9ti91r+AHNAvf1ap3b772Fq951MeUVZ7TkjgG8L4MsGNtAIIkKPOemt8bfaqavIgj6Z/r2vOZxpm+jWkHaaWb6xmVelKa2fOB5WA3za8oOy7IsgIXM0nP1WgNEesF4UkpCv4FXryGs1SwWTWQ2nrZnRxENIL6vU3Oub5a4v1YSAXjRJedx7xoLYKA0u3bM8PzrJ/mlT329ub4RgAaDYTOiVTRuP/vycf7Jf/wKmYxkfj7b0+KXTHZrtTrvv+cmrrnhUkolp3cR542q7NBr3X4bqOi9bWej6zLNNf7SzPRt1KspZ/pGZV78IOTQ/jdeAlAq2vm60z128NWnAtU5c2VUoj8soFGpIC2rrUbQtGb8SgFeyPpCz7DhcX9DDTBDzmyEEFRKDhddGgnAVgtgGGrO2zXHQ9/ez698+tvN9Y3+MxgMmwmtogK8Tzx/lH/xXx5mdibLXCHTV/gFQYhTd7jzvvfyrhuvoFJ2ET3MHamP8SnTtl8JmayIxN+UIgRUq+Nn+kop8eo1fNdF2uklexBn+m6Zz3jlcmkFOlj+ki+KJ95+1g9CLJFixi9x78LSCiIJDk2SPmyJlHoqQwaCQOGHqm3GcDri/gbZ30D77XIOQkYC8IJLz+Pe77t9nQA8f9ccf/nI6/zGH7QUgTYC0GAwbAKawu+Fo/zbX3+ULQs5ZnLdizfDajmXhutx74ffz9XXXUKl7LTstO0/g53HyAu7rDpOvJ8CaWssa0pNfozX03ddpq9t06iWCQO/rRnGuAiU8kNFvXi4meyxTvwlGb9vvfHKC/lMhlDp1F7Bmsj1Wy8W1wWGSqnJZFKod3KGISWEShAEQ244YtzfRF0EA5C4gC++bE8kAFuygJXW7Dlnns99+WV++0+ejdc3AtBgMJxe2oTff42EXzZj9yxRlRRw9v2AD330Dq646kLKZYdhA5zG9br022akc4hRGuyMxLL01FXrSIjaugnqdTV2pq+QUCsWQfeyC4+0Y+26PgvW8osQlXlJFq07ZaWUsnT5UMNXpNWFS8dJH065ROiHiBazpiBO+kjjQGcYSoEf9k4Rn5RoG2ajVAYh1gjAv3U7XsNbLQOj4YJz5vmff/kin/6L5+P1+5+bwWAwTIJ1wm8uRzZr94xLFkLguR5aw4d/6G4uvPQ8ysXBkjsmVeIl9Xg/4jIvWTG1sX6QUrJHSwxcvbiSqtUPIn3V8EOWjr/x5NplbW7fRBXq+uFnvEChUcM0IOuJtG2ChkOjXoszfuOkjzjjV0yZlUcS3RjPj/67Tvym4HYdZtWOm6bo+k1oFYD3fCQWgEFiAYQ9u+f53T97jj/84ku9jmIwGAwTY1Th57oe0hJ85Ifv4fy9uyiX6uuTOybs8h1ovyO8b5ubxK/vbC6eoE+h5SZJ8KjXNWGYRrKHwq2UsGw7VUuqFNIKQ011ad9zsBreB2t0e1L8L6jt+3bdSbfHb/QH+riVMtK2m0GiGsjYAjGF6k+LqNAzgGi54Zsh6HciM8vY/ZwIwEsuOz+yALqrAhAN5++a57f+6Bn+7KuvDX0uBoPBMA4jC7+6Szab4ft/5D7OOWc7lbLTVtqs7zjWK6QnJZfvQJP+fuegondXJiemUvglCAG1Wgpt3Wwbz6nhOU6bYWx8tEYgQ6U5sO/1F2A10xfWiL9EFa4cfe3bYaiQKVZhEQBaxKbN1e+TpA/LmrJOH/Hf6vlEF2cY1+8GxP0Ncw5DLGrStABe0UEACjhv5xz/9TNP8JePvj51pYAMBsPpYSThJwX1mkthrsAP/Oh9bN2xSLXSp5zL2uMOc44TWneYDQSR21dpptL1myR41GrjJ3tYlo1bqRD6fltIXApo1wvZOkO5XCq2ZfrC2g4fsSrc99Yr31Vag7TsNMPuhRUnfbT4uSFO+kj1b978KOLq4EF6tf5gxIHhNLkh1grARiwAEQJLwLk75vmV33uCP//qK0OcmcFgMAzPKMJPSkG1XGfL1nl+4EfuY35+hnov4beJXb4Dn1OS6ZsdZqOziyTZw3FSSPawoni/yFCXHgKlAgW1lYPPA0gpZVfxlywol4orc1ldbvgBpHR7lVJYlk29VFyf9KEhm52+Th+SyPLX9e+eQMzdMEwkAHmNBTIRgJdecT73fjgSgGEQoATYAs7dOcev/4+n+NwDLw9/LIPBYBiARPg9OaTFr1yqcu75u/jBH72ffCFLve52bNk2TKLHZnD59to26ukrsa3U+oCdUSTxfo6j8P10kj1qK8sImXKTZCF1vdYgExz8Jqw28khYJ/6SFYR38EnXU+m1eSNK+vDdOm4tKvac7FoRib9pc+9JCUG4+gC1MlZ8SI9tNpPrN0EIQbnscNmV53Pvh2+LBWCIElFcxZ6dc/zGZ5/mM3/1vWh90rRHGwyGaaZV+P2bAYUfCMorVS59x4V8/w/fA3Gyx0gt24Y51wmt23fb5AsZi7/C+nfWNCFl5PIdu7OHbRP6IfViMU72SE9NS4HwQ8XS0Ve+2XH5ui/iCFVv+fXH6o6HSLHNW9LCpF5cwWrp9KGAbMZCpneoM4ZACbxAIfvU1Zl4TMhGuiM6bCiEoFxyuOzKvdzTIgCFAAScv3uO3/njZ/m9P18tA2MEoMFgGIdRhJ9GUy5XuPbdV/DBj9yG7wd4ntfR4rdmw9b/9Fpl9fMQK2+El0fqyGaTywn0lGb6itgoUS5HyR5r9drAyR5KIS0Lt1bBd+spd/bQWgrL9v2QI/teeRpWazknrBN/iev35JGXHg9DjUzRFimIfmjV5VNtnT5QYElNNjNdSR+SyOXtupquscFno+u3y7qJALw8EYCOR5AIQA17ds/xe3/xHL/zue/G6xsBaDAYRmNY4SeEQClNtVzn1vdfz1333YRTbzRrlUY7HSGjdsQxbCSX75iTfKWja5YtxD7BKbT+CQFBEFn+htVres2/LcuivrISGTrS7OwhoOEr5udy6vjxo4egPdkDuhR5Bnjj1Re+o7QGIfp4tAcnSnKw4z+WNnupEHHcXxoHOoPQAhwvnkGsXdZ34yHWbVnxdLl+B5nENgXgVXu552/dhut6BIFqCsC958zzmb96gd/8rGkFZzAYRmMU4Rf4AU7d4e77b+WW26+hWm6glB6sGv0IY1RaMXrjHnftF1Josjmm0uoHYFngeRrP65/s0U+gCwuqS6cQaZZWAdAq9AKFrh1+DtrbuiV0tfy5jlMvWO6xNJM+UApp27jVKoHrIFuMijpO+pimcn8KkAJcT6N0/0nUaXX9pmCBXLus22IhBeWiwxVX7eXeD70P1200LYBKw95zF/jjL73Mr3z6iWh9QZ/4HIPBYIgYRfhF7dpCPvjRO7jmhkspFx30AC6WvgKu1wQ+bZdvrzF8wOEzVGBnJXZmepM9LCuy+g3S2aMnUhIGUC+tIKWdrpYWUtedBlZj/9egva1b8/Brv2jr9FE78ITrKUiz04dlEbgu9UoZmbHR8ROkiTp9TFvcnxTQCECFwwcKb6jrd8R1RxWhQghKRYcr3nlhLABXLYBKa84/Z4G/fPR1fuGTXwNo9gg2GAyGbowi/FzXQ0iLj/7te7j08vMpraz26R1ovBtl4txn3ZFcvikcVynI5kTKZqozCyGgVBq3uHNUSS9wnWbjizTVtAThB4rjB55/pMc660k6ffilVx+q171UO31IIUBoqidPIq3VqxcpaoE9ZcWepQQ/UFHSR4fLPJGYuw10/Q6b+NFKkgXcFIBOo00A7t29wNeeOsj//p8fAqJnS01bvSCDwTAQTeH3vcGFX73ukstl+KEfuZdz9+ygXHKQnQK0xxRdQwm0PhP7iY3tcfOJ/IyY2rZuUkIYQrU6bnFnhWXb1IorBJ4XVT9JDa2FtGylNQfefOFbsD7ZA7qIv8T1e/CNZx9u+CGWtDJpnZYiUrzVpZNRizcpm1dFimhWMW3PVKgEDU8nv62ejBNzN9B+U3D9pmK9TGIiWgTg3WsEYBgqzts1x3OvnuCnfvEBGo0AKQWhEYAGg6GFNuH3qwMIPymoVR0WFmb4oR+9n63bFuJ2bavCb2zRNYwaHOc4PTYaxrhAnOCRn5neZA8powRNx1FDJ3usRdhQPXkCdGwUSw/d8ANmM6q0vLx0EtYne0CX25eoxH1vv/7y4lxWN3yFECn51JRC2hnqpSJBw23vfaghP2Vxf8lf73ir+S9npOt3iMFq2BmwEIJyxeHKqy7k7g+9d40A1OzeMcv+w2V+4mMPsFxysaRxARsMhohE+D2VCL/53sJPSkm1XGfbjkV+8EfvY3a+QLXi9u3a0WvZxKyAa1bst+1YrmYFlqWxpzTZQymw7cjqN0i8X0/DhpToACrLS0g75Xg/VOh6ChoHn4CouPPA4k9rrZv1/kpvf8sLFOh04/78hkO9WEJmMu1xf9npi/uDKOmjp/bfSNfvADsZx00xyjJBIgAvigWgS9giAHduLbC04vBTH3uAQ8cq0Uxq+h4jg8HQQqvF718PJPwElVKV3efu5Af/zn1ksxmcmouw2kfnSYqs1BM9Bjx4v/NQCjI5SWZKkz2gvb7fWoaK95M2vuvglEvpx/sJSd3xaSy98kh0rM45yV0Nt0mnD1V5/as1pwEpFnuWcdpmdWl93J9tCewpqveXeL6dHhm/fQeWtF2/vT6PKELHmekmn9sE4P3vxamvCsBAabYu5nG9kJ/+5S/xvTdPgdF/BsPUMqzFT0hBqVRl70W7+f6/fc9qskcvl9yoVr+0x9FeMYcjWB/XIaN3Va4wvZkeSYxfKvF+mTjer+GmHO8HUkjL9wOOHXjxMejs8oUe4i/Z4Pj+7z7Y8AKsFIs9a6K4v8qpOO5PrMb9CRG5fqdE+wFJj19FGIqRwig2yvXb97gbMGNNBOA7r72Yuz/ULgCV0izOZ7Fti3/2nx7k0e8caFpTjRfYYJgeWoXfIBa/pF3b5ZdfwPf9L3ejtG527RjWyjfWhHtUL8mQx+3Hun2p6NwKhXhGPU0v6Bjbhnpd47opxfudOgWkHe+ndai1zNgWr7703W9D52QP6CH+kg1efenZb2Usi1Dr1Io9a6WQmZa4P2v1NJSG3LTF/UkIQoHnq6Y5eejZYi/zfY9tug5cXWaLvQ4w8qA45HkIojIw77z2Yu5KBGC46gIu5GwW5/J87Dcf53NfejnaxhSDNhimglGEX6VU5aprL+WDH70dzwvwk3ZtKYSsrPt6xHFoLMtdn/PoN5HXxMWdpzTZI+nhW6mkFO+niD2f6cb7CVToNhQ5ferF5iFHtfxprXVeL73kNhQi5Xp/fsOhtlLEymSbcX8KyGanr8+vUnHcX9w4ux9jxZSMwTgu6DStkEIKSisOV117MXd98L04tVUBqLUml5Xs3jHLb/7BU/zGH6x2AzGJIAbD2cuq8Ds2mPCLY/yuuf5y7vtbt+I6Xlu7tnGtfmmEu/Rl1En8EET1/STZKY33S6LmisUx+/kC0rZp1OtRceeU4/0QUledBlTfeAggk8l0rdTSU78nG4blV75YnUjcH5ROHEO0mlDjjKJp6vMrAQTUGppW33pqAq+X6OowcIx0Al02meQAJqSgUnS46l2tAlBD/OMUAvbunudPvvIyP/8bUTFoUwvQYDg7aRd+jwwm/FaqXH395dz7wZup1Rr4oWrr09v9YMMvG8Z7s27RBobvrLtc8XiamxGkF/x1ZiEl+L6gUgnH6+cb1/erLy8ReA0sa0z/8RosIaTvK04eePaBfuv2FH+J9e/Im0/+ddpxf4pIAVdPHUcnfX6TuD8N+bwcyAJ2NpAkfdQcTS+L+kRcv7130/1zSoPY2AhBZSUSgHfefytOzUHFAhDidnC7F3n8mYP8zMe/ghPXAjQWQIPh7KFV+P3skMLvA03hp2mt5jJJq9+68x912w4rrp00d1w+xMlp4ni/GYGewuLOSUu3alXheQLLGsPlS/SuLx07Flkn0i3vpxHSUlrz0gvfeRy6x/tBH/GXbPjSC089nnbcH0ph2zZOuYxbrWDZNslTpYBCXiCnKPBPAo6n8IZI+hhqcNnImWOfz12XjWD909AUgFdffwl33n8r9UQAxiTFoF8/sMyP//wXOXqyakrBGAxnCWuF3+KAwu+a6y/n3vsj4ReuEX6TtvqlGS7TbxgbW4TqKN4vNytQAVMX7weRYFtZifTJOPkZQkoCX1FdOoltZ9M2hmjXD8jp0luNRsOF7vF+MIDlL6kRk/GPPJ123J+wbQLPp7p0Csu2o8xfkmKK09XqLUn6aHhxm7desRq9BphRGDVmZMQDjvzA99quRQDedV8sAFWrANTs2jpDqeryUx/7Et97w5SCMRjOdJrC78WjQwm/q6+/nHs+eDP1eqPNUxDtdHNZ/UYKy0lRhCoFmawkk5veeL8wjOr7dSrxstaA0RWlkJksbmzwkrZNU/SkgBCEtZqPdN56GKKwvZHFH6zW+/OLL38h7bg/Qdy94cTx1TNJTKMC8vnpKfkiiVyUNSd+wLqs1/fi9/hhb6i1b0i3QuuHkQdaGQvAGy7hrvtuXicAA6XZOp/HsiX/7P98kEee3G9KwRgMZyhN4ffSMX721x4dwuJ3Gfd+8GbqtUj46TWWnJ5DwQCCq1+YzCStfmmO+ZFXZTXez0rVRXnmYNvgOKst3UZ9t2nAykgqSycIgwDRufbyyEghpNMIWD707BcHWr/fColyPPzmd77Q8FS6cX9KYWcyVJdOEnh+pISTZRryuekq+SLipA/E4Jb1oX7svQaSDqJr7YrjWP9SG5T6DZRSUF5xuOaGyzoKwKQUzNbFPL/4ya/zRw+8BJhSMAbDmUS78BvG1XsZ93zwFuqxq3ddzFWHzScusCa076GP3c1aqGFmdnrj/aSEUklHdXj7vJh7vkPjUKPy8eNIaaUb7ofWQggrVIqXnv/Wg9A73g8G0BjJDt549YWnYutUenF/xGnPtSpOsYi0V1u9KRWVfLGmpOSLAmwJTkMTJj+wUUVXr1nmEAwbSzKU9W9IITrM56QMzDXXX8adH7hlnQDUWpPJRKVgPvnZp/nEZ74TbWdKwRgMm55VV+8xfvZXHmFxdnjhp0JNp7Dfnp9HCI9J0+q3dtm45zIQGqSlyc9NZ7yflNF7YXlZYVljlnixLHzXpbp8CiubRaXoQxeosN4ImbNKrzZc1wFQfQ4wkOUvcf3O6QMPVxw/3Xp/UqKVpnT0CDLTroVtS5PNTlfcn+crGp7uOcMYK76kj+ga+KAjnMA4ruFhz0VIQanscO27L+XOD9xEvVZvE4CrpWAW+NOvvsrPfeIxwJSCMRg2M2lY/NbF+DV33uvAaZx9711uKitg/F8VQi4ryU5xvJ/jaCqV4bt6tLl8lcLKZqksLeG7DlbKLd0QUldqDai8/NfQu75fwkA6Pkn6KB7+zp9Uax4ixbi/pORL6eQxdBhlwzSvmoaZKSr5AhCGArdV/I3wt48lDtP+PGJ8xLjWP4g6gVRKLte++3Lu/MDN6wQgRJa+vbvn+fqzh/mHv/Rlaq5vSsEYDJuQRPg9PaDwk32EX2rjzRlo9RvoXGQk/gqzSd2sHud0FhIlnkaFnROX70glXmKkhNLRw6su4BSxhLQanuLQ6098HuiZ5ds8n0F2nLh+X3vh63+plUZIK5Oa61cp7GwWp1TCKZeQdobWki+5vJga12+z2LOrEdCWCDS0CX+IhzSVqzuq9W/UcxlikEsE4O33rI8BhCgO8Lxds7x1qMiP//svsP9I2ZSCMRg2Ea3C71//Wn9Xr5SCYiL8PtRH+HX4PPDClMaIzWj1S8ReYV5Gb/spdPlC5PLtpNWGeVcJaRN4IZWTJ7Gzqx3N0kFrFduLXn7x6W9A/3g/GPB2Jipyeenk8aysHG74QapVMoSUBJ5P6fhxrIy1ruTLtHT7UERZzjVXRxd3iB9bmoPZSLPKXp8nMcPtRwcB+K73XM7t97yHenW9BTAMNTu3Fqg5Af/gl77Eky8cXX1RGBFoMJw2hhV+xMLv2usv4wMf6pHc0TxA/69G+tzD0jaRMbHLdqNaIJUCK6PJF2SaFUnOGKSERmPV5dtTg+juHyOXr02tuIxbKbcltqaBQIWVus+ifexb0XlLmZrlT2utEx+yKr70+VrdB0FqcX8Alm1RPn4kqf/SvHpCQ2GKXL9SQMNTBK3FnruIru5frl+2ITPJSVj/UhCjCZWSy/XvuYLbPnBTRwEYKM3ifJZC3uZf/9rDfP7h1wCa/YINBsPGMorwq7QIv1qtQejrNsvNUO7eEcTWsKRt9RvntJrbxiVe8gWJldVTYXxppdXl6/ti6BIva5G2pHz8GFprZMolXoSQuu54OCef+zyslufre06DHiBRkksHnvjTat1PteSLjosfVpeX8WoOsiVWURGVfJmWbh9SghcInLjY8zATxKGuUI+ZykZY/9Yeb2SGFL/lkssNN17BbfdEAlB3sADmszY7t83yq59+kk/94dNAVI/SJIIYDBvHKK7ecuzqTYSf72tEy1suNQ9Jj9XOJKtft3NJwo5mF+KLN2Xib9XlqwcKz+t623Tk2dQKSqHPBQAAIABJREFUSsePIG075UuptSWtjOcrXn3ua38Og7l8YQjxl+zwhe8++ZglBDrlki9WnAZdOnEc27bbSr5kMoLMlGT9Js09qvU1Gb8jDBh9f/gjnF9fRtzpyLPvAT+3Ui653HBTJACr9fUCUGuNLQR7ds/xhw+8xM//RpwJLMW6dQ0GQ/qM6+pNhJ/sIfzGcvf2mgQPMeZuJqtf23501NKtMMUlXhoNTbkcdnT5Dmy8iA1bTqlIvVjEzmb7+I+HRnuBIisbK4cP7X8TGCjZA4a0/CXmxELw9lfLjg/RY5EKQgiElBQPH1rv+gVmcmIqXL+K6KZU66rjM5XqYHGWWf+GGYgTAXj7ne+h2sECqOLz3XvuAo8/c5h/8Itfplr3EHI6nkOD4XSRiqs37F0uaxR3b+cVh2QDrX5rlw0zXqsQcjOSbH76SrwkLt+VldFcvnrNv62MpHj0CKGfflcPIQjL1QYZ5+U/h/4t3VoZ6kySki+VI9/+TKniYksrtb9ExVm/lVPHaTgu0mp3/Rbysr3x9lmMlOA0FJ4v+rp++7Eh1r5+Bx1wWT9x2G+wHuSY6wXgO7j97s4CEFYzgfcfLfL3/v0XePtwCWkSgQ2GiTCq8EuyehPht26/fT4PsnAg8bSJrH59t++xQhDAzLyILC9TJv6Ski6nTnUu7LyWvi7fEIpHj2BlMqm/NywhZNUJOLXvW38Mg1v9YEjxl7h+n/vOI/9fxrbQGmsSrt/KiePY2fWu31x2OmYhUoIXCpyG6uj67TforGMSgmtU61/3U+lIau7fLgcul13efdM7uK2PANyxWKDRCPnpX/4y337uiOkJbDCkzKjC7+pY+DkDCr9JuHsHYoLjcL/jDTtuSgGz83Go1ZS5fG0bXFdTLncu7Dy4x0oh7QxOpUS9uDQBl6/WWgtLCPju0998CAaP94Mhb2vSLsRxnLr0jz3nNFSq3T4QAqTFyuFD0Zmtcf3mpyTrN7kpZUchGX7ilbYAG4lRB6VJuX97fC6tE4Drdx0ozfxslrmCzc/++iP82YOvAKYnsMGQBuMIv3tj4TdQQtaE3L3jWv3GJU2rnwohmxfkZkSKgV1nBkkv36UljVL9Czuvpc3lq8DKWhSPHSXwJuDyRYVlx2dRHH4MBi/xkjD02SQlX/yTT322VHMhxW4fOnH9njyB7zSQLRnLiijubxqyfhXRA1ita5ReTQIBugqc7l/2X3a6rX9DfR7A+teVHoPzqgXwRqrVWkfFHWpNNmtzzvY5fv1/fIff/OxTgOkJbDCMQ1rCr9PqQ40dXQ430PjUY2zptW/YfFa/MIDCnIiyXKdsWJMyEoBLSym5fDUUDx+aiMtXCKmrNY/ioSc+B4OXeEkYWvwlZsXXn/+bz3m+wkqz2weR69dz65SOH2urhK0U2BlBbkqyfm0Jrqfw/D6ByzGTdr+OxIhidJCTG1mQ9th3uexy401XctvdN1Kp1jofV2ksARfsnuePv/Qyv/DJrwGmJ7DBMArjxPgNJfw6fO54Pt0+j/HTnkg/9R6rjWP1QwMC5rbEXrYpibNPsG2o1TTVqu6Y6DG0y7dUol5cnojLV0orE4SK7z3zyJ/AcC5fGEH8JWbF48eOHFzIOofdRoAQ6WmJKOvXYvnQgY5Zv9NU8DkIBVVXY8s4+zRZMA3Wv5F/dKOfE0Qu4BtvvpL333UjlXJnAagApWHvuYt87amD/OP/+BW8QCGlIDQWQINhINKI8VMdYvygw297BKtgpxWHtfpN7HMvK+U4Vj8VuXzzhelz+WoNlgUnT0YibVgvbeu1bLp8jxwm8PyJuHzdRsCMXH6lXCouw2pY3qCMJP6a3T5WnvnMSsUF0uv20cz6PXkct15fV/C5UBBYU+D6TUIeK/WoyOQgE7DTZu3rJbZ6DUR9Tqifi2ZkF04fF0255PKeW3oLQIAwVJy3a45X9y3z4z/3BU6u1IlrYBoMhh6k4uqNW7b1nCjGX4w8VvT7POBENNVlw6828AYqgNkFgWWNsvMzG8sCzxMsLQ1Q26/D59YFQkqU0qwcOjgRly9C6pWKi3/iO78Pq+F4wzCSHE2sf6888+VPr7p+08OybHy3QenI0fVZv7Yglzv7Xb+KyPVbczWBWhV/A7khBlw2rLVt0mJykNl6v1WG+YH22qZccnnPrVfy/jtu6CMANedsnWG56PCTP/8AbxxciWMA+5+7wTCNTFL4rT/YYMJvWM9Gl0O1f+4jSse1+qVuhdRELt8FSRj/e1pYre0X0mhE4nfkTixKYWWz1JdXqJVWJuLyTbp6vPLdhz8Lw7t8YUTxlxzo4IF9byxknSOR6ze91s9agJWxWDm0Px4oWordaZidnQ7Xr5RRn1+3Ebl+O5G2W2FkUrL+DXW+A866B3GddBSARZf3vO8q3ntnbwEYKM3WxTwazc/8hwd54bWTUS3AKXhGDYZhSEP4hT2EX78Ja8dz6va5x8bDCq1+Bx3lvIemj5hRscs3N4UuXykjT9uJE1GiR7+Wbr3utwZkRrJy6AA6VJMo7KydRsB8pnbwxPGjh2DVIDcMI1v+Wly//yNt1y9KYWfzVJZP4ZTLSDtDkn4ZKMjnLGxLn/W1JwUQKtFs9Zb8vQPd5RFnLROz/qXo/hjqnPoJwD6HLhddbn5vLABLvS2A87NZZnI2/9t//irffv5Ia7iqwTD1qJSEX7fySoP8xlMThwNOPHvuYwgmavWLrXzT7PK1bajXNeWyHq+dmwYpLUIvZOXIoThpNfWLGZarDSg++z9huK4erYwsSSft+hVSojyflcMHsbJWW+01S2pmCtZZ7/rVgCWg7OhoNtFpBYb8oY/weWAmdT4DDLSjirteA2byXSIAb72jvwCcydkszub4N//1UR59Yv80eU4Mhq4k9dOe2SDhN8iksRP9RFbPbZLP/YTfqBPscTREn22n2eWbJHqcOKGaz+notf0UMpejsnQyMlxlMox349ZjSytTcwJeefahz0TnP5qPaWTxN3HXLyAzGVaOHEIp3eb6VRpmC5IpyPtA2lB1QrxA9G5S3omUrG1pWP/6Cq0hZ8pDDcr9BvJBBGDJ5Zb3X8Wtd1xPpVTtesykFuCOxQK/8FuP89C39g18vgbD2Uir8PtXv/YI8xsg/MbyBvT4sQ5rYeu8gxGW9VhtbKsfkdUvXxDkZ6fT5ev7glOnNJnMGLX9AIgsp8sH9oOMSoCliRBauV7AXMY9cWD/m6/CaPF+MKblb9X1+/TvT8b1m6W+vEz11CnsbK55V5SCTFaQyZz97d4k4AeCSj1slnxpY4Osf8POTgcRWgN83XOFfufUaeVBBvyOAlAnAvBqbr29twDUWpOxJefsmOXjv/11HvrWPqJ6qUYCGqaLtcJvcTZH/gwRfsOKrE5fpjbuTtLqJ6L7NLdFImT/9c8mtIZMBorFEMfRdCqTPIjFOFkmbQvXaVA8egQ7m2fI6iuDEC6XG2Tq3/3vMLrLF2CoitCd0FrryvLhVxcvuv9fbl3IW0or3T9ccjCElASeh5SSbXvPJ/ADRLxrK86odNzBiiCfqUgSk7xg23x7lrNY84+1F32g5WLN59bla74Qaz50Pd6kjjnA8rHOq8+5AXiNgEuvOA8hJG+9doBcPtthrWiMsKUgn8vwwONvcuG5i1xy/hY0GjFNPhXD1NLJ4pfbYOHXiVE8AAPtt5/wG9Kj0vEYnT73Ou8Bj6m1ZuceC5lm0d4zACGiZ3TfvhDfH9/lm8nnWT54gFP795HN5VI+W61ty7KWSy6vff13/l6lUipG326w2xdWiwqePHHssB0cf9FpBKn2+tVKYefzrBw5jJe0e0vM1MBswcJKr7vcpqTZ6s3VNEI6u343m/WvH0O4PoYazLptM8CxB9lP8mW55HLzbddwSx8LoNJRaaKdW2f45U89ziNP7kcgjAXQcNbTSfgVToPwG0RgDTyOjSMOhxjz1n3da3zvZ4kc4LBBAIU5GWX5nuWetLXYNlSrmmIxSvRYy1DPhpRoAaf278OybXTqLl+02wiYs6v7jxw+8DaMLvxgTPEHq8UFwxNf+8RyyUVIK9W/2LIsPMdh5ejh9e3ebE0+ZxGc5Q+slOB7upn128pAd36EgWfwnffedlzB2WPXnT8PKO66vgT6uUji/6uUXG657RpuuW0QASjZuW2GX/pkqwA0GM5OmsLv5Si5Yz529Xbtf50Iv+tOo/DrMl41v+snsvpNWkf9PMZAMVCXpPgaL2yNY4rO8ndpK62JHjCA1a/XsmaY2gq15ZMTqO0HQLhScfFOfOu/wXguX0hB/AVBEAB8+7G//u9ojdCiX3nEodBCYNmS5f37omsv2hM/5mbP/sQPCSCgXIuqPfcafEYaZFJwG3TbPvVjdjnIRg70rQLw1tuv4Zbb3jWUAPyb7xxgCnumG6aANovfrz7C3GyOmUEsftddxr0fnpzw68QgAmugCWE/4ZfCBHvoMXTAzyoEO6OZnY+rZ5zFIVRrsSxoNLp39FhLr2uqASsjOXVwPyoIU6/tB1pbUmY8X/HCk1/6PRg90SNh7DPUWmvLsiyllLLqr/xVxfEhzXyhpObf0gnqpSJ2LtuW+JHLCTLZs9tcnXT7qDiaMFx/08a2/g3JwAKw3zGHGBSHGlC7nFenHXZdZ0ABWC653Hr7tdw8hAD82G99jUebAtBIQMPZQavF71+1WPy69rtudfV++Bac+uSE3yBjVD+B1XM/Pc6x61dDnNvQDDK2JokeCxZ2Vp/V79C1aB25fE+dCvE8kUKih43fCCkePtDmoUyLqJdvSIHll5eXTh6H4Xv5riUVeSriLIylN7/6/6xUGmSsTt7zMfYvJSpQLO9/G8uWbfdBEpV9Ods7fkTdPjS1ukZ2u7obZP0bipTOqceuu37ua5kc48XQeo7lkst7b7+Wm98/oADcMsMv/dbXeeypA8YFbDgraBN+vxoJv4EsfkmM3yYTfp2YxBiVhigd6xg6cvmGUyT8IEr0CEM4flw1W7mNk+hhZ7OUjx7BqVSwhm+z2x8h9UrZpXb4a78No/XyXUsq4i8xP77w3Sf+JiP8uhdoASnW/Isv7qmDB/DdAGnbzas/LYkfyY0q1VTUOmzN8oFmk2kMGJ0+9xNZXRj3nMY67poPqQjAO67lPe9/F+U+AtC2Jdu35PnYbz7OY08dNC5gwxnNqvA73ib8+lr8rmvv1Tuw8Bvkuy6/6070+l33WqevVXAQ61sfhh3H++67ZZkKID8rKMxNV20/rSGbhZUVRbUa1fZbt06fz20L4gzpk/vfwpID9IYbGq0lMqM0fPdbX/hdGN/lCymJv9aaf3b5qf9WrLgIkWLNP8DKZGjUaqwcOdgx8aOQ///Ze+8oOY7zXvRX1WnCZmQQGSAIJjFJJGFSYpRIypbvPc8+79rvXd/j967fcZJ05RwkH1mWKOlKV5KVnCTrSrYs2ZatRMkiCVIECIIkSJAgQGRgAewuNsfJqbvq/dHTsxM6VM90L3Zn9zsH5HbVV9U1M91Vv/p99X1fezt+VEy/WR6gP3WdBDBZ2TbxMRE39OExwbqaVcoXoguFo44PAPgzb78Zd+59i0ccQJMBXN0bxZ994Xk8/9oKAFyRpSkW8Dt6Zhy/9+ln/QG/x+aBn1CuXqtM4J13bCuq4/XOtzovuV23MBEIn9EmgMGBzl5aYQCXi1ibjNFRVvHwbcnRQ9OQnZ1DcmIMckQL3OQLMD2VK0ErXtxXKBTyhBDSqskXCPB4p4VEzx554gu5vF5O9xa044eMqcv94AQNGT86Y8vA8YMC+SJHJs8hU+/JI3D2T3RisZMmx2RXKLLD9g0AHe7tFwCmknnsvf8teNvet7gygBYA7OuN4kOffx4HVwDgiiwxYcyMPnDq4rTJ+MV8AL93m6ZeX8CPLzzws5Mgwk2JAL+g5+8aKTt6dHSXHT2WSehR66xfMsmRSJisnxdKcfteOYjp6DF4sezo0XLo5AZRJFmeS+UxeubJzwKALAdzrC4w8Gch0eHhwUsKnzkfdMw/y5U6NT2F1NQUJLXW8UPVCCJaezt+WOAgWTb9Nv1RA2T4hCc1r1v4mNRsm3speQFAH4uGqx43vYD33v8WvNUDADIOaGUA+MEVALgiS0g456CU4PJwEh/45LOIR1XENJ/Aj/kEfnbj8Fvm8nLZAb8g5iI7cOrZh921wBznVlfN+ukMiHdJUJXl5egBmCTKyIgBQmB71ED49+JmRo9iroCZoUHIkUgIrB9nRZ2TiEqKJ9849CQwH2GlVQnUH9ky/fLJF/5yJpEHSLAH8Qil4AbD1KWLkBRaE0SRwAz70s6OHxym6TeR4WC8nP3DRqf6D9/sXl2hCMvmJV4Tr9DE3Opuu1zQDDtZU+YDAN5z/1vw1r03IZkUBIBffB4vvD68AgBXZFELZxyEEIxNZfDejz0NRSaI+wV+uqkbKPAT3ODZtRWeT7zAocCLK8L6+e7DD2jl5r/uPgpjmU00imIGdZ6Z4WgmFF8N68cY5IiK2eErKGTTkOxchlsUQmAk03kYky9/BWg9tl+1BAr+LNPvi/u//xXGOShosKbfcvqUuZErKGRyMC3LZp3OgGhEgiK3N/tHKZArmAGf5VZ+Pa8dcLPXTQIsocnYCwCKMI9eOgECwHQij3vuuxVvvUsQAHZH8cEv7MeLKwBwRRapMMZBKMFcqoDf+OhTMLiBzrjqDPxQd8bPAn5BM34tAD+7ClsdgfnHtcht7vECpj6Bq5uCoQORDoJofPk5ekgSMDZmAgQ7vwzhtYyXo5AYwOSlfkiyGnhGDwCQqKRk8jrOH33iLwG0lNGjXgIFf4wxRggheqlU0or9Twce8w8ALWf8mBocgByRa2hWSjniMdLW7J8FCmbTDBI1gUPQ7J9zoXOd8CTnNa6wJ2CHsjAAIONAOpnHPQ+IA8De7ij+5Av78eIbKwBwRRaXsLKplzGO9z2+D5lsCT0dERhO9BElSCUagR/H4gJ+IvNOyxtPwRfZa04UaeQ6F5cdPXpWLT9HD0UBMhmOqSmjctav2fAuKKeeTU1MID0zDVnVAs/oQWDouYIOjc/1j1wZuAAEZ/IFQojnLZW5z6nzT31qZi4HOeCYf5xzKJqGqYsXYOisNt8vBzpicluHfeEwTb/JLEdJJ8LsX6u7yYbrJr5i4SY+dsG2OgLg1OO2gQBAoAwAE3ncc/+tuONOHwDwL/fjpTdGVgDgiiwK4RygZWbjA//zGQyPp7CqOwrdcafdaOo1DOeQ5ksJ+NlJ05tdl3rf9xG4ZoaZGKGjm0LXsawcPSTJ9PA1DNKQJhXwx6hyQkAIMHHxHAACEkJmFEIlMpPIozDy7CeBYGL7VUvgQ7ZMv8dff/HZuKbPFEqMEBJczD/ADPuSTSYwe2UIsqYtu7AvUjngcyJrgAqyf47ig+HzNdE4TMr1yiLjFnkpmwGAnv0ECABTyTzufeBW3HHnjQIAUEJvVxR//JfP4eVjKwBwRa6ucD5vIvvIXx3C66cmsHZ1DIYj01HF+L17PmWbbd9oEvhxAT2fwM9pfF5lYZ3zEwGmfuZvEEDXga4+Cip5tG0zkSQgl+OYmBBk/VzrGGRFQzaRwNzYCFRNAw/c3Mg5OJE453jxue9/FQiW9QNCAH/VMf+yg099bCaRAxBszD8z7IuCif7ztmFfujpo26copASYTXFQzP+IfneWQtc+XxAvgOVrR+x2a5EJdxEBQM6BTDKPex+4TQAAcmiKhN6uCP74s8/h5eNlANjGG5oVWZzCMQ/8/vpf38BThy5i07pOZ1OvT+BnV7gQ76Td3CYy/wW1yXRt43DvhjZuY7O5L2OAJHF09pbP+i0j1k9RgJERBsbsWb+GNi7XnBNIGsXkxX6wkh5CHl+AEOizyTwiuWPfAEyLapDn/YCQ0jhbCPXw/u98njEGErDjBxiDoqpIT08iOTEBWY3Uhn1RCSKR9nX84DBjFaWyBvJFM9ZWS7s4Hyyb712vFwB0G5LXBO4xMQuVLSAANLh5BvDeB27DHW/zBoCqIqOnO4I//txzOHx8BISuAMAVWWApP8zfffYc/uEHJ7B5facz40dtgF9JHPjxJQb8RDa/duK1KXdtI3jdIOV0Zp29EjS1fddGO5EkIJ/nmJw0IMv2rJ/I72bVSZKEfCaP6cEBKJGIcwrDVsZMJSWTL+HMK//+CWA+hW6QEgr445xzSZIkxhiL5E7842wyD0IQrF8RpeAgmLhwHkRBjacN40B3XAoSbi46IQAMg2AuUxvwuVX2z1ZEJkqffQpPgF6gSmCC9hxPSIuOnS7jQCZZwL0P3obbPQAgtwBgRwR/9LnncPjN0RUAuCILJoybrN/Lx0fwua+/gmvWxp3ZovpwLpkCSiVuu8LYvqNeQKnqImzgZ1coMq+IjNVunF5j9M0K2o2NAwQcPaspWk8MtnTEYv3GxhhKJQKRaCyurB9jkCIqpgcvo5jLmj4HAYvl6KGy6bNXBi+eBYI3+QJA8CO3Oi6Dv1xi6Hhk433v7+uOSIGaxTmHJEnIJefQs2ET1EgMnJXMPHscUFSCQoFD10NItbdIhBNAN4BV3XQeEJDG+Zk0/OGg00q9zXdM6i4cx1V1EcTY7XQ87++gIzrOmjKPsXAAxaKBa/dsQqmo4/LFYWgR1aZHU2RZgiJR/OhAP27YuRqb1neCs/Z9rlfk6ovBOCRKMDCawAc++VP0dGqQZYcNtQ3w00u8wbzmBLKcloWrBfyCyODhqePWj9c66XMzDphn/Tq7JPSupTCWUXgXSQJKJY4LF3RIEmk9qDOVwAkwcORVADwUky+llE/N5mh+4Ie/Pzx47piiKEoQ6dwa7hN0h5ZYSHV0eLB/VWT2WDpTAgn4sSOUwijpmOg/B0ml4LxqNeRAZwdta/ZPpkC2MJ/uDYD7jtTnpOJWZbez9Oq76cmwrkJkwvS9U3fQadDzWITEFxiOVLKAex+4HbfdeYNHKjgOVZXR06HiDz/7HF45ucIArkh4wsrAL5Mr4n988lloMkUkItubtxyAX733ox/g18CaLzbgJ7CmuKq0Ag4F5jnbIg70rKEtpIVaemKxfsPDDLouxvo19FH9N2OQNRUzg4PIJhOQgnW+te7CwYlUKuk4fPBH3wDCYf2AEJk/wHRNZoyxmJwfKXXe/Mt9XVHCeLDHTKkkIZuYQ++mrZBV1fT8LaN7VSHIFjgMoz1ZEgIzuLUiAV1xCoPVsmBeLFqr7J+tjlt9k+MSGZvdvUXGZ9tXiwxgpdyLjQRQKhm49rrNKBZ1DAgygE88dwE37VqDa9Z1rDCAKxKoWGnbAOA3/+IpTM7m0NOlmanYGoQgNWcCv4cfuwvZrHnGTwT4CZl5qwoWM/CrB6qiY7UVr02uR1sn1i/WQbB6vYRwYMTiFFk2PXwvXtQhy+Yz3XR+em6STYRKuPz6YRilEmiwUewAlB09EnlJTb3ypYtnDv9ElmU5DNYPCJH5A+YR67Ej+3/YFSWZQjH4sC9UkqAXCmaUbU2ucbkmALpi7ZvyjcNk/+bSfB74WRVN9tfSWROnNqLj8provSZ5r4lZUMcvA+g6Xq8xM450uoC3P3g7brvjeiQTGRutsq7FAHZq+IP/9VO8dmpshQFckcDEDOliziJ/+vkDOD84h9U9EWfgl0jj+lt24cHH7kImU4Ch1wI/23eD+wN+ru9XXaMggZ/t+ASAn207m3qvudWJKXW7t+PnZ2XWr03XQTvh3AR/IyPOcf08+6i+YAyKpmFudBiZqWkomib20Pi7I5coVZKZAl7b/09/Yd42PNecUMFfddiXwshPPzWdDCHsC+eQIxFMXupHKZuHJMuVX01nQCxGobZxyjdKgXyRI53nqN+IOAIxF5DlXiGwG21iZ+wEqmz7WYQA0HEsDnoN47EA4MN34Na37hECgN2dGn6/CgC26/O9IgsnFoP85W+/hv2vDmLj2g6HMC0m8Lvhll14+JH5AM7VDLQTeHGaWhreKxHdEIGf7znDYd5qBvjZia/cvVVlTAciMYKOLrqsWD8rh69bXD8R8FwRah4hGzt3FlSRELABEwBAwIxUpoQOPvTs7Oz0JCGELFnwB8wHfT78029/GgyB5/sFAEmSUcxmMXGxH1JEqWH/KDHj/rUr+0dg/ogzCVYbDFhwF+o1ifjegULg120BANZXXC0AyG0uRAGg7XgqDOAduPX2PUgJAMDOuAkAXz89Zgb7XgGAK9KkWO/D9589j2/96DQ2r+uEYdg9UGXg95adeOjRMvDT54GfLVNXXng93yXA811aksDPrW+bQt9zssv4DA70rqUmI9uma2C9cG6SIleuMHAeAOtnmKncEpPjSE2OQ9GiCMPcIkmyNJ3IYvjNf/+QeR2CK3GVhA7+GGNMkiQpn8/nePLE95KZ4PP9WinfJi72Qy/ooPJ8yjeL/VPalP3jMOntRMZArlDnYee1m3Hps+Wdqse1JwD06qcJACiiIwoAG3RFFi0BAJjNmAzgzbfvQSrpDgAjZQD4e5/+KY6eHl8BgCvSlDBugrdX3hzFZ75+GOvXdjgcZrUYv5146LG7kcsWwYxa4Ncgou9PVYHnJmoBgZ8bsKq+cJ1uRHQcbuc517rMo0wHIlGCzh4KvYhlE9RZUYBUimNqikFV0TrrR8z0bePnzoBSGsoha0I4KxYZkXl66OypN14G5omzsGRBEmFYAQqH3vzuh5OZPGRJDtxNRlIUFDIpTF3uhxxRa9k/CeiM07ZdGAkAgxHMplhNzD9LvABUMwybF0AUBXeOt/S6t9f94fHCO+jY6nEHRqO+zOP7rHxndeOu1mdlAHjfw3fg5tt2ewLAWBkA/u6nn8PRMysAcEX8icE4KCEYHEvig59/Hqt6opCo3Ua5DPxu3omHHi0DP73sXIdggJ/nO+by3tSoBPzee/blVuYy6XnOoTaFwnNqOahz35rlxfoBJjYbGDBTn7aM0wwGWYsiOTEuJClhAAAgAElEQVSJxOgI5Eikkk42SKGE8Im5HIzRp/8cMJ1lg87o0XDPMDu3xHL8uNx/9k3FmD2XKxiBh33hnENRNYxfOAu9WMf+6UBHvM3ZPwrMJDkMRhorHdpU/9ESUHNqI7BrFtkxu1YtIAB0bC+oV1PuMq55APi2eQDo8KYaFgCMKfi9Tz+HN1YA4IoIihXSJZsr4Xc+8Qxkx5AuVcDvsUbg1yBlpsXpXWl4X0RAohdIssoXEvi5fMb6Br43zzbj9DO/spJ51q+zd/mwfpwDqgrMzDAkErzps34114SAyMDo2dMghIQS1w/gzDAgKRLYS/t/8DUgvPAu1RKqTblaLJfluJIe4F1v+eXujih4CGFf8qk01GgUXevWwSiWQMphCyQZAAeyucbgo+0glADFEhDRgHjUBLnCQZZbCLHSTPiXBp0mA0DXlPkMAyMaKqapsYiMx6HSuuQc0HUD1+7Zgmy2gCuXxqDFVMcJX5MlEELwxIF+3LJnDTas6TCfgWUw6a+If2FVIV1++6P7MDabQW+XnWdvHfDLFWHo9ZNLlfhk+2zL6/W9QJJDZZDAz65Rs8BPRFo6N00AvQSs3SghEl8+eXytdf3sWQOMofV13mCQIzGkJicx/OYxKNFIKAwqIdBnkgWpcGXf40P9bzwXZniXalkwGGTZr08ePfiEZGTGSyVGgw77Yp39W67sH5GA6bLjh1VWr2N77TEJ+9nB2jYXeGFcxyrKurmUNbsw2I7Fa+Kv0nMbI6/Tq7+0GMD73/k23HTrdUjNZkyUbyMG54hpMjqiCn73U8/h+NnJFQZwRWyFc4CWdwUf/PzzODMwjdU90daAX5Nsn6f+IgF+XmyR01gc9bzmVJ/3r76usH59y4v1UxRgYoIhmzVZP6u8Rq/uQoz1O1lm/cLgyjgnoEo+r+PI/m99DAg3vEu1LBj4qw77krn8/d+dmM2A1kcDDUAkRUEuWT77p6kNnr/dne3r+StTIJ3jyFZn/LDEC9g4ABWnybVBR3SStrsWBV1ufXtM/iI6gPsCVl8gvNA53Kum3GFsFQD4rrfixluvRWo2LQQAf+dTz+DN8ysAcEVqxYzlZ/79hX86gv1HBrBxbadNSJdG4FeyA34uoK9cbVsg9D6IgiiHzVON7kIBP5Eyj88lNJe5iGEAfeuW11k/M40bwZUresXc25KUz/olxieQGB2FEtJZP5P1y6GrdOzvi8VCwUqLG/iNbGRBDaCWHfvIi09+SyGlVKjs3zkb9o8BsXj7xv2zQr1MJRiIZA9ERN4Jr8nGN7hzaOR7Ug0JADa1CLjoNehWjdsVMDosZEYZAD7wrjuFAWA8quIDn3wGb55bAYArUiXlx+ZfnzqNf/6P09i0tssmpEsj8NN11vjIeTz/LQE/t34g9r5XyhcS+PmYo0RAqt95lJWAaCdB1zI766cowJUrOgqF+TRuQbB+Y2dPmYHPHebb1sQM6pxKF3H4ma//qVmycAlpFxT8VbN/xeEf/cHETAaUBL83kRQFuXQKE5cuNHr+Aujuak/2j8MM+zKXNqAXCSQ6X16vZ3vt8p0EsmNdJAAwsMWgSk9o3E0sfpYYFQbwTtx46y4hABiLqvjAp57BiQtTKwBwRcC4iQUOvDqIz3/zCDau7Wh4GUgV8HvwsbuRLQO/mrOjHP7ZPo/3xAn4OfYvAPwCfdcdBtPK3NSgIwD8XOdybv7Gq9ZJnvdqJ7ECOo+Ozod28Ss1TapZv7FRKJFoDYYISqygzlqp/8nZmamJsIM618uCuz5Y7N+hZ7/7t/GYVNJ1SOAhsH+RCMbPnUEpX87BV/7tdAbEohSa0p7snwRA1wmmU4Zt2BfPScwDoLhNzkLgy+sdEgVdbmUiC0PAANB1PIK6Vjmv+WNeDIMjlyng/nfdhRtu8QaAcU1GPKLiA5/ctwIAl7kwzkEJcLJ/Ch/+8gtY1xeHJBHUPg4EyUQae8rAzzrjR6oOEXuBvmaed7vGriBREPh5sWRWQbMbThFw6DSWIObF+mtdB2KdBB3dBHrJo782Ec5Nk+/AgBkSz3LyaCWuH6cSIAHDp06AUAIeEnsqSbI8nchh4PVv/755HW5Q54b7L+TNKjeVJIlzztf3RQoFdfs7O2KK0ZgOvDWhkoRiJgMqS+jZtMH0/C3PYhIxH5hMtj09fwkBijqwqpvWvARBeNiKeNd6eQhbY3S8t8P4RO9vNwbRcbSq5zTuBn2P8deUk/n/GwxguoFrr9+KTDqH4ctj0GKa40KnyRI4IfjR/n7cceN6rFsVMxmgZWAOWhFTGDM9e8dmMvitjz6NWERBRJXrrB+Npl5mAT+vDaFdnSjoq7vwy4q3sgEMA/h5AbQgdaqFcIAZwIatMhSFtKVlq144BzQNmJpiGBxkiETEWD/X79bgUKMRzI0MY/TMCajReHNUoocQGHomZ1BFH3nt9QP//DiwcI4ellwV6GN9yEP7/ulTRZ0BoHLQ3zDnHHI0gvEL55FP5yApSg37F41SRLT2ZP8oBXIFjlSmNt+v14Qi8gM0o9PU5OY1MQuwBIExgC56ouNu6LeqsR8WkBJAt84APnIXbri5zAA6QEiLAYxGZPyPTzyLk/3ToATLYnFYkXnglyvoeN/HngbnBLGoDKPmga419VrAzzpEbPucl6WhTvC5trtw1bcZhON7utiAn5dOE6xg7a8HlIpAZy9FrJMsmxy+lJpWroEBVuPk4cX6uQmRKDg4hk+dAJUUofWuGamwfkf+8bcAMxReSLdyHsNC39ASK5bN5g29iq5teUcsojAeMBilVEIplwPAsWrzJuhV7B8hgCoTpDKsLdk/zgDd4FjVRVF9nrsZdq+Z+H9Ac+yer/GJjMGmImgG0FbX5btrKPfJAhKY4M0wDFx7w1ZkklkMD44jEtFs284zgBxPHOjHW2/agLV9KwxguwuvieX3NEYnM1jdHYFRhfzrz/hVgB98Mn1VhX5Bn2cbUd0WNnINugJspwhw9dTx+mxen6kMdjnh2LBNBiEkDKJq0YnF+g0NGZie5lDV+fIavfp2Ltfc4FCiEUwNDGD8wllo0ViorJ/KJ948/Mw3PgQsPOsHXCXmD5j/sIef+caHc/kSQIgUBvunRKOYutSPzFwSsjJ/GpQxQNMI4tH2TPsmy0Ayy5GqC/sisguq37Fe1YnNRs0PcxAGA+jJGFgFIbKABIChc+SyRdz/2N24/uadSCbTIK4MoIKYJuP9n3gGZy6uMIDtLGZIF/NZ+JPPHcCZyzNY3ReFXvOD153xyxZhFJk/pq+q0Kud3YVTm5rn3amf6vIFAn4ibF6lzEtHYH4UmfuKJaB3jYRIlICFmg128YiiANmsTycPj90MlSgMg2H0zAkoqhoaiJYkWZ6ey+HK69+8aqwfcJXBnyzLsmEYhpp+9UszczkQIHDCmlIKw9AxevoUJFWq+UEZB3o62zMYEin/m5htZDbrJxCR3a3jJOQywYlM3iIewK739xiD6DiExlJV6LpgCeja9l31WUVAoAkAGXKZIh549G5cd5M3AIxpMmIaxfs+8QzOXJpZAYBtKNWx/D73jVfx/OuD2Li2oyaWXzXj97AF/HTmuiI4gT7bukaVhgfb9b2weQkc37kWgF/DbRYK+Hlce87LZTEYoGgEfetkM2HqMmHyJQm4dKk2k0dLrB/nkKMaJi9dQHYuAUlRbVq0LgSGnsqUsCqWOnPy+JEXgIVJ5WYnV9XgabF/L+/7+z/O5UsglAYRnrFGOOdQtSimhy4jNTkFRdNQzf4pKkFnXILeZuwfR5n9SxtI570dWzwnIzedBQKAojotA0AbPdvJWWRclq7LuBo+h8eCWl1HALASQz5bxEOP3o3rbtyJZCJdYX3qxeAcsagKTaV438f34ewKAGw/Kf/03/zxSXxn31lsWttZE8uPgCCZLDN+j5rAzzaAc1mcnn/HulqVhgvPd0Hk/XPQdSjy5d0fJPCzE08dl81lzQUBjBKweh2FJPNlwfpZ+XvHxhhmZnhwrJ8so5QvYfTMaSgRzSa/dTAiyTKdSeYx+NrVO+tnyVUHf5RSmstmM/HSyW+Exf6BUhAOXDlxHKAUvOpjMwPo6pQhk/Zb/cyzYQTTcwz1mWlEdrt2E169CL93PndlDWWiE6JXfwLsQ6uLiq1u+b5CC2VVgdfiygGAmgxgPlvEQ4/djetu2oHknAsANDg6YiYAfO/H9+HcwAoAbBexYvk9+9Jl/PW3X8c1azpqflcL+F1/00489Oh8HD+7iEGOoM8FJDW0E3jfasoFNmhA65s0J+Bnp9cK8LOd5wKYCwET+EXjBN2rlk9AZ0kCikWCgQFd3MnD49oMDadg5MxJFDNpSLIS8KjLwgy9WGCUF6b633zj5eeAq8f6AVcZ/FXLS0/+zQfCYv9QPvuXGBvF7PAQ1IgGlE0gDIAkc3R2ym3nJcUBqDIwmzZQsGH/nICTbbEDQKyUtbojFgR3gQBAQb0gzgE6LTJC+lUFnostAXQLAD66F7tvFAeAv/34Ppy7vAIAl7pYsfyOn53EX/zNIaxbFa/Z9FUDvwcftYnjV5awQJ8r8HMAc7b6gu+l0HwhqrdQwM/rs1nzQfldXb1RWg6YDwAqmTwGBnSUSvOZPLwbuncqKyqyc0lMXjwPJRYLjfWTFUmamMlg7sy3fx24uqwfcBW9fS3hnHNKKS3k87ldOzevKdD1d8Y0OfC4f9YMl5mdxertO1H9RDAGRFSCXJ7DYO3nAakbBJQC3XEKg3t7z4YV/w8IIL6fDx3XcQjqAT5i/DnoOuq7xAS0bePhQYxyGBjGGK67bhsSyQxGhsYRiTp4AXMgoslgBsMTB/px9y0bsbonuuIFvATFYBwSJRieSOG9j+9DPKZCVeUKmLADfqwO+DkBKMe6RjVb5cDYPofKpoGf14bW5iJM4Of52aqAn14EuvooVq+nyyKgs+XdOzvLcOkSg6bV1tXo1l24s36AHFNx+fUjyM7NQrHchgMW08OXSSqbOvXy01/9feDqePhWy6Jh/gDgwA+/9P5csQTQ4OP+gXPIqopsYhbj/ecgR7XatG8E6KkLitwuIsvATMpAoUSEUhS6vSxOE6YwoyYwAXr+BAvIAALOu3GRz+fatwCTYlfg1oaWGcBcoYiHH9uL3TcIMIBxFapM8dsfexrnB2dXGMAlJqwM/NLZIt7/8WdAqRnLz2IwnIAfyPyz1AzTV6VmcxEC2ycI/IQ88hcQ+NkVisx7TuPlDJAkjrUbyk4ey0AkCTAMgssXWW3sWhHQ7XRtMChaFImxCcwODkLVIuGd9SvH9bv0yt//d+Dqs37AImD+AJP9szx/N67p4Lq6/YF4TGacB8z+wYz9l5meRt+W7ZBl2QSA5cVOUwmKRaCk87ZiPiiAok4gU6A7TmzZzaDYPWGdVmMAOug06DXBALrqirKALqxekCygXR0hJiBgjGP39VuRTKQwMjThyQAaBseP9vdj760bsap7hQFcCmIFcTYMjv/vI09iei6Pvi6tEsvPydTr+LCFyPTV1IXB9kFw87XAwK/lkC7VZQTQC8CaTTLi5TRu7f6OWqzf5UsGpmfnY/p5N3SvJpSCyjIuvfISSoUCqBLOWT8rrp9UHD7yyk//8cPA1Wf9gEXE/BmGYQDA4Wf/8S8oYbpegkQCzvkLAJIso5TPYfT0m5A1pQbpMw70drVf6BcOQKbATEpHSSew+4Ruk3lDscvXI8KoCU2aIhOiyw7fjo0QZQBddUUXIh48C9jwG7kwgYQAuq4jny/hwcfuwbU3bDPDwHgwgIpM8Nsf24eLQysM4GIXVhXE+b2PP43h0RRWdc/H8vMF/AJg+tB42djOZ5tW3zfb98ahj8UC/OxuZumwspNH72rTyWM5AD9VBWbnOEZGamP6tRrQWY5qmBq4iMTkeE0UkKDFYv0uvPTV/xdYHKwfsEiYP0usnL8bV9GpjLzjZ7s7I5zz4M+zUllGanIS3es2INLRAWboQDkyuqKY/88KhEdZSkIJUNAJFBnoihOUGGxNwL7O1rmcQRNh98JmABt0Pc7MCY3HKg/obJ+Tvuu9PQqtPwkhYIyBM+Da67chMZvC6MiEcyYQiwHUGX54oB/33LYRfSsM4KIUzjlo+Uf5/U8/h+NnJ7BuddyW8XvAybnDA+DU3M/xwru9X/YO8Ldx8uVx79SHw0WQwM+uI5GxVF8bBrBxmwxVbc/UpPViOXWcPWWAAeJrsscDSWUZhm7gwkuHQAkBCWmxt1g/nu7f/8ah73yKEEIWA+sHLCLmD5inQl945t/+WuKF2VKJUYTA/hFKQQjB4PE3AImCVFmX9XLoF0Vqr5fLYv+mkwxGOZariGeZCFvmhyXz0hFlAO3GKTqpezINAouinzNIzbCArve2q3NgAgkh0HUdhXwJD737Hlx73VYxBlAi+K2P7sOlK4kVBnCRSXX2jj//qxfw8vERrF/bCPyucwJ+Hqxxzb3q623eVyG2z6bOsY0Ig2eV+wB+nnOEwLvfCvDzYqYayqrmPlJ28uhZTSvm3naXee9eA5kcFz/r57BmzLcth3Y5dQLFbBpSSOZeAJBkWZ6azeLMob/774BJcIV2M5+yaAZiicX+9UQy/Ub8xv8zLPZPUhRk5magxTvQuXYNjEIJpEyFSdTccWRz7cf+FYsmu9kVI5XA1i2d/3PRqZSJnLtrggH0PQ6biwU9B1iuCJIF9GoH1DOA2zE3m8ToyKQnA6jrDE8cuIB7btuEvq7ICgO4CKQ6e8dnvv4Kfvz8BWxe31nJ3lFh/G6szdXrQPg538ejwJPpc1AKiu1zM5f63vDVKXhuDj3GJgT8BDbe1cKYOW9v3Ka0FSnhJJa5NzHL0H+R1Zzz82vure9Y0TRk5uZw+cirkCORgEbcKARGKZXRJWP2+HdOHfmPv6OUUut422KQRQdtrC/n2CvP/puenx0oFhklLHifJl5+CIZPHEcpXwBV5MpTozOgI0YRjbQf+ydJZso3i/2zyuv16i+a0amUBbGbdpjsfY3D5sKTCXAbE/wzFV4soBOjJ8SwOBRyAKhiAB9+973YJcgASpTgNz/6FC4PWwzgCgV4tYRjHvh95d+O4d/3ncWmtV2NwO+mnXignLKNFVlNe69fr0aH1xeIMYV2Sp7Pr0+2z/FdbBiMgK7AfHA1gF91GdOBNZsoJIkjeFvY4hNJArhBcKHs3Su86fT4bjmhAKUYOnYUAA/N3AtwTqisJNN5HH32r34tpJu0JIsO/AHzByJT5/7pV8dn05CUcKhSSVZQzGYxfOoklEit84fBgd4uCWL75KUjEgUKJY7JOQbFotGbmIwcmjl/WwsJAH0ARbfxiE74APyZgeG8gDm2CQAEghAUy04gD737Xuy61hsAdpYB4G989ClcHk6CErICAK+SWL/SP//kNL72vTexeX1n5bcgIEimTMbvgUfnc/Vy2gLoc6p3a+/jHQCae2+c7m9XsKAbQZHP4XeuJYBeArpWUXT10LZLRGAnnAOKCly8rCPnx9zrcc0NDjWqYWrgMhLjo1CiUecHqkWhlLCp2RzozAv/K51OJSmldLGc9bNk0Zl9AfPsHyGETIxdubznlrf/Z4N0blBlrvs47ikspvPHhLPzB0jbOX8QALkCQ2+XDErnn3/PYMaCDiAN7QR1hMYgMg4/eh7jqSkPwxnERd+tjVdoGKe2FRMwB669YTvmppMYG/U2AZd0hh8f6Me9d2xGb2cEjHNH0Lgi4cn3f3oen/2HV7Fpbcc8preA3w21Z/y8HhDfwMStj2ZAn8iYqiqEN0uiuk0APz+gVGRcnowfA6jMsWm7arZv832XFdZlapJh4BKDGsX89yJADjh3XOXkcfgFEITn5MFNPwUplSni4L998J5QbhKALFpIYx2MPH/ob//bbDIHKST3aEIpCCUYOHYUIDbOHx0Uqtxe5l9KgaJBMDmnQ656AoJyAGloJ6gjNAaRcfjRq2IePBeMq8QCOjGBwmxMXSEBgV7SUSiU8NDP3Yudu7ciJcAAEgC/+ZGnMDCywgBeDXli/wV8+msvY8OajoqnvgX8rrthJ+6vytXrBvwanotWmT4fbTn8Az9fZt4ggR/31rPG53ov2I/LC/iBAIYOrN0oQ1Y42KI5LRaeyDJQKHBc7NchqwARnWI8vl/zmJeC4ZPHUExnQnXykCWKiakM+OgP3wvM+zGEdsMmZVEyf8A8+zc3OzW+Zdct91Jl1Q5VhYGg077BNP9m52YgaxH0rl8HvViqLIQSBWSFIJNlbcX+UWqyfz0dFJJEaiawllOwiTheLJQTiIteg26AjiCVcp8soBej16xTSH17AgKmzzuBzE4lMD46Cc2NAYzIKBYN/Oj5frz9rZvRs8IAhi4c5m/2k4OX8PGvvoj1azogUVIuN4Hfnhvcc/Va/bgXuBY31jfDEobM9rn15WcDx1vQcxpbM8BPL5jm3rUbJdO7t81fM0LMs35nzhrIZk1PX0taNfcq0QiSU1MYeP2Iae4NSzhnhsFpOpuceeH7n/zF8G7UuixqOGOxf6cOfOn/TqQLIESSwiC+zV1BFCOnjiObSkNW1MrTozMgGiGIx2jFO7YdhAAo6QQTs8w8XFtV5/VieZa5TMTCDKBNRdAMYIOuwJicGAFHfRcW0JHRc3nCndg8ESawvj2hphNIsVDCw+9+O7bv2uLNAHaqIBz49Y88hStjKwxgmMJhhjl45qXLePwrL2L96jLw47XA7wGHXL1mH+IsX7NMH+yL5utcnukg2T5PfcF3thWAGAjwA8AMQNII1m+Sl805P1UFhq8wzM1yVMdcFomX6CZUouAABo++BiJJITp5ALJMyMRcFrMnv/FfgcXL+gGLmPkDTPaPUkpz2Ux688a+WFHZfE9oad8kCaVCAaVcDqt3bAMr1ubNiWgSslkdnJO2CXdhsX/dcQq5jv2zY6B8h1VZKAYQ4mcFPccjMKaackEWEPB/FtCtjWdbQTaQEAJmMHBUMYBjAgxgwcCPDvTjvrdtQXeHtsIABiwm8CN47tVB/PmXDmJtX7zyjjoBP+vHDorlq9Fpog8nZsy1nehGraogiI1dpbwF4Neg5wWSXcavl4CN2yVEIqTtzb2cA6oGpFIcF87pUFT3eaT+O3QD15xxKPEIRs+cxuSli9BisTD4IwAAgaFnsobEMkOvvvLM1/4IABYr8AMWOfMHzH95h5786h8xo5jT9XDSvnHOoUVjmBkcwMzgFZMaLgdNZRyQKEdvt9xeZ/8AMGayf7R+G9DCxCWi46ssiInWz3h4ra4ro1Cn4Mag+GYB4cyAeLb1YESq1UAISiUdhWIJD//c27F1x2ZPBrCrUwXnwK//+ZMYHk+BEhJaUvTlJhwmwDv4+hA+/MUXsKYvBll2Bn6GzsCJDctl8+M7FDvrNPPMIvhnvWngZ/N+Oo5pIYGfQxkhZizW3nUUXV10WQRzliTzbOOFcwYIJTXHq1qN6SerKnJzKYycPAk1GglxjuKcUFlOpIs4tf/zvwgsnjRuTrIkwJ9l/p058bVfmpjNQpLDoRg455A0FUNvvA69pIPKtbH/4jGKWLR9zL8c5gHb2ZSBbJ5Dqnsamt25ioLEhZpw7YCd6yJgcxOhRcZjfJV7OFS6AbmwQSAhZSeQUgnvfM87sGX7JhMA2uUARB0A/MiTGJlIgawAwJbFBH7AS8eG8aEvPI++3ghkmTYAv/vtvHpdkJ3X71+j02Q/bqAPzsWeZmGn99fzHRadW0R1HcC0rZ7TfaoKGsoIUNIBLUqwboNkmnvbnEwnxFyD+i+Ya5CszH9/zZh7q4sIB6giYfDY62DMAJXCw2KUEjY1l4OWOfJ342PDg5RSquuL22C/qM2+lljs3/jowNkd1+/9OS53XqPKCCX0iyTJKGQyMPQCVm3ZUuP8AWKafzMZMxxMu7yXjBEYDOjppDBsHAVFQsA0lAnqVMpETLuieqLm1YAcQdz0Pds0YQpuNsxLfUXj71w2ARPg2j3bMTU+jcnxGUSiqv2CxoFoREauYOAnL1zEO/duRzyqgLMVE3AzYgG/g68N4YOfP4je7gjUOuC3u47xc/uWRWG4EwAS7cducybU3g/TV1Uo1EZ04ya6aWsW0PnQYxzgjGPzDhnyMsjda4V1GR5hGB5miETcAV/97+tGOpjm3igm+vsxevoktHg8tI1pJbRLuoj9//KHbwUAQghZzCZfYAkwf5ZYFOqp5z73fyTSRRCTlgv8y+WcQ43HMXHhAmaHR6FGo2bEZ5gxl2TK0dclt9U5DFkG5lLMzJ9IbV6qJcgA+pmEPXWrlIJiHCptmmFqeOtMoNNnJ4RAL+owDIaH33MfNm1Zj1QiA+rCAPZ0qigUdfzGXzyJZKYAQgnYSjJg30IA7HvxMv70CwfQ261BlaUG4Pfgo/OZO+x+ERfSzlmvmWcQ7s+vV3vfJl4/bN8SBH4gZu7eNdfIiHW0f+5eC/glEhyDl3Soau333Jq5F5AVFflUFkPHj0KJRkO1SMgSxcRMBvrQd38dMJ08FltAZztZEswfYDp/SJIkpVPJuW1bNqzK0413heX8YUlyagJrtu00472UHx7GgUiEoFgECjqHw5q45IQDKBY5+ropmEOYsJaDQFddLIQTiJ9QMI591JeHxAIC7s4doTGBdZUEJgA0DAMSlbBrz3aMjU5iZnIWkYg9A8g4EI8omE0V8NzhAbz7HTuhKhLYCgPoS364/wI+/ncvYW1vHEo943f9fDgXprOabbufZc1pg2Kr41bfZHthZqeuUAgoim4gBXWBhQN+pQLQ1UuxfrMEvejt6LWkhQOSDBgGwelTunmm3kcWD6eNiiWEc0hRFRdfeQm5xBwUzd55LQghzNBLDFJiZmLwpR9/9ldCu1EIsmSYP8AEgADw/BNffj+l3NAZJB6C8wcAyKqKQiqJwRNHoWimKasyDg709cqQCG+biOsyBdJZjtmUmUvR7rSKFZ4AACAASURBVEsVYciEWDSvvjx27sK7dh+TsuPEXK8fAAvoyoY0waL4YQIdF9g6doUQgmKxCMY4Hvn5+7Fu41qkks4MoM44VndHMTGdwW9/7GkAAKUrYWDcpPqb+c7TZ/DJr76EdattnDuur43jV+3cIfLtVnQ9Gnn1V9OH3/Yuz7bV1q4z1/fF4cLtvbSrdHyHFwD4cZjODopGsGGrhOCz2C8+IRRQZKD/Qgn5Qu05P0+x+R6rrznjkONRTFy8hNnhIajRWKisH1VkeXQyjdHXvvwewLRQLnZzryVLhvmzxIqb062mzxe0Pb/Q16OBuR99af5eqobkxBjivWsR7+0BK5nhXzg3wZIsE2Sy7ZP6jRAgmzdzGpPySyZ6Tm6xMICOuj7OAXqOy6bAldFzUPJsEyIT6NkHABAC3TAgSxKuvX47RoYmMDczBzWi2q5kjHN0xFUMjaXxxtlxPHrvjooTyAoDWCuczz+T//DDk/jSt17HxjWdkOvi+O2+3nTuyAumbKv073jhouem02wfApsSpwK/oM+zTQu6tkUBAD/OAWaY5/w0jYC1uZOHZe4dHDAwOsYbzvm17N2rqCjkC7jw0vOgkhzqvEMJ02cSBapmjv/j0UM//BtCCFkK5l5Llhz4s1D12JX+E9fefN8vEqVznSyFk/fXvCGQmho3zb+UmrQfKZt/NYJSCSiU2sP8SwlQ0AFKOLo75r2aVwCgi74f5w4HhdBAIMTNR87jJtB1A1SWsHPPNowMjiExm3QEgJwDXR0qzl2cxeBYCve/bUsZALa5KcuHVH8XX/nOG/jqvx/HNes7IMFk3Csp266vc+7w+P6CBHwVvYUCfVWFwu38AEVR4CcC+sqFnsDP5fNwwDznVwDWbZTRs4qi1ObmXgv4TU8zXOxnUNTG+prrhg5s+qz6m3CY5t7DLyOXmA3V3Ms5Z4RIUiJVwP5v/96tAEAppUuF9QOWIPgD5r/k/MzpfdLae9/f1x2jYX3lkiyjkE6jVCxg9dY6718A0ShFNstNTNgGLy6lQDbL0dVRG/hZBAA2CxJt28IeMLmCqyDPAbro2uq3yAIKtWsBBLbCBhJCYOgGZEXGzuu2Y2RwFInZFDSHM4CcA91dEbx+egzZvI67bt4IQrACAGGyo7T8JXz+m0fwzR+fxKb1nRUwUQ387nfJ3AGIgz0fKp6Az7N6gUGfWzthBs8qvwrAr7OXYv0WM31bO78anJvp2nJZjjOndEhKbbIEkbAuXuZeLR7F2Pl+jJ49AS3WEaq5V1EIhsfTJNf/rV8ZHbpwfKk4eVTLkgR/nHNOKaWp5Nz0nt27tubomttimqTzEPL+AoCkqkiNjyHa04uOVatglAEgh2n+VRSCTKY9cv8SAAYDigbHqm4z9Et1Xb1yOwFAW30/LGBdwVIGgfV9WQBQVRXs2L0VVwZHkZpzA4AcPR0aDh0dQSQi4S271/q6dzsKY7xyZvJDX3wePz5wAZvXdVZtsCzgtwP3P7q3IXMHEA7gq+iFCPps2/s18Qq2qdQJgrlWzbwNugLAzygBmkawZZcMzgTAzxIXSgFCgdOnDBR1M8KEm/gx9/JyMOdsOo3+l1+ArKoIc6YhYEY2b9Bievj4y0/+1W+Vx7DkfsElCf4AVOLoXDr94g823PCfPtwZUyXOwUhIRn4iSUiMjaJvyzYoigrODIAQMA5oqhknL19oj/N/lJpn/2IaRTRSG29qsQBAV92gzcDlwtAAoI2ipzlXQCloIEiImQtYVVXsvG4bhgdHkZxLOZuAAXR1qnj25UGsXx3H7q199udIl4EwbgK/XEHH+z6+D0dOjmHT+q5KSBw74Ndwxk9weQkS8HmqNAP6qgpDYfv86DtUhAb8AHBm3njLtTIkuf3P+RFi5u09d9ZAMsl9h3XxAuaUUFBFwfkXD6KUyUBWwzP3ApxTKtHJ2RwuPPexu9LpZEKWZXmpsX7AEgZ/VuYPzjnvVWbfKMZu+qXe7vCcP6gkoZjPopDKYPWObeBFo/LCMg7EIhS5HDeDJLfBi0wAZPMm+1cfsq2dAKBfM7BjnV15yCxgpb5VEFhWEtMjKOk6NFXFjuu2YXhoFMlZZwBICRCPKXjyhYu4dtsqbN3QZYYSaoN3RFi4CZxHJtL4jY88haHxJNavjsMw6oDfjTtw3yN7kcsWYRjiE5lfyqFllq+ssCCgr64gKLYPCNjMW1XgCvwAGEVg43YZ8U4Ko4S2Bn7WOb+BAQNjowyaTwcPMXNvBFdOnsDUpf5QgzkDAKVgU7N5Whx59hNnjh34LqWUGoaxJKP+LlnwB8xTreOjl8/u3HPrzxhS766IKhk8pBA2sqIiNT0BRYuiZ/26mvN/hJrx/9IZoy08GykBCiWAEoLuOEE9CdEA9kSAS4sAsFK+QADQVr8FAOjWrqZukYNAUgaAiqpix24TAKYczgByABIl0DQZP3m+H3fcuB7rV8eXBQCssJwEOH52Eu/7+DMo6CWs7o7CsGH87ntnmfEr+XTuEBxLIGbiqwT63Nr6ZvscKsMGfgRAKQ+suYZi1ToJegFtD/wiEWB8nOHyJQbVw8GjsQMP86/BoUSjSE5N4dKrL0OJRlsftIsQzpnOICXnpsdf/MHHHgv1ZgsgS95ISalpaD30vcffk0wXwTkPLfYf5xxqNIqh40eRnktCVrXKLoMxQFUIerpk6EtyH1ArHOa5jMlZHYWiTd7fev0WzsyImk0q5bxWwalP0Vyc4P7MP9bncLyvS4HX4mf3+RyKGutdPkd1H65zLp/vx02PEIJCvgBZlvHof34Ivat7kE5lbeMAMg6osoSuDg2/9+lnMTCaAKVo6zzAnPPKuv7Uixfx/k8+DVmh6OmMQLcDfo/sRS5fdu6wmZU5BH+/+jbWMxHUc+F1P5dCYeBn8874mQ/c7uWWUceuUBT4uc0HlliBnNdsNAM5tzvwU1Uzg8fFCwZkBZ6f1xXo2QhRZDDDwOVXD4NKEkioZ644pzKlo5NpDL/6hUeB+bBzId40VFnSzB+AivlX13V9XWf+fE7d8ws9HZoZKisEoVSCUSwhPTOFNTt2ofpAnGn+bZ/wLxSAbpisX28ntc012SwDaNvW4ULUDOyHLXTUD5AFdGvj1a6mvgkmsKIjoCj8mNZ9N9VnALdftw2jQ2NIzKSgRTRbYKfJEnTG8ZODl/DIPTsQiyptmQWk2rHjG98/gc/+w6tY0xOHpkq2Z/zue2RvQziXZlcUUYZPSE2A5XPsx8eGx60gKLYPENyglgs971t1IaKrl4BIlGDzDtnM4btkIYO3WJ69hSLH6ZOmXZtKjTo11w2d2PRb9TdhHEpUw6UjryIxMQI1Eg31S6WU8OlEntC5I1859tKPvrLUYvrZyZIHfwAq5t+RoQtv7rnprnfqUvdWTSFGaN6/ioLc3BwMvYRVWzY7h39pA9OW6fzBEYtQRDTScP4PWFwA0FXXB4jy6wzi2pdHQSsgULh9kCCwrEwwDwAVVcGu67ZjfHQSM1OziNgAQA4gosnIZIt45vBl/Ow7drVdGjjOzcwmBuP4sy8exHf3ncXGNR2VrB1ALfB7xyN7fQdwrrlf5T8+9AWUFivoq9SJAjm/+gEAv/oypgNU5ti6SwaVCbiBtmb9ZBngnODMCR3FIkzWr/q5EAB+biwgZxxKLIrJy5cw/OYxaPFww7qUzb00lc5kn//XP9kLAGE5li6kLHmzryWW+ffFH3zssem5HAiRpLC2ApxzKPE4xs+dwfTQFajxaCX9G+OARIBVvVLbmLUoBUamDTOWocAkamceajCLOHw1NXoeC4mf3b9lAvNlHvIaX12h26LRrFmrpt7FZOXZntt/frt+hAFChcEgKOSKIITikf/0IDZuWY9UImUL6AyDo68rgpnZPN77+D6gDJaY3a5iCUkF2BHg/OAs/q8/fAKHjl4xY/iReQOBBfyuLQO/XK4I3WfmDtHfs6GNh5KIud+xr6pCt3u18i7UvAdufVbXubwzdoWOc4dNY0/gx1EJ47JpuwJFJWb6tiUPG5yFEIBKwPlzJWRyHLKHZ2+DeAE/ziGrGnLJNAaOHoESiYS+zlrm3pnjf/2zwNI391rSFswfgErsv2KxUFjXzUaLkd3v6YorjPNw2D9CCAilmBsdQd/mrVBUDdyoDf8CEGRzSz/8CyVAvmT+vzNOHT2am3Xw8GTMmjTtLrgZuKqwWVOwV9ua+iaZwIqeoKKQiZmUM4FQCTv37MD01Cwmx6egRbWG2ZxxoCOmYHgyhRffGMHP3rerAgCX4oa62sz7g+cu4ENfOACDcaypcuwA5oHf7ut34v5H9roGcLbEaYPjJcLqHmDPsz+PDZpjneAmrKZOFMRZ5S2CPlt9H8AP3DT3btwmoauHQl8GGTwiEaD/vIHJSe7p2Qu4Az07oYSCSDLOv7gfpUwWcohZPACAUm5MJ/JUy5749uGf/stn2sHca0nbgL9qGR06+9qma+/6eSXSe40sw0BI5l8qSSgVCsjNzmLNzp3gRu35v3iEoFgCSjpf8i89pUAmy9EVp/OJ5wMEgLZtfejVlAd9DhDuk/ZVB4EuykGeDfTqkxACwzBDIO3aswOJuSTGrkwgEmmcoDkHOuMaBkaSOHR0GD97305ISxAAWvH7AODxv30RX//em1jdF0Nck2FUrXbzwG/+jF99AGfAGbR4ia8mgoDPtV8XEOTa3geAq9T5beNQGQTwE9Itz43FArD2Ggmr1lMUC8sD+A0MMIwMN4Z0sW3jWVDH+jEONR7B4LE3MD04EHpYF8u7N53J5J779h/cDrSHudeStgN/VsDF1OjR70U3PfgHvZ3Rcr69cH40WVGQmZ0BONC3+Rrohcbzf5k2OP9HYOYdzRc4VnXNx/5bCgDQUz8sFtCjjdt9hPq2q2+VDfSjbKNKCAEzTFvXzuu2I5/PY2RwFIqmgNRpc87R1aHiymgKB18fwrvv2wFZojDYfAq0xSqMmyCVEIIr4ym89/F9eO3UGDat6wSF+a5YQsg88HvHI3uRL8fxA0FTQM+SqwX4RO4dCOjz2c4NOPs189oVeAK/qjkxXwD61lBs2Gymbmtn4RyIRIHREYbLlwxoNr4XwcTzi2J66AoGj74GNR4PZvCOwrkkE3JlPE2mj37hganJ0aGlmMLNTdoO/DHGmCRJUi6bSW9eG0lnle3v6oqr1ZEXAhdJVZEYGUaspw8dq/oa0r+pKkEmu/Tj/9HypEYpQVc59h9w9QCgp24YALBcEbop2KYwCBAo0k+Nns9HlqAMABkDYww7rtsKQiiGLl6BrCigdWcgOAc6O1UMj6Vx8LUhPPIz200nEL54GUCDcUhltu+Hz53HB7/4PDK5EtatMgM3Vy9ahBAkk2ns3rMD73iXeBw/O/GNE30APtf+FznoA8Jl+9zu3TDeMuPX1UOxabsEQxc457aExQJ+U5Mc588ZUGyssIGc89M05NNpnD90AJIsg0jhQhdKuDGdKEhS4rW/P3Lwe19uJ3OvJW0H/qrlyqUTL22//r5flpSONWGaf63zf7OjQ+jbtBWKFgEzdHMR5Gb8P0IJMu1w/o8CmRwzzb8SueoMoJNuTXkLZmDXNgthCrYpFDblejTwiz98gUFiHg0olQxs3bkR0VgMA+cHQSiBVDdxcwZ0xlWMT2fxHwf78TO3bkJ3Z/ms4CLCf5ZJmhKCmUQef/bFg/j2k6fR2xFFR1ypZOywpGLqtYBfvhzORXAOaAozhAD4RMZy1UCfi0KYwK/ezAsAIECpCMQ6CbbuksGM9gd+mgYkZznOnilBVkjDnOh5zk/geaWEgsgyzh3cj1IuZ+buDd3cS6RkMjH3/Hf+9B6gvcy9lrQt+KOUUs45z029+UNp3dt/p68rFqr5l0oSjEIRqZlprNmx0z7+n27GPlrKAJAQwGAEBZ2jt4uiOpz2gmb5qFO4KmbgckWzYG6xgEDRvhr0BRsVCiVs3LIOvWv6cPn8AAzdgKzKtYwSBzqiClLZEr7/0/O4YecqbFzbUa67uiygea6IVM72PXHgAv70cwcwNJHCxtVxSBIaYmASAMlUBruv31kBfm7OHU0vZT7Bnue9fLB8tjo+wVul3g+As+quNttXfUGAUgnQIgRbr1XMqrbiiWrFAn6ZDMfp0yWAkMZEAALPghew5oxDjUVw+cirmBu+AjXkc34A54oi0aGxFMZe/cy9szOTo+1m7rWkbcGfFfw5lUrMbV2rzGaVnY91xdTQgj8DVvy/WeiFAlZv3VIT/49xIB6lyBU4yk7BS1YoBXJ5k9HsjNamfhMCgKJ6oubVBTIDu7ZpBlgtIAhs0AsQCFbaOH5nBIV8CWs39GHDNetx5fIIsulsQz5gxoFoRAbnwA+ePY9VPTFct72vbEZeeABohj4xHToIAc5fnsGffekg/n3fWXR3qOju1GAwbrvIpZIZXH/Lbrz9nXfN5+olLYC8yqCa6yNIwGer1yzoa6KtL9BXrggV+AEoGYAscWzbLUOSzdh+i4m1DlI4BxQVKBQ4Tp0swWDEjO3n1c6zoB74MajxGCb6L+LKyWOIdIQN/ACJgk3MZKk+/vxn33zlya9TSmk7Aj+gjcFftVy5dOrwzj13PGDI3ds1VTIQYnxDWVORHBuDGu9Ez7o10IvFmvy/0Yh5/o+jkSJfSkIokMkzdMcpJInUTMhBA0DH9g4XS4oFrKpoFQR69eGoEzAQrLSr/k0IQbFQQldPF3bu2Y7piRlMT8xA1WoTfnIOqIqEiCbj6ZcuY3Imh3tv32SeoXU5YhCkcD7vxUsIQTan40vfeg2f/sarSKQKWL8qDkkijRlvyuNKJ9O4+Y4bcfd9dyCbLUA3WvD2bxLslZsKVzbF8jkUhgb6XBT8sn22bfyaectiGAAlHFt3K9A0Ar20tDf3bmJl7yiVCE6e0KGXzCDOYTh4qJEYMjOzuPDSQSgRDWGjaUK4kc0bUj4zfv6F7z3+nlBvtgikTR/RebGQuyRJ0p2/9LXCNWs6JQ4wQsI5/wcAnDMYRR3XP/AQOnpXoZjPgZRNRjIFcgWGiSkDIZ9ZDV10HejuoNi6TkKxLp9xuwNAtzatgMCmwJtNYVNsoEDDViYMApNJUzUVkizhtUNHcfLoKURiEciy3LCrJ4RgbCqNa9Z24oO//jO4addqALVx9YIUg3MQjkrfhsHwzR+dxHeePotkuoh1q2KQJNJwts8aq6EbyGVyuG3vLbj17puQzRTADR+2hhaAXrm5L4WmWT6HwkUD+soVYbN9HGVzP+fYuktBtJOg1MYhXTg3s3cwBrx5QkfRJoizpVdz3dCRh/mXc0iSCoMbOPXskyjm82Yc3ZDNvQQgY1NZnPjxB9bNzkxNtDPrBywD5s8y/xqGYXSTkeeL8Vt/dVV3BMw8xxPKa0opBTcMzI6OYvXWbZAVpTYAtGYxCkv7/J+V+k3VCGKRRiakFQDYoOvBjjWl64M5C9oU7NZOhAl0rG+SDbTVE2jo+wUiBCXdADMYtu/ehHhHJ4YuDpVzBCsNC0dPh4ZEpojv//QcDJ3j9hvWV5h0w+AgtD6AjD/h3AzDRKnpyEEIQaFo4LtPn8WHv/wCDr52BR1xFX1dmmNOViIRFAtFGCUD97xrL268fTcyqTwcHVY8wIav8ftUWGjAV6PTDGB0UQib7WsorwN+nJkM1dZdCmJd7Q38wK20bcCpkzryWQ5F8wZ+dv14qRBCQTUF5198HpmZGaiRaPjmXonw4YkM0Qf/9f+5cOaNQ+0O/IBlAP4AVLJ/TIxdubR18/rVeWnDXfFYeNk/AECSZRRzWWRnZ7B6ezkAdHkxYMx0ANF1IN8GDiDpHEOPjfnXqm9o49CPbf82F34AoJC+D9bMtykYVwkE2lT4WZeaAYKiahZ4KxRK2LBpDTZu3oTJsSnMzSSgqLXhYBgHopqMaETGi0eHsf/VQazpjWHLhi7TLAuTCTTjaLofpbAYJFY+p2eZdS2mb2Imi69/7zg+/tWXceC1IWiajNU9UUiUwHBYBgglyKVzUBQZD/7c/di64xpkErnKNxH0kiXUX5OAz1E3BNDn1cdiZvuA8tEABmzaqaCjm0Bvc+Anyeafp0/pSKc5VEHg58rw2ZRZDh4DR1/H1OVLiISct7d8VyOVKUlG4vR/HHryK39ICCHtkL7NS9r1cW2Q6h/0wV/5q0sdXWu3aRoxOKehAWBCCPLpNNZftwfbb78Dhcy8+RcAZAKMTuoo6UsbAOo60BEn2LpBBtMbX3A7wNQ0AKwqCNMM7NnGrykY4YNAR50W2EBH/YDAIGcckVgEHMAbh4/h9NHTkGQJWqTRzCNTgkSmiFS2iFuuXYv/8tgevP2OzQ19MovNI2awZcpNkGb3/WfzOg68OoBnXh7AsbMTKJYY+rojiGpSpR/bz0UIOOfIpDJYv2k97nl4L+IdMWTTte94KyK8+rQA9hz1mwBsDfWLAPTZtgsA+Bk6sGm7hO4+ilIB7buS1gG/ZJJD0wBW/8yJAD8PHc44IvEoxi5exKXDL5kZPFoZu4BwzhkAOjWbzB/4xq9GgfmjYiHf+qpLuz6ytmKZf1evWbdx+0P/c3jHNT0wGONh7tkIgHwmgx133oX1u3YhX7U4UGo+8KMTRvkcU1ijCF9KJWD9GglreyiKeuODJcyYOZx78wMAG8oXmAV0befw+UTbeo1JtA8hXT99++ikXtX0qKWId2oYvjyBwwcOIzGbRKwjZh6hqFo1LJZuLllAJl/C9mu6cNfNG3Hf27bg5mvXeN+cc5wdmMGRk+N448w4Tl+cwlyygFhEQVeHBkWmYJw5gj7ABH6FQgF6ScfNt9+AW+6+FYZhoJifd+7yK74WuSaZOE/9JgFfjU4roPEqm3gb6myAH+OmJ+812yT0rjLTtrXzKmqdS28V+Ak5eESjSE9P4fT+ZyCpKkI8lm/dlcuSRC4MzWDm6GfedvHciSMWRgj5xotC2vixtRfrx73j3p//tfjO//KVdatijPPwvH8Bc3HTCwXsuf8hdK1eg2Ku1gGkWOIYmyx5mq0Ws/CyOW37JgVRxd5MJsoALjYAGHQbq3IhQKBIP0K6fvtvoiPOOeLxKErFEl5/6Q1cON0PcCAaj1bqLZGo+QWmMyUkM0UQcPR0RbCmN4Zr1nZiVU+kvHgwFHWGieksxqczmEnmMZcsgDGOWERGR1yBpsjgMB08XD9nOXNJNp1FV08X3vaOt2LLtg3IZApgjAkBv6aYjADAnmubpQb6yhXCJt6qwmbZPmAF+IUF/MA5JEVFqVTEqWeeglEqQVbVBQnrMjKVoWzkyQ8e2vfNjy8Xxs+SNn50ncUyAb/jFz78k441NzwajykG5yS884+EwCgWQSUZ1z/0LkSiMZQK+XkAKAPZLMPk9NL2ADaYGftv5ya57AVnrxfoOcCqAj9mYCf9mvKwWcByZasg0PMeguPw3cbvfQQ645xDlmVEowrGx2Zx/JVjGB4YgaLI0CJaBYBZQimBRAgY5yiUDBSKBgpFHQbjlTO2BASyTKGpEhSZQlUksw0AZjDvA+iUABzIZXIAAa67eTduufMWKIqEbCYHkHmnk5aXqxaAmK92QQC+FvoJA/TZtguA7QOWF/CzvHopBU6ecAZ+lm7NdYOCxzk/zkEkGZRKOH3gWWRmpqFGw3fwIIQbuZwuJSbPHTz4bx96h1m2PM76WdKmj6+7VCP8O3/5f+e3bejRDMZDDf9CCEEpn0eksxM3PPBOEFAYRrGCcGQZSCQYZpMG5CUKAAmAog6s6qLYuE5CseQcUHEhAWBDuR8W0EZp0YHAqsqW2UCXylYmC7/345xDi2qQJYqhy8M4fvg4psanoUZUaFojCATMZ4UQCkLM566M/cCtfxzgnAlnhrJMzoVcASVdx8bNG/CWu27G+g2rkcuVoOt684GnmwE+rXQbwP28WD6RvhYM9FUVtsL2AaZjBzOAa7ZL6GnzM34LC/zMdVGOajh/6AXMDA2a5/xCxl+ccyZRQgdGZ/Ov/suvxRljbLmxfsAy8fatFyv8C+ecx/TLz+Rit/7amt44YTzc83+SoiCfTiGbSGD1ju2NHsBRM1xKrrB0z/9JFEjlOCKqGf7FsqSJArurYQYWauPTRHq1QaCnXhP9+WrX4r0JCEpFHUZJR++aPuy6fhdiXXGkE2kkZhMwdAOSLEGSpIrzBWCCRs656axR9c8q9xJKaQVY5rN5FAtF9K7pxV0P3Inb7n4LtGgE2UxeLOWcx+2CWOJc+wgS8LXYXyugz6v/sNg+YB74bbKAXxFtD/w4B06d0pEKE/jBfFfVeARDx49j/MI5RDoWxLOXK7JE+6/MYub1z+6dmRofbtf0bV6yLMEfgEr4l+nJsaHd29dFEnzDvd0hp38DAPn/Z++9wyTL7vruzzk3VOrcPd09eWZnd3ZXaZXTKiDJgEBGiGDMy/sY0PsaTJLBfm3AvGAjwGAEr7EBgfWiF3jJQiCBEBLCklabgzZpw+zk3NPTOVW84Rz/cetWV+eq6lup536fZ3e6655z7u2qe8/51C8dO0F2bhbPKTFy5AiqKjtCaUinJK6jKXlBtmI3SgC5gmKgR2LIqp0ZNmu7SwDctH3EVsA1x+qwAlaONwkCaxljxzb1jLdDgyhvVwFluBK4JRelFGP7Rzlx9wmGRoZwXIeVxRUK+QJaaQzDQBqyHDcral5EQtgL+5RKJQq5AlprDhw+wOve9lpe85Z76Ovvp5gr4Ho+ss6/NMrlrFHYq/c6orDyVdq0GPq261cr9IVfyJWvOXLCom9w71v8LAuUEkE5l5XawW9jgxrATymSPWmmzl3k2rNPkWxBZi+AIYS+MZsVcvqLP/vcV7/4iVvR4hdqj97Ktanax//27/ylB/pGT749lbAUTdz+LTgvFHNZjrz6DRy6+861GcBlWrg56+K53WsBDMq/SI7uN/C81dd35dqtp22nWQG3abQjQNbwlNYKWWBh+wAAIABJREFUbfU+8J0CgxAkFJmGJJFKIAQszi9z7eI1Jq5OsDi3iFNykEJiWiamYYIM4E6ue4jCuV75Ct/3cT0XFBimwcDQAIeOH+LQsUMMjfSjNJQKJZSvNpRwacViteM5InQfR2Xlq7RpdIwmuHg3HNsG/IQISrlorTlyu0VPr9jzFj/LBtfRvHTKJ5+vD/zWv1RLSRc7nWLp5hRnHrwPM9GKzF6QApUrunLx5qkvPfypn/8ncOvF+VVrj97Otaua/N/y3f/v4v7RkX4hm7v9GwQTi1socOIt9zJ69CjF3NoSMEpppqaDTbO7FQBdF8ZHDEYHJaWq8i9bunBb7AbecGyXVsDd9Nupb9ggKmtgTeerZ9w6Gu120gkza62EhW2baAXLiyvM3pxldnqWpbklsitZXCeIy9Oq7PZFI4VESIE0JLZlkcqkGRgeYHT/KEOjQ/QP9mNaAqekcEqlShmaVmg3oFdHk63bR+Em3o31sc3QB4AIvrhKoTl6h0Uqs7d37tAaEgkoFjUvvuDjOBrbbjL4JVPkV5Z46b7/iUZghL7mJkprrTxfyZtTs/OP/+UPDcOtDX4Qwx+wWv7l4OFjdxx62y+cPXagr+n1/wC07+P7Liff/m76R0dx8qsAaEjwXM3NWRetuxMANYHb5MRBC9teW/6lWQC4afsmWAHXHOtQCNxxrF2AYF19amxY7zWEFjwpA2ufZZlII7DaOK6Dk3coFAr4rh9AoNYYloFpBJnDyZ40tmVimMGZXcfHddw140atulaaJsDehj4RuIp3svLteHgX0Lfd2HW7hQV4LhhWsGVbMiFw3b0Pfrmc5qVTLp4nAtdvg+C32ee45nelMW0bx3U49aV/xHMcrBaUdAlMLYjp+Tzn/vGnj9+cvH75Vqrnt5Vu2Zi/aoUJIEuLC7PDqdw5L3P3d/T12GjdXDgWhoFWmoXr1xjYf5BkpgffdcvxR2CZgkRCkssH5Si6bRISgEaQLWgGe2Tt7tU6YCoqN/CGY/VaAbdouBsI3Kk/1H5P1Gu1ayoMNniC9V3CWD0A5Xk4jotTcvF9H0FgGezp6aFnoIeBwX76B/vp6e8hk8lg2RZaKTzXo1R0gn6eXxmz4SxeGgCyOjo0ukxGDXyVdk2Evk371wB9G47V0keAWwIrIbjtDpNEQuDtcfBLJmF5UfPSSy7KbzL4aY1hmigEZ+//Ek4ui5VItgD8wDIlE1M5kT37h991/vSzj8TgFyiGv7K01loIIaYmLjx/5MjBAznGXt+XMf1m7v8LwR7AvueyNHGdwSPHsG0b5fkgBEqDbQosS5DLd2f8nxSB+9dxYaBHboyv2aJfPXGATbMCrnuhkyEwMmvgJo12s/7V3bfRk62DNq01yvNwPQ/P9XBdF9d18VwPz/NQvh98oYItgS/yZanOAXdz/npgr55zRQF8tZwvahfvtv0EOCVIpwXHTlpYJng+e9YvFoLf7IzizJngDzWbCn4Etfwsi3MP38/K7Ax2Kt0S8DOE9ifn8lLNPfrRr973iV8XQohbNcFjvWL4q5Ioz/5Xzz7x2dtf9rYPaKvvgGUKH5oPgE6hwMrUTUaOnUBKgQ52qkdpSCQEphTkCt0JgIaEfCkojdGbDsrZ1GIFrMsNTGusgDX3qxMAd+pb6xhho2aBYM19ojjvbjtXQd36/yI36exyHdvtMridhSyKc9ayTncM9K17Ydt+ZfDr6xccvcOsJHvsVfATInD13rihOHfOxzJBGpu/R42C3/rjQgjMpM3Fxx9j4dpVEplWlHQBKYTKl3zDz008/cCnfukDsLrGx9qzt3jjChNAbNtOvOoDv7ty7MCQpWluAWgIHpBSPs/A+Dh3vP1dKNdF+15lkTINWFrxWVhSXVkEWhNMqofHDXrTEn+Tb9bNdANv2qdDIbDSZoeGUVoDaxpvi4ZRTiJ7eUKKcrlrBPbqvYZarHw7Nmky9G04XqO1TxPAjefA4D7JwaMGyg9q+u3VmzAEv8uXfK5eVSQSwWtRg5+u+kEAVjrJ5WeeYfLMKZItAj+ttdJKy8sTM9ln/+ZHB5Tv+7dyWZfN1IUY0VyF8X+e57lp7+Lfu31v+FdD/clyVlBzvzWYtk1ufo7i8jIjx46jfR08haJcAzAZ8Ge+Cy2A4RuXzSn6eySmUa7/twsA3LJ9A27gbc/dQJ8Nx+u5/vXHdwuB5Ub13rydAIM1nK5j1MwlrRWwV2kfhdWwhni+LcdpIvSFx7QKkjvGDhrsP2yUS7vQuTfXLhQWbzZMuHDO58YNRSoBNBP8yuPYPUmuvfACN156Hjvd0+ifUJe01kpKIWcWClx54OfvXllanL9VCzlvpxj+NlGlAPTs1I2DI3LWSdzxzX0ZC9XkBBAIikCvzEzj5gsMHzuK9nzC4KSwCLSvg9T8bgNAKcDTgkJRM9AnVyeZWgFwi4NtsQKue6ElEFhDw2aBYM1jb9F4D66pTVOjoNdg85qBb8dmNULblm1qddXupp8I9uj1fTh0zGBkv8R1d+jYxQqLN2stOHPaY3ZGk0yWAXiL9hte2+SFHcFPaRI9KSbPnOXqs0+TzLQG/EBr05TywrVlsqc//oGLZ597LE7w2Fwx/G2hMAFk4vKpJ0b3H7tLJ8demUoaTU8AAbASCZambuJ5HsOHD6PccpXkMgD2piXK785t4KSAkhPU0hrok/iqibF95RdrtuhVvdgMV/Ca4w1CYKVNFBBYbth0ENym060MhTsB0K7GqaVPVNbD3bh21x1oGvSV5bsgRFDKpbJP7x5VWMqlVNKcesFjZaUMflvBW4Tgl+xJMX3xEpeffAI7nW6206wiwxB6arYgEov3ffiJB/7mY3GCx9aK4W8bhcGhE+cf/etDd77ze02rZ9g0pU+TdwABsGybxZsTgGTw8AFUae02cD0ZietpSg5dB4CGhFxBY5qCnpTAU1tDUTutgNuNt+FYuyCwhsb1WuwanaYbnt7r+Wy6SLVYySIds5a+LQa+bds0Co11unhDeSWwk4LjJ01SPQJnjxdvDku5vHjKxXXATjQf/FCaRCbF7PUJLj72MFYq2ZLdOwCE0P7CUskozD7/mYc++1s/FLy2Vz/h3SuGvx0kpZRaaz194YHfTx961//Vm05ZCFQrbirDslm8fg3DtOk/OI5X8iqTldLQk5Z4nsbpQgCUElZyikxKkjAFfnkG2Qzq6gXALV9uthVwkxdqhsAtGtd6k9ViDaxnvLDxbm/ySB6SGgdpxSxfM3xF5EZsFezV3LQLoQ8FjgM9/YJjd1hYVpDosVexIEzsmLqpOHsuyGAJXL8tcPWmUyzenOL8w/dj2jZCmo3+GXVJCPxCSRmqOHvu/r/8D/fC6trdkgvoQsXwt4PC+D/XcUpi+blPJMbf/qGeHltorZsOgAKQlsX8tauYdpLBA2N4JbdSj0wIyKQkThdaAEWZVlYKmoEeAylXJ6GmuoG3ab9lnw6AwFrGWNMmahAsd4jihm/6mtuMEzR5CYli+Hphr+bmEQJfLeNEBn2aSkbvvjHJodtM0Hu3lEuY2GFZcPmyz5XLKkj0MFoDfnY6xfL0DGcf/grCNJGmudlokUtrrZSPcW1yLv/VT/3Ecd/3vTizd2fF8FeDqncA6TduPrJivPxf7BvKCKWbvwWcEALDspi7dhUrkWZg/2gFAMP840xK4rqakttdAChFUEy16CgG+yR6s+3fmmUFpAWu4E1eaBUErmnXDBAsd4r65t+Da/IaRbkUNgJ7NXepA/i2bdcm6ENQKd2y/6jB2CED32VPZ/RWEjvOeEzdDPboDee4poNfJsXy7CxnH7gPYQgM09r8BBFLa62EFHJ6Ps/l+3/u5NLiwmyc2VubYvirUaEFcGry6oWDw3ImZ55430Bf87eAA0AIpGkyd/UydjrDwPhGAEynuxQAJRRLAQQOrANAaL4VsFFX8LZjbnasTgjc0KaFIFjPuJt1auYD0cnrdjOXOr3hhwb61thw18C37mAzoW/N8dBzIIIyLtLQHD1hMTAscZ0dBulihYkd+bzm1Ise2XJiB2z93kUKfqkU2bk5zjx4HyAwLLsl4AdaW6YhL1xZYPnF337X5Qunn40ze2tXDH91KMwAvnHlpa+evO3A4JI//ub+noRSWjffk1UNgJleBsb27RkANCXk8sEf0ZsRqxnAZXWcFbDqxboseZu80GoIXNO2jk4N3+AtAMK9pt2AXt1d6wS+bdvWAXybttkl9IU/Ow6kM4JjJ02SaYHnsGdvwDC+b3ZWcea0h++DbW/t5oXowS+3sMiZB78MGgy7VeAHhpTi6s0VvGt/9YPPPXnfp2Lwq08x/NWpMM7v0ukn/mH80J1v1NbwyWTSaPoWcOVzIw2D+SuXsXsG6B8dxi8Fu49XXMBdCoDSgJWcxrYEmVR5C7gqbQcsrbACbtmvXRC4Tadmg2ADzbccYI+uyTUpCshrqHuUwLfuYNugj4A5HBdGRiWHbzMRhsBzmx2Y0x6tj++7fElhGALTrC++D3YJfkuLnH7gy2ilMFsJfob2p+YKMpV95Ncf/p9/+l/iki71K4a/BlQpAXPuoT87/vJ3fjdmz6hlyk12rG3KuZGGwdyVS9iZXvo3sQBmylnA3ZQEIghiAJeymnRSkkxsBMCwXV0AuM3BToTAWsbY0KZeq2Ut47YaBrcYrNvX7agAb9Mx6+xQb78ogW/TdhFBHyKoG6q05tBRk7ED5R071N4Fv4QNvq85fdpneiqI7wvn+paB38Iip+//Mlr5mLbdkm3bAAyJml9yjNzNJz/5wN/95g/C6pocq3bFb1iDCrOJTNOyXvktvzlz/Oh4vyG1akURaACtFG6xyG1vfAtjJ45TzBYQMvg4pQgmvdl5L6in10WIrxQINMcPWVhG4AJer3rdwNCAW3eHPlv2axQCN3kxSmtgreNt2b6BmaL534RafD52Bpimn6/Ojs0CvlrH3rRNo9C3WWMRuHkTCcHh2wwyGUFpD9fvEyKo17ewqDl/1sUpCRKJVbhrOLGj/GKtyR3Z2SDGTyvdUvATQvtLy46RWzj34MN//XPvCF4TIi7pUr+6CAs6S2EGsO97njf31B8nxt/5b3vTCaFpfgkYCGMADeauXMZKZspZwF5lo25NUAfQ96HodM9OIEKA0oKVnKa/zwgm8S0e65ZYAWkuBG7apkGoaSYIbuizizt8j67Lu9ZuQa/RMXbs0wQrXy1jbQt9BF8UXRcGhiVHbzexbYG7R+v3Vbt5r13zuXA2qN9X7WltBfgl0kFW75kH7wNNi8EPlS/6hpebPnP/J/796yCu5bcbxfC3C4UAmMuuLPWJa18qpV/zfwwNpIRuQQkYCAHQZO7qJcxEisH9Y2t2AtGUt4JT3bUVnCHA9aDgKAZ65LaLREOxgNscbNQVvGXfCCGw1nFqHauRcbfsF8HdvgfX7A2KZJXaJezV1C8K4NvkxbqthZt1KM8PWmsOHjE5cMhAqWDP3r14E4XZvL4flHG5Oamx7LUhPbsBv1pcwiH4LU3PcPaB+wDRYvBTvudhTE7enH7kkz9+W1h9I47za1wx/O1S4U04fXPiylCmcClv3vltQ/2pltQAhBAALeavXUGaCQYOjKEcr3Jc6SAGUGsoFLsHANeUgOmVFfdvvUAXtSu4oXjAdQeicAnXMs6W7ZoEghv6NuHu7+S1vSnLYASgV1PfBiBty7YNWPnWtNkGRoSAUgmSKcGxO0wGBiROuD9vJ98cjUiDkJAsu3lPn/bIZjXJxJomm3et5TPYwtq3vq1WmmQmxeLUVFDA2RCYVgvBD+X7Whg3phadU//wk8dKpWIhruW3e8XwF4HCEjBT189/7cj+VHFJH/kng32tBkCThatXQBgMHjyA8vzybFkGwJREEACgkN0xT5oScsVggunrkZUEkG0BcIsGUbuCd2sJ3HH8rdrsAgJrHW8340d1zltOu4CvGoaL/Jy1WPlqGXNHK1/4sgjcvJ4Lw/skx06YWJbA2cNuXssCw4SrV30unvfRGuyq2snNAL8NrylNsifFzLXrnHv4AQzTbFkBZwgsfr4Wxo3pLFfv/48n5+emJ2OLXzSK4S8ihXF+1y4+//Dtx0YSc+742wd7E60pAk0ZAC2LhYmr+K7P0OFDaM8nTAFWOqgDaEpBrqARojsmTSkhm9NYpqAnJXa0AFaO1WsF3KZBR0LgFi/uCgRrHCDK2+aWAsMGLWINDl1Tw3YA34Y2O7kdBXglkFJzsJzNqxT4fnfMYfVKa0gkoVQIsnlnpht3827atkbw0wqSPSmmLl7i4mOPYNh2sGVb65I7lK+EcWMqy41Hf/HlE9cunY0tftEphr8IFQLg5bNPf+mVdx/bt+iNvrGv19JKtQ4ALctmcfIGbqHI8LGj4IMu1zxQCpJJgW0J8gVdKQ3TyRIENQCXsxrbkmSSAl+vPb5Vv60aRO4KLh9sBQTWMk69423Zvo4BmnEb1eJC7xjVuvA293Q7Nqz3erZs3wroI+AMrwS9A0HR5kyPxHOa9762U1oH+/DaNkxNKc6c9SgWWePmhRaAnwaBwO5JcvPMWS49+QRWKok0Wgh+aOVr5I2pLLNP/eprL104/XxcxDlaxfAXsUIAPP/iY58bHj10O4n992RSht+qEjAAViLB0tRNCssrDB87htCglEKULYAJW2DbkkLRR2vRFQAogOWsTzJRVQOwhmSKroHAdQeitAbWOt6OfdoMg51wznZAR13njMC6GDXwbWhXwzhCBLX7tNbsP2Jy4KiB0ALP6/wvrI0qSOqACxd9Jq4pTCnK+/UGx3fl5i2/uDP4aYSQWOkE1198kavPPo2VTiNat3wFFj+NvDGdZem533jL2dPPPRm7eqNXDH9NUAiAkxce//TI+InXkhy9O500VatcwBAAYHZ2mtz8HEOHj2EYJsrzVgEwIUjZknzBR3UDAJb9sstZn3RSklgHgFADBEboCt6pbyshcMt2EYJgveeoa4xYQANgGaG1sR3At+XLGpxSsEXb0TtMBgeDvXm7wVNRr6qtffNzmjOnfVZWNIkEax6W1oGfgZlKcOXZZ5g49Rx2OkMr6ydrrRVayBvTWQqnf/fdLzz31Ydi8GuOYvhrklZ3AXn4L8aOvOpdyhw43moANO0EuYUFlqYnGTp0GCuRQrluxQVsmIJMWlIoalwVFIfuZAU1DAXLeZ9MSpKwNwIgG3/d+Hq3QOC6g7sCwW0ORAqDuxiww2+/SLQry2HEMYPNAL4NbeuAvtDa5ysYOyA5dNzEMvduUgesWvsuXvS5cjVI0rPX5VPsys1bY1utNaZhIm2bi48/xtS5syQzPS1947XWyjQNeW1yGffix7/pmScf/mIMfs3THn2kOkPVN+47/vlHnkr2H3ntYK/t+0q0DLqFEJQKBZKZNCff9i7Svb2UClW7gUhAC2bmXQoFjWm26soal1IgpObIuEXSDlxBtQLgmmMdBoHbjtEABNY6Xk3tm3S+yMbvAEXmEt5moFbBXr3natjKB8GHqoJ9eTNpwf4jBj19omLt22sKrX2WBXNzmkuXfEolTcLeGfrC/pu+vskLW45R/bPSWHYCpTXnHn2ApRs3SPT0tKyUS/kqtGkY4vLEMgsvfuwDZ5576G9j8GuuOnku3ROqvoHf/b//5hkzM3qyv8f2tW4tALqlItK0uOPed9C3bwQntxYABTC34JPNq67YDs5TYBqCI+MGdvU2cPVCYAMQtCsIpLYv01FbA7dtu4u/ZVfnjfIk3agmQV5NY0QNfA2OKUSwS4fWMLpfMrrfQBCUdNmr94Vtg+sKrl7xmJpWGDLYvaMV4Lcxo1djJ1OUCgXOPnw/+cV5EulMW8Dv6uQyi6f+4LtPPfPlT8TJHc3XHn28OkvVN/J7P/ixq1Z6+HDSFp5GtszOJoTAcxy00tz+lrcyfPgQTraAFqsmKcuAhWWfhWWF1SUAaBuCI/stTKnx1OZWvUatgDX13Q04RWgNrOl8tbZtMgzWPVY3zlI1rp1RLrGNwF691xAF8AEgQPngOZDpFRw4apDpKVv7Ngnl6HaF27MZBszMKq5eVpScoISLqDEjO9L4Pqjs2pFbWuLMQ1/ByxewUqm2gV/2/J998LnHP/+H8V69rdEee8Q6VyEAJhKJ5F3v/a8Tdxw/MCSkVq3MAkYIlOfhOw5HX/M6xk+exC2UKqVgAEwDsnnF/ELwpavTdwTxvCB7+ch+M9gXeAsA3OTXzY/V6QquHG8nBG5ysN4Hu1EYbORctWrX40ZxYbtcgpq1gu04boRWxVqBr56xXScI3Rjdb7JvPChAXw5H3lPSOphDbRsKBc3lSz7z8xrDaIK1r/xiTaVctMbuSTF/Y4oLjz2E8n2sRKJt4Fe8/Mkfevrhz3wsBr/WqQvsO3tD4T7Aruu6+clHPm7ue+sP9/f2JKWkpd9zhWEgDYO5a5fxXJ+hQ4fQGrS/WgommRQkyqVglOrsTGApg0WjUNT09wX+a63XvaHdAoHUvvg1EwTrHb/BJpGrFefs2FIvEbuQmwF8ECQ3uA70DQqOnTAZGJL4XmAF7OR5phGFu3RICTcmFOfPeeQLkLA3/q2tiu+rlHLJJJk6f54Ljz6MMASW3T7w8yY+82+efPDTH43Br7XaY49b5yuMAcz09A2c/PpfOX/4wNhwMmkopWipjU0DTi7H0OEjnHjjWxFS4JVKlThAU4KnNLOzPkWn8xNBPA/SKcHhcROt2bgVXCPJHQ30qxzfrbWsRmvgjmNFAII19YsCWm9x1bzq7dCw0dWzGcCnKedzqOBLWsIWjB+RDA1JPAX+HrX2GQaYFqwsaS5f9lle0dhlEFyPN81y825orzXCMDETFteefZaJl17ETqcRm11UU7UKfqWrn/qxpx789EdbePJYZe2xx647FAJgKpXuufe7/ts5Mzkw3t9jtjQLGII4wFI+R2ZgiJP3vhM7ncJZnwkMzM375PKqawDw0KgZxBRtthVcnTDUaFLITn1rHQPqWxzrhbSmwWADg98Kk1HdS2wNHSKDvR0Gqzs2sEx+nht8tkP7JGMHTQxT4zl1DNYlCl28lgWOo7l2VTEzoxBio4sXWujmJYjvM20bEFx44hHmrl7BzmRa/8xprYQU8vL1ZYqX/uz7nv/qF/4otvi1R7fCfNuRCgHQtm37Hd/9m+dkcuBIq8vAQACATrGIlUhwx1vfTt/IMMVcISjsKQABlgwSQZaWVZAZ3MF3jedBKiU4vA4AoX0QCDu/Z7XCVGRJHZs02O3H2ooEjg6+9SKv4Rf5OTbrH6EVsQJ8BPe774PvQU+fYPygQaZP4Lt7c09ercGyAR1szTZx3cNxRZDQARveyFaDn51K4RSLnH34fnLzc23I6AUhtPI85NxSkfnnP/aBF56+/29j8Guf9tgj2F0Kk0CEEOJd3/NbZ83MyO3tAsAgE1hx7PVvYvS2Y7j5dYkgJuTzmrkFF61FRyeCeB4kE4LDYyZCrgVAaE484E5917TpRBDcpFFUk0Pd4+zFWamB5a1p5V6aBHxAJekqdPGOHZIMDUu03rsJHWFc3+Ki5uoVn2xWY1pgbOFN3RTYIoC+De01aK1JZlIszsxy4dGH8IrFNmT0QrBXr5A3plconP7d93zt6Ue/HNfxa6/22KPYfaouA/PO/+03Xkz07n9ZuwBQeR5usciBu1/O4XtejXJcPM9bEwfouJrZRR/H1ZgdDoAJW3Bk3EJIvQEAoXkQuFP/yvGoEifqBMF6xm2oX5TX0JJBdqEOywZuBPbqvY71wFctzwMpNMNjBvvGTSxT4+xRF29YqDmX01yfUMxPK0SYxQsttfZtaF9J7Egwdf4iV556AqSBZdttsPgp31fSmJheYe6pj7z+/JkXnorBr/1q99QZi7UA+I7v+rVnkgOHXz3Ym1B+i5NAYDURZPDgIU686S0YpoVbLK7bESQoCJ0rdHZBaM8D2xYcGTMwDYFXJwBu8dLmx5voEq51nLBhU0Bwi4bNnED2wuTUzGW2UdCro9na9lt0Cgs1KwX9g5L9ByWpjMBzgq3a9pK1rxLXZ4NTEtyY9Ji+4eNrgW1v/T61PL7PtBG2wdVnn2by9EvY6SRCbhJ42GRVwG9qhRuPfPhl165ceCkGv87QHnosu1vVD8TbvuOXH0sP3/amdlgAIUwEyZPq7eH2t76DzEA/pU3iABdXFIvLHoLOdQNX7wRiWQLf27xdR0BgjQ2bCYL1jr+r/k1QM8/dzsCkLc/dxFjB7YAPVuP6XA8yPYL9Bwz6BkTF7bvXoE+IoF6f78P0TcXEDQ/XFZhWsC96zdm5VWPW1L5Wax9UduxwXYcLjz/M4o0b7UnsgGALeYW8emO+ePn+n7tzZurG1Xjnjs7RHno8u1/VAPjWD3z4/p6xO98xmEkoX7feAhhuCSek5Njr3sy+Y4c3jQMsFDRzCz5K6Y4FQF+BIQWHxw3s8l7AW934nQCBUPvC2WwQrOscOzSOJ5udtS2k1UFwu8oA3qFzCH2eC4mkYOzgalyft8WXq25VNfRpDbOzihsTilxOB7F+BsGOJJv13WbMmtvXEd8ntMbOpFieXeDC4w9Syuaw0+mWu3khAL9iyZfXJ6cWLn755+5cWpyficGvs9TBTrtbT1prLaWUWmt97fRX/nDfwbvfJhLDJ1JJS2mtW752GqYFWjN7+QKe6zN48BBCSJTnBzGCCixLkEkbuK6i5HTmjiCyHIS+nPPJpCS2JdbuBLKJmg2BtYxRaRM1CJYb7+aGakYSx60ChzsuxS1MDqkF9ioSoDQ4DkhDM37I5Mhxg1SPwHODQs175UMMoS+RCOa0hQXFhQs+NycVvgpgEEFdLt5w3Jra12HtQ2mEaWKlEkxdOM/5Rx/C9xV2MtkW8DOk9hezjqGdpetPfvrf3JbLrizFrt7OUwx/HaZqALx+5oE/7h+97bWuMXRXb8YqZ8S31pkipERaNkuTN1iZnWG5uauOAAAgAElEQVRg/AB2OoUq+3XCGJhMRiKFoFAMNizpNJePEKCVYDnrk05JbHtnAITOgcBKuyaBYN19dnvOBjt22G21RnUts7tYkyMp91LPIFXQJ4RmdNzg6DGb/gFRKeciyuEg3a7QsWFZwVaXi4uaSxd8JiYUnhfE+oktoI+tX26OtY/AzWvZNkJILj31BNdffB7LTmBYVsvj+wAMQ6qlrGM42emz9/3ph+5wHccxDMOIwa/zFMNfB0prrYUI8Gny/MN/cftth0fmSyNvGuxPCaWUbjkAAlYiQWF5idmrl0kNDNEzPIByfECjCSAwnQ62hSuWNJ4KLG6dJCFAa8FyzidlSxIJsXkh6M36bvlLNP1rHWdNu2aAYFWHKD6+yG6BDruXtlVEa25US3fdsFduLgQoVqFvZNTgyHGToZHV0i2wN2L7VAh9iQD6llc0ly76XL+ucN0A+rbbCKNea9+Wfeos42KnUxRzOc4+/BUWb0yQzPS06QPR2jAE03M5mZ09c/9Dn/yp14dbmsau3s5UDH8drBAAL770+OcPjCQL8/7Brx/qSwmltQqPtVKmZeG7LrOXLgCSgYP7EVqi/I1uYK9D3cCrAKiwDEE6GexnXDm+U/8tf6mt/5o2EcXH1QOC9Y5d3SnqG24PMEMkitI+ozf8UH/fcGbxnAAwhkYMjh43GdknAbGnoK/avWuasLSouXxJcf2aT7EIdqIc16eJxMW7ZZ963bxSkkgnmbt+jXMP34+bz2O3oXBz+Qq1aRhiaiYv/Lknfu+Rz/zqd8DaGPZYnacY/jpcIeRNXHrh4bFM/ozbc/d3ppOWkFL7IFqOVtI0kYbBwvVr5BYWGBjfj51K4bsuAoFm1Q1syMANrHVnuYHDpOXlnEYg6EmLIGi76hpbCoE7dOg4EKzq2MyPtYNumYbV7KW4Eavemr5VCt2ZThn6BoYD6Bsek4g9DH1BgWbFhYs+E1cVxaLGtsEwt4Y+tn55W29rNG7eBMI0ufzsM1z92tNIw8S0E20BP621MqSUFycW8Sc/91OPfOHjPw0x+HWD9sBjfGso3Abn7le89q19r/zxhw+P9SGk9rVufSmY8vXgFPJYyRTHX/8mBg/u35gNbAR7XM4v+BRd3XE1ATVBduJgr2Rs2ED5gZurYQjcokNU1sBax1rTts4nfFcTQguAsMZLaIo6otRLE2IFq3flMAzN4JDBvjFJMi3QHnh7LJEj3H9XKVhYVExOKFZWgpIKpg3IcgZvp7h4w7blbN780jKXnniUldlZ7HSaNjiBABAC31famF3Ms/D8x7/9+ae+8ung9XjLtm7QHnmkbw2F36b2HzhyYv9bf/a5g2ND6WRCthUAPcfB9zwO3PUyDr3yHrTv4znO2qLQBHsDZ1eCTc47zRXsetCXEewfMdFUbQfXTgisoUPdIFhvp/qbbztIPNnsrCggr9YhKiVbvAD6hoYD6EukBdpl06Lo3arqHTlcF+bnFVM3FdlsUKLKNIN5yY8Y+rbsV6e1T5omVsJi+tIlrjzzJNpXWG3K5gWQUvvFojImZ7N6/umPvO7CuVPPxNDXXYrn4y5TGECbyfT03vudv/Y1EoPH27UbCFDO+NU4uRx9Y+Pc9oa3kOpNl4tCs2oFNCFfCKyAnuq8reHC/YAPjVpIqYNFIFQbIHBDuwhBsNK+wac/0knjFgTDKAGv7qHKIQ8h9JmmZnifwcg+k0RK4/ng75ECzVoFgTGmGYBfqaiZntFMTyuKBR3AoAlaVMFbs1285QN1JXUkU/i+z5Vnn2TmwnmsZBJpmm0DP8OQammlJL3SwuRX/+Y/3LO0OD8Tu3m7T3vgEb/1tKYY9Lf/50czQyfePDyQ0J7fvs9TCIFbLCBNk6Ovfj37bjuGV3Txq/YGlmV3ysKSTy7feVZAzwPbEhwY3aIYdB0QuKHNFh06AQQrfXZx9zT1xqvzfW+X1i/cLTlPjZIysGh7bmDdSqYEwyOSoWEDO6mD1/09An3leD7TBkmw9+7UlGJu1sd1BZYVwGDITtvFTbbL2lfZmzedYGl6lstPPk5haYlEpl1JHYEMAz0zlxfFpSuPP/Kpn3lz8Fqc0duN6rAorFi1KEyh11rray99+f/bN378Fa4ceXlPuj21AEMZloVWmrnLlyhkc/SP78dOJjckg6TTEssUlBw6qiRM6PZZzvmkkpLEVrUAdwOBW3Rqlgu30bd2tzC42/NHrnoupIMcV1FcitbgloLYvXRGcPCQwaGjBn39wTO5FxI5Qh4yjKAAs5CwuKC4esXn6lVFdkUjZbD/bvh3thL6thtzMzevmUggLYvrL7zApa8+hu952KlUG8FvNaNXrDz35w986he+CWLw62bF8Nelqi4GPXHukU/edmy8b84ZfetAX1Io1Z5SMABCSsxEgpXZaeauXSXV30fP8CDK88HX6HJh6KQtSKcFyoeSE0xonbD4VErBZH1sS5JOiooLeCeIa7U1sNbxGh17034RfUYd8FF3jCJdzjWVN9f3A7DTGvoGBIePmhw4bJDOBFbtcCu2TnjuGpWqKsocxPNpbt7UXL4U7MZRKoBpBa7flkNf+UC91r5EOklheYXzjzzIzKULWKlU24o2ly9MSSHlxYklzPmv/NJXPvNbPwZxRm+3K4a/LlZ1MehLp7/6j/v61HTBuv19vemEEG0qBRPKtG18x2Hm0kU8x2PgwAEM0wrcwAgUIKXoSCtgUAomqAUIgp5UcFFV6+q6Dtv+uvk5dnyh9rE2bVtjx9283VED4Zbjd7GaulyvAwshVjPYXRcsK4jnO3zUYGy/gWWvQp8Q3Qt9IfAZJthW8HN2WXPtquLKFY+FeV2uORq0CdUo9EG0Lt7N+milMS0bI2lx89w5zj/6EE4hTyKd3uHKmiytPM8XxuxijtKlP/8Xj933l/8d4ozevaAuffxjVav6QbzzZa9+c98rfvzh8X29Mp2Uvq/akwlcvjC0Urj5POmhIY6/9g30jo7g5l2074FRTgaR4CnNwpIi32GxgGEm8NiwBUJT/T13JxBsKJ5vm46dDIIbxmjTzNLM07ZtpdvBbVidtSsEZDKCoRHJ4LCBaWlU+VgYC9eNCutwGkZgxQMo5jVz85r5eUVuRaPLFsD1O3G0FPrKB+qy9mmwMikKuTxXnn6ShYnrWKkEhmxfUgeAIVH5gidn5xcWrz/6kXuvXTl/Koa+vaMunQpibabQDN/b1z/whm/5xUeVPXzX2HBa+3774gChnAxSKqGVYv9dL+PAy1+BFBK3UAhqVJVhTwgoFDQLSz6u1zl1AT0PErZg/77VRJBqtdoaWOt4W7avo3OUN027wbDjtQPkVUuUM1Q9D5QfWPl6+g1G9kl6+4Ki6p7X3UkcoYVPiMB1a0hwHMHSgs/MrGJpRaE8UQHC8D0JtR307XAocujbrJ9WGtO2kZbB9PmLXHv+WTy3hJ1Kt9HFC2F83825LKWFCw889rf/6evirdr2nrp0Woi1lUzTND0vwJP3/LOf+Us/84p/Nj6SwfP9tn7vD7Z/Uzj5PJmhIY6+9g30j47gFly0t9YK6GtYXvFZyQZmtk6wAioFCM34iEVvWuB6G9tEBYGbtmsWCNY5QLNuoEbhtKtUB9xtpvDpXW/lGxyS9A8L7IRAl48p1RnPTb2quHSNYFs1QwZ/z8qKZm5WsbDg4zgCKYL9dtcDH3Q+9IWxfWYqQXElx5VnnmLhxjWsRBKjjSVcAIRQvkAalyeWSaw89KsPfu73fhrixI69qL06zd7Sqg7EfeO7vvvfq9Fv+shtB/vQKF9r2VZ7WrUVcOzkXRx6+aswDIlTZQWEcl2ukmZx2adY0kiDNhUyXJVSoDQMDxgM98vK7+u15UPVgSBY7/hRnbNR1QLYLdNm0BGxwqxrrYO9dn0NiYSmf9BgcEjS07vOylfp1D0KQTUstowI/tZsVrOwoFha1BSKwbsb1uyDTax8a37YqEahb9u+dbl4g7p9pp1AmpLp8xe49sIzeG6Qydtea99q4eaZhTzF87///mee+MrfBa/HiR17UV02TcSqVdWxGS+/583v6Xv5j3xx32CaZFL6qp1xgKxaAd18ntTAEEde/VoG94/hlTbWBQRYySqWVzx8X1Tifdqp7eIA1ytKa+CmbSMGwXrPUdc4sWqXAHRwr2kfpKnp7ZMMDkl6+w0Stq5YALvNyhc+L1IGIBfCnONoVlY0i3OapWWN42g0q7tvhLUKq7UT9O0mpm/b/vVa+3yNMCR2OkFuYZkrX3uKpclJzESi7dY+0NowhF5cLkk3v3Dt+X/8hXtnpievhdUk4hi/val4ft7jCr+1DQ7tG3/1N3/4cSs9dGSwJ6F83XZDWnl7uBLK9xk5doLDr7oHK5HAyW/cHcTzNItLqmOKQ4dxgOP7DBJ24Abe7mGK2hq4ZdsmwOCmfXc5c8QTz6oqWeTlIuirQKdJZyRDw5K+fkEyGbxr3RbLVw17oXUvTFIpFjXZlcDCl11ROI6oZPJKCSLcZ3edduPahRZCX9naZyVTaDSTp08xefpFlK/aXLevfHlaK2lIOTOfpzjz/Gce++yvfCvEbt5bQV0yfcTajaof5Le8/2f/PjXysm/eN5TBb3McIEC4q7xTKGCn0xx+1asZOXYM5Zb3CK5KCJECCkXN0pJPydVth8AwDnBs2KInLfD82h6oWqGtmSBY7/g19Y/4Ttork9N2y/uaxI1yvFsqLRgYlAwMClKpVbeuUt1h5VsPe6GFT6mgpmc+C0tLQeHlQl7hqyCGT5pBnJ8QmwMfdBH0ESR0GKaJmbRYujnDlWefIjc/h51OI6VsO/gJoX2thDE5k8W/+bmfeuxLf/4RiMHvVtFemV9j7aDqB/pt3/jBD5f63/kfjx/q74g4QAisgL7n4ZaKDB44zJF7XktqoAcv76B8H2GsdQVnc4ql5fa7gpUOFrWhfslwv1H5vRakrtUauG3bXY7b6DnqGqPFs0yzThfJUi1B6LWZutLQpNKS/gFB/4AklRKr27F1uFs3BL0wKzd045a/0+G6gnxBsbKkWF7SFAoKzws+IUMGwCcEaAFsB3xrftimzVbHdwF9O42/ZUJHMoFbcrn+/LPMXDyPMAysRKLt0AdgSO3ni8q4Obui8y/9zte9+NxXH4C14UKx9rZi+LuFVP1gv+YN7/yniTv+z7/bN5im7fUAqyUEXqGAMA32n7yb8ZN3Y5gGbqEQ3K1rXMGC5RWPbK79WcGeB6mUYGzIwDIEXrkuWcNJHdsc2HV2b42DRDk5bDvWHp+FQpBTKoA9X4FpaNJpSd9gAH2hha+Tga9i0ROsWuPl6nX6fpCkVchpVrKaXFZTLCpcd/WLm5SBdY9trHuhdrLy1XC4xdBXTuhIJBCGZPbSJa6/8BxOPhckdKwvQNgGaa2VaUg5OZuDwsQzz3z+P797ZWVpMU7quPW0x6fdWOslylJKqaGhkdF73vuzXyExevf4SAbX6wA3MOWEEN/DKRRJDwxw+JWvZvDgQZSn8JzShtqAJUezvOxTKLbXFRzsUKIZHTLpS0vc0HEi1vyzo1oOgnUM1Kybo6Zx235n1qbw9lMafI/K9oC2pUn3Svr7gyzdZBn4fBW06xTgq0aAENhCq16oINlEUygQwF5OU8hrSiWF7wsE6+BQUoaj7c9di5WvhsONQ1/5YN0uXl9jWIGLd2VmjqvPP8vK1CSmnQz2PO8AY5pEea4S5sxcDjl//y8/8LmP/98QZ/PequqS6TRW1Kp2A9/7vg99jIE3/uCBsV7A7wg3MJTLwjgOynMYPHCEQ6+6h8xAH27BRYVZwVUQWCgollcURUcHMURtWEjD8i/9vZJ9AwaCAApX/6jmuXAbeZijsMi1chLp2AmrnJ3rK1BeUJLFkJpkStLTJ+jvl6R7JLYVQIDnB1bAdgHfesAL/w2TLEIju1Lg+4JSSVEsBoCXzweJGiHo6XKYQyUrt2wZDM9RC/ZEYeWD1kNfmMVrpRI4RZeJU88xc/4cAFYqVb6edoOf1qYhxXLWYXFpaXnua7/z3jOnnnkUYvC7ldWxc2ms5qv6wX/V69/9nX13ffCTQwMpUonOcgMDuIUC0pCMl13Bpm3iFUtoX1UKRFfHAy6veHhe++IBw2zgsZEgG3j9riD1WgO3bRsRCO7Yr85B9+rkEu6YrdVad66QmoQtSWWgr2/VumcYgaVMVbVvJvCtX8qr4S78txrwtA7dzQLHUTilwKJXKmlKBU2hBJ5XtuiVwc6UG8etB/bWtOtG6NMKtMBMpQCYuXSRiRefw8nnsVKpjkjoABBC+WjDuDm7grfw4t8++tn/8gEI5v64jMutrb06P8eqUdVxgMP7xg6+7D0/c5+ZGr1jbDiN6/lKCNEBjijW7BCS6uvlwN2vYOTYbaDBKxaCKPrypZpmYK1YyXpksz5em5JCPAUCzb4Bk/5eWUkG2aAoQXCLg5GWeYlg8G6aeMJQrRCS/HCfXAmmGZRj6e0NtlVLpiSmGaynflVbaDygYiu7jKz8bx3YidVzVcOdUgLfVZQ88ByN44QWPI1TAscNAE/5QQLGetdtmfuCa2qwwHUrgW/HcXaAvk37VxdqtiWLN6aYePFrrMzOYtl2x7h4IUjqKJSUMbdYwLn8iQ9+9aHP/iHE2byxAnXTHByriaqeEN7zbf/6oyv2637k2ME+NNrXukOsgJSzgl0XzynRM7KPQy+/h/4DY6iSwnNX4wFhNSlkJeuRzfltyQzWBFbA3oxg36CFKfVaN/B6tQAE6x2/of67PEG7JqZqK1b1f1qDYWjshCSVgkyvJJMWpNIS09IIVpM1QlCsHg+9+W4w68+71c+hpQ5Wwa4aSJUSeL7Cd8F1wXU1rhsUTnbLoOe64PsKpcRqskUZFMNAjzA+T5aPq/K1r1e9eFOr97PToc8wTcyERW5xiYkXn2f+2lWkaXZMFi8ESR2WacipuTxO7sapM/f92jfOzty8DnE2b6xVxfAXq6JqN/ArX3PvN6bv+pefHR7ImD1pSyul6YRkkECB+8ktlVC+x9CRoxx82SvJDPThFT18z11bH1AGi+FKVpHN+YBoeZyVp8CSgn3DBumUQHk1LHRRg+A2DaL6YDshcaOm4as/f7XqwvXVWqteIiFJpwWpjCCTFiRSAsssl/jRQXzf+ixYWAtwFXArg1b19a0BuXK8aAB0At9TQWKFD8rXeF4AcJ6n8V3wVPCv64PnqgoEhlAYji1F+RrEqsu62p6vy+/B6i+bq53AB7uEvhqyd7c6rn2NDOP6CiVunD7FzMVzKF9hJRIdkcVbkVaeRprXJpdJ5R79f+7/7P/4dxBb+2JtVIcs5rE6RUIES4bWWtu2nXjzt/zM38vek+8ZG06jdOckgwCViHSnVMIwJPtuu53xO+4m0ZvC2yQpRApwPM3SsqJQ8FEIzBZCYJgMMtgnGepfTQapB5giy+7doUHUE0Pd40V1AZI19eOqrXkEYVtIqTEMSCQD0MtkBOmMIFV24RqmXLWy+WrNOl/tEq5Y/DRoLVBaVbJ4V2P+AogLsoCDnz03+Nn3qNqyTZXHExXLY+VtqXLpVme3V/4t/6/awLxpWZUIXK+b9ukU4Ks6uBvoM1MJfMdn6uI5ps6exsnnsFKdUah5VVqbhmA564psrlCcefaj3/zS80/cB3FSR6zNFcNfrE1V/U3x9e/4zh83Dr3/v+0fTpOwOygZpKzKXsGFAlYyydjtJxm7/SRm0sYrlFC+2pAZ7Dqa5awi3wYI9HxIWILhQYNMKtgarvK31DJAgyBYU59tGjRzsohq7IqbssrNGgKTIcG0BLYNiYQgmRGkkxI7GXwehhFYxEJYc5xyokMIcGVAU17Z6laGtQDsgr12lR/W8luFtw1wWHVNITpU184LtdXP6//gNZC33ZsTIZRtaF9jx26APnwF0sBKJlBKM3f1EpOnXyS/tIyVTHbAXrxrJYT2QQZJHUtnPv/EZ3/lW3zf96u/yLf7GmN1nmL4i7Wlqr8xHjh07I4Tb/uJvzdT++4YHcqgtFJad0YySCghBL7v4RaKJDI9HLjrbkaO345hSLxSsIewKEeutxsCVXnRHuiVDPUZSIMNGcHNBsF6z9Fw/whVfT5d/buucm0KME2BaYFlCEw7iGkzDZCGDNhQaTxf4zngu4FF2PPKVjcPNKoK2MSm4LbmZ1G2uFX/DKzfQXv9E1NJoKj8r3btFvTqaLZ5nzYA347j1RDPt+UYflCzxkylQMDC9evcOPUC2YX5jkvmCFS29uVdsbhUpHjpz7/36Uc+/8cQu3lj7awY/mLtqGoIfMf7fuBX3P63//TocJpkB1oBYTUpxHVKZPoHGb/rboaPHEMKsSkESgGup1nKKgr51iaGeB7YlmB4yKAnJYI6cZtAQL2Q1lQYrKFhKyaW6i3FykaOgL1MKtY/P9xVQ2u0W47pU1XuySqLW3X2LGy0tm33VWdN3FzE2hE3mgh6G/p2IvCVG0QBfULC4s0pbpx6gZWZm0jDCpI56rnYFkhK7XsextRcDr3y0mef/sJv/PNisZAPjsVu3lg7K4a/WDWpekI5cfLlrz3y5g99Vlj9+8eG0jhu55SEqVYAgQ6u45AZHGb85F0MHzm6IwRmc4pc3sfzxJrtq5qlMBawLyMZGjQxDb2xLmD131XrwLu0Ctbdt8bGkSWXiNX1eP2/m6nyOUrW53us+6H1qhkr6uCPVsJeveeLyspXy3m3TgJZrdUngKWpKSbPnGL55iTClFiJVMdBn9ZaWZaUc4slioVCqXDhT77nyUe/+CkA0zRNz9tu5ogVa1Ux/MWqWUIIIaWUoTvhrd/0o7/L4Jt/aP++DIahPaVlm0oqbyMRbDXllkoozw0g8M67GTp0BCm3gEAZlIjJ5X2yOYXr6pZAoOeBZQlGBiU9KYmvt67xVvnz6jlBBDDYcP86O+2lialudGiANXaLJ82GPegQKx8EheGFwCpb+pampph86RTL05MIZAUGO8vFC1Ioz/eFeWMmS6r00ifv/9tf+x6/DHuxtS9WvdpLc2ysFqk6nuSuV7z+64Ze8QN/lc70DQ8NpNAdGAsIVOpeeCEEDg8zfsfdDB0OIdApZwfLSsyWNINg/kJesVyGwGbvHRxaAXszkqEBE8vQeDVG7jSaUdvSMi9N6dy0oSqKFAN2MVhU19EI7DVy/iiBr9bzbwd9opzIoYHlmWluvnSKpZuTCCk6FvqqrX2FQi63/NIffNdzTz34OYhj+2I1rhj+YjWk9Zlkb3vfj32UoTf9yFB/uD0cko6pC1ildRCYHhhi7I47GT58FNM2cIsOyvOD7GAAERSLVgqKJU0261MsaZSiqXGBnhfUmRseMMmkZaWYbz3v6G7Kq7S91EvLBotIEfNClMPpLX9pznXUw05RWfm2HEuDVgppGJiJBErD0s0Jps6eYXlmCkHnQh+stfaZ2Wf//wc/81+/HzbOv7Fi1atOnEZjdZGqv3mevPueN+5/zb/6K5kYPDw6lEIpz9MYnecKhgpFqVIJ13NI9vUzfttJho8dx0rZ+EUX3/MQQgMbM4RXCkFySDPjApUCX0NPSjA0YGBbq3sEN4LVu3XXNmuyuBUnoWau2J0MezWdIwIrXwX6TBMzYaOUZv76VabOnSE7NxvU70t0LvQJfE9K05xbLJDPLc/NPf9733HmxSfvh9jaFysa3YrzbqyItf5b6Dve94O/6vS/7Sf3DaTJpA3t+ZqOtAICCIlAB9nBpRKJTIZ9t93O6G0nSKRT+I7Cd0vBCrdFXGCuoHAdjRY0pVSM54EwNIM9JgO9EiFYs0Vco+9swx9IC4CwhlN3nFqNEBvO18JYwciBr9xoV1Y+AK3QWmBYFoZt4jk+89cuMXXuHPnFeaRpYSYSHQt9YfmWlbwnllaKMP/47zz097/9oxBb+2JFq06eS2N1maq/kR4+evvL7rj3R/7CN8deObovg9DKVx20R/BGBVvG+a6LVyphplIMHz7K6G0nSA8NoH3wikW0UkFcIIARwF7oEs7lFMWij68FsgmxgWFZmKEBSTq16gre8Je0GgY36RxPLNEpCsiLoGvTgK/Wttu2KSdxGIkEhikp5QrMXL7I7OULFFay5T15E+WBOpGdtJZC+0oJc3o+j3RuPnv5iY9/3+WLp5+D2NoXK3rFc3SsSCXKCjPP3vyub/9hsf/bfqcvYzMwkMTr0LIw1QqKRft4xSLSMOjff4CxEyfpGx1DGOBV4gI3uoQ9T5MvaHL5IEEkamtgmBDSk5IMDsg1ruDN/5bdnS+SCSIGwx0VJeBFNUQjjBQ18G3bruzaFVJiJpMIAbn5BaYvnmf++hXcYgkrkQiKM0OHQl/g4jWkac4uFvBcp7B8/i9+6OlHPv9HEFv7YjVP8TwcqymqrjmVSqUz937Lv/2jnHnntx8Yy2AIPKUxOtYVXJaQEu37OKUSKE3PyD5GT9zO0MGDGJaF73r4rgtabygVoxSUSppsPrAGKiUizRT2PBBSM9Bj0Ne3c23Ayt8UwTse+Ye2yYAdfWPUqe3gpennqGeMZrqNowI+AF+hhcAwDIykjfI0y9NTTF84y9LUJMrzMZNJDMMo/02dyU1aa2WZUq7kHRaXS+i5Rz/66D/87odC0Ivr9sVqpvbSHBurA1U9gd39yje9p//u7/3Tnp6hseHBFFprP4DAzpaQAq3Ac0r4nkeqt4fhI8cZPnKUVF8fWoNXLKGVX94FYm3haM8X5As+hYKi5CiUii5JxPPAMjUD/Sa96WDrsnqrfUWF4E2fTJqZ6byN6kKHFnBGZOVeGhyoLcBXtvIhJaZtB67dfJH5a1eYvXyJ3OI8CImdSCAMI2jbsdJaBs4Fc2ouj1G88tCFx3/v+69fu3wBYuiL1RrF8Ber6ZJSSl0WwFu//vv+kz/y7p8f6ksy0Be4gnWHu4IBkAKhy3GBTgnDsugfO8C+226jb2w/0hD4zlxq7b4AABqOSURBVDprIGUINILF1nU0+aImn1e4nq7kkewGBMOs4GRCMNRnkE4KVA0FordS1PbYeJKpX1Ez5G6cho3Abz19trWMKoVGIE0D07bRAnKz88xcPs/8xARuIY9hlZM4hOhw6AMhlC+FYcwtFshnVxadq3/5L5989It/DRvnyVixmql4Xo7VMlUHLff1Dwy96b3/+veX5Ylv3b+vl4QllK+06HRXcKg1LmGtSPcPMnzsOEMHj5DqTQdAFu4eAhsyhUO3cKGoKBQ0nr97EAzjATMpyUC/JGGtQuCud/Vo4qfSFR94xGpqqZddDt5s2NuxfVUsn1G28rlFl4XJ68xcukh2bgbtq1XXrhCNf9NpkYTQyjBMmc05zC7ksBYf/JUHP//xnwmPxzt0xGq1bsV5N1YbJYQQhmEYoVvjrle87u1jr/z+P1DW4Imx4TRSaC/ICu4iCNQar1TCd12sZIK+8f2MHDlO3+g4hi3xS6vlYiqZwlVJIkpBydHki4pSUePt0iLoKZBoMmmDgT6JtUlSSBRvbjs+oU6+KdphronCRlT3EE0EPoRAWhambaJ8yM7PMn/1EgsTE5Ty+SBr17aD564LWElrrUxDkC/5cnY+j8id/8LZR/7HB2dnpichzuKN1T518lwaaw9r/TfdN33dt/9I+th3/KZhSGNkIIVSvqfowL2Ct5KUCK0Da6DjgFak+voYOnSUocNHSff1AeA5Dsr3WwKCngeGoenNGPT1mpjm1kkhke/oEc8skSpKR2CrYG/HPhW3LkjTxLBtpIRSLs/8xHXmrl4mNzeHRmMmAisfXeDaDaS1IaX2fSWn5guk5PLFm8/9yQ8/9/TD/wixizdW+xVP0bHaqurgZtO0rDd+ww/8BkNv+dHejM1QXwrPczp3l5AtFFoDVVVsYM/IPoYOH2Vg/AB2KonW4DvBfsJhn+CHtSDoOJpiSVEoajyvsWSRcKu4vh6T3h4Do9bM4Ab+9loUg+FGNQsBGhpWb/pjNOerAj4hJWYigTQFbtFheXqahevXWLw5iVssBLF8XWTlC6S1IfA9hTm3UMArrcyuXPr0T3zt8S/8adgidvHG6gTF03Cstmu9K3hk39iB17znhz+2zPF/OjaSIZ00cT3V8fUBN0iI8k4CCq9YwlcKK5lgYGycwUNH6Rsdx0qaKE/jlVy02hwEwxhBx9WUSgEMOuWs4RCkdoJBBahyZnBvCIFS49XpcGrVhLGXALFVtp2GT7ML2KupzzrgM2wbaUmUo1iZn2X++hUWb9zAyWdBBIkd3RLLtyqtJfhaSnNmNodWTsGZ+NxPPfrlT/5W2CLO4o3VSdpDU2ysbtf6AtG33/mqNx153fd9zDHH7hkbTmNKqTxf0XUQSBnotA6KRzsOaB873cPAgQMMHTpKz+Awpm2gfI3nuGh/axDUOigmXXI0haLGcQKroNY7WwWVCv6rQGCmbAn0CRbpduwO0gRFCY+d5pjb9eXswo1b8zVsBXyuJr+8yMLEdRYnrpFfXgI0pmkjLQspBN1mFJNoDynNxeUSK7kS6ewDH/7SZz7+8+FxwzAMpZSKXbyxOkmdNmfHirXBLfKGe7/hu+T+b/3vqd6B8eH+FKbE87ugSPRWklKiQrew5wCCVE8vfWP7GTx4iJ6hEUzbwPdBuVWuYSRIVkEQ0GXjiOdqimUXsesqfF9sGSsoCHbDUroMgRmTnjIEhnAowoYRqCs/pDYrMkrYpVWvrr5h0gabAN/iIouT11m8MUF+aRGtfKSdwDTN4HnoMuCDYGcOIU1zcblENl9CLDz22099+Q9+qlgs5CGw9Pm+78fQF6sTFc/LsTpW690kb3j7+38geeT9v26Yqb7hwe6HQCiDoNIozw0sghISPb30jx0og+Awlm0GpWMcD+WXawgGnYNB1lkFfV/juFAqKYqOxnMDF/F6GBSibEX0wTI0PWUINE2N8gJXcXn4tYrrAO5aTaGBiECv5v6hBbEMbtI0kZaNYYLvafILCyxOTgTAt7yI9n2kGcTxSSmD+6tLoc8wbTObK7GwVCRZevHPn/rS7/344sLcDMTQF6s7dCvOu7G6TOvLIbztG77n35nj7/1lLQxrbCQDWnXFdnE7aY1F0HFACpKZDL0jYwyMH6Bn3z7sVBJEGQQ9b42lJfghHKsMgwp8tRYGfVfhr4PBsEagaQh6MoKejIllrloCN1OzoXArdeqH3LKVPkLIq2ucdbCHlEjTxDRNkOCVHLJz8yxN3WB5aorCytKeAb4gpk/7wjDMXN5lbrEAuXNfuP7Mn3zo2tVL5yDO4I3VXerUeTRWrDUSQgjTNE3XdV0IJtr3vP8HfjGbvvdnkkmTob4UptRdbwkMtcYi6DmgNFYySWZoHwP799M7Okaqtw9hBIkcyl0tIQPrYgUB1lgGBa6rKDka11W4Lnh+EDOoNSilMC1Bb8qgt1diWyKwPNa4ZrcLCveU9La/Rjl0DY0VOuQ90yz/J9EKSoU82Zlplm5OsjwzjZPLBfecZWGaVpcDH4SJHGFMX7HkQu7Cl64++4mfvHzh1NMQzEUAcQZvrG5SPC3H6iqtzwxOJJKpt3zD9/28Ofq/2jvzGLuq+45/z3Lvu2+dN/bg3djGMCwmBJyk4BBwFpIU0lQlUqm6SG0iRU37T1u1SpRGalqlraouqqKoi6pWqkISEbVp80eStiASUMISN0CJsQEbrxjvnpm33ffuveecX/+49755M35jxuCBWX4facZ+M3d/M+d85/tbzvs/GxuHNaNFqGUQDh5ksFjExTGstVC+h9JIHZWxNRhZsw7l0VF4QSF1BY2Di02/erh/DOBiZ5AAcgLGOCQ2LR5JEkKUiUIAKBUFahWNYpDu/GanuKFvyrJ4p+bJHOproeyiNyP2ICWU1lB+2m3JRAZhYxKtc2fROHsG3akJmCh1qbX2pos2CJg+yFKESABGSOlNNSO0wgg188q3X97zjc8fPfLKS/lW3LaFWaqspCGXWUbMFoG+Xyjsvu+TX0zqd33eEbBmtAgpYayDXIrVwXORizhyLm0YbQwgAC8ooTxax8ia9aiOrUFQq0H5CgBgEweXzCEGgeneggBEJgidE7A2dQd7ESExDp4UKBYlgoJccFn9uodfTCPX66irtyoG+EabNw8Te1JrSJnm7vU6LbTPnUfr7Cm0Jy8gandAcJBKQ2sPQmlAYAn14rsURELACDEt+oLu3gf3P/n1L5w5ffLVfCtu28IsdRbTEMowl81sEeh5nrf7vk9+0ay6+w/JCXHVaBFSCWstieUkAgGkOVdAmidoLVwSwxoLpRUK5SrKq1ahunoM5dVjCCqzxKA1oIG5q19JnL7ID98vDskLQxJDkAC0njl0LMaB5Epc02JM3nrTjZsHRJqQElJ7UFpBZGIv6rTQmZxA69xZtCcuoNduwSYJhFRpdW5eoQss4XDubIikgLVO6KlmF92egWj8+O/2PfnQn+SFHLNbUTHMUmYxjtkMc9nMFoFaa33nh3/1c25s9+eFLJTXjBahlXSWHIiWmQjMGHQFnTEwxoCchZIKhUoZ5VVjqKxeg8rqVSiUq9B+6tg4S3DGwlkzYzKf4Q4CfYcQbroSeF7X9eZvbUVyJZo25732AKR/LGRiT2bi3RqHqN1Gd3ICzfOp2IvaLZjEQABQngfleRBSQgBLsiXLpSAip5QgZ0mdnezC0xLu7ON/9ePvf+1LYafdAjinj1me8LjMLCtmi0AA+Jnd9/+WXnfPH0m/tm50pIhyoGGtWXLLxl0eAlIKpKlXF4tBv1hCMFJLBeGqMQQjNfjFEpTM+vOatNjEzSr3neEQpl+4Ale68liQPn6D2kTK1NVTGkrJtDDIAaYXoddqojNxAa0L59FtTCHqhLDWQEhAKg96UOwBy8jdyyEScFYpraLYislGD0RxF+ce//MnHvnaX+RjB4s+ZjmzEsddZgUwuzoYAO6462cfKG/92Je6tj6+qh6gXPJA1hoHsWyKQ+Zmlhi0aasYZy0gBLTvp6Hi+ihKo6MojdRRqFShg2BaENo0vEwDLWb6Rx/WSXrB7mRxsmAh4tkHHnTzgMzRU5BaQcpM6FnAxgl67Ra6rQbCyUl0pibRazVhoh6cdRBqOoy7vMVeTlrEIZX0OmGCqVYETa2T8anH/vrJR7/5t/lWWmvtMt7Oq2WYhWSxjqMMc0UYJgJ3vPP2D45d//N/TMGWu4KCh3qtAJBbdsUhr0d/wk/7v8BYk+YCWoKUEqrgI6hUUayOoDQ6iuJIHYVSBV5QgNIqdQAt0pY01oCsTTvN0KBTiOHrzfHIM80w1Thb4CF7v6SEUBpSSeQ/qc4QTBwh7rQRtpoIJycRNqYQtVtIej04Z1IXUKo05JuFf9PT0BwXsHwQgpwSgixBNVoxelECER794eTh7/3pT5998uF8O27OzKwkeAhmVgTDwsEbN225ZvvO+78QV3Z+qlTQGB0J4CnpbNozehmHhOcgKyAB0twulzuEuSBUEkp78IoBCpVaKgxHRlCsVFEoV6A8P3WfVN5CBqlT6BzIOhBoqKt0kWs445sLc6tvCZeSEEPEHTIxngo8BSlV35Mml7XwMTGiToheu4leo4luq4Go00bUDWGTBM5aCCmGC73svCsDIgFYpYQKIycmprpQCjY+/aO/P/L8d/7m9KkTx/ItPc/zjDGGRR+zkljKQyvDvCFmt2kIisXSrg888Htx7c7fF155dHSkgHKgYaxLAOjlHxK+BLMEIQZFoXMgIkghoXwPXiGAXy6jUCyjUKkgqFbhB2X45SKU9iE9BZktKQeRi0MHIpeGkXNBdAmBkjqJ/U+Lh2FibpBM2EFKCCEyJ05CKAFQ+hPmsufhTII47CLudRC1O+i1W4g6LcRhF0kvhI0TWGcghIQQElKpTCyuVKE3DRE5KWGFkF6rE2GqGaEehEcbRx/5yye//61/yLfL/xhkp49ZqazcSY1Z8UgppRBCDC4dd8f7PvpAsPFDn4vkup0jtQKqZR9KwFoisVyrhC+fNOSYDx65Swjn0pYzZEGWIAQglYLUGl4hgA6KKAQBdKmEoFSGVyzBDwJ4xVQc5gJGyKzfoANAmYFGlLqJlArOaaFIqaOI/sUs4G1Pv/2D4WwhJIQUqagTAhAi/b6Y7pvYF7oude+SKELc7SIJu4jCNpJeF3EYIokiJL0erIlTx9UBQglIoSCVBGT+jOT081/o+170ZAUcUonEQk01e+j2EtTEsf86/Ox//NmBF597It9SKaWIiDifj1npsPhjVjxSSqmUUoN5gRs2btl+zW0f/wM9tus3jXViVb2EUkHBWmcIy2f1kCvLTFHYLy4ZdAxdugQduVQcCqWglILQHjzPh/J9aN+HLgTwCwXoYhGeH6SuofahPZ2uFas1hNLTgkumjaeFQCq6hlzdfPydYe8qZZ8o+0iFKKXhbOfStZhtkoZdTQJjLGzUS4Vc1IXpRrBxhCSJYaIYzqbh2TQkThAyvXCZuXh5S5ZB17WfmceapU/u8kkpvU43wUSzB1/YLl144st7n/72lycunDudb8uhXYaZCU9gDJMxLC8QAO54/y98urblw59txtVr64NuoLNEkCwE54UApJgRrM3FIZzru1dpKDn9SF2/VHGlIk9OFz1ICSk1lKcgpYZQEkKqrFmxgpISQuv+Pui7coCE6IdfgXRNYzgHl4k6EIHgQJZAxmSi1YCsg3UOZE3q4pkExppMBFI/fE3kAEyfTyBzBmUapoUQF4m7/vPIngMzF3kun9JRbDDZipEYC6/36hO9049/5ekf/vc38y3n+n1mGIbFH8MMZVhIeNv269+xece9v0P1nb9OJHS9FqBc9OCcS5yDWkmVwgtCZt0Ne4gzQpu5WASlYV+ivkjMBeO0wTPYCG8+13DxCyEERN9OnBne7V9vHhKeJehmXP/gPTCXwXRY1xJUqxOj1YmhbOMYpvb80wt7vvfPExfOn8235lYtDPP6sPhjmEswrFUMALx398d+JVi/+3djf8N7PK0wWvXhexwWfssZjDNjYctALlISrC0WFCHIScAiC+tONXsA2Ug0nvvqif3/85Ujh17aO70tF3AwzOXAExTDzBOttSYiGnQD16xdv+n6nfd9xluz69M9U1hTq/ioln1oKchYZ1kIMsx8ISICSQmrpPTCyGKy0YMjBxUe+UF48vGv/OSpR/9zcA/P8zxrrWWXj2EuD56UGOYymSuXaPzGW9697roPfsbVbv01gipUyz7nBzLMJSES6cIzVkvl9RKDZjtGJ0xQ8dqH3YWn/vGZH33nXxqNyYl8D6WUylMy2OVjmDcGT0QM8yYYVikMALe866571173od9OgvGfM9Yizw8URNY6InYEmZVLmsMnhSQI5UWxQSuMEfYMCmgdR/P5hw7vffRfjx995cV8Dw7rMsyVhScfhrkC5JPT7LCw5/n+Le+555eqG+/4ZOxv+4CUApWSN+AIshBkVgIDgi/L4Wu0IhABvps8GJ9/5htH9j/29ddePXpwcC8O6zLMwsATDsNcYeYSgr7vF961655P1Dff+amu2npP4hxqJR+Vsg8lhLPkLFcNM8uHiwVfsx3DGkJZXXjBXPjJgy8+94OHTp08cXxwL8/zvPx3h10+hlkYWPwxzAIyV7hKKaV23v6h+0evfu9vRP619xpHshh4qJU9FDwN42wCcoLzBJmlw3T+nhJSGUeyF5u+4CvS6Wfic//71ReeffShwdYswLTDRxlv0w0wzIqBJxWGeYu4VN7S9TftvOvqG+/+ZVO66f6eLa7zfYVa2UMpyxM0jhwRVLpyGItBZnFARE4IWJ0l8EWxzfL3EgQFD6596PHemT0P7nvmB//Wbreag/uy4GOYtw+eRBjmbWCu0DAAbLp62/i1N9/9i8FVOx9omFW3aCVRLmqUAh8FT7IryLyNpKFcCElaKi9KHMJejHZoADj4bvIA2i9998zhH39r395nnpi9N+fwMczigCcOhnmbyYWgEELMrhoOisXSjlt2fbi09tZP6PqN9/VMMOb7EtWyj6KvoZWEdTYhFoPMgjAt9pSQyjqS3dig1YkRxw4lP56yzYMPd88+9639P3364VazMTW4d14Nz4KPYRYXPFEwzCJCZAxrHwMAGzdtuWb7jl0fF7WbPyEr2+/uxgkCT6NS9vpiMHcGHUnJYWLm8kjFnhCSZJa3Z4ybEcqlztEnqbH334+8+PR3jx87fGD2Ebhgg2EWPzwpMMwiJndOAGCYGLx2/OadG7ff9lE9ctPHbLD5vXHihJ+JQV8rFDyVOoMAQFAEFoNMTrYosoCVAlBSecY69GKDVidBLzYoBx5sePIFGR565MyR4aFcpZSSUkp29xhm6cCTAMMsEQZdwbkm2u3jO27buO22j8jajfcWRrbe3ghd4HsSvqdQKXooFBQEwTlylgiCCBLsDq4AsqXThHN5CJeEkFFsEMUGna5Bklj4nnQqPvE0tQ48fObY/z3y4gvPPTXbvRsM5XKxBsMsTXjAZ5glymCu4FxicMPGq7dt2LLjznVbb/1IqDa/L6LqNoKApwVKgYeCr1DwNQQRC8JlA5EgEAlYJQBIqSSEjBKL2Fi0Owli4yBACGTnBIXHnupNvPzo6WP7fnT40Mv7hh2RQ7kMs7zgwZ1hlgnzEYO+7xeuv+nW20fXXX9nefX4Xcbf8O4w8a8aJggliCw5QwRk1cUSHDZeRKTvjEDq5gkBKCF1YkkY4xAlFmEvgbWExFjUimjFraN7ROfIY+dfe+Gxgy/t/UkURb3ZR82dPRZ7DLN84UGcYZYpg2FiYHjOIJBWFF87fvO7RteO7ypfdcNu4629rWuK6x0BWkloJVAuefCUhO8rSIAsOSMIsAQI5wSkVJSd9S28xRVAmpcnyDmSkpQAKBN5DhBxbJFYh06YwDpCHFuUih5gpl7V8elnw4mDTzTPHdrzyoF9z4addmvYGbTWWgghWOwxzMqBB2qGWSHkYlBKKfPJ3hhj5tp++3U33FxbtfnmDVt33NGhsdtKI5vfMRnKURCgtYCSEsVAo+ApKCXgawUHcuScFQAcAJATyBxDFoezSUVW9kAImYMn0xeQSmpBQsTGwlpClFh0IwNrCdY6kABGCsm5sHliX1VOPH/q2Et72lOv7j/48v7n5xJweXEGEZFzznHOHsOsTHggZpgVzOUKQs/z/K3XXHdDffWm8drYlneq0vp39DA6XqmvHz8/FSnPU5BCQEkBIYByyYNSElqm4pAEAGeNSw0sEAGOHAQgIDKROEOKLDWxOHj15IQQAnamayeQxs4hlRYExMbCuFTQdboJnKP+R2IsVo/4cXvq1IFANA6J6Oy+s68d+ml78sT+w4cP7HezGoQPMujosdBjGGaQJTawMgyz0AiRCq48fxAA5tPGo1qt1a/ecs11qrh666qrNo+v2bDlhjMNf5tfGtuii6Obzk+GUEpBSUBm4lAKiUrRg1ICDoAE4PsaUorU/sqqVEEXn5sAOILMXpEQQg67m/nf+XBhREQOEALknJJDTpGeRgghVfp/wDlCHBu49FuIEoNez4BoWtg5ErDWYnU9sEk4cTwJzx9fVzfHT7125KVe8/SBxsTJg8ePHj7Y63XDS111LvKya+2vGMNCj2GYuWDxxzDMvJjtEgKpwLiUUzhIqVyprl27fmOtvnodvJGNY1dt2FpfvW7L2aa3SQcj64uV+lq/UB290IwDolS2pcWqaYh5UNoJCGgtUQ70W2YOWiJ0whjODZp7gCOCzQQdkElIAYzVdBiFk2dazckzJd07U9bhiQvnzxxvNc6+Kk3z5Lkzp187derE8SRJ4tc792AxT3oOFnkMw7xxWPwxDPOmEbPIvz5s7eK58DzP8/1CwS8EpWp1ZLRSrdUr1VrdDyqjsfNXlcq1uh+UqkGhXPOLpaolv3ZuylT8oFhW2i8JqT0plSeV9qX0fKmUJ6X2hdTeDFdQzFKLROScScjZxDlr0n9NQs4Z50xikyg0SRySizobxwphHIXNOOq2o17Y6oatqV7YOF/0zFSn3ZpqtxpTrVZzqtNuNeK4F/a63e58Gx8Pirv82Q0yn2MwDMPMh/8Hb0awVdUEN74AAAAASUVORK5CYII="

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventsHandlers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_preloaderView__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_mainWindowView__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_leaderBoardModalView__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_aboutModalVIew__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_gameView__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_page404view__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by tlakatlekutl on 31.03.17.
 */


















const ee = new __WEBPACK_IMPORTED_MODULE_10__modules_eventEmitter_eventEmitter__["a" /* default */]();

// views
const preloaderView = new __WEBPACK_IMPORTED_MODULE_4__views_preloaderView__["a" /* default */]();
const mainView = new __WEBPACK_IMPORTED_MODULE_5__views_mainWindowView__["a" /* default */]();
const p404 = new __WEBPACK_IMPORTED_MODULE_9__views_page404view__["a" /* default */]();
const leaderBoardModal = new __WEBPACK_IMPORTED_MODULE_6__views_leaderBoardModalView__["a" /* default */]();
const aboutModalView = new __WEBPACK_IMPORTED_MODULE_7__views_aboutModalVIew__["a" /* default */]();
const gameView = new __WEBPACK_IMPORTED_MODULE_8__views_gameView__["a" /* default */]();

// init router
const router = new __WEBPACK_IMPORTED_MODULE_3__modules_router_router__["a" /* default */]();
router.addRoute(/\/$/, mainView)
  .addRoute(/leaderboard$/, leaderBoardModal)
  .addRoute(/about$/, aboutModalView)
  .addRoute(/game$/, gameView)
  .set404(p404);

// global user profile
const userModel = new __WEBPACK_IMPORTED_MODULE_2__models_userModel__["a" /* default */]();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js')
//     .then( (registration) => {
//       console.log('ServiceWorker registration', registration);
//     })
//     .catch((err) => {
//       console.log('Registration failed with ', err);
//     });
// }


leaderBoardModal.render();
aboutModalView.render();

router.start()
  .then(() => {
    if (userModel.isAuthorised()) {
      ee.emit(__WEBPACK_IMPORTED_MODULE_10__modules_eventEmitter_eventEmitter__["b" /* START_USER_AUTHORISED */]);
    } else {
      ee.emit(__WEBPACK_IMPORTED_MODULE_10__modules_eventEmitter_eventEmitter__["c" /* START_USER_UNAUTHORISED */]);
    }
    mainView.render();
    router.go(window.location.href);
    preloaderView.dispatchLoadCompleted();
  });


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(6);
/**
 * Created by sergey on 16.05.17.
 */


class Bonus extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
  constructor(type, pos, radius) {
    super(pos);

    this.radius = radius;

    this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });

    if (type === 'BALL_INCREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });
    } else if (type === 'BALL_DECREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFE28A2 });
    } else if (type === 'BALL_MULTIPLY') {
      console.log("multiply");
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
    } else if (type === 'PLATFORM_INCREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    } else if (type === 'PLATFORM_DECREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFF4F18 });
    }

    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.X, this.Y, this.Z);
  }

  getSize() {
    return this.radius;
  }

  getModel() {
    return this.model;
  }

  setPosition(pos) {
    super.setPosition(pos);
    this.model.position.set(this.X, this.Y, this.Z);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bonus;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 20.04.17.
 */

class Bot {
    constructor(pos) {
        this.active = false;

        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        this.del = 0.2;
        this.move = { xd: 0, yd: 0, zd: 0};
    }

    getState() {
        return this.active;
    }

    setState(state) {
        this.active = state;
    }

    setPosition(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }

    getBehavior(posBall) {
        this.move = { xd: 0, yd: 0, zd: 0};
        if(posBall.x - this.x >= this.del) {
            this.move.xd = this.del;
        } else if (this.x - posBall.x  >= this.del) {
            this.move.xd = -this.del;
        }
        return this.move;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bot;


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__barrier__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ground__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bonus__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_gameModel__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__eventEmitter_eventEmitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__player__ = __webpack_require__(16);
/**
 * Created by sergey on 21.04.17.
 */











const ee = new __WEBPACK_IMPORTED_MODULE_6__eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_7__models_userModel__["a" /* default */]();

class MultiStrategy {

  constructor() {

    this.gm = new __WEBPACK_IMPORTED_MODULE_5__models_gameModel__["a" /* default */]();

    this.play = true;
    this.time = (new Date).getTime();

    this.timepr = 0;
    this.time_st = 0;
    this.timen = 0;
    this.speed = 0;
    this.dist = 0;

    this.pres = 0;
    this.timeLast = (new Date).getTime();

    this.player1 = new __WEBPACK_IMPORTED_MODULE_8__player__["a" /* default */](us.getData().nickname, 0, us.getData().rating);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setClearColor( 0x000000, 0 ); // the default
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 0 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new __WEBPACK_IMPORTED_MODULE_3__ground__["a" /* Ground */](this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 10, z: 112.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformMy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 10, z: -112.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformEnemy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.balls = [];
    this.countBalls = 0;

    this.pos = { x: 0, y: 10, z: 100 };
    this.radius = 5;
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball__["a" /* Ball */](0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.balls[this.countBalls] = this.ball;
    this.countBalls += 1;

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 180;
    this.camera.lookAt(this.ground.getPosition());

    this.bonuses = [];

    this.addEventListeners();
  }

  render() {

    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer.setSize(this.x, this.y);

    this.keyboard2.update();

    this.pres = 0;

    if (this.keyboard2.pressed('left')) {
      if (this.coordsTransform === -1) {
        this.control('left');
      } else {
        this.control('right');
      }
    }

    if (this.keyboard2.pressed('right')) {
      if (this.coordsTransform === -1) {
        this.control('right');
      } else {
        this.control('left');
      }
    }

    if (this.touchCheck === 1) {
      const canvas = document.querySelector('canvas');
      if (this.touch.changedTouches[0].clientX < canvas.getBoundingClientRect().left + canvas.getBoundingClientRect().width / 2) {
        if (this.coordsTransform === -1) {
          this.control('left');
        } else {
          this.control('right');
        }
      } else {
        if (this.coordsTransform === -1) {
          this.control('right');
        } else {
          this.control('left');
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      this.touch = event;
      this.touchCheck = 1;
    });
    canvas.addEventListener('touchend', (event) => {
      this.touchCheck = 0;
    });
  }

  animationScene() {
    this.render();
    // console.log(this.time - (new Date).getTime());
    this.time = (new Date).getTime();

    if (this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    if (this.pres === 0) {
      this.pres = 1;
      this.del = 20;
    } else {
      this.time = (new Date).getTime();
      this.del = this.time - this.timeLast;
    }
    this.timeLast = (new Date).getTime();
    if (this.del > 100) {
      this.del = 20;
    }
    if (button === 'left') {
      this.gm.sendButton('left', this.del);
    } else if (button === 'right') {
      this.gm.sendButton('right', this.del);
    }
  }

  setStateGame(state, time) {
    //console.log(state);
    // if (state.balls.length > 1) {
    //   console.log(state.balls);
    // }
    this.state = state;
    if (this.time_st === 0) {
      this.timen = time;
      this.time_st = 1;
    } else {
      this.timepr = this.timen;
      this.timen = time;
    }
    //console.log(this.timen - this.timepr);

    if (us.getData().id === this.state.players[0].userId) {
      // this.dist = this.platformMy.getPosition().x - this.state.players[0].platform.x * this.coordsTransform;
      this.pos = {
        x: this.state.players[0].coords.x * this.coordsTransform,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[1].coords.x * this.coordsTransform,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
    } else {
      this.pos = {
        x: this.state.players[1].coords.x * this.coordsTransform,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[0].coords.x * this.coordsTransform,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
    }
    for (let i = 0; i < this.countBalls; i += 1) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.balls[0].getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform,
      };
      this.balls[i].setPosition(this.pos);
    }
    //console.log(this.state.balls[0].x * this.coordsTransform);
    //console.log(this.balls[0].getPosition().x);

    //console.log(this.balls);
  }

  setChangeGame(state) {
    //console.log(state.balls.length);
    // if (state.balls.length > 1) {
    //   console.log(state.balls);
    // }
    this.state = state;
    if (us.getData().id === this.state.players[0].userId) {
      this.player1.setScore(this.state.players[0].score);
      this.player2.setScore(this.state.players[1].score);
      if (this.state.players[0].width !== this.platformMy.getSize().width) {
        this.scene.remove(this.platformMy.getModel());
        this.size = { width: this.state.players[0].width, height: this.platformMy.getSize().height };
        this.platformMy.setSize(this.size);
        this.scene.add(this.platformMy.getModel());
      }
      if (this.state.players[1].width !== this.platformEnemy.getSize().width) {
        this.scene.remove(this.platformEnemy.getModel());
        this.size = { width: this.state.players[1].width, height: this.platformEnemy.getSize().height };
        this.platformEnemy.setSize(this.size);
        this.scene.add(this.platformEnemy.getModel());
      }
    } else {
      this.player1.setScore(this.state.players[1].score);
      this.player2.setScore(this.state.players[0].score);
      if (this.state.players[1].width !== this.platformMy.getSize().width) {
        this.scene.remove(this.platformMy.getModel());
        this.size = { width: this.state.players[1].width, height: this.platformMy.getSize().height };
        this.platformMy.setSize(this.size);
        this.scene.add(this.platformMy.getModel());
      }
      if (this.state.players[0].width !== this.platformEnemy.getSize().width) {
        this.scene.remove(this.platformEnemy.getModel());
        this.size = { width: this.state.players[0].width, height: this.platformEnemy.getSize().height };
        this.platformEnemy.setSize(this.size);
        this.scene.add(this.platformEnemy.getModel());
      }
    }

    for (let i = this.state.balls.length; i < this.countBalls; i += 1) {
      this.scene.remove(this.balls[i].getModel());
      this.countBalls -= 1;
    }

    for (let i = 0; i < this.state.balls.length; i += 1) {
      if (this.countBalls === i) {
        this.pos = {
          x: this.state.balls[i].x * this.coordsTransform,
          y: this.balls[0].getPosition().y,
          z: this.state.balls[i].y * this.coordsTransform,
        };
        this.radius = this.state.balls[i].radius;
        this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball__["a" /* Ball */](0, this.pos, this.radius);
        this.scene.add(this.ball.getModel());
        this.balls[this.countBalls] = this.ball;
        this.balls[i].setPosition(this.pos);
        this.countBalls += 1;
      }
    }

    for (let i = 0; i < this.countBalls; i += 1) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.balls[i].getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform,
      };
      this.balls[i].setPosition(this.pos);
      if (this.state.balls[i].radius !== this.balls[i].getSize()) {
        this.scene.remove(this.balls[i].getModel());
        this.balls[i].setSize(this.state.balls[i].radius);
        this.scene.add(this.balls[i].getModel());
      }
    }

    for (let i = 0; i < this.bonuses.length; i += 1) {
      this.scene.remove(this.bonuses[i].getModel());
    }
    this.bonuses = [];

    for (let i = 0; i < this.state.bonuses.length; i += 1) {
      this.pos = {
        x: this.state.bonuses[i].coords.x * this.coordsTransform,
        y: 15,
        z: this.state.bonuses[i].coords.y * this.coordsTransform };
      this.radius = 10;
      this.bonus = new __WEBPACK_IMPORTED_MODULE_4__bonus__["a" /* Bonus */](this.state.bonuses[i].type, this.pos, this.radius);
      this.scene.add(this.bonus.getModel());
      this.bonuses[i] = this.bonus;
    }

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
  }

  setOpponent(state) {
    console.log(state);
    this.state = state;
    this.coordsTransform = this.state.coordsTransform;
    this.player2 = new __WEBPACK_IMPORTED_MODULE_8__player__["a" /* default */](this.state.opponentLogin, 0, this.state.opponentRating);
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiStrategy;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__barrier__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ground__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bot__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player__ = __webpack_require__(16);
/**
 * Created by sergey on 15.04.17.
 */








class SingleStrategy {

  constructor() {
    this.play = true;

    this.player1 = new __WEBPACK_IMPORTED_MODULE_5__player__["a" /* default */]('Player1', 0, 42);
    this.player2 = new __WEBPACK_IMPORTED_MODULE_5__player__["a" /* default */]('Player2', 0, 36);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 40, 40);
    this.scene.add(this.spotLight);


    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setClearColor( 0x000000, 0 ); // the default
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 8 };
    this.size = { width: 16, height: 1, depth: 16 };
    this.ground = new __WEBPACK_IMPORTED_MODULE_3__ground__["a" /* Ground */](this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderLeft = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderRight = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 1, z: 15 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformMy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 1, z: 1 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformEnemy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 1, z: 14 };
    this.radius = 0.5;
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball__["a" /* Ball */](0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.pos.x = this.platformEnemy.getPosition().x;
    this.pos.y = this.platformEnemy.getPosition().y;
    this.pos.z = this.platformEnemy.getPosition().z;
    this.bot = new __WEBPACK_IMPORTED_MODULE_4__bot__["a" /* Bot */](this.pos);
    this.bot.setState(true);

    this.pointViewG = new THREE.SphereGeometry(0, 0, 0);
    this.pointViewM = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    this.pointView = new THREE.Mesh(this.pointViewG, this.pointViewM);
    this.pointView.position.set(0, -4, 2);
    this.scene.add(this.pointView);

    this.camera.position.x = 0;
    this.camera.position.y = 8;
    this.camera.position.z = 20;
    this.look = this.ground.getPosition();
    this.look.y -= 3;
    this.camera.lookAt(this.look);

    this.addEventListeners();
  }

  render() {

    this.keyboard2.update();

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.keyboard2.down('space')) {
      this.control('space');
    }

    // window.addEventListener('touchstart', function(event) {
    //   this.control('left');
    // }, false);

    this.checkMove();

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

    if(this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    if (button === 'left') {
      if (this.platformMy.getPosition().x - this.platformMy.getSize().width / 2 >
                this.borderLeft.getPosition().x + this.borderLeft.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x - 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false && this.ball.getSide() === 0) {
          if (this.ball.getPosition().x > this.platformMy.getPosition().x + this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x + this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'right') {
      if (this.platformMy.getPosition().x + this.platformMy.getSize().width / 2 <
                this.borderRight.getPosition().x - this.borderRight.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x + 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false && this.ball.getSide() === 0) {
          if (this.ball.getPosition().x < this.platformMy.getPosition().x - this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x - this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'space') {
      if (this.ball.getMove() === false) {
        this.ball.setMove(true);
        this.vector = { x: 0, y: 0, z: 0 };
        if (this.ball.getSide() === 0) {
          this.vector.x = (this.ball.getPosition().x - this.platformMy.getPosition().x) / 13;
          this.vector.y = 0;
          this.vector.z = -(this.platformMy.getPosition().z + 2 - this.ball.getPosition().z) / 13;
        } else {
          this.vector.x = (this.ball.getPosition().x - this.platformEnemy.getPosition().x) / 13;
          this.vector.y = 0;
          this.vector.z = -(this.platformEnemy.getPosition().z - 2 - this.ball.getPosition().z) / 13;
        }
        this.ball.setVectorMove(this.vector);
      }
    }
  }

  checkMove() {
    if (this.ball.getMove() === true) {
      if (this.ball.getPosition().x - this.ball.getSize() < this.borderLeft.getPosition().x + this.borderLeft.getSize().width / 2 ||
                this.ball.getPosition().x + this.ball.getSize() > this.borderRight.getPosition().x - this.borderRight.getSize().width / 2) {
        this.vector.x = -this.ball.getVectorMove().x;
        this.vector.y = this.ball.getVectorMove().y;
        this.vector.z = this.ball.getVectorMove().z;
        this.ball.setVectorMove(this.vector);
      } else if (this.ball.getPosition().x >= this.platformMy.getPosition().x - this.platformMy.getSize().width / 2 &&
                this.ball.getPosition().x <= this.platformMy.getPosition().x + this.platformMy.getSize().width / 2 &&
                this.ball.getPosition().z + this.ball.getSize() >= this.platformMy.getPosition().z - this.platformMy.getSize().height / 2) {
        this.vector.x = (this.ball.getPosition().x - this.platformMy.getPosition().x) / 13;
        this.vector.y = 0;
        this.vector.z = -(this.platformMy.getPosition().z + 2 - this.ball.getPosition().z) / 13;
        this.ball.setVectorMove(this.vector);
      } else if (this.ball.getPosition().x >= this.platformEnemy.getPosition().x - this.platformEnemy.getSize().width / 2 &&
                this.ball.getPosition().x <= this.platformEnemy.getPosition().x + this.platformEnemy.getSize().width / 2 &&
                this.ball.getPosition().z - this.ball.getSize() <= this.platformEnemy.getPosition().z + this.platformEnemy.getSize().height / 2) {
        this.vector.x = (this.ball.getPosition().x - this.platformEnemy.getPosition().x) / 13;
        this.vector.y = 0;
        this.vector.z = -(this.platformEnemy.getPosition().z - 2 - this.ball.getPosition().z) / 13;
        this.ball.setVectorMove(this.vector);
      }
      if (this.ball.getPosition().z > this.ground.getGoalMy()) {
        this.ball.setSide(0);
        this.ball.setMove(false);
        this.pos = {
          x: this.ground.getPosition().x,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        this.pos = {
          x: this.platformMy.getPosition().x,
          y: this.ball.getPosition().y,
          z: this.platformMy.getPosition().z - this.platformMy.getSize().height / 2 - this.ball.getSize(),
        };
        this.vector.x = 0;
        this.vector.y = 0;
        this.vector.z = 0;
        this.ball.setVectorMove(this.vector);
        this.ball.setPosition(this.pos);
        this.player2.setScore(this.player2.getScore() + 1);
        this.score2.innerHTML = this.player2.getScore();
      } else if (this.ball.getPosition().z < this.ground.getGoalEnemy()) {
        this.ball.setSide(1);
        this.ball.setMove(false);
        this.pos = {
          x: this.ground.getPosition().x,
          y: this.platformEnemy.getPosition().y,
          z: this.platformEnemy.getPosition().z,
        };
        this.platformEnemy.setPosition(this.pos);
        this.pos = {
          x: this.platformEnemy.getPosition().x,
          y: this.ball.getPosition().y,
          z: this.platformEnemy.getPosition().z + this.platformEnemy.getSize().height / 2 + this.ball.getSize(),
        };
        this.vector.x = 0;
        this.vector.y = 0;
        this.vector.z = 0;
        this.ball.setVectorMove(this.vector);
        this.ball.setPosition(this.pos);
        this.player1.setScore(this.player1.getScore() + 1);
        this.score1.innerHTML = this.player1.getScore();
      }
      this.pos = {
        x: this.ball.getPosition().x + this.ball.getVectorMove().x,
        y: this.ball.getPosition().y + this.ball.getVectorMove().y,
        z: this.ball.getPosition().z + this.ball.getVectorMove().z,
      };
      this.ball.setPosition(this.pos);
      if (this.bot.getState() === true) {
        this.enemyMove = this.bot.getBehavior(this.ball.getPosition());
        this.pos = {
          x: this.platformEnemy.getPosition().x + this.enemyMove.xd,
          y: this.platformEnemy.getPosition().y + this.enemyMove.yd,
          z: this.platformEnemy.getPosition().z + this.enemyMove.zd,
        };
        if (this.enemyMove.xd > 0 && this.pos.x + this.platformEnemy.getSize().width / 2 < this.borderRight.getPosition().x -
                    this.borderRight.getSize().width / 2) {
          this.platformEnemy.setPosition(this.pos);
          this.bot.setPosition(this.platformEnemy.getPosition());
        } else if (this.enemyMove.xd < 0 && this.pos.x - this.platformEnemy.getSize().width / 2 > this.borderLeft.getPosition().x +
                    this.borderLeft.getSize().width / 2) {
          this.platformEnemy.setPosition(this.pos);
          this.bot.setPosition(this.platformEnemy.getPosition());
        }
      }
    }
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
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;




/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by sergey on 21.04.17.
 */



const ee = new __WEBPACK_IMPORTED_MODULE_0__eventEmitter_eventEmitter__["a" /* default */]();

class Transport {
  constructor() {
    const address = 'ws://62.109.3.208:8082/game';

    this.ws = new WebSocket(address);
    this.ws.onopen = () => {
      console.log(`Success connect to socket ${address}`);
    };
    this.ws.onclose = (event) => {
      console.log(`Socket closed with code ${event.code}`);
    };
    this.ws.onmessage = (event) => { this.handleMessage(event); };

  }

  handleMessage(event) {
    const messageText = event.data;
    const message = JSON.parse(messageText);
    // if (message.type === 'com.aerohockey.mechanics.base.ServerSnap') {

    ee.emit(message.type, message);

  }

  send(type, content) {
    if (this.ws.readyState === this.ws.CONNECTING) {
      setTimeout(() => {
        this.ws.send(JSON.stringify({ type, content }));
      }, 1000);
      return;
    };
    this.ws.send(JSON.stringify({type, content}));
  }
  closeSocket() {
    this.ws.close();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transport;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by tlakatlekutl on 05.03.17.
 */

/* global fetch*/

class Net {

  constructor(baseUrl = '', headers = {}) {
    if (Net.instance) {
      return Net.instance;
    }

    this._headers = headers;
    this._baseUrl = baseUrl;

    Net.instance = this;
  }

  _getDefaultParams() {
    return {
      method: '',
      headers: this._headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
    };
  }

  set Headers(value) {
    try {
      this.checkObjectString(value);
      this._headers = value;
    } catch (e) {
      console.log(e.message);
    }
  }

  get BaseUrl() {
    return this._baseUrl;
  }

  set BaseUrl(url) {
    if (typeof url === 'string') {
      this._baseUrl = url;
    } else {
      throw new TypeError('Url must be a string');
    }
  }

  post(url, data) {
    const postParams = this._getDefaultParams();
    postParams.method = 'POST';

    if (data) {
      if (!this.checkObjectString(data)) { throw new TypeError('Error data object'); }
      postParams.body = JSON.stringify(data);
    } else { postParams.body = null; }

    return fetch(this._baseUrl + url, postParams);
  }

  get(url, onSucces) {
    const getParams = this._getDefaultParams();
    getParams.method = 'GET';
    getParams.body = null;

    return fetch(this._baseUrl + url, getParams, onSucces);
  }


  checkObjectString(object) {
    if (!(object && (`${object}` === '[object Object]'))) {
      console.error('Object must be a plain object');
      return false;
    }
    const valid = Object.keys(object).every(key => typeof object[key] === 'string');
    if (!valid) {
      console.error('Object must contain strings values');
      return false;
    }
    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Net;




/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_concede_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_concede_pug__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_concede_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_concede_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by sergey on 25.04.17.
 */







const ee = new __WEBPACK_IMPORTED_MODULE_3__modules_eventEmitter_eventEmitter__["a" /* default */]();

class ConcedeModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor(game) {
    super('Выход', __WEBPACK_IMPORTED_MODULE_2__templates_concede_pug___default.a);
    this.game = game;
  }
  render() {
    this.alreadyInDOM = true;
    this.generateBase();
    this.bodyModal.innerHTML = this.drawFunc();
    this.parent.appendChild(this.modal);
    document.querySelector('.choose__yes').addEventListener('click', () => {
      this.destruct();
      ee.emit(__WEBPACK_IMPORTED_MODULE_3__modules_eventEmitter_eventEmitter__["k" /* DESTROY_GAME */]);
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      this.game.resume();
      this.destruct();
    });
    this.close.addEventListener('click', () => { this.game.resume(); this.destruct(); });
    this.show();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConcedeModal;


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_defeat_css__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_defeat_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_defeat_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_defeat_pug__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_defeat_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_defeat_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by sergey on 01.05.17.
 */








const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_3__models_userModel__["a" /* default */]();

class DefeatModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Завершение игры', __WEBPACK_IMPORTED_MODULE_2__templates_defeat_pug___default.a);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.defeat-modal .change');
    this.changeRating.innerHTML = us.getData().changeRating;
    this.newRating = document.querySelector('.defeat-modal .rating_score');
    this.newRating.innerHTML = us.getData().rating + us.getData().changeRating;
    this.onClose(() => {
      this.destruct();
      ee.emit(__WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["k" /* DESTROY_GAME */]);
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefeatModal;


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_login_pug__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_login_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_login_pug__);
/**
* Created by tlakatlekutl on 02.04.17.
*/






const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class LoginModal extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Login', __WEBPACK_IMPORTED_MODULE_3__templates_login_pug___default.a);
  }
  render() {
    super.render();
    this.errorField = document.querySelector('.danger');
    document.querySelector('.login-submit-button').addEventListener('click', (event) => {
      if (this.isValid()) {
        event.preventDefault();
        userModel.login(this.getFormData())
          .then(() => {
            router.go('/');
            this.destruct();
          })
          .catch(() => { this.showError(); });
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
  showError() {
    this.errorField.style.display = 'block';
  }
  hideError() {
    this.errorField.style.display = 'none';
  }
  isValid() {
    this.nickname = document.querySelector('.login-nickname-input').value;
    this.password = document.querySelector('.login-password-input').value;
    if (this.nickname === '') {
      return false;
    }
    if (this.password === '') {
      return false;
    }
    return true;
  }
  getFormData() {
    return {
      login: this.nickname,
      password: this.password,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginModal;




/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_mp_pug__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_mp_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__templates_mp_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_gameModel__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_game_play__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by tlakatlekutl on 27.03.17.
 */

// import Router from '../modules/router/router';







const ee = new __WEBPACK_IMPORTED_MODULE_5__modules_eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_4__models_userModel__["a" /* default */]();

class MpGameView extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {
    super(['multiplayer-game-view'], __WEBPACK_IMPORTED_MODULE_1__templates_mp_pug___default.a);
    this.gm = new __WEBPACK_IMPORTED_MODULE_2__models_gameModel__["a" /* default */]();

    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.time = (new Date()).getTime();
      this.game.setStateGame(message.content, this.time);
    });
    ee.on('com.aerohockey.mechanics.requests.StartGame$Request', (message) => {
      this.game.setOpponent(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.ServerDetailSnap', (message) => {
      this.game.setChangeGame(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.GameOverSnap', (message) => {
      this.state = JSON.parse(message.content);
      console.log(this.state);
      this.game.stop();
      if (this.state.changeRating > 0) {
        us.getData().changeRating = this.state.changeRating;
        ee.emit(__WEBPACK_IMPORTED_MODULE_5__modules_eventEmitter_eventEmitter__["i" /* VICTORY */]);
      } else {
        us.getData().changeRating = this.state.changeRating;
        ee.emit(__WEBPACK_IMPORTED_MODULE_5__modules_eventEmitter_eventEmitter__["j" /* DEFEAT */]);
      }
    });
  }

  render() {
    super.render();
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      ee.emit(__WEBPACK_IMPORTED_MODULE_5__modules_eventEmitter_eventEmitter__["f" /* GAME_PAUSE */], this.game);
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
      this.game = new __WEBPACK_IMPORTED_MODULE_3__modules_game_play__["a" /* default */]('multi');
      this.game.gameProcess();
    }
    this.node.hidden = false;
  }
  hide() {
    console.log('multi game hide');
    this.destruct();
  }
  destruct() {
    const root = document.querySelector('main');
    const gamePage = document.querySelector('.multiplayer-game-view');
    root.removeChild(gamePage);
    const game = document.querySelector('canvas');
    const body = document.querySelector('body');
    body.removeChild(game);
    this.alreadyInDOM = false;
    this.gm.exit();
    delete this.game;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MpGameView;




/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_profile_pug__);
/**
 * Created by tlakatlekutl on 04.04.17.
 */







const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class ProfileModalView extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Profile', __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug___default.a);
  }
  show() {
    if (userModel.isAuthorised()) {
      if (!this.alreadyInDOM) {
        this.alreadyInDOM = true;
        this.render({ user: userModel.getData() });
      }
      this.bodyModal.innerHTML = this.drawFunc({ user: userModel.getData() });
      this.modal.style.display = 'block';
    } else {
      router.go('/');
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProfileModalView;




/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug__);
/**
* Created by tlakatlekutl on 03.04.17.
*/







const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class SignupModal extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Signup', __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug___default.a);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = SignupModal;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_victory_css__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_victory_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_victory_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_victory_pug__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_victory_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_victory_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_userModel__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(1);
/**
 * Created by sergey on 01.05.17.
 */








const us = new __WEBPACK_IMPORTED_MODULE_3__models_userModel__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();

class VictoryModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Завершение игры', __WEBPACK_IMPORTED_MODULE_2__templates_victory_pug___default.a);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.victory-modal .change');
    this.changeRating.innerHTML = us.getData().changeRating;
    this.newRating = document.querySelector('.victory-modal .rating_score');
    this.newRating.innerHTML = us.getData().rating + us.getData().changeRating;
    this.onClose(() => {
      this.destruct();
      ee.emit(__WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["k" /* DESTROY_GAME */]);
    });
  }
  // onClose(func) {
  //   this.close.addEventListener('click', func);
  //   this.close.addEventListener('click', () => {
  //     this.modal.style.display = 'none';
  //   });
  //   return this;
  // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VictoryModal;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map