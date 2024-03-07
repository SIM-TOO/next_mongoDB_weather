// bcryptjs 해싱 함수 라이브러리
import { Password } from "@/models/customTypes";
import { compare, hash } from "bcryptjs";

// 비밀번호를 해싱
export const hashPassword = (password: string) => {
    const hashPassword = hash(password, 10);
    return hashPassword;
}

// 비밀번호 확인
export const checkPassword = async ({
    enteredPassword,
    userPassword
}: Password) => {
    const passwordIsValid = compare(enteredPassword, userPassword);
    return passwordIsValid
}