import { MongoClient } from "mongodb"

// MOGODB_URI string으로 선언
declare var process: {
    env: {
        MOGODB_URI: string;
    }
}

// 몽고 DB
export async function connectToDatabase() {
    const client = await MongoClient.connect(process.env.MOGODB_URI)
    return client;
}

