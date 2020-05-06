import axios from 'axios';
import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
} from './types';

/**
 * Set the fetching state of current leases list
 */
export const setFetchingCurrentLeases = () => ({
  type: FETCHING_CURRENT_LEASES,
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