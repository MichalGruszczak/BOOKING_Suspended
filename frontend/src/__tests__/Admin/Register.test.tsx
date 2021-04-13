import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Register from "../../components/Admin/Register";

afterEach(() => cleanup());

// ! REGISTER COMPONENT CORRECT RENDER
test("correct render component", async () => {
  const { getByLabelText } = render(<Register />);
  const requiredElement = getByLabelText("Surname");
  expect(requiredElement).toBeInTheDocument();
});

// ! REQUIRED FIELD VALIDATION

describe("register - required field", () => {
  //  EMPTY FIELD
  test("empty field error - name", async () => {
    const { container, getByText } = render(<Register />);

    const input = container.querySelector("#name");
    const submitBtn = getByText("Register");

    fireEvent.change(input!, { target: { value: "" } });
    fireEvent.click(submitBtn);

    const errorText = container.querySelector("#name-helper-text");

    expect(errorText).toHaveTextContent("This field cannot be empty!");
  });

  //    LESS THAN 2 CHARACTERS
  test("2 characters error - name", async () => {
    const { container, getByText } = render(<Register />);

    const input = container.querySelector("#name");
    const submitBtn = getByText("Register");

    fireEvent.change(input!, { target: { value: "d" } });
    fireEvent.click(submitBtn);

    const errorText = container.querySelector("#name-helper-text");

    expect(errorText).toHaveTextContent("At least 2 characters required!");
  });
  //    CORRECT INPUT
  test("should be no errors - correct", async () => {
    const { container, getByText } = render(<Register />);

    const input = container.querySelector("#name");
    const submitBtn = getByText("Register");

    fireEvent.change(input!, { target: { value: "newUser" } });
    fireEvent.click(submitBtn);

    const errorText = container.querySelector("#name-helper-text");

    expect(errorText).toBeFalsy();
  });
});

// ! NOT REQUIRED FIELD VALIDATION
describe("register - field not required", () => {
  // EMPTY FIELD
  test("empty field error - position", async () => {
    const { container, getByText } = render(<Register />);
    //
    const input = container.querySelector("#position");
    const submitBtn = getByText("Register");
    //
    fireEvent.change(input!, { target: { value: "" } });
    fireEvent.click(submitBtn);
    //
    const errorText = container.querySelector("#position-helper-text");

    expect(errorText).toBeFalsy();
  });

  //   FIELD NOT EMPTY - 2 ELEMENTS REQUIRED
  test("field not empty - 2 elements required", async () => {
    const { container, getByText } = render(<Register />);

    const input = container.querySelector("#position");
    const submitBtn = getByText("Register");

    fireEvent.change(input!, { target: { value: "n" } });
    fireEvent.click(submitBtn);

    const errorText = container.querySelector("#position-helper-text");

    expect(errorText).toHaveTextContent("At least 2 characters required!");
  });

  //   CORRECT FIELD
  test("correct field", async () => {
    const { container, getByText } = render(<Register />);

    const input = container.querySelector("#position");
    const submitBtn = getByText("Register");

    fireEvent.change(input!, { target: { value: "admin" } });
    fireEvent.click(submitBtn);

    const errorText = container.querySelector("#position-helper-text");

    expect(errorText).toBeFalsy();
  });
});
