import { act, render, screen } from "@testing-library/react"
import OrdersTab from "./OrdersTab"
import userEvent from "@testing-library/user-event"

describe('<OrdersTab>', function() {
    it("should allow a user to add a new order", function() {
        let update = jest.fn()
        render(
            <OrdersTab
                updatePatient={update}
                orders={[]}
            />
        )
        let textBox = screen.getByRole("textbox", {name: "New Orders"})
        act(() => userEvent.type(textBox, "Do the thing"))
        let providerBox = screen.getByRole("textbox", {name: "Provider"})
        act(() => userEvent.type(providerBox, "person"))
        let button = screen.getByRole("button", { name: "Submit" })
        act(() => userEvent.click(button))
        expect(update).toHaveBeenCalledWith("orders", [{provider: "person", orders: "Do the thing"}])
    })
    it("should be able to display all orders", function() {
        let update = jest.fn()
        render(
            <OrdersTab
                updatePatient={update}
                orders={[
                    {
                        orders: "thing",
                        provider: "person"
                    }
                ]}
            />
        )
        let boxes = screen.getAllByRole("textbox", { name: "Orders"})
        expect(boxes).toHaveLength(2)
    })
})