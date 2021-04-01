'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var three = require('three');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var COLOR_SPOTLIGHT = 0xFFFFFF;
var COLOR_AMBIENT_LIGHT = 0x404040;
var INTENSITY_AMBIENT = 3;
var INTENSITY_SPOTLIGHT = 0.61;
var POSITION_CAMERA = [0, 0, 7];
var POSITION_SPOTLIGHT = [1, 1, 5];
var POSITION_SPOTLIGHT_TARGET = [0, 0, 0];
function buildRenderer() {
  // renderer.setClearColor(0xFF0000, 0);
  return new three.WebGLRenderer({
    alpha: true,
    antialias: true
  });
}
function buildCamera(width, height) {
  var _camera$position;

  var camera = new three.PerspectiveCamera(50, width / height, 1, 1000);

  (_camera$position = camera.position).set.apply(_camera$position, POSITION_CAMERA);

  return camera;
}
function buildScene() {
  var _spotLight$position, _spotLight$target$pos;

  var useHelpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var scene = new three.Scene();
  var ambientLight = new three.AmbientLight(COLOR_AMBIENT_LIGHT, INTENSITY_AMBIENT);
  scene.add(ambientLight);
  var spotLight = new three.SpotLight(COLOR_SPOTLIGHT, INTENSITY_SPOTLIGHT);

  (_spotLight$position = spotLight.position).set.apply(_spotLight$position, POSITION_SPOTLIGHT);

  (_spotLight$target$pos = spotLight.target.position).set.apply(_spotLight$target$pos, POSITION_SPOTLIGHT_TARGET);

  scene.add(spotLight);
  scene.add(spotLight.target);

  if (useHelpers) {
    var spotLightHelper = new three.SpotLightHelper(spotLight, 0xFF0000);
    scene.add(spotLightHelper);
    var axesHelper = new three.AxesHelper(5);
    scene.add(axesHelper);
  }

  return scene;
}
/**
 * @param {Texture[]} textures
 * @param {number} height
 * @param {number} radius
 * @param {number} thickness
 * @param {number} turnovers
 * @param {number} steps
 * @param {number} shiftMultiplier
 * @return {Group}
 */

function buildRibbon(textures, _ref) {
  var _Group;

  var photoHeight = _ref.photoHeight,
      radius = _ref.radius,
      thickness = _ref.thickness,
      turnovers = _ref.turnovers,
      steps = _ref.steps,
      shiftMultiplier = _ref.shiftMultiplier,
      _ref$translateMultipl = _ref.translateMultiplier,
      translateMultiplier = _ref$translateMultipl === void 0 ? {
    x: 0,
    y: 0,
    z: 0
  } : _ref$translateMultipl;
  var segmentsGeometries = buildRibbonSegmentsGeometry(turnovers, textures.length, radius, photoHeight, thickness, steps, shiftMultiplier, translateMultiplier);
  var objects = textures.map(function (texture, i) {
    var material = new three.MeshLambertMaterial({
      map: texture,
      alphaTest: 0.1 // transparent: true,

    });
    var obj = new three.Mesh(segmentsGeometries[i], material);
    obj.userData = {
      segment: i
    };
    return obj;
  });
  return (_Group = new three.Group()).add.apply(_Group, _toConsumableArray(objects));
}
function loadTexture(textureUrl) {
  var textureLoader = new three.TextureLoader();
  return new Promise(function (resolve) {
    textureLoader.load(textureUrl, function (texture) {
      texture.repeat.set(1, 1);
      resolve(texture);
    });
  });
}
/**
 * @private
 */

function buildRibbonSegmentsGeometry(turnovers, segmentsNumber, radius, segmentHeight, segmentThickness, steps, shiftMultiplier, translateMultiplier) {
  var segmentWidth = turnovers * Math.PI * 2 / segmentsNumber;
  /**
   * @type {BoxGeometry[]}
   */

  var segmentsGeometries = [];
  var angle = 0;

  for (var i = 0; i < segmentsNumber; i++) {
    // prefer BufferGeometry
    // const geom = new PlaneGeometry(width, segmentHeight, steps, 1)
    var geom = new three.BoxGeometry(segmentWidth, segmentHeight, segmentThickness, steps, 1, 1);
    geom.computeBoundingBox();
    geom.vertices.forEach(function (v) {
      var a = -v.x + angle;
      var r = radius + v.z;
      var shift = -a / (Math.PI * 2) * shiftMultiplier;
      v.x = Math.cos(a) * r;
      v.y = v.y + shift;
      v.z = Math.sin(a) * r;
    });
    geom.computeBoundingBox(); // geom.computeFaceNormals()
    // geom.computeVertexNormals()
    //geom.center()

    var size = new three.Vector3();
    geom.boundingBox.getSize(size);
    geom.translate(translateMultiplier.x * size.x, translateMultiplier.y * size.y, translateMultiplier.z * size.z);
    segmentsGeometries.push(geom);
    angle += segmentWidth;
  }

  return segmentsGeometries;
}
/**
 * @typedef {Object} PhotoSegment
 * @property {string} photoUrl - URL of texture
 * @property {number} width - width in radians
 */

var HelixRibbonScene = /*#__PURE__*/function () {
  /**
   * @param {number} sceneWidth
   * @param {number} sceneHeight
   * @param {*} ribbonOptions
   */
  function HelixRibbonScene(sceneWidth, sceneHeight, ribbonOptions) {
    _classCallCheck(this, HelixRibbonScene);

    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.ribbonOptions = ribbonOptions;
    this.rotationSpeed = 0;
    this.rotationEnabled = true;
    this.textures = [];
    this.eventTarget = new EventTarget();
  }
  /**
   * @param {WebGLRenderer|null} renderer
   * @param {PerspectiveCamera|null} camera
   * @param {Scene|null} scene
   * @return {HelixRibbonScene}
   */


  _createClass(HelixRibbonScene, [{
    key: "prepare",
    value: function prepare() {
      var _this = this;

      var renderer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var camera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var scene = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.renderer = renderer !== null && renderer !== void 0 ? renderer : buildRenderer();
      this.renderer.setSize(this.sceneWidth, this.sceneHeight);
      this.camera = camera !== null && camera !== void 0 ? camera : buildCamera(this.sceneWidth, this.sceneHeight);
      this.scene = scene !== null && scene !== void 0 ? scene : buildScene(false);
      var photos = this.ribbonOptions.photos; // async/ await

      Promise.all(photos.map(function (v) {
        return loadTexture(v.photoUrl);
      })).then(function (textures) {
        _this.textures = textures;
        _this.ribbon = buildRibbon(_this.textures, _this.ribbonOptions);

        _this.scene.add(_this.ribbon);

        _this.eventTarget.dispatchEvent(new CustomEvent('ready'));
      });
      this.raycaster = new three.Raycaster();
      this.mouse = new three.Vector2();
      this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this), false);
      return this;
    }
    /**
     * @param {HTMLElement} containerEl
     * @return {HelixRibbonScene}
     */

  }, {
    key: "render",
    value: function render(containerEl) {
      var _this2 = this;

      containerEl.appendChild(this.renderer.domElement);

      var renderFrame = function renderFrame() {
        requestAnimationFrame(renderFrame); // waiting is ready

        if (_this2.ribbon) {
          if (_this2.rotationEnabled) {
            _this2.ribbon.rotation.y -= _this2.rotationSpeed;
          }

          _this2.renderer.render(_this2.scene, _this2.camera);
        }
      };

      renderFrame();
      return this;
    }
    /**
     * @param {number} width
     * @param {number} height
     * @return {HelixRibbonScene}
     */

  }, {
    key: "resize",
    value: function resize(width, height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      return this;
    }
  }, {
    key: "setRotationEnabled",
    value: function setRotationEnabled(enabled) {
      this.rotationEnabled = enabled;
      return this;
    }
    /**
     * @param {number} speed
     * @return {HelixRibbonScene}
     */

  }, {
    key: "setRotationSpeed",
    value: function setRotationSpeed(speed) {
      this.rotationSpeed = speed;
      return this;
    }
    /**
     * @param {number} angle
     * @return {HelixRibbonScene}
     */

  }, {
    key: "setRotationAngle",
    value: function setRotationAngle(angle) {
      this.ribbon.rotation.y = angle;
      return this;
    }
    /**
     * @param {number} delta
     * @return {HelixRibbonScene}
     */

  }, {
    key: "addRotationDelta",
    value: function addRotationDelta(delta) {
      this.ribbon.rotation.y += delta;
      return this;
    }
  }, {
    key: "getEventsTarget",
    value: function getEventsTarget() {
      return this.eventTarget;
    }
  }, {
    key: "onMouseClick",
    value: function onMouseClick(event) {
      var _intersects$, _firstIntersection$ob, _firstIntersection$ob2;

      event.preventDefault();
      var rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (event.clientX - rect.left) / this.sceneWidth * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / this.sceneHeight) * 2 + 1; // console.log(rect, this.mouse, event)

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length === 0) {
        return;
      }

      var firstIntersection = (_intersects$ = intersects[0]) !== null && _intersects$ !== void 0 ? _intersects$ : null;
      var segment = firstIntersection === null || firstIntersection === void 0 ? void 0 : (_firstIntersection$ob = firstIntersection.object) === null || _firstIntersection$ob === void 0 ? void 0 : (_firstIntersection$ob2 = _firstIntersection$ob.userData) === null || _firstIntersection$ob2 === void 0 ? void 0 : _firstIntersection$ob2.segment; // strict check

      if (segment === undefined) {
        return;
      } // firstIntersection.object.material.color.set(0xff0000)


      this.eventTarget.dispatchEvent(new CustomEvent('click', {
        detail: {
          segment: segment
        }
      }));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.renderer.domElement.removeEventListener('click', this.onMouseClick.bind(this), false); // @see https://discourse.threejs.org/t/how-to-completely-clean-up-a-three-js-scene-from-a-web-app-once-the-scene-is-no-longer-needed/1549/4

      this.renderer.dispose(); // this.ribbon.dispose()

      this.renderer = null;
      this.camera = null;
      this.ribbon = null;
    }
  }]);

  return HelixRibbonScene;
}();

exports.HelixRibbonScene = HelixRibbonScene;
