// util functions
function getLocal(key, fallback) {
    let value = localStorage.getItem(key)
    if (!value) {
        localStorage.setItem(key, JSON.stringify(value))
        value = fallback
    }
    else {
        value = JSON.parse(value)
    }
    return value
}


async function getPatients() {
    let patients = getLocal("patients", [])
    return patients
}

// TCCC Data
const defaultTCCC = {
    rosterNumber: "1",
    evacType: "priority",
    name: "George Washington",
    dodid: "0000001",
    gender: "Male",
    datetime: new Date().toISOString(),
    mechanism: [
        "Artillery",
        "Burn",
        "IED",
        "Words"
    ],
    injuries: [
        {
            x: 40,
            y: 220,
            title: "Bullet Wound"
        },
        {
            x: 55,
            y: 200,
            title: "TQ-Extremity"
        },
        {
            x: 55,
            y: 75,
            title: "Shrapnel"
        },
        {
            x: 95,
            y: 100,
            title: "Broken Heart"
        },
        {
            x: 235,
            y: 75,
            title: "Shrapnel"
        },
        {
            x: 32,
            y: 75,
            title: "Shrapnel"
        },
        {
            x: 32,
            y: 75,
            title: "Shrapnel"
        },
        {
            x: 32,
            y: 75,
            title: "Shrapnel"
        }
    ],
    signsAndSymptoms: [
        {
            id: 1,
            datetime: new Date().toISOString(),
            pulse: "122 / Neck",
            bloodPressure: "140 / 90",
            respiratoryRate: 42,
            oxygenSat: 58,
            avpu: 4,
            pain: 7
        },
        {
            id: 2,
            datetime: new Date().toISOString(),
            pulse: "92 / Neck",
            bloodPressure: "130 / 90",
            respiratoryRate: 30,
            oxygenSat: 70,
            avpu: 6,
            pain: 5
        },
        {
            id: 3,
            datetime: new Date().toISOString(),
            pulse: "90 / Wrist",
            bloodPressure: "120 / 90",
            respiratoryRate: 22,
            oxygenSat: 90,
            avpu: 7,
            pain: 2
        }
    ],
    circulation: {
        tqExtremity: true
    },
    airway: {
        intact: true,
    },
    breathing: {
        chestSeal: true,
    },
    circulationRes: [
        {
            id: 1,
            datetime: new Date().toISOString(),
            type: "Blood Product",
            name: "O Neg Blood",
            volume: "50ml",
            route: "IV"
        },
        {
            id: 2,
            datetime: new Date().toISOString(),
            type: "Fluid",
            name: "Saline",
            volume: "120ml",
            route: "IV"
        }
    ],
    medication: [
        {
            id: 1,
            datetime: new Date().toISOString(),
            type: "Analgesic",
            name: "Morphine",
            dose: "5ml",
            route: "Needle"
        },
        {
            id: 2,
            datetime: new Date().toISOString(),
            type: "Other",
            name: "TXA",
            dose: "5ml",
            route: "Needle"
        }
    ],
    other: {
        pill: true,
        hypothermia: true
    },
    notes: "Subject has wooden teeth, and a strong love for freedom and democracy.",
    firstResponderName: "John Adams",
    firstResponderDodid: "0000002"
}

async function getPatientById(dodid) {
    return {
        firstName: "George",
        lastName: "Washington",
        dodid: "0000001",
        dob: new Date().toISOString(),
        bloodType: "O Neg",
        documents: [
            {
                name: "Tactical Casualty Care Card",
                lastModified: new Date(2023, 11, 21, 10, 30).toISOString(),
                data: defaultTCCC
            },
            {
                name: "9 Line",
                lastModified: new Date(2023, 11, 21, 10, 32).toISOString(),
            },
            {
                name: "AF Form 3899",
                lastModified: new Date(2023, 11, 21, 11, 7).toISOString(),
            },
            {
                name: "AF Form 3899A",
                lastModified: new Date(2023, 11, 21, 11, 32).toISOString(),
            },
            {
                name: "AF Form 3899D",
                lastModified: new Date(2023, 11, 21, 13, 15).toISOString(),
            },
            {
                name: "AF Form 3899I",
                lastModified: new Date(2023, 11, 21, 13, 15).toISOString(),
            }
        ]
    }
}

const initialPatients = {
    "0000001": {
        firstName: "George",
        lastName: "Washington",
        dodid: "0000001",
        dob: "1732-03-22T04:56:02.000Z",
        bloodType: "O Neg",
        allergies: ["The English", "Taxes", "Royalty"]
    }
}

const georgeDocs = [
    {
        name: "Tactical Casualty Care Card",
        lastModified: new Date(2023, 11, 21, 10, 30),
        data: defaultTCCC
    },
    {
        name: "9 Line",
        lastModified: new Date(2023, 11, 21, 10, 32)
    },
    {
        name: "AF Form 3899",
        lastModified: new Date(2023, 11, 21, 11, 7)
    },
    {
        name: "AF Form 3899A",
        lastModified: new Date(2023, 11, 21, 11, 32)
    },
    {
        name: "AF Form 3899D",
        lastModified: new Date(2023, 11, 21, 13, 15)
    },
    {
        name: "AF Form 3899D",
        lastModified: new Date(2023, 11, 21, 13, 15)
    }
]


const api = {
    getPatients,
    getPatientById,
    initialPatients,
    georgeDocs
}

export default api