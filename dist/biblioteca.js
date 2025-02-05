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
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://Biblioteca:y03chRGG5w3hKonf@cluster0.lz8g7.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca"; // Substitua pela sua string de conexão
const client = new mongodb_1.MongoClient(uri);
function conectarMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Conectado ao MongoDB com sucesso.");
        }
        catch (error) {
            console.error("Erro ao conectar ao MongoDB:", error);
        }
    });
}
conectarMongoDB();
class Biblioteca {
    constructor() {
        this.livros = [];
        this.db = client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
        this.collection = this.db.collection("livros");
    }
    cadastrarLivro(titulo, autor, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
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
    // ...existing code...
    listarLivrosDisponiveis() {
        const livrosDisponiveis = this.livros.filter((livro) => !livro.emprestado);
        if (livrosDisponiveis.length === 0) {
            console.log("Nenhum livro disponível.");
        }
        else {
            console.log("Livros disponíveis:");
            livrosDisponiveis.forEach((livro, index) => {
                console.log(`${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`);
            });
        }
    }
    // ...existing code...
    listarHistoricoEmprestimos() {
        this.livros.forEach((livro, index) => {
            if (livro.historicoEmprestimos.length > 0) {
                console.log(`Histórico de empréstimos do livro ${livro.titulo}:`);
                livro.historicoEmprestimos.forEach((historico, histIndex) => {
                    console.log(`  ${histIndex + 1}. ${historico}`);
                });
            }
            else {
                console.log("  Nenhum empréstimo registrado.");
            }
        });
    }
    pegarLivroEmprestado(isbn, usuario) {
        const livro = this.livros.find((livro) => livro.isbn === isbn);
        if (livro) {
            if (!livro.emprestado) {
                livro.emprestado = true;
                livro.historicoEmprestimos.push(`Emprestado para ${usuario} em ${new Date().toLocaleString()}`);
                console.log("Livro emprestado com sucesso.");
            }
            else {
                console.log("Livro já está emprestado.");
            }
        }
        else {
            console.log("Livro não encontrado.\n");
        }
    }
    devolverLivro(isbn, usuario) {
        const livro = this.livros.find((livro) => livro.isbn === isbn);
        if (livro) {
            if (livro.emprestado) {
                livro.emprestado = false;
                livro.historicoEmprestimos.push(`Devolvido por ${usuario} em ${new Date().toLocaleString()}`);
                console.log("Livro devolvido com sucesso.");
            }
            else {
                console.log("Livro não está emprestado.");
            }
        }
        else {
            console.log("Livro não encontrado.\n");
        }
    }
}
const biblioteca = new Biblioteca();
function menu() {
    console.log("\nSistema de Biblioteca");
    console.log("1. Cadastrar Livro");
    console.log("2. Listar Livros");
    console.log("3. Listar Livros Emprestados");
    console.log("4. Listar Livros Disponíveis");
    console.log("5. Listar Histórico de Empréstimos");
    console.log("6. Pegar Livro Emprestado");
    console.log("7. Devolver Livro");
    console.log("8. Sair\n");
    const opcao = prompt("Escolha uma opção: ");
    console.log("\n");
    switch (opcao) {
        case "1":
            const titulo = prompt("Título: ");
            const autor = prompt("Autor: ");
            const isbn = prompt("ISBN: ");
            biblioteca.cadastrarLivro(titulo, autor, isbn);
            break;
        case "2":
            biblioteca.listarLivros();
            break;
        case "3":
            biblioteca.listarLivrosEmprestados();
            break;
        case "4":
            biblioteca.listarLivrosDisponiveis();
            break;
        case "5":
            biblioteca.listarHistoricoEmprestimos();
            break;
        case "6":
            const isbnEmprestimo = prompt("ISBN do livro: ");
            const usuarioEmprestimo = prompt("Nome do usuário: ");
            biblioteca.pegarLivroEmprestado(isbnEmprestimo, usuarioEmprestimo);
            break;
        case "7":
            const isbnDevolucao = prompt("ISBN do livro: ");
            const usuarioDevolucao = prompt("Nome do usuário: ");
            biblioteca.devolverLivro(isbnDevolucao, usuarioDevolucao);
            break;
        case "8":
            console.log("Saindo...    \n");
            return;
        default:
            console.log("Opção inválida.\n");
    }
    menu();
}
menu();
