import { createStore, compose, applyMiddleware ,combineReducers} from 'redux';
import authReducer from './redux/auth/reducers/reducer'
import thunk from 'redux-thunk';




const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  auth : authReducer,
  gui : changeState
})

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhances(
  applyMiddleware(thunk)
));
export default store
