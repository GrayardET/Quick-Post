import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useDispatch } from 'react-redux';
import { onClose as onCloseLogin, onOpen as onOpenLogin } from '@/redux/loginModalSlice';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string
  icon: IconType
  href?: string
  onClick?: () => void,
  alert?: boolean,
  auth?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({label, href, icon: Icon, onClick, alert, auth}) => {
  const dispatch = useDispatch()
  const {data:currentUser} = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(()=>{
    if (onClick) {
      return onClick()
    }
    if (auth && !currentUser){
      dispatch(onOpenLogin());
    }else if (href){
      router.push(href);
    }
  }, [onClick, auth, currentUser, href, dispatch, router])
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="
        flex
        rounded-full
        h-14
        w-14
        items-center
        justify-center
        p-4
        hover:bg-blue-300
        hover:bg-opacity-1
        cursor-pointer
        lg:hidden"
      >
        <Icon size={28} color="white"/>
        {alert ? <BsDot size={70} className="text-sky-500 absolute -top-4 left-0"/> : null}
      </div>
      
      <div className="
        relative
        hidden
        lg:flex
        items-center
        justify-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-100
        hover:bg-opacity-10
        cursor-pointer
      ">
        <Icon size={28} color="white"/>
        <p className="text-white hidden lg:block text-base font-semibold">{label}</p> 
        {alert ? <BsDot size={70} className="text-sky-500 absolute -top-4 left-0"/> : null}
      </div>
    </div>
  )
}

export default SidebarItem