import { combineReducers } from "redux";
import leaseReducer from "./leaseReducer";

export default combineReducers({
  lease: leaseReducer,
});