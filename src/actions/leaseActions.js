import axios from 'axios';
import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
  FETCHING_SELECTED_LEASE,
  FETCH_SELECTED_LEASE_SUCCESS,
  FETCH_SELECTED_LEASE_ERROR,
} from './types';

/**
 * Set the fetching state of current leases list
 */
export const setFetchingCurrentLeases = () => ({
  type: FETCHING_CURRENT_LEASES,
});

/**
 * Set the fetching state of the selected lease
 */
export const setFetchingSelectedLease = () => ({
  type: FETCHING_SELECTED_LEASE,
});

/**
 * Fetch the list of current leases
 */
export const fetchCurrentLeasesList = () => async dispatch => {
  dispatch(setFetchingCurrentLeases());

  try {
    const result = await axios.get('https://hiring-task-api.herokuapp.com/v1/leases');

    dispatch({
      type: FETCH_CURRENT_LEASES_SUCCESS,
      payload: (result && result.data) || [],
    });
  } catch(error) {
    dispatch({
      type: FETCH_CURRENT_LEASES_ERROR,
      payload: error,
    });
  }
};

/**
 * Fetch the selected lease
 */
export const fetchSelectedLeaseByLeaseId = (leaseId) => async dispatch => {
  dispatch(setFetchingSelectedLease());

  try {
    const result = await axios.get(`https://hiring-task-api.herokuapp.com/v1/leases/${leaseId}`);

    dispatch({
      type: FETCH_SELECTED_LEASE_SUCCESS,
      payload: (result && result.data) || [],
    });
  } catch(error) {
    dispatch({
      type: FETCH_SELECTED_LEASE_ERROR,
      payload: error,
    });
  }
};