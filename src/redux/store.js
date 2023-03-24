import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { medicineDetailReducer, medicineListReducer } from "./reducers/medicine.reducer";
import { categoryDetailReducer, categoryListReducer } from "./reducers/category.reducer";
import { orderDetailReducer, orderListReducer } from "./reducers/order.reducer";
import { myInfoReducer, userListReducer } from "./reducers/user.reducer";
import { deiveryPersonListReducer } from "./reducers/deliveryPerson.reducer";

const reducer = combineReducers({
  medicineList: medicineListReducer,
  categoryList: categoryListReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  deliveryPersonList: deiveryPersonListReducer,

  orderDetail: orderDetailReducer,
  medicineDetail: medicineDetailReducer,
  categoryDetail: categoryDetailReducer,
  myInfoDetail: myInfoReducer

  // auth: loginReducer
  // medicineDetail: medicineDetailReducer
});

// login
// const userInfo = localStorage.getItem('userInfo')

// const user =  userInfo ? JSON.parse(userInfo) : null

const initialState = {
  // userLogin: { user }
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;