import { combineReducers  } from "redux";
import mensagensReducer from './reducer/mensagensReducers';


const rootReducer = combineReducers ({
    mensagensReducer,
})

export default rootReducer;