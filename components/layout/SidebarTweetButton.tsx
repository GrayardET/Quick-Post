import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { GiFeather } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { onOpen as onOpenLogin } from '../../redux/loginModalSlice';
import useCurrentUser from '@/hooks/useCurrentUser';

const SidebarTweetButton = () => {
  const {data: currentUser} = useCurrentUser();
  const router= useRouter();
  const dispatch = useDispatch();
  const onToggle = useCallback(() => {
    if (!currentUser) {
      dispatch(onOpenLogin());
    }else{
      router.push('/');
    }
    
  },[currentUser, dispatch, router]);

  return (
    <div onClick={onToggle}>
      <div className="
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
      ">
        <GiFeather size={24} color="white"/>
      </div>
      <div className="
        mt-6
        hidden
        lg:flex
        rounded-full
        h-14
        w-full
        p-4
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-90
        transition
        cursor-pointer
        gap-2
        mr-10
      ">
        <GiFeather size={18} color="white"/>
        <p className="text-white  font-bold mr-4">Tweet</p>
      </div>
    </div>
  )
}

export default SidebarTweetButton