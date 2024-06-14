import React from 'react'

import Plot from 'react-plotly.js'


function Graph(props) {
    const {x, y, title} = props

    return (
        <Plot
            data={[
                {
                    x: x,
                    y: y.map(z => Number(z)),
                    type: "scatter",
                    mode: "lines",
                }
            ]}
            layout={{
                title: {
                    text: title,
                    font: {
                        color: "white"
                    }
                },
                font: {
                    color: "white"
                },
                autosize: true,
                paper_bgcolor: '#121212',
                plot_bgcolor: '#121212',
                yaxis: {
                    range: props.upperLimit ? [0, props.upperLimit] : undefined
                }
            }}
            style={{
                width: props.width || "100%",
                height: 350
            }}
        />
    )
}

export default Graph