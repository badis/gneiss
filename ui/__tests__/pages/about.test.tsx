import React from "react";
import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "@/pages/about";

describe("About", () => {
  it("render about page", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
