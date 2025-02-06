import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Biblioteca:y03chRGG5w3hKonf@cluster0.lz8g7.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca"; // Substitua pela sua string de conexão
const client = new MongoClient(uri);

let isConnected = false;

async function conectarMongoDB() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("Conectado ao MongoDB com sucesso.");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}

export { client, conectarMongoDB };