import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Loader = () => {
  return (
    <div className='h-screen w-screen grid place-content-center'>
      <DotLottieReact
        src='https://lottie.host/7cb510f9-a865-408a-b0ce-129fb96d034d/9UG3WERxA3.lottie'
        loop
        autoplay
      />
    </div>
  )
}

export default Loader
