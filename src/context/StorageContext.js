// React
import React from 'react';

const StorageContext = React.createContext({
    values: {},
    setValues: () => {}
})

function StorageContextProvider(props) {
    const [values, setValues] = React.useState({})
    return (
        <StorageContext.Provider value={{values, setValues}}>
            {props.children}
        </StorageContext.Provider>
    )
}

export default StorageContext
export {
    StorageContextProvider
}
