"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
File.prototype.readAsDataURLAsync = function () {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = _ => resolve(reader.result);
        reader.onerror = _ => reject(new Error(`Error reading ${this.name}: ${reader.result}`));
        reader.readAsDataURL(this);
    });
};
File.prototype.toClientFile = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_64_PREFIX = "base64,";
        const rawBase64String = yield this.readAsDataURLAsync();
        const base64TrimPosition = rawBase64String.indexOf(BASE_64_PREFIX) + BASE_64_PREFIX.length;
        const base64String = rawBase64String.substring(base64TrimPosition);
        return {
            name: this.name,
            lastModified: this.lastModified,
            size: this.size,
            type: this.type,
            content: base64String
        };
    });
};
