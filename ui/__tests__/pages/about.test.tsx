import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "@/pages/about";

describe("About", () => {
  it("render about page", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
