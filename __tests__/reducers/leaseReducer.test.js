import leaseReducer from "../../src/reducers/leaseReducer";
import {
  FETCHING_CURRENT_LEASES,
  FETCH_CURRENT_LEASES_SUCCESS,
  FETCH_CURRENT_LEASES_ERROR,
  FETCHING_SELECTED_LEASE,
  FETCH_SELECTED_LEASE_SUCCESS,
  FETCH_SELECTED_LEASE_ERROR,
} from '../../src/actions/types';

const initialState = {
  currentLeasesList: [],
  selectedLease: null,
  isFetchingCurrentLeases: false,
  isFetchingSelectedLease: false,
  currentLeasesFetchError: null,
  selectedLeaseFetchError: null,
};

describe("test lease reducer", () => {
  test("should return the initial state", () => {
    expect(leaseReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle FETCHING_CURRENT_LEASES", () => {
    expect(leaseReducer(initialState, { type: FETCHING_CURRENT_LEASES })).toEqual({
      ...initialState,
      isFetchingCurrentLeases: true,
    });
  });

  test("should handle FETCH_CURRENT_LEASES_SUCCESS", () => {
    const data = [
      { id: "lease-a", tenant: "Alex" },
      { id: "lease-b", tenant: "Jen" },
      { id: "lease-c", tenant: "Frankie" },
    ];
    expect(leaseReducer(initialState,  { type: FETCH_CURRENT_LEASES_SUCCESS, payload: data }))
      .toEqual({ ...initialState, currentLeasesList: data, isFetchingCurrentLeases: false });
  });

  test("should handle FETCH_CURRENT_LEASES_ERROR", () => {
    const data = 'Something went wrong!';
    expect(leaseReducer(initialState,  { type: FETCH_CURRENT_LEASES_ERROR, payload: data }))
      .toEqual({ ...initialState, currentLeasesFetchError: data, isFetchingCurrentLeases: false });
  });

  test("should handle FETCHING_SELECTED_LEASE", () => {
    expect(leaseReducer(initialState, { type: FETCHING_SELECTED_LEASE })).toEqual({
      ...initialState,
      isFetchingSelectedLease: true,
    });
  });

  test("should handle FETCH_SELECTED_LEASE_SUCCESS", () => {
    const data = {
      id: "lease-a",
      start_date: "2018-05-12",
      end_date: "2018-11-13",
      rent: 454,
      frequency: "weekly",
      payment_day: "tuesday",
    };
    expect(leaseReducer(initialState,  { type: FETCH_SELECTED_LEASE_SUCCESS, payload: data }))
      .toEqual({ ...initialState, selectedLease: data, isFetchingSelectedLease: false });
  });

  test("should handle FETCH_SELECTED_LEASE_ERROR", () => {
    const data = 'Something went wrong!';
    expect(leaseReducer(initialState,  { type: FETCH_SELECTED_LEASE_ERROR, payload: data }))
      .toEqual({ ...initialState, selectedLeaseFetchError: data, isFetchingSelectedLease: false });
  });
});