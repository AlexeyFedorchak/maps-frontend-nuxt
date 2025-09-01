import { ref } from 'vue'
import type { Location, Design, Layout, ColorScheme } from '../types'

export interface MapExportOptions {
  location: Location
  design: Design
  layout: Layout
  colorScheme?: ColorScheme
  format?: 'html' | 'pdf' | 'png'
}

export interface UseMapExportReturn {
  isExporting: Ref<boolean>
  exportError: Ref<string | null>
  exportMap: (options: MapExportOptions) => Promise<void>
  getStaticMapUrl: (options: MapExportOptions) => string
}

export function useMapExport(): UseMapExportReturn {
  const isExporting = ref(false)
  const exportError = ref<string | null>(null)

  const DESIGN_TO_STYLE_MAPPING: Record<number, string> = {
    1: 'picturethestars/cla9hyw9400x615mgdh6maidi',
    2: 'picturethestars/cla9hyyxo000214ny7xj3vejr',
    3: 'picturethestars/cla9hz69s003t14saymfoel6l',
    4: 'picturethestars/cla9hz4fg006515qwu1z4kjh9',
    5: 'picturethestars/cla9hz0z000x715mgxs7g6m7d',
    6: 'picturethestars/cla9hz2si000r14ohss4vu28q',
    7: 'mapbox/light-v11',
    8: 'mapbox/satellite-streets-v12',
    9: 'mapbox/streets-v12',
    10: 'mapbox/outdoors-v12',
    11: 'mapbox/light-v11',
    12: 'mapbox/light-v11'
  }

  const LAYOUT_TO_SIZE_MAPPING: Record<number, string> = {
    1: '800x1000',
    2: '800x800',
    3: '1000x600',
    4: '800x1200'
  }

  function getStaticMapUrl(options: MapExportOptions): string {
    const { location, design, layout } = options
    
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN
    if (!mapboxToken) {
      throw new Error('Mapbox token not found')
    }

    const styleId = DESIGN_TO_STYLE_MAPPING[design.id] || 'picturethestars/cla9hyw9400x615mgdh6maidi'
    const size = LAYOUT_TO_SIZE_MAPPING[layout.id] || '800x1000'
    
    const [lng, lat] = location.coords
    const coordsString = `${lng},${lat}`
    
    return `https://api.mapbox.com/styles/v1/${styleId}/static/${coordsString},${location.zoom}/${size}@2x?access_token=${mapboxToken}`
  }

  function createDownloadHTML(options: MapExportOptions, mapImageUrl: string): string {
    const { location, design, layout, colorScheme } = options
    
    const [lng, lat] = location.coords
    const ns = lat >= 0 ? 'N' : 'S'
    const ew = lng >= 0 ? 'E' : 'W'
    const coordsText = `${Math.abs(lat).toFixed(3)}°${ns} ${Math.abs(lng).toFixed(3)}°${ew}`

    let containerStyle = ''
    let imageStyle = ''

    switch(layout.id) {
      case 2:
        containerStyle = 'width: 500px; height: 500px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center;'
        imageStyle = 'width: 440px; height: 440px; border-radius: 50%; object-fit: cover;'
        break
      case 3:
        containerStyle = 'width: 700px; height: 450px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); position: relative;'
        imageStyle = 'width: 100%; height: 390px; object-fit: cover; border-radius: 8px;'
        break
      case 4:
        containerStyle = 'width: 500px; height: 700px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);'
        imageStyle = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;'
        break
      default:
        containerStyle = 'width: 500px; height: 650px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column;'
        imageStyle = 'width: 100%; height: 580px; object-fit: cover; border-radius: 8px;'
    }

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${location.name} - Custom Map</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            font-family: 'Lato', 'Inter', Arial, sans-serif;
            text-align: center;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #222;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
        .logo span {
            color: #6c7a89;
        }
        .location-title {
            font-size: 28px;
            font-weight: bold;
            margin: 20px 0 5px 0;
            color: #333;
        }
        .coordinates {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }
        .map-container {
            ${containerStyle}
        }
        .map-image {
            ${imageStyle}
        }
        .map-details {
            ${layout.id === 2 ? 'margin-top: 15px; text-align: center;' : 
              layout.id === 3 ? 'position: absolute; bottom: 10px; left: 20px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 4px;' : 
              layout.id === 4 ? 'display: none;' : 
              'margin-top: 10px; display: flex; justify-content: space-between; align-items: center;'}
        }
        .map-title {
            font-size: ${layout.id === 1 ? '12px' : '10px'};
            font-weight: 600;
            color: #333;
        }
        .map-coordinates {
            font-size: ${layout.id === 1 ? '11px' : '9px'};
            color: #666;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">MADE<span>PRINTS</span></div>
        <div class="location-title">${location.name}</div>
        <div class="coordinates">${coordsText}</div>

        <div class="map-container">
            <img src="${mapImageUrl}" alt="Map of ${location.name}" class="map-image">
            ${layout.id !== 4 ? `
            <div class="map-details">
                <div class="map-title">${location.name}</div>
                <div class="map-coordinates">${coordsText}</div>
            </div>
            ` : ''}
        </div>

        <div class="footer">
            Generated by Made Prints • Design: ${design.name}${colorScheme ? ` • Colors: ${colorScheme.name}` : ''}
        </div>
    </div>
</body>
</html>`
  }

  async function exportMap(options: MapExportOptions): Promise<void> {
    isExporting.value = true
    exportError.value = null

    try {
      const { location, design, layout, colorScheme, format = 'html' } = options

      if (format === 'html') {
        const mapImageUrl = getStaticMapUrl(options)
        
        const downloadHtml = createDownloadHTML(options, mapImageUrl)
        
        const blob = new Blob([downloadHtml], { type: 'text/html' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        
        a.style.display = 'none'
        a.href = url
        
        const safeLocationName = location.name.replace(/[^a-zA-Z0-9]/g, '_')
        a.download = `${safeLocationName}_${design.name}${colorScheme ? `_${colorScheme.name}` : ''}_map.html`
        
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        console.log('Map exported successfully')
      } else {
        throw new Error(`Format ${format} not yet implemented`)
      }
      
    } catch (error) {
      exportError.value = error instanceof Error ? error.message : 'Export failed'
      console.error('Export error:', error)
      throw error
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting,
    exportError,
    exportMap,
    getStaticMapUrl
  }
}
