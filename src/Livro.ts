import { MongoDB } from "./bancoDeDados";


class Livro {
    private titulo: string;
    private autor: string;
    private isbn: string;
    private db: MongoDB;
    private client;

    private constructor(titulo: string, autor: string, isbn: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.db = MongoDB.getInstance();
        this.client = MongoDB.getInstance().getClient(); 
    }

    public static async CadastrarLivro(titulo: string, autor: string, isbn: string): Promise<Livro> {
        const livro = new Livro(titulo, autor, isbn);
        await livro.db.conectar();
        await livro.db.inserir("livros", { titulo, autor, isbn, emprestar: false });
        return livro;
    }

    public async mostrarLivros(collectionName: string) {
        const db = this.get.db()
    }
    public async listarLivro() {
        const livro = await this.db.mostrarLivros("livros");
        if (livro.length === 0) {
            console.log("Nenhum livro cadastrado.");
        } else {
            console.log("livros Cadastrados!!");
            livro.forEach((livro, index) => {
                console.log(`${index + 1}. ${livro.titulo} - ${livro.autor} (ISBN: ${livro.isbn})`);
            })
        }
    }
}

export { Livro };