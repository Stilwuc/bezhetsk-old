const startCenter = [36.692273, 57.781653];
const startZoom = 15;

// URL для Первой карты (NGW)
const source1Url = 'https://ngw.fppd.cgkipd.ru/tile/39/{z}/{x}/{y}.png';

// URL для Второй карты (GeoServer WMTS)
const source2Url = 'http://84.201.171.76:8081/geoserver/invest_portal/gwc/service/wmts?layer=invest_portal%3AGX1135_SG&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}';
                    
// Настройка карты "ДО" (Левая сторона)
const beforeMap = new maplibregl.Map({
    container: 'before',
    style: {
        version: 8,
        sources: {
            'raster-source-1': {
                type: 'raster',
                tiles: [source1Url],
                tileSize: 256
            }
        },
        layers: [
            {
                id: 'raster-layer-1',
                type: 'raster',
                source: 'raster-source-1',
                paint: {}
            }
        ]
    },
    center: startCenter,
    zoom: startZoom
});

// Настройка карты "ПОСЛЕ" (Правая сторона)
const afterMap = new maplibregl.Map({
    container: 'after',
    style: {
        version: 8,
        sources: {
            'raster-source-2': {
                type: 'raster',
                tiles: [source2Url],
                tileSize: 256
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
    zoom: startZoom
});

// Инициализация плагина сравнения
const container = '#comparison-container';
const map = new maplibregl.Compare(beforeMap, afterMap, container, {
    // Опции (можно оставить пустым)
    // mousemove: true // Если нужно перемещение слайдера при движении мыши
});