import { act, render, screen } from "@testing-library/react"
import OverviewTab from "./OverviewTab"
import userEvent from "@testing-library/user-event"


describe('<OverviewTab>', function() {
    it("should display most recent vitals", function() {
        const vitals = [
            {
                pulse: "82",
                bloodPressure: "92/167",
                map: "66",
                co2: "88",
                spo2: "83",
                pain: "4"
            }
        ]
        render(
            <OverviewTab
                vitals={vitals}
            />
        )
        let thingsToCheck = [
            screen.getByText(/Pulse/),
            screen.getByText(/82/),
            screen.getByText(/Blood Pressure & MAP/),
            screen.getByText(/92\/167/),
            screen.getByText(/(66)/),
            screen.getByText(/CO2/),
            screen.getByText(/88/),
            screen.getByText(/SPO2/),
            screen.getByText(/83/),
            screen.getByText(/Pain/),
            screen.getByText(/4/)
        ]
        thingsToCheck.map(thing => expect(thing).not.toBeNull())
    })
    it("shoudld display diagnosis", function() {
        render(
            <OverviewTab
                diagnosis="Cancer"
            />
        )
        let textBox = screen.getByRole("textbox", {name: "Primary Diagonsis"})
        expect(textBox.value).toEqual("Cancer")
    })
    it('should be able to update diagnosis', function() {
        let updatePatient = jest.fn()
        render(
            <OverviewTab
                diagnosis=""
                updatePatient={updatePatient}
            />
        )
        let textBox = screen.getByRole("textbox", {name: "Primary Diagonsis"})
        act(() => userEvent.type(textBox, "Cancer"))
        expect(updatePatient).toHaveBeenCalledTimes(6)
    })
    it("should display allergies", function() {
        render(
            <OverviewTab
                allergies={["Taxes"]}
            />
        )
        let allergies = screen.getByText(/Taxes/)
        expect(allergies).not.toBeNull()
    })
    it("should display notes", function() {
        render(
            <OverviewTab
                notes="On death's door."
            />
        )
        let textBox = screen.getByRole("textbox", {name: "Notes"})
        expect(textBox.value).toEqual("On death's door.")
    })
    it('should be able to update diagnosis', function() {
        let updatePatient = jest.fn()
        render(
            <OverviewTab
                notes=""
                updatePatient={updatePatient}
            />
        )
        let textBox = screen.getByRole("textbox", {name: "Notes"})
        act(() => userEvent.type(textBox, "He dead."))
        expect(updatePatient).toHaveBeenCalledTimes("He dead.".length)
    })
})