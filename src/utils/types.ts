import PropTypes from 'prop-types';
import { ThunkAction } from 'redux-thunk';
import { TRootState } from '../services/reducers/index';
import { TAllActions } from '../services/actions/unionOfActions';
import { useDispatch } from 'react-redux';

export const orderType = PropTypes.shape({
  createdAt: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.number,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
  _id: PropTypes.string,
});

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

export type TIgredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly uuid: string;
};

export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: undefined | null;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TLocationWithState = Omit<TLocation, 'state'> & {
  state: {
    background: TLocation;
    ingredient?: TIgredient;
    orders?: Array<TOrder>;
  };
};

export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, 
  unknown, TAllActions>;

export type TDispatch = typeof useDispatch;