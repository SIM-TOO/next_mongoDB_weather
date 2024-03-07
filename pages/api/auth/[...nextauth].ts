import { checkPassword } from '@/lib/auth-services';
import { connectToDatabase } from '@/lib/db';
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';

type Credentials = {
    enteredEmail: string;
    enteredPassword: string;
}

// authOptions 인증 
const authOptions = {
    providers: [
        CredentialProvider({
            type: 'credentials',
            credentials: {},

            // 인증 함수
            async authorize(credentials) {
                const { enteredEmail, enteredPassword } = credentials as Credentials;
                const client = await connectToDatabase();
                const db = client.db('dbName');
                const usersCollection = db.collection('users');

                // 입력된 이메일을 검색
                const user = await usersCollection.findOne({
                    enteredEmail
                });
                if (!user) {
                    throw new Error('사용자를 찾을 수 없습니다.');
                }
                const userPassword = user.hashedPassword;
                const userEmail = user.enteredEmail;
                const id = user._id.toString();

                // 비밀번호 확인
                const passwordIsCorrect = await checkPassword({
                    enteredPassword, userPassword
                });
                if (!passwordIsCorrect) {
                    throw new Error('비밀번호가 올바르지 않습니다.');
                }
                client.close();
                return { id: id, email: userEmail };
            }
        })
    ]
}

// authOptions을 사용하여 NextAuth를 내보내기
export default NextAuth(authOptions);
