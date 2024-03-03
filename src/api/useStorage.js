// React
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

async function getWebStorage(key, baseURL) {
    let value = null
    let setValue = () => {}
    console.log(key, baseURL)
    if (key === "patients") {
        let url = `${baseURL}/patients`
        console.log(url)
        let resp = await fetch(url, {
            referrerPolicy: "unsafe-url"
        })
        value = await resp.json()
        setValue = async (patients) => {
            for (let patient of patients) {
                let patientURL = `${baseURL}/patients/${patient.dodid}`
                await fetch(patientURL, {
                    method: "POST",
                    body: JSON.stringify(patient)
                })
            }
        }
    }
    else if (key.includes('documents')) {
        let dodid = ''.split('-')[0]
        let docURL = `${baseURL}/patients/${dodid}/docs`
        let resp = await fetch(docURL)
        value = await resp.json()
        setValue = async (docs) => {
            await fetch(docURL, {
                method: "POST",
                body: JSON.stringify(docs)
            })
        }
    }
    return [value, setValue]
}


function useStorage(key, defaultValue) {
    let [url] = useLocalStorage('api', '')
    let [value, setValue] = React.useState(defaultValue)
    let [setValueFunc, setSetValueFunc] = React.useState(() => {})
    let [localValue, setLocalValue] = useLocalStorage(key, defaultValue)
    React.useEffect(() => {
        async function handle() {
            if (url) {
                let [tmpValue, tmpSetValue] = await getWebStorage(key, url)
                setValue(tmpValue)
                setSetValueFunc(tmpSetValue)
            }
        }
        handle()
    }, [url, key])
    if (url) {
        return [value, setValueFunc]
    }
    return [localValue, setLocalValue]
}

export default useStorage