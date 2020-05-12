import React from "react";
import { shallow } from "enzyme";
import { Spinner } from 'reactstrap';
import { LeaseModal } from "../../src/components/LeaseModal";

const props = {
  selectedLeaseFetchError: null,
  isFetchingSelectedLease: false,
  toggle: jest.fn().mockReturnThis(),
  modal: true,
  selectedLease: {
    id: "lease-a",
    start_date: "2018-05-12",
    end_date: "2018-11-13",
    rent: 454,
    frequency: "weekly",
    payment_day: "tuesday",
  },
};

describe("test Lease Modal Component", () => {
  test("should render as expected", done => {
    const wrapper = shallow(<LeaseModal {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("should render spinner when the data is loading", done => {
    const updatedProps = { ...props, isFetchingSelectedLease: true };
    const wrapper = shallow(<LeaseModal {...updatedProps} />);
    const spinner = shallow(<Spinner />);
    expect(wrapper).toHaveLength(1);
    expect(spinner).toHaveLength(1);
    done();
  });

  test("should render error when there is a data fetch error", done => {
    const updatedProps = { ...props, isFetchingSelectedLease: false, selectedLeaseFetchError: 'Something went wrong!' };
    const wrapper = shallow(<LeaseModal {...updatedProps} />);
    const errorMessage = wrapper.find('.pl-leases-error');
    expect(wrapper).toBeDefined();
    expect(errorMessage).toBeDefined();
    done();
  });

  test("should render correct lease id in modal title", done => {
    const wrapper = shallow(<LeaseModal {...props} />);
    const modalTitle = wrapper.find('.pl-modal-header');
    expect(modalTitle).toBeDefined();
    expect(modalTitle.text()).toEqual(props.selectedLease.id);
    done();
  });

  test("should render empty string in modal title when id is not present", done => {
    const updatedProps = { ...props, selectedLease: '' };
    const wrapper = shallow(<LeaseModal {...updatedProps} />);
    const modalTitle = wrapper.find('.pl-modal-header');
    expect(modalTitle).toBeDefined();
    expect(modalTitle.text()).toEqual('');
    done();
  });

  test("should call toggle function when footer button is clicked", done => {
    const wrapper = shallow(<LeaseModal {...props} />);
    const footerButton = wrapper.find('.pl-footer-btn');
    expect(footerButton).toHaveLength(1);
    footerButton.simulate('click');
    expect(wrapper.props().toggle).toHaveBeenCalled();
    done();
  });
});