import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import { MemoryRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe("LoginPage", () => {

  it("rendert Login Formular", () => {
    render(
      <MemoryRouter>
        <LoginPage setToken={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })

  it("nimmt Eingaben an", () => {
    render(
      <MemoryRouter>
        <LoginPage setToken={() => {}} />
      </MemoryRouter>
    )

    const inputUser = screen.getByPlaceholderText("Username")

    fireEvent.change(inputUser, { target: { value: "test" } })

    expect(inputUser.value).toBe("test")
  })

})