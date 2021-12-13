"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const shortid_1 = __importDefault(require("shortid"));
const Constants_1 = require("../config/Constants");
const URL_1 = require("../database/model/URL");
class URLController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originURL } = req.body;
            const url = yield URL_1.URLModel.findOne({ originURL });
            if (url) {
                res.json(url);
                return;
            }
            const hash = shortid_1.default.generate();
            const shortURL = `${Constants_1.config.API_URL}/${hash}`;
            const newURL = yield URL_1.URLModel.create({ hash, shortURL, originURL });
            res.json(newURL);
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const url = yield URL_1.URLModel.findOne({ hash });
            if (url) {
                res.redirect(url.originURL);
                return;
            }
            res.status(400).send('<!DOCTYPE html><html lang="en"><head><style type="text/css">body {display: flex;flex-flow: row wrap;align-content: center;justify-content: center;}div {width: 100%;text-align: center;}.number {background: #fff;position: relative;font: 900 30vmin "Consolas";letter-spacing: 5vmin;text-shadow: 2px -1px 0 #000, 4px -2px 0 #0a0a0a, 6px -3px 0 #0f0f0f, 8px -4px 0 #141414, 10px -5px 0 #1a1a1a, 12px -6px 0 #1f1f1f, 14px -7px 0 #242424, 16px -8px 0 #292929;}.number::before {background-color: #673ab7;background-image: radial-gradient(closest-side at 50% 50%, #ffc107 100%, rgba(0, 0, 0, 0)), radial-gradient(closest-side at 50% 50%, #e91e63 100%, rgba(0, 0, 0, 0));background-repeat: repeat-x;background-size: 40vmin 40vmin;background-position: -100vmin 20vmin, 100vmin -25vmin;width: 100%;height: 100%;mix-blend-mode: screen;-webkit-animation: moving 10s linear infinite both;animation: moving 10s linear infinite both;display: block;position: absolute;content: "";}@-webkit-keyframes moving {to {background-position: 100vmin 20vmin, -100vmin -25vmin;}}@keyframes moving {to {background-position: 100vmin 20vmin, -100vmin -25vmin;}}.text {font: 400 5vmin "Courgette";color:#673ab7;}.text span {font-size: 10vmin;color: #5387b3;}</style><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./index.css"><title>Document</title></head><body><div class="number">400</div><div class="text"><span>Ooops...</span><br><br>A URL informada está incorreta.</div></body></html>');
        });
    }
}
exports.URLController = URLController;
//# sourceMappingURL=URLController.js.map