<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{ width?: number; datapath?: string; options?: any }>()
onMounted(() => {
  const { $celestial } = useNuxtApp()
  const Celestial = $celestial || (window as any).Celestial
  if (!Celestial) return console.error('Celestial not loaded')

  Celestial.display({
    "width": 1000,
    "projection": "azimuthalEquidistant",
    "projectionRatio": null,
    "transform": "equatorial",
    "center": [
      100.77156789368019,
      41.507,
      0
    ],
    "geopos": [
      41.507,
      -0.128
    ],
    "follow": "zenith",
    "orientationfixed": false,
    "zoomlevel": null,
    "zoomextend": 10,
    "adaptable": true,
    "interactive": false,
    "disableAnimations": true,
    "form": false,
    "realisticStars": false,
    "glowingStars": false,
    "hideBottomStars": false,
    "location": true,
    "formFields": {
      "location": true,
      "general": true,
      "stars": true,
      "dsos": true,
      "constellations": true,
      "lines": true,
      "other": true,
      "download": false
    },
    "advanced": true,
    "daterange": [],
    "settimezone": true,
    "timezoneid": "AEFXZPQ3FDPF",
    "controls": false,
    "lang": "",
    "culture": "iau",
    "container": "starmap-canvas",
    "datapath": "/data/",
    "stars": {
      "show": true,
      "limit": 6.5,
      "colors": false,
      "style": {
        "fill": "#FFFFFF",
        "opacity": 1
      },
      "designation": false,
      "designationType": "desig",
      "designationStyle": {
        "fill": "#ddddbb",
        "font": "11px Georgia, Times, 'Times Roman', serif",
        "align": "left",
        "baseline": "top"
      },
      "designationLimit": 6.5,
      "propername": false,
      "propernameType": "name",
      "propernameStyle": {
        "fill": "#ddddbb",
        "font": "11px Georgia, Times, 'Times Roman', serif",
        "align": "right",
        "baseline": "bottom"
      },
      "propernameLimit": 6,
      "size": 12,
      "exponent": -0.26,
      "data": "stars.57.json"
    },
    "dsos": {
      "show": false,
      "limit": 6,
      "colors": true,
      "style": {
        "fill": "#cccccc",
        "stroke": "#cccccc",
        "width": 2,
        "opacity": 1
      },
      "names": false,
      "namesType": "desig",
      "nameStyle": {
        "fill": "#cccccc",
        "font": "11px Helvetica, Arial, serif",
        "align": "left",
        "baseline": "top"
      },
      "nameLimit": 4,
      "size": null,
      "exponent": 1.4,
      "data": "dsos.bright.json",
      "symbols": {
        "gg": {
          "shape": "circle",
          "fill": "#ff0000"
        },
        "g": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "s": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "s0": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "sd": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "e": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "i": {
          "shape": "ellipse",
          "fill": "#ff0000"
        },
        "oc": {
          "shape": "circle",
          "fill": "#ffcc00",
          "stroke": "#ffcc00",
          "width": 1.5
        },
        "gc": {
          "shape": "circle",
          "fill": "#ff9900"
        },
        "en": {
          "shape": "square",
          "fill": "#ff00cc"
        },
        "bn": {
          "shape": "square",
          "fill": "#ff00cc",
          "stroke": "#ff00cc",
          "width": 2
        },
        "sfr": {
          "shape": "square",
          "fill": "#cc00ff",
          "stroke": "#cc00ff",
          "width": 2
        },
        "rn": {
          "shape": "square",
          "fill": "#00ooff"
        },
        "pn": {
          "shape": "diamond",
          "fill": "#00cccc"
        },
        "snr": {
          "shape": "diamond",
          "fill": "#ff00cc"
        },
        "dn": {
          "shape": "square",
          "fill": "#999999",
          "stroke": "#999999",
          "width": 2
        },
        "pos": {
          "shape": "marker",
          "fill": "#cccccc",
          "stroke": "#cccccc",
          "width": 1.5
        }
      }
    },
    "constellations": {
      "show": false,
      "names": false,
      "namesType": "desig",
      "nameStyle": {
        "fill": [
          "#cccc99",
          "#cccc99",
          "#cccc99"
        ],
        "align": "center",
        "baseline": "middle",
        "opacity": [
          0.8,
          0.8,
          0.8
        ],
        "font": [
          "bold 14px Helvetica, Arial, sans-serif",
          "bold 12px Helvetica, Arial, sans-serif",
          "bold 11px Helvetica, Arial, sans-serif"
        ]
      },
      "lines": false,
      "lineStyle": {
        "stroke": [
          "#cccccc",
          "#cccccc",
          "#cccccc"
        ],
        "width": [
          4,
          4,
          4
        ],
        "opacity": [
          0.65,
          0.65,
          0.65
        ]
      },
      "bounds": false,
      "boundStyle": {
        "stroke": "#cccc00",
        "width": 3,
        "opacity": 0.65,
        "dash": [
          2,
          4
        ]
      }
    },
    "mw": {
      "show": false,
      "style": {
        "fill": "#ffffff",
        "opacity": "0.15"
      }
    },
    "lines": {
      "graticule": {
        "show": false,
        "stroke": "#cccccc",
        "width": 3,
        "opacity": 0.45,
        "lon": {
          "pos": [
            "left"
          ],
          "fill": "#eee",
          "font": "18px Helvetica, Arial, sans-serif"
        },
        "lat": {
          "pos": [
            "left"
          ],
          "fill": "#eee",
          "font": "10px Helvetica, Arial, sans-serif"
        }
      },
      "equatorial": {
        "show": false,
        "stroke": "#aaaaaa",
        "width": 1.3,
        "opacity": 0.7
      },
      "ecliptic": {
        "show": false,
        "stroke": "#66cc66",
        "width": 1.3,
        "opacity": 0.7
      },
      "galactic": {
        "show": false,
        "stroke": "#cc6666",
        "width": 1.3,
        "opacity": 0.7
      },
      "supergalactic": {
        "show": false,
        "stroke": "#cc66cc",
        "width": 1.3,
        "opacity": 0.7
      }
    },
    "background": {
      "fill": "transparent",
      "opacity": 1,
      "stroke": "#FFFFFF",
      "width": 1.3311466666666667
    },
    "horizon": {
      "show": false,
      "stroke": "#cccccc",
      "width": 1,
      "fill": "#000000",
      "opacity": 0.4
    },
    "daylight": {
      "show": false
    },
    "planets": {
      "show": false,
      "which": [
        "sol",
        "mer",
        "ven",
        "ter",
        "lun",
        "mar",
        "jup",
        "sat",
        "ura",
        "nep",
        "cer",
        "plu"
      ],
      "symbols": {
        "sol": {
          "symbol": "☉",
          "letter": "Su",
          "fill": "#ffff00",
          "size": 12
        },
        "mer": {
          "symbol": "☿",
          "letter": "Me",
          "fill": "#cccccc"
        },
        "ven": {
          "symbol": "♀",
          "letter": "V",
          "fill": "#eeeecc"
        },
        "ter": {
          "symbol": "⊕",
          "letter": "T",
          "fill": "#00ccff"
        },
        "lun": {
          "symbol": "●",
          "letter": "L",
          "fill": "#ffffff",
          "size": 12
        },
        "mar": {
          "symbol": "♂",
          "letter": "Ma",
          "fill": "#ff6600"
        },
        "cer": {
          "symbol": "⚳",
          "letter": "C",
          "fill": "#cccccc"
        },
        "ves": {
          "symbol": "⚶",
          "letter": "Ma",
          "fill": "#cccccc"
        },
        "jup": {
          "symbol": "♃",
          "letter": "J",
          "fill": "#ffaa33"
        },
        "sat": {
          "symbol": "♄",
          "letter": "Sa",
          "fill": "#ffdd66"
        },
        "ura": {
          "symbol": "♅",
          "letter": "U",
          "fill": "#66ccff"
        },
        "nep": {
          "symbol": "♆",
          "letter": "N",
          "fill": "#6666ff"
        },
        "plu": {
          "symbol": "♇",
          "letter": "P",
          "fill": "#aaaaaa"
        },
        "eri": {
          "symbol": "⚪",
          "letter": "E",
          "fill": "#eeeeee"
        }
      },
      "symbolStyle": {
        "fill": "#cccccc",
        "opacity": 1,
        "font": "bold 20px 'DejaVu Sans Mono', 'Arial Unicode MS', sans-serif",
        "align": "center",
        "baseline": "middle"
      },
      "symbolType": "symbol",
      "names": false,
      "nameStyle": {
        "fill": "#cccccc",
        "font": "14px 'Lucida Sans Unicode', 'DejaVu Sans', sans-serif",
        "align": "right",
        "baseline": "top"
      },
      "namesType": "en"
    }
  })
})
</script>

<template>
  <div class="starmap-container">
    <div id="starmap-canvas" style="width:100%;aspect-ratio:1/1;"></div>
  </div>
</template>

<style>
#celestial-form {
  display: none !important;
}
</style>
