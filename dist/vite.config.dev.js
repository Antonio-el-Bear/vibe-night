"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://vite.dev/config/
var _default = (0, _vite.defineConfig)({
  logLevel: 'error',
  // Suppress warnings, only show errors
  plugins: [(0, _pluginReact["default"])()],
  resolve: {
    alias: {
      '@': _path["default"].resolve(__dirname, 'src')
    }
  }
});

exports["default"] = _default;