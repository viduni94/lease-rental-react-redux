import React from "react";
import { shallow } from "enzyme";
import Footer from "../../src/components/Common/Footer";

describe("test Footer Component", () => {
  test("should render as expected", done => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toHaveLength(1);
    done();
  });
});