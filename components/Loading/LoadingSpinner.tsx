import React from 'react'
import styles from './LoadingSpinner.module.css'

// 타이핑 로딩중
const LoadingSpinner = () => {
  return (
    <div className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoadingSpinner