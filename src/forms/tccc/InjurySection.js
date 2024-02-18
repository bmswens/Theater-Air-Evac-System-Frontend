// React
import React from 'react'

// MUI
import { Box, Card, CardActionArea, CardHeader, Grid, Stack } from '@mui/material'

function InjuryImage(props) {

    const ref = React.useRef(null)
    const drawing = React.useRef(null)
    const container = React.useRef(null)
    const [loaded, setLoaded] = React.useState(false)
    const { dots, selected } = props

    React.useEffect(() => {
        if (loaded) {
            const ctx = drawing.current.getContext('2d')
            ctx.clearRect(0, 0, drawing.current.width, drawing.current.width)
            for (let dot of dots) {
                ctx.strokeStyle = "royalblue"
                let size = 4
                if (dot.x === selected.x && dot.y === selected.y) {
                    console.log("matched")
                    ctx.strokeStyle = "firebrick"
                    size = 6
                }
                ctx.beginPath()
                for (let i = 1; i < size; i++) {
                    ctx.arc(dot.x, dot.y, i, 0, 2 * Math.PI)
                    ctx.stroke()
                }

            }
        }
    }, [dots, loaded, selected])

    React.useEffect(() => {
        if (!loaded) {
            const ctx = ref.current.getContext('2d')
            const background = new Image()
            background.src = `${process.env.PUBLIC_URL}/img/bodies.png`
            background.addEventListener('load', () => {
                container.current.style.width = background.naturalWidth + "px"
                container.current.style.height = background.naturalHeight + "px"
                ref.current.width = background.naturalWidth
                ref.current.height = background.naturalHeight
                drawing.current.width = background.naturalWidth
                drawing.current.height = background.naturalHeight
                ctx.drawImage(background, 0, 0)
                setLoaded(true)
            })
        }
    }, [loaded])

    return (
        <Box sx={{position: "relative"}} ref={container}>
            <canvas
                ref={ref}
                style={{
                    position: "absolute",
                    x: 0,
                    y: 0,
                    zIndex: 0
                }}
            />
            <canvas
                ref={drawing}
                style={{
                    position: "absolute",
                    x: 0,
                    y: 0,
                    zIndex: 1
                }}
            />
        </Box>
        
    )

}

function InjuryCard(props) {

    const {
        title,
        setSelected,
        setLocked,
        locked
    } = props

    function handleClick() {
        if (!locked) {
            setSelected({
                x: props.x,
                y: props.y
            })
        }
        else {
            setSelected({})
        }
        setLocked(!locked)
    }

    function handeMouseEnter() {
        if (!locked) {
            setSelected(props)
        }
    }

    function handleMouseOut() {
        if (!locked) {
            setSelected({})
        }
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleClick}
                onMouseOver={handeMouseEnter}
                onMouseOut={handleMouseOut}
            >
                <CardHeader
                    title={title}
                />
            </CardActionArea> 
        </Card>
    )

}

function InjuryCards(props) {

    const {injuries} = props

    return (
        <Stack spacing={1} >
            {injuries.map(injury => (<InjuryCard key={injury.title} {...injury} {...props} />))}
        </Stack>
    )

}

function InjurySection(props) {

        const {
            injuries
        } = props

        const [selected, setSelected] = React.useState({})
        const [locked, setLocked] = React.useState(false)

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={7}>
                    <InjuryImage
                        dots={injuries}
                        selected={selected}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={5} sx={{ height: 360, overflow: "hidden", overflowY: "scroll" }}>
                    <InjuryCards
                        injuries={injuries}
                        locked={locked}
                        setLocked={setLocked}
                        setSelected={setSelected}
                    />
                </Grid>
            </Grid>
        )
}

export default InjurySection