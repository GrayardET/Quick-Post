import Input from '@/components/Input';
import Modal from '@/components/Modal';
import axios from 'axios';
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onClose as onCloseRegister, onOpen as onOpenRegister } from '@/redux/registerModalSlice';
import { onClose as onCloseLogin, onOpen as onOpenLogin } from '@/redux/loginModalSlice';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

 

const RegisterModal = () => {
  const dispatch = useDispatch();
  const { isOpen: isOpenRegister } = useSelector((state) => state.registerModal);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    dispatch(onCloseRegister());
    dispatch(onOpenLogin());
  },[dispatch, isLoading])

  const onSubmit = useCallback(async() => {
    try{
      setIsLoading(true);

      // The actual login function
      await axios.post("/api/register", {
        email, password, username, name
      })

      toast.success('Account created!')
      signIn('credentials', {
        email,
        password
      });

      dispatch(onCloseRegister());
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }, [email, password, username, name, dispatch])

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
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />

    <Input 
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
        value={username}
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
    <div className="text-neutral-400 mt-4 text-center">
      <p>Already have an account?
        <span 
          onClick={onToggle}
          // onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Log in
        </span>
      </p>
    </div>
  )
  

  return(
    <Modal 
      disabled={isLoading}
      isOpen={isOpenRegister}
      title="Register"
      actionLabel = "Register"
      onClose={onCloseRegister}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
    
  )
}

export default RegisterModal 