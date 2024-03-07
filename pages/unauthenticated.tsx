import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

// 로그인 안된 유저가 들어올때 보이는 페이지
const Unauthenticated = () => {
  return (
    <Layout className='justify-center text-center'>
      <h1>이 페이지를 보려면 로그인 하세요.</h1>
      <Link href={'/'} className='btn__secondary mx-auto'>
        로그인 페이지로
      </Link>
    </Layout>
  )
}

export default Unauthenticated