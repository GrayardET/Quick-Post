import { configureStore } from '@reduxjs/toolkit'
import loginModalSliceReducer  from './loginModalSlice';
import registerModalSliceReducer from './registerModalSlice';
import editModalSliceReducer from './editModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalSliceReducer,
    registerModal: registerModalSliceReducer,
    editModal: editModalSliceReducer
  }
})