import {MongoDB} from "./bancoDeDados";
import promptSync from "prompt-sync";
const prompt = promptSync();

class Biblioteca {
  private livros: Livro[] = [];
  private db = client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
  private collection = this.db.collection("livros");

  async cadastrarLivro(titulo: string, autor: string, isbn: string) {
  }

  async listarLivros() {
   
  }

  listarLivrosEmprestados() {
    const livrosEmprestados = this.livros.filter((livro) => livro.emprestado);
    if (livrosEmprestados.length === 0) {
      console.log("Nenhum livro emprestado.");
    } else {
      console.log("Livros emprestados:");
      livrosEmprestados.forEach((livro, index) => {
        console.log(
          `${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`
        );
      });
    }
  }
}

const biblioteca = new Biblioteca();