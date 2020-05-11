import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
  FETCHING_SELECTED_LEASE,
  FETCH_SELECTED_LEASE_SUCCESS,
  FETCH_SELECTED_LEASE_ERROR,
} from '../../src/actions/types';
import {
  setFetchingCurrentLeases,
  setFetchingSelectedLease,
  fetchCurrentLeasesList,
  fetchSelectedLeaseByLeaseId,
} from '../../src/actions/leaseActions';

jest.mock('axios');

// Create a mock store
const mockStore = configureMockStore([thunk]);

describe('test lease actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  test('should create FETCHING_CURRENT_LEASES when setting the leases list fetching state', () => {
    const expectedAction = {
      type: FETCHING_CURRENT_LEASES,
    };

    expect(setFetchingCurrentLeases()).toEqual(expectedAction);
  });

  test('should create FETCHING_SELECTED_LEASE when setting the lease fetching state', () => {
    const expectedAction = {
      type: FETCHING_SELECTED_LEASE,
    };

    expect(setFetchingSelectedLease()).toEqual(expectedAction);
  });

  test('should create FETCH_CURRENT_LEASES_SUCCESS on successful data fetch', async () => {
    const result = {
      data: [
        { id: "lease-a", tenant: "Alex" },
        { id: "lease-b", tenant: "Jen" },
        { id: "lease-c", tenant: "Frankie" },
      ],
    };
    const expectedAction = [
      { type: FETCHING_CURRENT_LEASES },
      {
        type: FETCH_CURRENT_LEASES_SUCCESS,
        payload: result.data,
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(result));
    await store.dispatch(fetchCurrentLeasesList());

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should create FETCH_CURRENT_LEASES_SUCCESS on successful api call with no data', async () => {
    const expectedAction = [
      { type: FETCHING_CURRENT_LEASES },
      {
        type: FETCH_CURRENT_LEASES_SUCCESS,
        payload: [],
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve());
    await store.dispatch(fetchCurrentLeasesList());

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should create FETCH_CURRENT_LEASES_ERROR on data fetch failure', async () => {
    const expectedAction = [
      { type: FETCHING_CURRENT_LEASES },
      {
        type: FETCH_CURRENT_LEASES_ERROR,
        payload: 'Something went wrong!',
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.reject('Something went wrong!'));
    await store.dispatch(fetchCurrentLeasesList());

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should create FETCH_SELECTED_LEASE_SUCCESS on successful data fetch', async () => {
    const selectedLease = 'lease-a';
    const result = {
      data: {
        id: "lease-a",
        start_date: "2018-05-12",
        end_date: "2018-11-13",
        rent: 454,
        frequency: "weekly",
        payment_day: "tuesday",
      },
    };
    const expectedAction = [
      { type: FETCHING_SELECTED_LEASE },
      {
        type: FETCH_SELECTED_LEASE_SUCCESS,
        payload: result.data,
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(result));
    await store.dispatch(fetchSelectedLeaseByLeaseId(selectedLease));

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should create FETCH_SELECTED_LEASE_SUCCESS on successful api call with no data', async () => {
    const selectedLease = 'lease-a';
    const expectedAction = [
      { type: FETCHING_SELECTED_LEASE },
      {
        type: FETCH_SELECTED_LEASE_SUCCESS,
        payload: [],
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve());
    await store.dispatch(fetchSelectedLeaseByLeaseId(selectedLease));

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should create FETCH_SELECTED_LEASE_ERROR on data fetch failure', async () => {
    const selectedLease = 'lease-a';
    const expectedAction = [
      { type: FETCHING_SELECTED_LEASE },
      {
        type: FETCH_SELECTED_LEASE_ERROR,
        payload: 'Something went wrong!',
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.reject('Something went wrong!'));
    await store.dispatch(fetchSelectedLeaseByLeaseId(selectedLease));

    expect(axios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedAction);
  });
});

