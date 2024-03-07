import Image from 'next/image';
import React from 'react'

type Props = {
  type: string;
  value?: string;
  placeholder?: string;
  iconAlt: string;
  iconSrc?: string;
  className?: string;
  onChangeHandler: (value: string) => void;
  onBlurHandler?: () => void;
}


const InputContainer = ({
  type,
  value,
  onChangeHandler,
  placeholder,
  iconAlt,
  iconSrc,
  onBlurHandler,
  className
}: Props) => {
  return (
    <div className='auth__input-container w-full'>
      {iconSrc && <Image width={25} height={25} src={iconSrc} alt={iconAlt} />}
      <input
        type={type}
        value={value}
        className={`auth__input ${className}`}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        onChange={(e) => onChangeHandler(e.target?.value)}
      />
    </div>
  )
}

export default InputContainer