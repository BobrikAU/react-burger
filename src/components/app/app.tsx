import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import styles from './app.module.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../appHeader/appHeader';
import Constructor from '../../pages/constructor';
import NotFound404 from '../../pages/notFound404';
import Registration from '../../pages/registration';
import Authorization from '../../pages/authorization';
import Recovery from '../../pages/recovery';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import RouteNotAuthorized from '../routeNotAuthorized/routeNotAuthorized';
import DetailsIngredient from '../../pages/detailsIngredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import OrderFeed from '../../pages/orderFeed';
import FeedOrderInfo from '../../pages/feedOrderInfo';
import OwnOrderInfo from '../../pages/ownOrderInfo';
import OrderInfo from '../orderInfo/orderInfo';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { TIgredient, TLocation, TLocationWithState } from '../../utils/types';

const App = () => {
  const burgerIngredients: null | Array<TIgredient> = useSelector(state => 
    state.burgerIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!burgerIngredients) {
      dispatch(getIngredients());
    }
  }, []);

  const location: TLocation | TLocationWithState= useLocation();
  const background = location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;
  const orders = location.state && location.state.orders;

  return (
    <div className={`${styles.app} ${styles.variables}`}>
        <AppHeader/>
        <Switch location={ background || location }>
          <Route path='/' exact={true}>
            <Constructor/>
          </Route>
          <Route path='/ingredients/:_id'>
            <DetailsIngredient />
          </Route>
          <Route path='/feed' exact={true}>
            <OrderFeed />
          </Route>
          <Route path='/feed/:id'>
            <FeedOrderInfo />
          </Route>
          <RouteNotAuthorized path='/login' exact={true}>
            <Authorization/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/register' exact={true}>
            <Registration/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/forgot-password' exact={true}>
            <Recovery/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/reset-password' exact={true}>
            <ResetPassword />
          </RouteNotAuthorized>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OwnOrderInfo />
          </ProtectedRoute>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {background && (
                          <Switch>
                            <Route path='/ingredients/:id'>
                              {ingredient && <Modal activeModal='ingredientDetails'>
                                <IngredientDetails 
                                  ingredient={ingredient}
                                  modal={true}/>
                              </Modal>}
                            </Route>
                            <Route  path='/feed/:id'
                                    render={ () => (orders && <Modal activeModal='orders'>
                                                      <OrderInfo
                                                        orders={orders}
                                                        modal={true}/>
                                                    </Modal>)} />
                            <Route  path='/profile/orders/:id'
                                    render={ () => (orders && <Modal activeModal='orders'>
                                                      <OrderInfo
                                                        orders={orders}
                                                        modal={true}/>
                                                    </Modal>)} />
                          </Switch>
                        )
        }
    </div>
  );
}

export default App;
