import { TypedUseSelectorHook, 
         useSelector as selectorHook,
         useDispatch as dispatchHook } from "react-redux";
import { TRootState } from './types';
import { TAppDispatch, TAppThunk } from './types';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();