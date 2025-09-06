export const CELESTIAL_SETTINGS = {
    disableAnimations: true,
    width: canvasWidth,
    realisticStars: true,
    projection: "azimuthalEquidistant",
    transform: "equatorial",
    center: [-0.133619, 11.753, 0],
    geopos: [11.753, -0.133619],
    orientationfixed: false,
    background: {
        fill: "transparent",
        stroke: textColour,
        opacity: 1,
        width: mapBorder
    },
    adaptable: false,
    interactive: false,
    form: false,
    location: true,
    controls: false,
    lang: "",
    container: "starmap",
    datapath: window.celestial_data,
    stars: {
        show: true,
        limit: starsToShow,
        colors: false,
        style: {
            fill: starColour,
            opacity: 1
        },
        names: false,
        proper: false,
        desig: false,
        namelimit: 6.5,
        namestyle: {
            fill: "#ddddbb",
            font: "11px Georgia, Times, 'Times Roman', serif",
            align: "left",
            baseline: "top"
        },
        propernamestyle: {
            fill: "#ddddbb",
            font: "11px Georgia, Times, 'Times Roman', serif",
            align: "right",
            baseline: "bottom"
        },
        propernamelimit: 6,
        size: 4 * 8,
        exponent: -.28,
        data: "stars.14.json"
    },
    dsos: {
        show: false,
        limit: 6,
        names: false,
        desig: false,
        namelimit: 4,
        namestyle: {
            fill: "#cccccc",
            font: "11px Helvetica, Arial, serif",
            align: "left",
            baseline: "top"
        },
        size: null,
        exponent: 1.4,
        data: "dsos.bright.json",
        symbols: {
            gg: {
                shape: "circle",
                fill: "#ff0000"
            },
            g: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            s: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            s0: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            sd: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            e: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            i: {
                shape: "ellipse",
                fill: "#ff0000"
            },
            oc: {
                shape: "circle",
                fill: "#ffcc00",
                stroke: "#ffcc00",
                width: 1.5
            },
            gc: {
                shape: "circle",
                fill: "#ff9900"
            },
            en: {
                shape: "square",
                fill: "#ff00cc"
            },
            bn: {
                shape: "square",
                fill: "#ff00cc",
                stroke: "#ff00cc",
                width: 2
            },
            sfr: {
                shape: "square",
                fill: "#cc00ff",
                stroke: "#cc00ff",
                width: 2
            },
            rn: {
                shape: "square",
                fill: "#00ooff"
            },
            pn: {
                shape: "diamond",
                fill: "#00cccc"
            },
            snr: {
                shape: "diamond",
                fill: "#ff00cc"
            },
            dn: {
                shape: "square",
                fill: "#999999",
                stroke: "#999999",
                width: 2
            },
            pos: {
                shape: "marker",
                fill: "#cccccc",
                stroke: "#cccccc",
                width: 1.5
            }
        }
    },
    constellations: {
        show: showConstellations,
        names: false,
        desig: false,
        namestyle: {
            fill: "#cccc99",
            align: "center",
            baseline: "middle",
            opacity: .8,
            font: ["bold 14px Helvetica, Arial, sans-serif", "bold 12px Helvetica, Arial, sans-serif", "bold 11px Helvetica, Arial, sans-serif"]
        },
        lines: showConstellations,
        linestyle: {
            stroke: "#cccccc",
            width: 8,
            opacity: .6
        },
        bounds: false,
        boundstyle: {
            stroke: "#cccc00",
            width: 2,
            opacity: .8,
            dash: [2, 4]
        }
    },
    lines: {
        graticule: {
            show: showGrids,
            stroke: "#cccccc",
            width: .6 * 8,
            opacity: .8,
            lon: {
                pos: ["left"],
                fill: "#eee",
                font: "18px Helvetica, Arial, sans-serif"
            },
            lat: {
                pos: ["left"],
                fill: "#eee",
                font: "10px Helvetica, Arial, sans-serif"
            }
        },
        equatorial: {
            show: false,
            stroke: "#aaaaaa",
            width: 1.3,
            opacity: .7
        },
        ecliptic: {
            show: false,
            stroke: "#66cc66",
            width: 1.3,
            opacity: .7
        },
        galactic: {
            show: false,
            stroke: "#cc6666",
            width: 1.3,
            opacity: .7
        },
        supergalactic: {
            show: false,
            stroke: "#cc66cc",
            width: 1.3,
            opacity: .7
        }
    },
    planets: {
        show: showMoon,
        names: false
    },
    mw: {
        show: false
    }
}