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
Object.defineProperty(exports, "__esModule", { value: true });
const formValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    console.log();
    if (!name) {
        return res
            .status(400)
            .json({
            status: "error",
            message: "Name input field is empty. Enter board name",
        });
    }
    if (!/^[a-zA-Z]+[_a-zA-Z]*$/.test(name) || name.length < 3) {
        return res
            .status(400)
            .json({
            status: "error",
            message: "Board name must be three-character long and begin with an alphabet!!",
        });
    }
    next();
});
exports.default = formValidation;
