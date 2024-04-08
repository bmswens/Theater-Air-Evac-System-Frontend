import { render, screen, waitFor } from "@testing-library/react"
import PatientCard from "./PatientCard"
import api from "../../api"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"


describe('<PatientCard>', function () {
    it("should display the patient's name", function () {
        render(
            <BrowserRouter>
                <PatientCard
                    firstName="Amn"
                    lastName="Snuffy"
                />
            </BrowserRouter>
        )
        let name = screen.getByText(/Amn Snuffy/)
        expect(name).not.toBeNull()
    })
    it("should display the patient's cite number", function () {
        // Cite number ~= patient id
        // "Yeah it’s a number assigned to a patient don’t know who selects it"
        render(
            <BrowserRouter>
                <PatientCard
                    dodid="XYZ"
                />
            </BrowserRouter>
        )
        let name = screen.getByText(/XYZ/)
        expect(name).not.toBeNull()
    })
    it("should have a button to display their TCCC", async function () {
        // TODO: Currently just displays the first TCCC
        // may need to update it to grab the latest, but keeping 
        // it simple for now
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === "api") {
                return ''
            }
            return JSON.stringify([{
                name: "Tactical Casualty Care Card",
                lastModified: new Date(),
                data: {
                    rosterNumber: '',
                    evacType: null,
                    datetime: new Date(),
                    mechanism: [],
                    signsAndSymptoms: [{
                        id: 0,
                        datetime: new Date(),
                        pulse: '',
                        bloodPressure: '',
                        respiratoryRate: '',
                        oxygenSat: '',
                        avpu: '',
                        pain: ''
                    }],
                    injuries: [],
                    circulation: {},
                    airway: {},
                    breathing: {},
                    circulationRes: [],
                    medication: [],
                    other: {},
                    notes: '',
                    firstResponderName: '',
                    firstResponderDodid: ''
                }
            }
            ])
        })
        render(
            <BrowserRouter>
                <PatientCard
                    dodid="XYZ"
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "TCCC" })
        let closeButton
        await waitFor(() => {
            userEvent.click(button)
            let dialog = screen.getByRole("dialog", { name: "Tactical Combat Casualty Care Card" })
            expect(dialog).not.toBeNull()
            closeButton = screen.getByRole("button", { name: "Close" })
        })
        await waitFor(() => {
            userEvent.click(closeButton)
            let dialog = screen.queryByRole("dialog", { name: "Tactical Combat Casualty Care Card" })
            expect(dialog).toBeNull()
        })
    })
    it("should have a button to display their vitals", async function () {
        // Linked to 3899
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === "api") {
                return ''
            }
            return JSON.stringify([{
                name: "AF Form 3899",
                lastModified: new Date(),
                data: {
                    af3899D: []
                }
            }
            ])
        })
        render(
            <BrowserRouter>
                <PatientCard
                    dodid="XYZ"
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Vitals" })
        let closeButton
        await waitFor(() => {
            userEvent.click(button)
            let dialog = screen.getByRole("dialog", { name: "AF Form 3899D" })
            expect(dialog).not.toBeNull()
            closeButton = screen.getByRole("button", { name: "Close" })
        })
        await waitFor(() => {
            userEvent.click(closeButton)
            let dialog = screen.queryByRole("dialog", { name: "Tactical Combat Casualty Care Card" })
            expect(dialog).toBeNull()
        })
    })
    it("should have a button to display ISBAR", function () {
        // TODO: ISBAR not implemented yet
    })
    it("should navigate you to the patient's page on click", function () {
        render(
            <BrowserRouter>
                <PatientCard
                    dodid="XYZ"
                />
            </BrowserRouter>
        )
        let button = screen.getByRole('button', { name: "Open XYZ" })
        userEvent.click(button)
    })
})