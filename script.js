// Начальные координаты (подобраны приблизительно под регион из вашего примера)
// Вам может потребоваться уточнить center и zoom, чтобы увидеть данные сразу.
const startCenter = [36.692273, 57.781653]; // Пример: Москва (измените при необходимости)
const startZoom = 15;

// URL для Первой карты (NGW)
const source1Url = 'https://ngw.fppd.cgkipd.ru/tile/39/{z}/{x}/{y}.png';

// URL для Второй карты (GeoServer WMTS)
// Заменяем фиксированные значения на {z}, {x}, {y} для динамической подгрузки
const source2Url = 'http://localhost:8080/geoserver/site/gwc/service/wmts?layer=site:GX1135_SG_frame_15_18_2&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}';

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