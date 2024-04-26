import { act, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import PatientPage from "./PatientPage"
import userEvent from "@testing-library/user-event"


describe('<PatientPage>', function() {
    it("should display the patient name and cite number", async function() {
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === "api") {
                return ''
            }
            return JSON.stringify({
                "XYZ": {
                    firstName: "Test",
                    lastName: "Patient",
                    dodid: "XYZ"
                }
        })
        })
        render(
            <MemoryRouter
                initialEntries={["/patients/ae/XYZ"]}
            >
                <Routes>
                    <Route
                        path="/patients/ae/:dodid"
                        element={<PatientPage />}
                    />
                </Routes>
            </MemoryRouter>
        )
        await waitFor(() => {
            let text = screen.getByText(/Test.*Patient/)
            expect(text).not.toBeNull()
            let cite = screen.getByText(/XYZ/)
            expect(cite).not.toBeNull()
        })
    })
    it("should provide a function to update the patient", async function() {
        Storage.prototype.setItem = jest.fn()
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === "api") {
                return ''
            }
            return JSON.stringify({
                "XYZ": {
                    firstName: "Test",
                    lastName: "Patient",
                    dodid: "XYZ"
                }
        })
        })
        render(
            <MemoryRouter
                initialEntries={["/patients/ae/XYZ"]}
            >
                <Routes>
                    <Route
                        path="/patients/ae/:dodid"
                        element={<PatientPage />}
                    />
                </Routes>
            </MemoryRouter>
        )
        let textBox = screen.getByRole("textbox", {name: "Primary Diagonsis"})
        act(() => userEvent.type(textBox, "Cancer"))
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes("Cancer".length)
    })
})