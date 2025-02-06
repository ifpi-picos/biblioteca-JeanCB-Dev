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
exports.client = void 0;
exports.conectarMongoDB = conectarMongoDB;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://Biblioteca:y03chRGG5w3hKonf@cluster0.lz8g7.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca"; // Substitua pela sua string de conexão
const client = new mongodb_1.MongoClient(uri);
exports.client = client;
let isConnected = false;
function conectarMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isConnected) {
            try {
                yield client.connect();
                isConnected = true;
                console.log("Conectado ao MongoDB com sucesso.");
            }
            catch (error) {
                console.error("Erro ao conectar ao MongoDB:", error);
                throw error; // Re-throw the error after logging it
            }
        }
    });
}
