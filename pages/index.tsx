import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import WelcomeContent from "@/components/WelcomeContent";
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 세션이 있을 경우 자동으로 페이지 이동
    getSession().then((session) => {
      console.log(session);
      if (session) {
        router.replace('/weather')
      } else {
        console.log('no session');
      }
    })
  },)


  return (
    <>
      <Layout className='w-3/4 lg:w-1/2'>
        <WelcomeContent />
        <AuthForm />
      </Layout>
    </>
  );
}
