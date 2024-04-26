// React
import { Button, Divider, Stack, TextField } from '@mui/material'
import React from 'react'

function NewOrdersSection(props) {
    const { addOrder } = props

    const [orders, setOrders] = React.useState('')
    const [provider, setProvider] = React.useState('')

    function submit() {
        addOrder({ orders, provider })
        setOrders('')
        setProvider('')
    }

    return (
        <>
            <TextField
                label="New Orders"
                fullWidth
                multiline
                rows={3}
                value={orders}
                onChange={event => setOrders(event.target.value)}
            />
            <TextField
                label="Provider"
                fullWidth
                value={provider}
                onChange={event => setProvider(event.target.value)}
            />
            <Stack direction="row-reverse" spacing={1}>
                <Button
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </Stack>
        </>
    )
}

function Order(props) {
    const { orders, provider } = props

    return (
        <TextField
            label="Orders"
            fullWidth
            multiline
            rows={3}
            helperText={`Provider: ${provider}`}
            value={orders}
            disabled
        />
    )
}


function OrdersTab(props) {
    const { orders, updatePatient } = props

    function addOrder(order) {
        updatePatient("orders", [...orders, order])
    }

    const latestOrder = orders[orders.length - 1]
    let reversed = orders.toReversed()

    return (
        <Stack spacing={1}>
            <Divider>
                Latest Order
            </Divider>
            {
                latestOrder
                    ?
                    <Order {...latestOrder} />
                    :
                    null
            }
            <Divider>
                New Order
            </Divider>
            <NewOrdersSection
                addOrder={addOrder}
            />
            <Divider>
                All Orders
            </Divider>
            {reversed.map((order, index) => <Order key={index} {...order} />)}
        </Stack>
    )
}

export default OrdersTab