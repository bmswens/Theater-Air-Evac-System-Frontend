// React
import React from 'react'

// MUI
import { Box, Card, CardActionArea, CardContent, Grid, Stack, TextField } from '@mui/material'

function InjuryImage(props) {

    const ref = React.useRef(null)
    const drawing = React.useRef(null)
    const container = React.useRef(null)
    const [loaded, setLoaded] = React.useState(false)
    const { selected, injuries, setInjuries } = props

    React.useEffect(() => {
        if (loaded) {
            const ctx = drawing.current.getContext('2d')
            ctx.clearRect(0, 0, drawing.current.width, drawing.current.width)
            for (let dot of injuries) {
                ctx.strokeStyle = "royalblue"
                let size = 4
                if (dot.x === selected.x && dot.y === selected.y) {
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
    }, [injuries, loaded, selected])

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

    // drawing stuff
    function getCursorPosition(event) {
        let rect = drawing.current.getBoundingClientRect()
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }
    function handleClick(event) {
        let pos = getCursorPosition(event)
        setInjuries([...injuries, { ...pos, title: "" }])
    }

    return (
        <Box sx={{ position: "relative" }} ref={container}>
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
                onClick={handleClick}
            />
        </Box>

    )

}

function InjuryCard(props) {

    const {
        setSelected,
        setLocked,
        locked,
        injuryTitles,
        setInjuryTitles,
        index
    } = props
    
    const [tmpTitle, setTmpTitle] = React.useState(injuryTitles[index])

    React.useEffect(() => {
        setTmpTitle(injuryTitles[index])
    }, [injuryTitles, index])

    function handleFocus() {
        setSelected({
            x: props.x,
            y: props.y
        })
        setLocked(true)
    }

    function handleBlur() {
        setSelected({})
        setLocked(false)
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

    function handleChange(event) {
        setInjuryTitles({...injuryTitles, [index]: event.target.value})
    }

    return (
        <Card>
            <CardActionArea
                onMouseOver={handeMouseEnter}
                onMouseOut={handleMouseOut}
            >
                <CardContent>
                    <Stack spacing={1} sx={{ marginTop: 1 }}>
                        <TextField
                            value={tmpTitle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

function InjuryCards(props) {

    const { injuries, injuryTitles, setInjuryTitles } = props

    return (
        <Stack spacing={1} >
            {injuries.map((injury, index) => (<InjuryCard index={index} injuryTitles={injuryTitles} setInjuryTitles={setInjuryTitles} key={index} {...injury} {...props} />))}
        </Stack>
    )

}

function InjurySection(props) {

    const {
        injuries,
        setInjuries,
        injuryTitles,
        setInjuryTitles
    } = props

    const [selected, setSelected] = React.useState({})
    const [locked, setLocked] = React.useState(false)

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={7}>
                <InjuryImage
                    injuries={injuries}
                    setInjuries={setInjuries}
                    selected={selected}
                />
            </Grid>
            <Grid item xs={12} sm={4} md={5} sx={{ height: 360, overflow: "hidden", overflowY: "scroll" }}>
                <InjuryCards
                    injuries={injuries}
                    locked={locked}
                    setLocked={setLocked}
                    setSelected={setSelected}
                    injuryTitles={injuryTitles}
                    setInjuryTitles={setInjuryTitles}
                />
            </Grid>
        </Grid>
    )
}

export default InjurySection