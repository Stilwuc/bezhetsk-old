// Координаты (Бежецк)
const startCenter = [36.695, 57.785]; 
const startZoom = 14;

// --- СЛОЙ 1 (СЛЕВА / BEFORE) ---
// Тот самый NGW слой (ЦОФП ЕЭКО)
const source1Url = 'https://ngw.fppd.cgkipd.ru/tile/39/{z}/{x}/{y}.png';

const beforeMap = new maplibregl.Map({
    container: 'before',
    style: {
        version: 8,
        sources: {
            'raster-source-1': {
                type: 'raster',
                tiles: [source1Url],
                tileSize: 256,
                // ВАЖНО: Атрибуция для конкретного слоя
                attribution: '© ЦОФП ЕЭКО Роскадастр'
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
    zoom: startZoom,
    // Добавляем общую атрибуцию MapLibre (хотя библиотека обычно добавляет логотип, текст надежнее)
    customAttribution: '<a href="https://maplibre.org/" target="_blank">MapLibre</a>'
});

// --- СЛОЙ 2 (СПРАВА / AFTER) ---
// GeoServer (или прокси)
const source2Url = 'https://geoserver.maindp.ru/geoserver/invest_portal/gwc/service/wmts?layer=invest_portal%3AGX1135_SG&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}'; // Вставьте вашу ссылку

const afterMap = new maplibregl.Map({
    container: 'after',
    style: {
        version: 8,
        sources: {
            'raster-source-2': {
                type: 'raster',
                tiles: [source2Url],
                tileSize: 256,
                // Атрибуция для второго слоя (опционально)
                attribution: 'Аэрофотоснимок 1944 г.'
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
    // Чтобы не дублировать "MapLibre" дважды, здесь можно оставить пустым или продублировать
    customAttribution: '<a href="https://maplibre.org/" target="_blank">MapLibre</a>'
});

// Запуск сравнения
const container = '#comparison-container';
const map = new maplibregl.Compare(beforeMap, afterMap, container, {});