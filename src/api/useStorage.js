// React
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import StorageContext from '../context/StorageContext'

async function getWebStorage(key, baseURL) {
    let value = null
    let setValue = () => {}
    if (key === "patients") {
        let url = `${baseURL}/patients`
        let resp = await fetch(url, {
            referrerPolicy: "unsafe-url"
        })
        value = await resp.json()
        setValue = async (patients) => {
            console.log('set')
            console.log(patients)
            for (let key in patients) {
                let patient = patients[key]
                let patientURL = `${baseURL}/patients/${patient.dodid}`
                await fetch(patientURL, {
                    method: "POST",
                    body: JSON.stringify(patient),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            }
        }
    }
    else if (key.includes('documents')) {
        let dodid = key.split('-')[0]
        let docURL = `${baseURL}/patients/${dodid}/docs`
        let resp = await fetch(docURL)
        value = dodid ? await resp.json() : []
        setValue = async (docs) => {
            await fetch(docURL, {
                method: "POST",
                body: JSON.stringify(docs),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }
    }
    return [value, setValue]
}


function useStorage(key, defaultValue) {
    let [url] = useLocalStorage('api', '')
    const {values, setValues} = React.useContext(StorageContext)
    console.log(values)
    let [localValue, setLocalValue] = useLocalStorage(key, defaultValue)
    let [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        async function handle() {
            if (url && loading) {
                let [tmpValue, tmpSetValue] = await getWebStorage(key, url)
                setValues({
                    ...values,
                    [key]: {
                        value: tmpValue,
                        func: async (value) => {
                            await tmpSetValue(value)
                            setLoading(true)
                        }
                    }
                })
                setLoading(false)
            }
        }
        handle()
    }, [url, key, loading, values, setValues])
    if (url) {
        return [values[key]?.value ? values[key]?.value : defaultValue, values[key]?.func]
    }
    return [localValue, setLocalValue]
}

export default useStorage