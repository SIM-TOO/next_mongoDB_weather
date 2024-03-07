import { MongoClient } from "mongodb"

// MONGODB_URI string으로 선언
declare var process: {
    env: {
        MONGODB_URI: string;
    }
}

// 몽고 DB 서버 연결
export async function connectToDatabase() {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    return client;
}

