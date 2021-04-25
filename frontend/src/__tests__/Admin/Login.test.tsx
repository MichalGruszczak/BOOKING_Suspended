import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../../components/Admin/Auth/Login";

afterEach(() => cleanup());

// ! CORRECT RENDER
test("should correct render", () => {
  const { getByLabelText } = render(<Login />);
  const requiredElement = getByLabelText("Login *");
  expect(requiredElement).toBeInTheDocument();
});

// ! LOGIN INPUT VALIDATION FROM FORM
describe("login - empty fields", () => {
  // LOGIN
  test("should throw empty field error - login", async () => {
    const { container } = render(<Login />);
    const input = container.querySelector("#login");
    const submitBtn = container.querySelector("button");

    fireEvent.change(input!, { target: { value: "" } });
    fireEvent.click(submitBtn!);

    const errorText = container.querySelector("#login-helper-text");

    await waitFor(() => {
      expect(errorText).toHaveTextContent("This field cannot be empty!");
    });
  });
  // PASSWORD
  test("should throw empty field error - password", async () => {
    const { container, getByTestId } = render(<Login />);

    const input = container.querySelector("#password");
    const submitBtn = container.querySelector("button");
    const fieldContainer = getByTestId("login");

    fireEvent.change(input!, { target: { value: "" } });
    fireEvent.click(submitBtn!);

    await waitFor(() => {
      expect(fieldContainer).toHaveTextContent("This field cannot be empty!");
    });
  });
});
