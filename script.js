const startCenter = [36.695, 57.785];
const startZoom = 14;

// Ссылка на шрифты
const glyphsUrl = 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf';

// --- СЛОЙ 1 (СЛЕВА / BEFORE) ---

// Подложка ESRI
const source1Url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Растровый слой (Новый снимок) - WMTS
const source3Url = 'https://bezhetsk.maindp.ru/geoserver/geoserver/invest_portal/gwc/service/wmts?layer=invest_portal%3Abezhetsk_new_clip&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}';

// КОНФИГУРАЦИЯ ИСТОЧНИКА ДОРОГ (Вектор)
const roadsSourceConfig = {
    type: 'vector',
    // ВАЖНО: Добавлено scheme: 'tms', так как вы используете TMS эндпоинт GeoServer
    scheme: 'tms', 
    tiles: [
        'https://bezhetsk.maindp.ru/geoserver/geoserver/gwc/service/tms/1.0.0/invest_portal:roads_v@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
    ],
    minzoom: 12,
    maxzoom: 21
};

// КОНФИГУРАЦИЯ СЛОЯ ОТОБРАЖЕНИЯ ДОРОГ
const roadsLayerConfig = {
    id: 'roads-labels', 
    type: 'symbol',        
    source: 'osm-roads', // <--- ИСПРАВЛЕНО: Должно совпадать с ключом в sources ниже!
    'source-layer': 'roads_v', // Убедитесь, что внутри PBF слой называется именно так
    layout: {
        'text-field': ['get', 'road_name'], 
        'text-font': ['Noto Sans Regular'], 
        'text-size': 12,
        'symbol-placement': 'line', 
        'text-max-angle': 30        
    },
    paint: {
        'text-color': '#ffffff',       
        'text-halo-color': '#000000',  
        'text-halo-width': 2           
    }
};

const beforeMap = new maplibregl.Map({
    container: 'before',
    style: {
        version: 8,
        glyphs: glyphsUrl, 
        sources: {
            // Источник 1: ESRI
            'raster-source-1': {
                type: 'raster',
                tiles: [source1Url],
                tileSize: 256
            },
            // Источник 2: Новый снимок (растр)
            'raster-source-3': {
                type: 'raster',
                tiles: [source3Url],
                tileSize: 256
            },
            // Источник 3: Дороги (вектор)
            'osm-roads': roadsSourceConfig 
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
            },
            // Слой дорог ПОВЕРХ растров
            roadsLayerConfig
        ]
    },
    center: startCenter,
    zoom: startZoom,
    attributionControl: false 
});

beforeMap.addControl(new maplibregl.AttributionControl({
    customAttribution: '<a href="https://www.esri.com/ru-ru/arcgis/products/data-location-services/data/basemaps-imagery" target="_blank">© ESRI</a> | <a href="https://portal.fppd.cgkipd.ru/main" target="_blank">© Роскадастр</a> | <a href="https://maplibre.org/" target="_blank">MapLibre</a>',
    compact: true 
}), 'bottom-right');


// --- СЛОЙ 2 (СПРАВА / AFTER) ---

// Старый снимок (WMTS)
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
    attributionControl: false 
});

afterMap.addControl(new maplibregl.AttributionControl({
    customAttribution: '<a href="https://www.esri.com/ru-ru/arcgis/products/data-location-services/data/basemaps-imagery" target="_blank">© ESRI</a> | <a href="https://portal.fppd.cgkipd.ru/main" target="_blank">© Роскадастр</a> | <a href="https://maplibre.org/" target="_blank">MapLibre</a>',
    compact: true 
}), 'bottom-right');

// Запуск сравнения
const container = '#comparison-container';
const map = new maplibregl.Compare(beforeMap, afterMap, container, {});
