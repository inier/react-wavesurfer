(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("@yfmd/wavesurfer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "@yfmd/wavesurfer.js"], factory);
	else if(typeof exports === 'object')
		exports["plugins/minimap"] = factory(require("react"), require("@yfmd/wavesurfer.js"));
	else
		root["Wavesurfer"] = root["Wavesurfer"] || {}, root["Wavesurfer"]["plugins/minimap"] = factory(root["React"], root["WaveSurfer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(2);

	var Minimap = function (_Component) {
	  _inherits(Minimap, _Component);

	  function Minimap() {
	    _classCallCheck(this, Minimap);

	    return _possibleConstructorReturn(this, (Minimap.__proto__ || Object.getPrototypeOf(Minimap)).apply(this, arguments));
	  }

	  _createClass(Minimap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this._map = undefined;

	      // on('ready') returns an event descriptor which is an
	      // object which has the property un, which is the un method
	      // properly bound to this callback, we cache it and can call
	      // it alter to just remove this event listener
	      this._readyListener = this.props.wavesurfer.on('ready', function () {
	        _this2._init();
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._readyListener.un();
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      this._map = Object.create(WaveSurfer.Minimap);
	      this._map.init(this.props.wavesurfer, this.props.options);
	      this._map.render();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return false;
	    }
	  }]);

	  return Minimap;
	}(_react.Component);

	Minimap.propTypes = {
	  isReady: _react.PropTypes.bool.isRequired,
	  options: _react.PropTypes.object.isRequired,
	  wavesurfer: _react.PropTypes.object
	};

	Minimap.defaultProps = {
	  isReady: false,
	  options: {}
	};

	exports.default = Minimap;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*** IMPORTS FROM imports-loader ***/
	var define = false;
	var exports = false;

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (root, factory) {
	    if (typeof define === 'function' && define.amd) {
	        // AMD. Register as an anonymous module unless amdModuleId is set
	        define(["@yfmd/wavesurfer.js"], function (a0) {
	            return factory(a0);
	        });
	    } else if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory(__webpack_require__(4));
	    } else {
	        factory(root["WaveSurfer"]);
	    }
	})(undefined, function (WaveSurfer) {

	    'use strict';

	    /* Minimap */

	    WaveSurfer.Minimap = WaveSurfer.util.extend({}, WaveSurfer.Drawer, WaveSurfer.Drawer.Canvas, {
	        init: function init(wavesurfer, params) {
	            this.wavesurfer = wavesurfer;
	            this.container = this.wavesurfer.drawer.container;
	            this.lastPos = this.wavesurfer.drawer.lastPos;
	            this.params = wavesurfer.util.extend({}, this.wavesurfer.drawer.params, {
	                showRegions: false,
	                showOverview: false,
	                overviewBorderColor: 'green',
	                overviewBorderSize: 2
	            }, params, {
	                scrollParent: false,
	                fillParent: true
	            });

	            this.width = 0;
	            this.height = this.params.height * this.params.pixelRatio;

	            this.createWrapper();
	            this.createElements();

	            if (WaveSurfer.Regions && this.params.showRegions) {
	                this.regions();
	            }

	            this.bindWaveSurferEvents();
	            this.bindMinimapEvents();
	        },
	        regions: function regions() {
	            var my = this;
	            this.regions = {};

	            this.wavesurfer.on('region-created', function (region) {
	                my.regions[region.id] = region;
	                my.renderRegions();
	            });

	            this.wavesurfer.on('region-updated', function (region) {
	                my.regions[region.id] = region;
	                my.renderRegions();
	            });

	            this.wavesurfer.on('region-removed', function (region) {
	                delete my.regions[region.id];
	                my.renderRegions();
	            });
	        },
	        renderRegions: function renderRegions() {
	            var my = this;
	            var regionElements = this.wrapper.querySelectorAll('region');
	            for (var i = 0; i < regionElements.length; ++i) {
	                this.wrapper.removeChild(regionElements[i]);
	            }

	            Object.keys(this.regions).forEach(function (id) {
	                var region = my.regions[id];
	                var width = my.width * ((region.end - region.start) / my.wavesurfer.getDuration());
	                var left = my.width * (region.start / my.wavesurfer.getDuration());
	                var regionElement = my.style(document.createElement('region'), {
	                    height: 'inherit',
	                    backgroundColor: region.color,
	                    width: width + 'px',
	                    left: left + 'px',
	                    display: 'block',
	                    position: 'absolute'
	                });
	                regionElement.classList.add(id);
	                my.wrapper.appendChild(regionElement);
	            });
	        },
	        createElements: function createElements() {
	            WaveSurfer.Drawer.Canvas.createElements.call(this);

	            if (this.params.showOverview) {
	                this.overviewRegion = this.style(document.createElement('overview'), {
	                    height: this.wrapper.offsetHeight - this.params.overviewBorderSize * 2 + 'px',
	                    width: '0px',
	                    display: 'block',
	                    position: 'absolute',
	                    cursor: 'move',
	                    border: this.params.overviewBorderSize + 'px solid ' + this.params.overviewBorderColor,
	                    zIndex: 2,
	                    opacity: this.params.overviewOpacity
	                });

	                this.wrapper.appendChild(this.overviewRegion);
	            }
	        },

	        bindWaveSurferEvents: function bindWaveSurferEvents() {
	            var my = this;
	            this.wavesurfer.on('ready', this.render.bind(this));
	            this.wavesurfer.on('audioprocess', function (currentTime) {
	                my.progress(my.wavesurfer.backend.getPlayedPercents());
	            });
	            this.wavesurfer.on('seek', function (progress) {
	                my.progress(my.wavesurfer.backend.getPlayedPercents());
	            });

	            if (this.params.showOverview) {
	                this.wavesurfer.on('scroll', function (event) {
	                    if (!my.draggingOverview) {
	                        my.moveOverviewRegion(event.target.scrollLeft / my.ratio);
	                    }
	                });

	                this.wavesurfer.drawer.wrapper.addEventListener('mouseover', function (event) {
	                    if (my.draggingOverview) {
	                        my.draggingOverview = false;
	                    }
	                });
	            }

	            var prevWidth = 0;
	            var onResize = this.wavesurfer.util.debounce(function () {
	                if (prevWidth != my.wrapper.clientWidth) {
	                    prevWidth = my.wrapper.clientWidth;
	                    my.render();
	                    my.progress(my.wavesurfer.backend.getPlayedPercents());
	                }
	            }, 100);
	            window.addEventListener('resize', onResize, true);

	            this.wavesurfer.on('destroy', function () {
	                my.destroy.bind(this);
	                window.removeEventListener('resize', onResize, true);
	            });
	        },

	        bindMinimapEvents: function bindMinimapEvents() {
	            var my = this;
	            var relativePositionX = 0;
	            var seek = true;
	            var positionMouseDown = {
	                clientX: 0,
	                clientY: 0
	            };

	            this.on('click', function (e, position) {
	                if (seek) {
	                    this.progress(position);
	                    this.wavesurfer.seekAndCenter(position);
	                } else {
	                    seek = true;
	                }
	            }.bind(this));

	            if (this.params.showOverview) {
	                this.overviewRegion.addEventListener('mousedown', function (event) {
	                    my.draggingOverview = true;
	                    relativePositionX = event.layerX;
	                    positionMouseDown.clientX = event.clientX;
	                    positionMouseDown.clientY = event.clientY;
	                });

	                this.wrapper.addEventListener('mousemove', function (event) {
	                    if (my.draggingOverview) {
	                        my.moveOverviewRegion(event.clientX - my.container.getBoundingClientRect().left - relativePositionX);
	                    }
	                });

	                this.wrapper.addEventListener('mouseup', function (event) {
	                    if (positionMouseDown.clientX - event.clientX === 0 && positionMouseDown.clientX - event.clientX === 0) {
	                        seek = true;
	                        my.draggingOverview = false;
	                    } else if (my.draggingOverview) {
	                        seek = false;
	                        my.draggingOverview = false;
	                    }
	                });
	            }
	        },

	        render: function render() {
	            var len = this.getWidth();
	            var peaks = this.wavesurfer.backend.getPeaks(len);
	            this.drawPeaks(peaks, len);

	            if (this.params.showOverview) {
	                //get proportional width of overview region considering the respective
	                //width of the drawers
	                this.ratio = this.wavesurfer.drawer.width / this.width;
	                this.waveShowedWidth = this.wavesurfer.drawer.width / this.ratio;
	                this.waveWidth = this.wavesurfer.drawer.width;
	                this.overviewWidth = this.width / this.ratio;
	                this.overviewPosition = 0;
	                this.overviewRegion.style.width = this.overviewWidth - this.params.overviewBorderSize * 2 + 'px';
	            }
	        },
	        moveOverviewRegion: function moveOverviewRegion(pixels) {
	            if (pixels < 0) {
	                this.overviewPosition = 0;
	            } else if (pixels + this.overviewWidth < this.width) {
	                this.overviewPosition = pixels;
	            } else {
	                this.overviewPosition = this.width - this.overviewWidth;
	            }
	            this.overviewRegion.style.left = this.overviewPosition + 'px';
	            this.wavesurfer.drawer.wrapper.scrollLeft = this.overviewPosition * this.ratio;
	        }
	    });

	    WaveSurfer.initMinimap = function (params) {
	        var map = Object.create(WaveSurfer.Minimap);
	        map.init(this, params);
	        return map;
	    };
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ])
});
;