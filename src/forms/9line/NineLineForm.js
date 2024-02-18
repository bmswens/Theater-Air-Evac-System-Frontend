// REact
import React from 'react'
import LabeledCheckbox from '../../components/LabeledCheckbox'
import { useLocalStorage } from 'usehooks-ts'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormGroup, Stack, TextField } from '@mui/material'

const blank9Line = {
    lat: '',
    lon: '',
    callSign: '',
    freq: '',
    numUrgent: '',
    numPriority: '',
    numRoutine: '',
    equipHoist: false,
    equipExtraction: false,
    equipVentilation: false,
    numLitter: '',
    numAmbulatory: '',
    secNoTroops: false,
    secPossibleTroops: false,
    secEnemy: false,
    secNumEnemyTroops: false,
    markingPanels: false,
    markingPyro: false,
    markingSmoke: false,
    markingNone: false,
    markingOther: false,
    patientUSMil: false,
    patientUSCiv: false,
    patientNonUSMil: false,
    patientNonUSCiv: false,
    patientEPW: false,
    nuclear: false,
    biological: false,
    chemical: false
}

function Row(props) {
    return (
        <Stack spacing={1} direction="row">
            {props.children}
        </Stack>
    )
}

function NineLineForm(props) {
    const {
        open,
        close,
        dodid,
        doc
    } = props

    const viewOnly = Boolean(doc ? true : false)

    const [data, setData] = React.useState(doc ? doc.data : blank9Line)
    const [docs, setDocs] = useLocalStorage(`${dodid}-documents`, [])

    React.useEffect(() => {
        if (doc) {
            setData(doc.data)
        }
    }, [doc])

    console.log(viewOnly)

    function updateLocation(geolocation) {
        let lat = geolocation.coords.latitude
        let lon = geolocation.coords.longitude
        setData({ ...data, lat, lon })
    }

    function handleLocationError(error) {
        alert(error.message, "error")
    }

    function handleGetLocation() {
        navigator.geolocation.getCurrentPosition(
            updateLocation,
            handleLocationError
        )
    }

    function handleClose() {
        setData(blank9Line)
        close()
    }

    function submit() {
        let doc = {
            name: "9 Line",
            lastModified: new Date(),
            data
        }
        setDocs([...docs, doc])
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                9-Line Medevac Request
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ marginTop: 1 }}>
                    <Divider>
                        Location of Pick-up Site
                    </Divider>
                    <Button
                        onClick={handleGetLocation}
                        variant="contained"
                    >
                        Get Location
                    </Button>
                    <Row>
                        <TextField
                            label="Lat"
                            fullWidth
                            value={data.lat}
                            onChange={event => setData({ ...data, lat: event.target.value })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Lat"
                            fullWidth
                            value={data.lon}
                            onChange={event => setData({ ...data, lon: event.target.value })}
                            disabled={viewOnly}
                        />
                    </Row>
                    <Divider>
                        Line Two
                    </Divider>
                    <Row>
                        <TextField
                            label="Callsign"
                            fullWidth
                            value={data.callSign}
                            onChange={event => setData({ ...data, callSign: event.target.value })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Freq"
                            fullWidth
                            value={data.freq}
                            onChange={event => setData({ ...data, freq: event.target.value })}
                            disabled={viewOnly}
                        />
                    </Row>
                    <Divider>
                        Number of Patients by Precedence
                    </Divider>
                    <Row>
                        <TextField
                            label="Urgent"
                            fullWidth
                            value={data.numUrgent}
                            onChange={event => setData({ ...data, numUrgent: event.target.value })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Priority"
                            fullWidth
                            value={data.numPriority}
                            onChange={event => setData({ ...data, numPriority: event.target.value })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Routine"
                            fullWidth
                            value={data.numRoutine}
                            onChange={event => setData({ ...data, numRoutine: event.target.value })}
                            disabled={viewOnly}
                        />
                    </Row>
                    <Divider>
                        Special Equipment Required
                    </Divider>
                    <FormGroup row sx={{ justifyContent: "center" }} >
                        <LabeledCheckbox
                            label="Hoist"
                            checked={data.equipHoist}
                            onChange={event => setData({ ...data, equipHoist: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Extraction"
                            checked={data.equipExtraction}
                            onChange={event => setData({ ...data, equipExtraction: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Ventilation"
                            checked={data.equipVentilation}
                            onChange={event => setData({ ...data, equipVentilation: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </FormGroup>
                    <Divider>
                        Number of Patients and Type
                    </Divider>
                    <Row>
                        <TextField
                            label="Litter"
                            fullWidth
                            value={data.numLitter}
                            onChange={event => setData({ ...data, numLitter: event.target.value })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Ambulatory"
                            fullWidth
                            value={data.numAmbulatory}
                            onChange={event => setData({ ...data, numAmbulatory: event.target.value })}
                            disabled={viewOnly}
                        />
                    </Row>
                    <Divider>
                        Security At Pick-up Site
                    </Divider>
                    <FormGroup row sx={{ justifyContent: "center" }} >
                        <LabeledCheckbox
                            label="No Enemy Troops"
                            checked={data.secNoTroops}
                            onChange={event => setData({ ...data, secNoTroops: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Possible Enemy Troops"
                            checked={data.secPossibleTroops}
                            onChange={event => setData({ ...data, secPossibleTroops: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Confirmed Enemy Troops (Caution)"
                            checked={data.secEnemy}
                            onChange={event => setData({ ...data, secEnemy: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Confirmed Enemy Troops (Armed Escort)"
                            checked={data.secNumEnemyTroops}
                            onChange={event => setData({ ...data, secNumEnemyTroops: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </FormGroup>
                    <Divider>
                        Method of Marking PZ
                    </Divider>
                    <FormGroup row sx={{ justifyContent: "center" }} >
                        <LabeledCheckbox
                            label="Panels"
                            checked={data.markingPanels}
                            onChange={event => setData({ ...data, markingPanels: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Pyrotechnics"
                            checked={data.markingPyro}
                            onChange={event => setData({ ...data, markingPyro: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Smoke Signals"
                            checked={data.markingSmoke}
                            onChange={event => setData({ ...data, markingSmoke: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="None"
                            checked={data.markingNone}
                            onChange={event => setData({ ...data, markingNone: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Other"
                            checked={data.markingOther}
                            onChange={event => setData({ ...data, markingOther: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </FormGroup>
                    <Divider>
                        Patient Nationality and Status
                    </Divider>
                    <FormGroup row sx={{ justifyContent: "center" }} >
                        <LabeledCheckbox
                            label="US Military"
                            checked={data.patientUSMil}
                            onChange={event => setData({ ...data, patientUSMil: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="US Civilian"
                            checked={data.patientUSCiv}
                            onChange={event => setData({ ...data, patientUSCiv: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Non-US Military"
                            checked={data.patientNonUSMil}
                            onChange={event => setData({ ...data, patientNonUSMil: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Non-US Civilian"
                            checked={data.patientNonUSCiv}
                            onChange={event => setData({ ...data, patientNonUSCiv: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="EPW"
                            checked={data.patientEPW}
                            onChange={event => setData({ ...data, patientEPW: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </FormGroup>
                    <Divider>
                        NBC
                    </Divider>
                    <FormGroup row sx={{ justifyContent: "center" }} >
                        <LabeledCheckbox
                            label="Nuclear"
                            checked={data.nuclear}
                            onChange={event => setData({ ...data, nuclear: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Biological"
                            checked={data.biological}
                            onChange={event => setData({ ...data, biological: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Chemical"
                            checked={data.chemical}
                            onChange={event => setData({ ...data, chemical: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </FormGroup>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    {viewOnly ? "Cancel" : "Close"}
                </Button>
                {viewOnly ? null :
                    <Button
                        variant="contained"
                        onClick={submit}
                    >
                        Submit
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default NineLineForm