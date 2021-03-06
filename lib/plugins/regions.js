(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("@yfmd/wavesurfer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "@yfmd/wavesurfer.js"], factory);
	else if(typeof exports === 'object')
		exports["plugins/regions"] = factory(require("react"), require("@yfmd/wavesurfer.js"));
	else
		root["Wavesurfer"] = root["Wavesurfer"] || {}, root["Wavesurfer"]["plugins/regions"] = factory(root["React"], root["WaveSurfer"]);
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

	__webpack_require__(5);

	var REGIONS_EVENTS = ['region-in', 'region-out', 'region-mouseenter', 'region-mouseleave', 'region-click', 'region-dblclick', 'region-updated', 'region-update-end', 'region-removed', 'region-play'];

	var REGION_EVENTS = ['in', 'out', 'remove', 'update', 'click', 'dbclick', 'over', 'leave'];

	/**
	 * @description Capitalise the first letter of a string
	 */
	function capitaliseFirstLetter(string) {
	  return string.split('-').map(function (part) {
	    return part.charAt(0).toUpperCase() + part.slice(1);
	  }).join('');
	}

	var Regions = function (_Component) {
	  _inherits(Regions, _Component);

	  function Regions(props) {
	    _classCallCheck(this, Regions);

	    // this is so that jscs does not force us to go functional
	    var _this = _possibleConstructorReturn(this, (Regions.__proto__ || Object.getPrototypeOf(Regions)).call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Regions, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.isReady) {
	        this._init.call(this);
	      }

	      this.props.wavesurfer.on('ready', this._init.bind(this));
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // only update if the wavesurfer instance has been ready
	      if (!this.props.isReady) {
	        return;
	      }

	      // cache reference to old regions
	      var oldRegions = Object.create(this.props.wavesurfer.regions.list);
	      var newRegionId = void 0;
	      var oldRegionId = void 0;

	      for (newRegionId in nextProps.regions) {
	        if ({}.hasOwnProperty.call(nextProps.regions, newRegionId)) {
	          var newRegion = nextProps.regions[newRegionId];

	          // remove from oldRegions
	          delete oldRegions[newRegionId];

	          // new regions
	          if (!this.props.wavesurfer.regions.list[newRegionId]) {
	            this._hookUpRegionEvents(nextProps.wavesurfer.addRegion(newRegion));

	            // update regions
	          } else if (oldRegions[newRegionId] && (oldRegions[newRegionId].start !== newRegion.start || oldRegions[newRegionId].end !== newRegion.end)) {
	            nextProps.wavesurfer.regions.list[newRegionId].update({
	              start: newRegion.start,
	              end: newRegion.end
	            });
	          }
	        }
	      }

	      // remove any old regions
	      for (oldRegionId in oldRegions) {
	        if ({}.hasOwnProperty.call(oldRegions, oldRegionId)) {
	          nextProps.wavesurfer.regions.list[oldRegionId].remove();
	        }
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var _this2 = this;

	      REGION_EVENTS.forEach(function (e) {
	        _this2.props.wavesurfer.un(e);
	      });
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      var _this3 = this;

	      var _props = this.props,
	          wavesurfer = _props.wavesurfer,
	          regions = _props.regions;

	      var newRegionId = void 0;

	      REGIONS_EVENTS.forEach(function (e) {
	        var propCallback = _this3.props['on' + capitaliseFirstLetter(e)];
	        if (!propCallback) return;

	        wavesurfer.on(e, function () {
	          for (var _len = arguments.length, originalArgs = Array(_len), _key = 0; _key < _len; _key++) {
	            originalArgs[_key] = arguments[_key];
	          }

	          propCallback({
	            wavesurfer: wavesurfer,
	            originalArgs: originalArgs
	          });
	        });
	      });

	      // add regions and hook up callbacks to region objects
	      for (newRegionId in regions) {
	        if ({}.hasOwnProperty.call(regions, newRegionId)) {
	          this._hookUpRegionEvents(wavesurfer.addRegion(regions[newRegionId]));
	        }
	      }
	    }
	  }, {
	    key: '_hookUpRegionEvents',
	    value: function _hookUpRegionEvents(region) {
	      var _this4 = this;

	      REGION_EVENTS.forEach(function (e) {
	        var propCallback = _this4.props['onSingleRegion' + capitaliseFirstLetter(e)];
	        var wavesurfer = _this4.props.wavesurfer;

	        if (propCallback) {
	          region.on(e, function () {
	            for (var _len2 = arguments.length, originalArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	              originalArgs[_key2] = arguments[_key2];
	            }

	            propCallback({
	              wavesurfer: wavesurfer,
	              originalArgs: originalArgs,
	              region: region
	            });
	          });
	        }
	      });

	      region.on('remove', function () {
	        REGION_EVENTS.forEach(function (e) {
	          region.un(e);
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return false;
	    }
	  }]);

	  return Regions;
	}(_react.Component);

	Regions.propTypes = {
	  isReady: _react.PropTypes.bool,
	  regions: _react.PropTypes.object,
	  wavesurfer: _react.PropTypes.object
	};

	Regions.defaultProps = {
	  regions: []
	};

	exports.default = Regions;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */,
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

/***/ }),
/* 5 */
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

	    /* Regions manager */

	    WaveSurfer.Regions = {
	        init: function init(wavesurfer) {
	            this.wavesurfer = wavesurfer;
	            this.wrapper = this.wavesurfer.drawer.wrapper;

	            /* Id-based hash of regions. */
	            this.list = {};
	        },

	        /* Add a region. */
	        add: function add(params) {
	            var region = Object.create(WaveSurfer.Region);
	            region.init(params, this.wavesurfer);

	            this.list[region.id] = region;

	            region.on('remove', function () {
	                delete this.list[region.id];
	            }.bind(this));

	            this.fireEvent('add');
	            this.wavesurfer.fireEvent('region-added', this);
	            return region;
	        },

	        remove: function remove(id) {
	            this.list[id].remove();
	        },

	        /* Remove all regions. */
	        clear: function clear() {
	            Object.keys(this.list).forEach(function (id) {
	                this.list[id].remove();
	            }, this);
	        },

	        enableDragSelection: function enableDragSelection(params) {
	            var my = this;
	            var drag;
	            var start;
	            var region;
	            var touchId;
	            var slop = params.slop || 2;
	            var pxMove = 0;

	            var eventDown = function eventDown(e) {
	                if (e.touches && e.touches.length > 1) {
	                    return;
	                }

	                // Check whether the click/tap is on the bottom-most DOM element
	                // Effectively prevent clicks on the scrollbar from registering as
	                // region creation.
	                if (e.target.childElementCount > 0) {
	                    return;
	                }

	                touchId = e.targetTouches ? e.targetTouches[0].identifier : null;

	                drag = true;
	                start = my.wavesurfer.drawer.handleEvent(e, true);
	                region = null;
	            };
	            this.wrapper.addEventListener('mousedown', eventDown);
	            this.wrapper.addEventListener('touchstart', eventDown);
	            this.on('disable-drag-selection', function () {
	                my.wrapper.removeEventListener('touchstart', eventDown);
	                my.wrapper.removeEventListener('mousedown', eventDown);
	            });

	            var eventUp = function eventUp(e) {
	                if (e.touches && e.touches.length > 1) {
	                    return;
	                }

	                drag = false;
	                pxMove = 0;

	                if (region) {
	                    region.fireEvent('update-end', e);
	                    my.wavesurfer.fireEvent('region-update-end', region, e);
	                }

	                region = null;
	            };
	            this.wrapper.addEventListener('mouseup', eventUp);
	            this.wrapper.addEventListener('touchend', eventUp);
	            this.on('disable-drag-selection', function () {
	                my.wrapper.removeEventListener('touchend', eventUp);
	                my.wrapper.removeEventListener('mouseup', eventUp);
	            });

	            var eventMove = function eventMove(e) {
	                if (!drag) {
	                    return;
	                }
	                if (++pxMove <= slop) {
	                    return;
	                }

	                if (e.touches && e.touches.length > 1) {
	                    return;
	                }
	                if (e.targetTouches && e.targetTouches[0].identifier != touchId) {
	                    return;
	                }

	                if (!region) {
	                    region = my.add(params || {});
	                }

	                var duration = my.wavesurfer.getDuration();
	                var end = my.wavesurfer.drawer.handleEvent(e);
	                region.update({
	                    start: Math.min(end * duration, start * duration),
	                    end: Math.max(end * duration, start * duration)
	                });
	            };
	            this.wrapper.addEventListener('mousemove', eventMove);
	            this.wrapper.addEventListener('touchmove', eventMove);
	            this.on('disable-drag-selection', function () {
	                my.wrapper.removeEventListener('touchmove', eventMove);
	                my.wrapper.removeEventListener('mousemove', eventMove);
	            });
	        },

	        disableDragSelection: function disableDragSelection() {
	            this.fireEvent('disable-drag-selection');
	        }
	    };

	    WaveSurfer.util.extend(WaveSurfer.Regions, WaveSurfer.Observer);

	    WaveSurfer.Region = {
	        /* Helper function to assign CSS styles. */
	        style: WaveSurfer.Drawer.style,

	        init: function init(params, wavesurfer) {
	            this.wavesurfer = wavesurfer;
	            this.wrapper = wavesurfer.drawer.wrapper;

	            this.id = params.id == null ? WaveSurfer.util.getId() : params.id;
	            this.start = Number(params.start) || 0;
	            this.end = params.end == null ?
	            // small marker-like region
	            this.start + 4 / this.wrapper.scrollWidth * this.wavesurfer.getDuration() : Number(params.end);
	            this.resize = params.resize === undefined ? true : Boolean(params.resize);
	            this.drag = params.drag === undefined ? true : Boolean(params.drag);
	            this.loop = Boolean(params.loop);
	            this.color = params.color || 'rgba(0, 0, 0, 0.1)';
	            this.data = params.data || {};
	            this.attributes = params.attributes || {};

	            this.maxLength = params.maxLength;
	            this.minLength = params.minLength;

	            this.bindInOut();
	            this.render();

	            this.onZoom = this.updateRender.bind(this);
	            this.wavesurfer.on('zoom', this.onZoom);

	            this.wavesurfer.fireEvent('region-created', this);
	        },

	        /* Update region params. */
	        update: function update(params) {
	            if (null != params.start) {
	                this.start = Number(params.start);
	            }
	            if (null != params.end) {
	                this.end = Number(params.end);
	            }
	            if (null != params.loop) {
	                this.loop = Boolean(params.loop);
	            }
	            if (null != params.color) {
	                this.color = params.color;
	            }
	            if (null != params.data) {
	                this.data = params.data;
	            }
	            if (null != params.resize) {
	                this.resize = Boolean(params.resize);
	            }
	            if (null != params.drag) {
	                this.drag = Boolean(params.drag);
	            }
	            if (null != params.maxLength) {
	                this.maxLength = Number(params.maxLength);
	            }
	            if (null != params.minLength) {
	                this.minLength = Number(params.minLength);
	            }
	            if (null != params.attributes) {
	                this.attributes = params.attributes;
	            }

	            this.updateRender();
	            this.fireEvent('update');
	            this.wavesurfer.fireEvent('region-updated', this);
	        },

	        /* Remove a single region. */
	        remove: function remove() {
	            if (this.element) {
	                this.wrapper.removeChild(this.element);
	                this.element = null;
	                this.wavesurfer.un('zoom', this.onZoom);
	                this.fireEvent('remove');
	                this.wavesurfer.fireEvent('region-removed', this);
	            }
	        },

	        /* Play the audio region. */
	        play: function play() {
	            this.wavesurfer.play(this.start, this.end);
	            this.fireEvent('play');
	            this.wavesurfer.fireEvent('region-play', this);
	        },

	        /* Play the region in loop. */
	        playLoop: function playLoop() {
	            this.play();
	            this.once('out', this.playLoop.bind(this));
	        },

	        /* Render a region as a DOM element. */
	        render: function render() {
	            var regionEl = document.createElement('region');
	            regionEl.className = 'wavesurfer-region';
	            regionEl.title = this.formatTime(this.start, this.end);
	            regionEl.setAttribute('data-id', this.id);

	            for (var attrname in this.attributes) {
	                regionEl.setAttribute('data-region-' + attrname, this.attributes[attrname]);
	            }

	            var width = this.wrapper.scrollWidth;
	            this.style(regionEl, {
	                position: 'absolute',
	                zIndex: 2,
	                height: '100%',
	                top: '0px'
	            });

	            /* Resize handles */
	            if (this.resize) {
	                var handleLeft = regionEl.appendChild(document.createElement('handle'));
	                var handleRight = regionEl.appendChild(document.createElement('handle'));
	                handleLeft.className = 'wavesurfer-handle wavesurfer-handle-start';
	                handleRight.className = 'wavesurfer-handle wavesurfer-handle-end';
	                var css = {
	                    cursor: 'col-resize',
	                    position: 'absolute',
	                    left: '0px',
	                    top: '0px',
	                    width: '1%',
	                    maxWidth: '4px',
	                    height: '100%'
	                };
	                this.style(handleLeft, css);
	                this.style(handleRight, css);
	                this.style(handleRight, {
	                    left: '100%'
	                });
	            }

	            this.element = this.wrapper.appendChild(regionEl);
	            this.updateRender();
	            this.bindEvents(regionEl);
	        },

	        formatTime: function formatTime(start, end) {
	            return (start == end ? [start] : [start, end]).map(function (time) {
	                return [Math.floor(time % 3600 / 60), // minutes
	                ('00' + Math.floor(time % 60)).slice(-2) // seconds
	                ].join(':');
	            }).join('-');
	        },

	        getWidth: function getWidth() {
	            return this.wavesurfer.drawer.width / this.wavesurfer.params.pixelRatio;
	        },

	        /* Update element's position, width, color. */
	        updateRender: function updateRender() {
	            var dur = this.wavesurfer.getDuration();
	            var width = this.getWidth();

	            if (this.start < 0) {
	                this.start = 0;
	                this.end = this.end - this.start;
	            }
	            if (this.end > dur) {
	                this.end = dur;
	                this.start = dur - (this.end - this.start);
	            }

	            if (this.minLength != null) {
	                this.end = Math.max(this.start + this.minLength, this.end);
	            }

	            if (this.maxLength != null) {
	                this.end = Math.min(this.start + this.maxLength, this.end);
	            }

	            if (this.element != null) {
	                // Calculate the left and width values of the region such that
	                // no gaps appear between regions.
	                var left = Math.round(this.start / dur * width);
	                var regionWidth = Math.round(this.end / dur * width) - left;

	                this.style(this.element, {
	                    left: left + 'px',
	                    width: regionWidth + 'px',
	                    backgroundColor: this.color,
	                    cursor: this.drag ? 'move' : 'default'
	                });

	                for (var attrname in this.attributes) {
	                    this.element.setAttribute('data-region-' + attrname, this.attributes[attrname]);
	                }

	                this.element.title = this.formatTime(this.start, this.end);
	            }
	        },

	        /* Bind audio events. */
	        bindInOut: function bindInOut() {
	            var my = this;

	            my.firedIn = false;
	            my.firedOut = false;

	            var onProcess = function onProcess(time) {
	                if (!my.firedOut && my.firedIn && (my.start >= Math.round(time * 100) / 100 || my.end <= Math.round(time * 100) / 100)) {
	                    my.firedOut = true;
	                    my.firedIn = false;
	                    my.fireEvent('out');
	                    my.wavesurfer.fireEvent('region-out', my);
	                }
	                if (!my.firedIn && my.start <= time && my.end > time) {
	                    my.firedIn = true;
	                    my.firedOut = false;
	                    my.fireEvent('in');
	                    my.wavesurfer.fireEvent('region-in', my);
	                }
	            };

	            this.wavesurfer.backend.on('audioprocess', onProcess);

	            this.on('remove', function () {
	                my.wavesurfer.backend.un('audioprocess', onProcess);
	            });

	            /* Loop playback. */
	            this.on('out', function () {
	                if (my.loop) {
	                    my.wavesurfer.play(my.start);
	                }
	            });
	        },

	        /* Bind DOM events. */
	        bindEvents: function bindEvents() {
	            var my = this;

	            this.element.addEventListener('mouseenter', function (e) {
	                my.fireEvent('mouseenter', e);
	                my.wavesurfer.fireEvent('region-mouseenter', my, e);
	            });

	            this.element.addEventListener('mouseleave', function (e) {
	                my.fireEvent('mouseleave', e);
	                my.wavesurfer.fireEvent('region-mouseleave', my, e);
	            });

	            this.element.addEventListener('click', function (e) {
	                e.preventDefault();
	                my.fireEvent('click', e);
	                my.wavesurfer.fireEvent('region-click', my, e);
	            });

	            this.element.addEventListener('dblclick', function (e) {
	                e.stopPropagation();
	                e.preventDefault();
	                my.fireEvent('dblclick', e);
	                my.wavesurfer.fireEvent('region-dblclick', my, e);
	            });

	            /* Drag or resize on mousemove. */
	            (this.drag || this.resize) && function () {
	                var duration = my.wavesurfer.getDuration();
	                var drag;
	                var resize;
	                var startTime;
	                var touchId;

	                var onDown = function onDown(e) {
	                    if (e.touches && e.touches.length > 1) {
	                        return;
	                    }
	                    touchId = e.targetTouches ? e.targetTouches[0].identifier : null;

	                    e.stopPropagation();
	                    startTime = my.wavesurfer.drawer.handleEvent(e, true) * duration;

	                    if (e.target.tagName.toLowerCase() == 'handle') {
	                        if (e.target.classList.contains('wavesurfer-handle-start')) {
	                            resize = 'start';
	                        } else {
	                            resize = 'end';
	                        }
	                    } else {
	                        drag = true;
	                        resize = false;
	                    }
	                };
	                var onUp = function onUp(e) {
	                    if (e.touches && e.touches.length > 1) {
	                        return;
	                    }

	                    if (drag || resize) {
	                        drag = false;
	                        resize = false;

	                        my.fireEvent('update-end', e);
	                        my.wavesurfer.fireEvent('region-update-end', my, e);
	                    }
	                };
	                var onMove = function onMove(e) {
	                    if (e.touches && e.touches.length > 1) {
	                        return;
	                    }
	                    if (e.targetTouches && e.targetTouches[0].identifier != touchId) {
	                        return;
	                    }

	                    if (drag || resize) {
	                        var time = my.wavesurfer.drawer.handleEvent(e) * duration;
	                        var delta = time - startTime;
	                        startTime = time;

	                        // Drag
	                        if (my.drag && drag) {
	                            my.onDrag(delta);
	                        }

	                        // Resize
	                        if (my.resize && resize) {
	                            my.onResize(delta, resize);
	                        }
	                    }
	                };

	                my.element.addEventListener('mousedown', onDown);
	                my.element.addEventListener('touchstart', onDown);

	                my.wrapper.addEventListener('mousemove', onMove);
	                my.wrapper.addEventListener('touchmove', onMove);

	                document.body.addEventListener('mouseup', onUp);
	                document.body.addEventListener('touchend', onUp);

	                my.on('remove', function () {
	                    document.body.removeEventListener('mouseup', onUp);
	                    document.body.removeEventListener('touchend', onUp);
	                    my.wrapper.removeEventListener('mousemove', onMove);
	                    my.wrapper.removeEventListener('touchmove', onMove);
	                });

	                my.wavesurfer.on('destroy', function () {
	                    document.body.removeEventListener('mouseup', onUp);
	                    document.body.removeEventListener('touchend', onUp);
	                });
	            }();
	        },

	        onDrag: function onDrag(delta) {
	            var maxEnd = this.wavesurfer.getDuration();
	            if (this.end + delta > maxEnd || this.start + delta < 0) {
	                return;
	            }

	            this.update({
	                start: this.start + delta,
	                end: this.end + delta
	            });
	        },

	        onResize: function onResize(delta, direction) {
	            if (direction == 'start') {
	                this.update({
	                    start: Math.min(this.start + delta, this.end),
	                    end: Math.max(this.start + delta, this.end)
	                });
	            } else {
	                this.update({
	                    start: Math.min(this.end + delta, this.start),
	                    end: Math.max(this.end + delta, this.start)
	                });
	            }
	        }
	    };

	    WaveSurfer.util.extend(WaveSurfer.Region, WaveSurfer.Observer);

	    /* Augment WaveSurfer with region methods. */
	    WaveSurfer.initRegions = function () {
	        if (!this.regions) {
	            this.regions = Object.create(WaveSurfer.Regions);
	            this.regions.init(this);
	        }
	    };

	    WaveSurfer.addRegion = function (options) {
	        this.initRegions();
	        return this.regions.add(options);
	    };

	    WaveSurfer.removeRegion = function (id) {
	        this.regions && this.regions.remove(id);
	    };

	    WaveSurfer.clearRegions = function () {
	        this.regions && this.regions.clear();
	    };

	    WaveSurfer.enableDragSelection = function (options) {
	        this.initRegions();
	        this.regions.enableDragSelection(options);
	    };

	    WaveSurfer.disableDragSelection = function () {
	        this.regions.disableDragSelection();
	    };
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ })
/******/ ])
});
;