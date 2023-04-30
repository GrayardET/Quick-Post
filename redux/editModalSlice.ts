import { createSlice } from '@reduxjs/toolkit'

interface editModalState {
  isOpen: boolean;
}

const initialState:editModalState = {
  isOpen: false,
}

export const editModalSlice= createSlice({
  name:"editModal",
  initialState,
  reducers:{
    onOpen:state=>{
      state.isOpen= true;
    },
    onClose:state=>{
      state.isOpen= false;
    },
  }
})

export const { onOpen, onClose } = editModalSlice.actions;
export default editModalSlice.reducer;