import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'
import InputContainer from './InputContainer';
import emailIcon from '@/public/email_envelope_mail_send_icon.svg';
import lockIcon from '@/public/lock_locker_icon.svg';
import { User } from '@/models/customTypes';

// 통신용
async function registerUser(userData: User) {

  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.method || '오류가 발생했습니다');
  }

  return data;
}

const AuthForm = () => {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [isLogin, setIslogin] = useState<boolean>(true);
  const router = useRouter();

  // 로그인과 회원가입 전환
  const authModeHandler = () => {
    setIslogin((prev) => !prev);
    setEnteredEmail('')
    setEnteredPassword('')
    setEnteredConfirmPassword('')
  }

  // 폼 이벤트 처리
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    // 페이지 리플래시 방지
    event.preventDefault();
    const userData: User = { enteredEmail, enteredPassword };

    // 폼 유효성 검사
    if (enteredEmail?.trim().length === 0 || enteredPassword.trim().length === 0) {
      alert('먼저 ID와 비밀번호를 입력해주세요.');
      return;
    }

    // 사용자 인증
    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return;
      } try {
        const response = await registerUser(userData);
        alert('회원가입에 성공했습니다.')
      } catch (error) {
        console.error(error);
      }
    } else {

    }
  };

  return (
    <form className='auth__form' onSubmit={submitHandler}>

      <InputContainer
        type='email'
        value={enteredEmail}
        onChangeHandler={setEnteredEmail}
        placeholder='이메일을 입력해주세요'
        iconAlt='email icon'
        iconSrc={emailIcon}
      />

      <InputContainer
        type='password'
        value={enteredPassword}
        onChangeHandler={setEnteredPassword}
        placeholder='비밀번호를 입력해주세요'
        iconAlt='lock icon'
        iconSrc={lockIcon}
      />

      {!isLogin && (
        <InputContainer
          type='password'
          value={enteredConfirmPassword}
          onChangeHandler={setEnteredConfirmPassword}
          placeholder='비밀번호를 입력해주세요'
          iconAlt='lock icon'
          iconSrc={lockIcon}
        />
      )}

      <button className='auth__btn'>
        {isLogin ? 'login' : 'Create Account'}
      </button>
      <div>
        {isLogin ? '이미 계정이 필요하십니까?' : '존재하는 아이디로 로그인하기'}
        <button onClick={authModeHandler} className='ml-2 text-primary' type='button'>
          {isLogin ? '회원가입' : '로그인'}
        </button>
      </div>
    </form>
  )
}

export default AuthForm