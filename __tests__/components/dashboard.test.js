import React from "react";
import { shallow } from "enzyme";
import configureStore from 'redux-mock-store';
import { Spinner } from 'reactstrap';
import { Dashboard } from "../../src/components/Dashboard";

const props = {
  fetchCurrentLeasesList: jest.fn().mockReturnThis(),
  fetchSelectedLeaseByLeaseId: jest.fn().mockReturnThis(),
  currentLeasesFetchError: null,
  isFetchingCurrentLeases: false,
  currentLeasesList: [
    { id: "lease-a", tenant: "Alex" },
    { id: "lease-b", tenant: "Jen" },
    { id: "lease-c", tenant: "Frankie" },
  ],
};

describe("test Dashboard Component", () => {
  test("should render as expected", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("should render spinner when the data is loading", done => {
    const updatedProps = { ...props, isFetchingCurrentLeases: true };
    const wrapper = shallow(<Dashboard {...updatedProps} />);
    const spinner = shallow(<Spinner />);
    expect(wrapper).toHaveLength(1);
    expect(spinner).toHaveLength(1);
    done();
  });

  test("should render message when lease list is empty", done => {
    const updatedProps = { ...props, isFetchingCurrentLeases: false, currentLeasesList: [] };
    const wrapper = shallow(<Dashboard {...updatedProps} />);
    const noDataMessage = wrapper.find('.pl-no-leases');
    expect(wrapper).toBeDefined();
    expect(noDataMessage).toBeDefined();
    done();
  });

  test("should render error when there is a data fetch error", done => {
    const updatedProps = { ...props, isFetchingCurrentLeases: false, currentLeasesFetchError: 'Something went wrong!' };
    const wrapper = shallow(<Dashboard {...updatedProps} />);
    const errorMessage = wrapper.find('.pl-leases-error');
    expect(wrapper).toBeDefined();
    expect(errorMessage).toBeDefined();
    done();
  });

  test("should open modal when the view details button is clicked", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toBeDefined();
    const viewDetailsButton = wrapper.find('.fa-eye');
    expect(viewDetailsButton).toHaveLength(props.currentLeasesList.length);
    viewDetailsButton.at(0).simulate('click', {
      target: {
        dataset: {
          leaseId: props.currentLeasesList[0].id
        }
      },
      stopPropagation: () => {},
    });
    expect(wrapper.state('isModalOpen')).toBe(true);
    expect(props.fetchSelectedLeaseByLeaseId).toHaveBeenCalled();
    done();
  });

  test("should open modal and not fetch selected lease when id is empty", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toBeDefined();
    const viewDetailsButton = wrapper.find('.fa-eye');
    expect(viewDetailsButton).toHaveLength(props.currentLeasesList.length);
    viewDetailsButton.at(0).simulate('click', {
      target: {
        dataset: {}
      },
      stopPropagation: () => {},
    });
    expect(wrapper.state('isModalOpen')).toBe(true);
    expect(props.fetchSelectedLeaseByLeaseId).not.toHaveBeenCalled();
    done();
  });
});