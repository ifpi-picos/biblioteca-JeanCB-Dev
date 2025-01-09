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

  cadastrarLivro(titulo: string, autor: string, isbn: string) {
    const livro: Livro = {
      titulo,
      autor,
      isbn,
      emprestado: false,
      historicoEmprestimos: [],
    };
    this.livros.push(livro);
    console.log("Livro cadastrado com sucesso.");
  }

  listarLivros() {
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
    } else {
      console.log("Livros cadastrados:");
      this.livros.forEach((livro, index) => {
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

  // ...existing code...
  listarLivrosDisponiveis() {
    const livrosDisponiveis = this.livros.filter((livro) => !livro.emprestado);
    if (livrosDisponiveis.length === 0) {
      console.log("Nenhum livro disponível.");
    } else {
      console.log("Livros disponíveis:");
      livrosDisponiveis.forEach((livro, index) => {
        console.log(
          `${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`
        );
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
      } else {
        console.log("  Nenhum empréstimo registrado.");
      }
    });
  }

  pegarLivroEmprestado(isbn: string, usuario: string) {
    const livro = this.livros.find((livro) => livro.isbn === isbn);
    if (livro) {
      if (!livro.emprestado) {
        livro.emprestado = true;
        livro.historicoEmprestimos.push(
          `Emprestado para ${usuario} em ${new Date().toLocaleString()}`
        );
        console.log("Livro emprestado com sucesso.");
      } else {
        console.log("Livro já está emprestado.");
      }
    } else {
      console.log("Livro não encontrado.\n");
    }
  }

  devolverLivro(isbn: string, usuario: string) {
    const livro = this.livros.find((livro) => livro.isbn === isbn);
    if (livro) {
      if (livro.emprestado) {
        livro.emprestado = false;
        livro.historicoEmprestimos.push(
          `Devolvido por ${usuario} em ${new Date().toLocaleString()}`
        );
        console.log("Livro devolvido com sucesso.");
      } else {
        console.log("Livro não está emprestado.");
      }
    } else {
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
    console.log("\n")

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
