import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AdminSection from "../../components/Admin/Base/AdminSection";
import { renderHook } from "@testing-library/react-hooks";
import { useAdminStore } from "../../store/adminStore";

afterEach(() => cleanup());

// ! ADMIN NOT EXIST - REGISTER SHOULD RENDER
test("Should Register render", async () => {
  const { getByLabelText } = render(<AdminSection />);
  const { result } = renderHook(() => useAdminStore());
  result.current.isExist = false;
  await waitFor(() => {
    const requiredElement = getByLabelText("Surname");
    expect(requiredElement).toBeInTheDocument();
  });
});

// ! ADMIN EXIST - LOGIN SHOULD RENDER
test("Should Login render", async () => {
  const { getByTestId } = render(<AdminSection />);
  const { result } = renderHook(() => useAdminStore());
  result.current.isExist = true;
  await waitFor(() => {
    const requiredElement = getByTestId("login_wrapper");
    expect(requiredElement).toBeInTheDocument();
  });
});

// ! AUTH TRUE - CMS SHOULD RENDER
test("Should CMS render", async () => {
  const { getByText } = render(<AdminSection />);
  const { result } = renderHook(() => useAdminStore());
  result.current.isAuth = true;
  await waitFor(() => {
    const requiredElement = getByText("LOGOUT");
    expect(requiredElement).toBeInTheDocument();
  });
});
