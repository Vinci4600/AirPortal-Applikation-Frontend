import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest"; // ✅ FIX!!!
import LoginPage from "../pages/LoginPage";

// Mock für navigate
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("LoginPage", () => {

  it("rendert Login Formular", () => {
    render(<LoginPage setToken={() => {}} />);

    expect(screen.getByPlaceholderText("Benutzername oder Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("nimmt Eingaben an", () => {
    render(<LoginPage setToken={() => {}} />);

    const inputUser = screen.getByPlaceholderText("Benutzername oder Email");
    const inputPass = screen.getByPlaceholderText("Passwort");

    fireEvent.change(inputUser, { target: { value: "test" } });
    fireEvent.change(inputPass, { target: { value: "1234" } });

    expect(inputUser.value).toBe("test");
    expect(inputPass.value).toBe("1234");
  });

});