import React, { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorWithoutPayload, Action } from '@reduxjs/toolkit';

interface ModalProps {
  // onClose: ActionCreatorWithoutPayload<any> | (()=>void);
  onClose: any;
  onSubmit: any;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose: onClosePassin,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled
}) => {
  function testMe (){
    return  {type:"hello"};
  }
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    // if(onClose.match(onClosePassin)){
    try{
      dispatch(onClosePassin());
    }catch (error){
      console.log(error);
    }
    
    // }else{
    //   onClose();
    // }
    
  },[disabled, onClosePassin, dispatch]);

  const handleSubmit = useCallback(() => {
    if(disabled){
      return;
    }
    
    // Need to check if this is a Redux Action Creator
    if (!onSubmit.type){
      onSubmit();
    }else{
      dispatch(onSubmit())
    }
    
  }, [disabled, dispatch, onSubmit]);

  if (!isOpen){
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div 
          className="
            relative
            w-full
            lg:w-3/6
            my-6
            mx-auto
            lg:max-w-2xl
            h-full
            lg:h-auto
        "
        >
          {/* content */}
          <div
            className="
              h-full
              lg:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-black
              outline-none
              focus:outline-none
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                p-10
                rounded-t
              "
            >
              <h3 className="text-3xl text-white">{title}</h3>
              <button>
                <AiOutlineClose 
                  size={20} 
                  className="
                    text-white
                    border-0
                    hover:opacity-70
                    transition
                    cursor-pointer
                  "
                  onClick={handleClose}
                />
              </button>
            </div>

            {/* body */}
            <div className="relative px-10 py-5 flex-auto">
              {body}
            </div>

            {/* footer */}
            <div className="p-10 ">
              <Button 
                disabled={disabled} 
                label={actionLabel} 
                secondary 
                fullWidth 
                large 
                onClick={handleSubmit} 
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}

export default Modal