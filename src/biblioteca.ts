import { client, conectarMongoDB } from "./bancoDeDados";
import promptSync from "prompt-sync";
const prompt = promptSync();

interface Livro {
  titulo: string;
  autor: string;
  isbn: string;
  emprestado: boolean;
  historicoEmprestimos: string[];
}

class Biblioteca {
  private livros: Livro[] = [];
  private db = client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
  private collection = this.db.collection("livros");

  async cadastrarLivro(titulo: string, autor: string, isbn: string) {
    await conectarMongoDB(); // Certifique-se de que a conexão está estabelecida
    const livro: Livro = {
      titulo,
      autor,
      isbn,
      emprestado: false,
      historicoEmprestimos: [],
    };
    this.livros.push(livro);
    await this.collection.insertOne(livro);
    console.log("Livro cadastrado com sucesso.");
  }

  async listarLivros() {
    await conectarMongoDB(); // Certifique-se de que a conexão está estabelecida
    const livros = await this.collection.find().toArray();
    if (livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
    } else {
      console.log("Livros cadastrados:");
      livros.forEach((livro, index) => {
        console.log(
          `${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`
        );
      });
    }
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

async function testarConexao() {
  try {
    await conectarMongoDB(); // Certifique-se de que a conexão está estabelecida
    const db = client.db("biblioteca"); // Substitua pelo nome do seu banco de dados
    const collection = db.collection("test");

    // Inserir um documento de teste
    const resultadoInsercao = await collection.insertOne({ mensagem: "Teste de conexão" });
    console.log("Documento inserido com ID:", resultadoInsercao.insertedId);

    // Recuperar o documento de teste
    const documento = await collection.findOne({ _id: resultadoInsercao.insertedId });
    console.log("Documento recuperado:", documento);

    // Remover o documento de teste
    await collection.deleteOne({ _id: resultadoInsercao.insertedId });
    console.log("Documento de teste removido.");
  } catch (error) {
    console.error("Erro ao testar a conexão com o MongoDB:", error);
  } finally {
    await client.close();
    console.log("Conexão com o MongoDB fechada.");
  }
}

testarConexao();

