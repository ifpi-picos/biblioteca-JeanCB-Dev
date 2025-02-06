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
const bancoDeDados_1 = require("./bancoDeDados");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class Biblioteca {
    constructor() {
        this.livros = [];
        this.db = bancoDeDados_1.client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
        this.collection = this.db.collection("livros");
    }
    cadastrarLivro(titulo, autor, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, bancoDeDados_1.conectarMongoDB)(); // Certifique-se de que a conexão está estabelecida
            const livro = {
                titulo,
                autor,
                isbn,
                emprestado: false,
                historicoEmprestimos: [],
            };
            this.livros.push(livro);
            yield this.collection.insertOne(livro);
            console.log("Livro cadastrado com sucesso.");
        });
    }
    listarLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, bancoDeDados_1.conectarMongoDB)(); // Certifique-se de que a conexão está estabelecida
            const livros = yield this.collection.find().toArray();
            if (livros.length === 0) {
                console.log("Nenhum livro cadastrado.");
            }
            else {
                console.log("Livros cadastrados:");
                livros.forEach((livro, index) => {
                    console.log(`${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`);
                });
            }
        });
    }
    listarLivrosEmprestados() {
        const livrosEmprestados = this.livros.filter((livro) => livro.emprestado);
        if (livrosEmprestados.length === 0) {
            console.log("Nenhum livro emprestado.");
        }
        else {
            console.log("Livros emprestados:");
            livrosEmprestados.forEach((livro, index) => {
                console.log(`${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`);
            });
        }
    }
}
const biblioteca = new Biblioteca();
function testarConexao() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, bancoDeDados_1.conectarMongoDB)(); // Certifique-se de que a conexão está estabelecida
            const db = bancoDeDados_1.client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
            const collection = db.collection("test");
            // Inserir um documento de teste
            const resultadoInsercao = yield collection.insertOne({ mensagem: "Teste de conexão" });
            console.log("Documento inserido com ID:", resultadoInsercao.insertedId);
            // Recuperar o documento de teste
            const documento = yield collection.findOne({ _id: resultadoInsercao.insertedId });
            console.log("Documento recuperado:", documento);
            // Remover o documento de teste
            yield collection.deleteOne({ _id: resultadoInsercao.insertedId });
            console.log("Documento de teste removido.");
        }
        catch (error) {
            console.error("Erro ao testar a conexão com o MongoDB:", error);
        }
        finally {
            yield bancoDeDados_1.client.close();
            console.log("Conexão com o MongoDB fechada.");
        }
    });
}
testarConexao();
