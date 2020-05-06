import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
} from '../actions/types';

const initialState = {
  currentLeasesList: [],
  isFetchingCurrentLeases: false,
  currentLeasesFetchError: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case FETCHING_CURRENT_LEASES:
      return {
        ...state,
        isFetchingCurrentLeases: true,
      }
    case FETCH_CURRENT_LEASES_SUCCESS:
      console.log(payload);
      return {
        ...state,
        isFetchingCurrentLeases: false,
        currentLeasesList: payload,
      }
    case FETCH_CURRENT_LEASES_ERROR:
      return {
        ...state,
        isFetchingCurrentLeases: false,
        currentLeasesFetchError: payload,
      }
    default:
      return state;
  }
}