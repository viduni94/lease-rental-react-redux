import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
  FETCHING_SELECTED_LEASE,
  FETCH_SELECTED_LEASE_SUCCESS,
  FETCH_SELECTED_LEASE_ERROR,
} from '../actions/types';

const initialState = {
  currentLeasesList: [],
  selectedLease: null,
  isFetchingCurrentLeases: false,
  isFetchingSelectedLease: false,
  currentLeasesFetchError: null,
  selectedLeaseFetchError: null,
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
    case FETCHING_SELECTED_LEASE:
      return {
        ...state,
        isFetchingSelectedLease: true,
      }
    case FETCH_SELECTED_LEASE_SUCCESS:
      console.log(payload);
      return {
        ...state,
        isFetchingSelectedLease: false,
        selectedLease: payload,
      }
    case FETCH_SELECTED_LEASE_ERROR:
      return {
        ...state,
        isFetchingSelectedLease: false,
        selectedLeaseFetchError: payload,
      }
    default:
      return state;
  }
}