// bcryptjs 해싱 함수 라이브러리
import { hash } from "bcryptjs";

// 비밀번호를 해싱하는 함수
export const hashPassword = (password: string) => {
    const hashPassword = hash(password, 10);
    return hashPassword;
}
