import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cards from ".";

configure({ adapter: new Adapter() });

describe("Cards", () => {
  it("should show error card", () => {
    const wrapper = shallow(<Cards />);
    expect(wrapper).toMatchSnapshot();
  });
});
