import React from "react";
import { shallow } from "enzyme";
import Navbar from "../../src/components/Common/Navbar";

describe("test Navbar Component", () => {
  test("should render as expected", done => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toHaveLength(1);
    done();
  });
});