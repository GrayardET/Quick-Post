import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onClose as onCloseRegister, onOpen as onOpenRegister } from '@/redux/registerModalSlice';
import { onClose as onCloseLogin, onOpen as onOpenLogin } from '@/redux/loginModalSlice';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isOpen: isOpenLogin } = useSelector((state) => state.loginModal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    dispatch(onCloseLogin());
    dispatch(onOpenRegister());
  },[dispatch, isLoading])

  const onSubmit = async() => {
    try{
      setIsLoading(true);

      //TODO: add login
      await signIn('credentials',{
        email,
        password
      });

      dispatch(onCloseLogin());
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const bodyContent = (
    <div className="
      flex
      flex-col
      gap-4
    ">
      <Input 
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-8">
      <p>First time using Twitter?
        <span 
          onClick={onToggle} 
          className="
            text-white
            cursor-pointer 
            hover:underline
            hover:opacity-80
          "
          > Create an account</span>
      </p>
    </div>
  )

  return(
    <Modal 
      disabled={isLoading}
      isOpen={isOpenLogin}
      title="Login"
      actionLabel = "Sign in"
      onClose={onCloseLogin}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal