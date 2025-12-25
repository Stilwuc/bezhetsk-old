const startCenter = [36.695, 57.785]; 
const startZoom = 14;

// --- СЛОЙ 1 (СЛЕВА / BEFORE) ---
const source1Url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const source3Url = 'https://bezhetsk.maindp.ru/geoserver/geoserver/invest_portal/gwc/service/wmts?layer=invest_portal%3Abezhetsk_new_clip&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}';

const beforeMap = new maplibregl.Map({
    container: 'before',
    style: {
        version: 8,
        sources: {
            'raster-source-1': {
                type: 'raster',
                tiles: [source1Url],
                tileSize: 256
            },
            'raster-source-3': {
                type: 'raster',
                tiles: [source3Url],
                tileSize: 256
            }
        },
        layers: [
            {
                id: 'raster-layer-1',
                type: 'raster',
                source: 'raster-source-1',
                paint: {}
            },
            {
                id: 'raster-layer-3',
                type: 'raster',
                source: 'raster-source-3',
                paint: {}
            }
        ]
    },
    center: startCenter,
    zoom: startZoom,
    attributionControl: false // Отключаем дефолтный
});

beforeMap.addControl(new maplibregl.AttributionControl({
    customAttribution: '<a href="https://www.esri.com/ru-ru/arcgis/products/data-location-services/data/basemaps-imagery" target="_blank">© ESRI</a> | <a href="https://portal.fppd.cgkipd.ru/main" target="_blank">© Роскадастр</a> | <a href="https://maplibre.org/" target="_blank">MapLibre</a>',
    compact: true // <--- Всегда показывать как кнопку "i"
}), 'bottom-right');



// --- СЛОЙ 2 (СПРАВА / AFTER) ---
const source2Url = 'https://bezhetsk.maindp.ru/geoserver/geoserver/invest_portal/gwc/service/wmts?layer=invest_portal%3AGX1135_SG&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}';

const afterMap = new maplibregl.Map({
    container: 'after',
    style: {
        version: 8,
        sources: {
            'raster-source-2': {
                type: 'raster',
                tiles: [source2Url],
                tileSize: 256,

            }
        },
        layers: [
            {
                id: 'raster-layer-2',
                type: 'raster',
                source: 'raster-source-2',
                paint: {}
            }
        ]
    },
    center: startCenter,
    zoom: startZoom,
    attributionControl: false // Отключаем дефолтный
});

afterMap.addControl(new maplibregl.AttributionControl({
    customAttribution: '<a href="https://www.esri.com/ru-ru/arcgis/products/data-location-services/data/basemaps-imagery" target="_blank">© ESRI</a> | <a href="https://portal.fppd.cgkipd.ru/main" target="_blank">© Роскадастр</a> | <a href="https://maplibre.org/" target="_blank">MapLibre</a>',
    compact: true // <--- Всегда показывать как кнопку "i"
}), 'bottom-right');

// Запуск сравнения
const container = '#comparison-container';
const map = new maplibregl.Compare(beforeMap, afterMap, container, {});
