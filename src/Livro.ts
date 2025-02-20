import { MongoDB } from "./bancoDeDados";


class Livro {
    private titulo: string;
    private autor: string;
    private isbn: string;


    private constructor(titulo: string, autor: string, isbn: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }

    public async CadastrarLivro() {
     
 }
}