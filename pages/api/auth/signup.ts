import { hashPassword } from "@/lib/auth-services";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/customTypes";
import { NextApiRequest, NextApiResponse } from "next";

interface MyApiRequest<T> extends NextApiRequest {
    body: T;
}

const handler = async (req: MyApiRequest<User>, res: NextApiResponse) => {

    if (req.method === "POST") {
        try {
            const data = req.body;
            const { enteredEmail, enteredPassword } = data;

            // 유효성체크
            if (
                !enteredEmail ||
                !enteredEmail.includes("@") ||
                !enteredPassword ||
                enteredPassword.trim().length < 5
            ) {
                res.status(422).json({
                    message: "올바른 형식이 아닙니다.",
                });
                return;
            }
            const client = await connectToDatabase();
            const db = client.db("dbName");

            // DB 에서 이메일 중복 여부 확인
            const emailExisting = await db.collection('users').findOne({ enteredEmail })
            if (emailExisting) {
                res.status(409).json({ message: "유저가 이미 있습니다." });
                return;
            }

            // 해싱된 패스워드
            const hashedPassword = await hashPassword(enteredPassword);

            const usersCollection = db.collection('users');

            const result = await usersCollection.insertOne({
                enteredEmail,
                hashedPassword
            })
            res.status(201).json({ message: '유저가 생성되었습니다.' });
            client.close();

        } catch (error) {

        }
    }
}

export default handler;