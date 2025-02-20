import { MongoClient } from "mongodb";

class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient;
  private isConected: boolean = false;

  private constructor() {
    const uri = "mongodb+srv://Biblioteca:y03chRGG5w3hKonf@cluster0.lz8g7.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca"; // Substitua pela sua string de conexão
    this.client = new MongoClient(uri);
  }

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async conectarMongoDB(): Promise<void> {
    if (!this.isConected) {
      try {
        await this.client.connect();
        this.isConected = true;
        console.log("Conectado ao MongoDB com sucesso.");
      } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
      }
    }
  }
  public getClient(): MongoClient {
    return this.client;
  }
}

export { MongoDB };