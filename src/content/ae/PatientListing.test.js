import { render, screen, waitFor } from "@testing-library/react"
import PatientListing from "./PatientListing"
import userEvent from "@testing-library/user-event"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { BrowserRouter } from "react-router-dom"


describe("<PatientListing>", function () {
    it("should have a label for patient listing", function () {
        render(
            <PatientListing />
        )
        let text = screen.getByText(/Patient Listing/)
        expect(text).not.toBeNull()
    })
    it("should display patient cards for all the patients", function () {
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === "api") {
                return ''
            }
            return JSON.stringify([
                {
                    firstName: "Test",
                    lastName: "Patient"
                }
            ])
        })
        render(
            <BrowserRouter>
                <PatientListing />
            </BrowserRouter>
        )
        let text = screen.getByText(/Test Patient/)
        expect(text).not.toBeNull()
    })
    it("should have a button to delete all patients", function () {
        Storage.prototype.setItem = jest.fn()
        render(
            <PatientListing />
        )
        let button = screen.getByRole("button", { name: "Delete Patients" })
        userEvent.click(button)
        expect(localStorage.setItem).toHaveBeenCalledWith("patients", "[]")
    })
    it("should have a button to add a new patient", async function () {
        render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <PatientListing />
            </LocalizationProvider>
        )
        let button = screen.getByRole("button", { name: "Add New Patient" })
        let cancelButton
        await waitFor(() => {
            userEvent.click(button)
            let dialog = screen.getByRole("dialog", { name: "New Patient" })
            expect(dialog).not.toBeNull()
            cancelButton = screen.getByRole("button", { name: "Cancel" })
        })
        await waitFor(() => {
            userEvent.click(cancelButton)
            let dialogAgain = screen.queryByRole("dialog")
            expect(dialogAgain).toBeNull()
        })
    })
})