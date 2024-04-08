import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import PatientPage from "./PatientPage"


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
})

describe('<OverviewTab>', function() {
    it("should display most recent vitals", function() {

    })
    it("shoudld display diagnosis", function() {

    })
    it("should display allergies", function() {

    })
    it("should display notes", function() {

    })
})