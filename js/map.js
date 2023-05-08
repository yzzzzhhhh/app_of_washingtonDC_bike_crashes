let selectedLayer = null;
let map;

function initMap() {
map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([38.90791606413848, -77.04605959158252], 13);
const mapboxAccount = 'mapbox';
const mapboxStyle = 'light-v10';
const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: ' < a href=" ">Mapbox</ a>  < a href="http://www.openstreetmap.org/copyright">OpenStreetMap</ a> <strong>< a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</ a></strong>',
    }).addTo(map);
    map.galleryLayer = L.geoJSON(null, {
      style: {
        color: "#FCBCB4",
        stroke: true,
        opacity: 0.3,
        weight: 2,
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          click: (e) => {
            if (selectedLayer) {
              resetHighlight(selectedLayer);
            }
            highlightFeature(e);
            ongallerySelected(e);
            selectedLayer = e.target;
          },
        });
      },
    })
    .addTo(map);
    map.riskScoreLayer = L.geoJSON(null, {
      style: getPolygonStyle,
      onEachFeature: (feature, layer) => {
        layer.on({
          click: (e) => {
            if (selectedLayer) {
              resetHighlight(selectedLayer);
            }
            highlightFeature(e);
            ongallerySelected(e);
            selectedLayer = e.target;
          },
        });
      },
    });
    fetch('data/bicycle_lanes.geojson')
    .then(response => response.json())
    .then(data => {
      map.laneLayer = L.geoJSON(data, {
        style: {
          color: '#1E90FF',
          weight: 4,
          opacity: 0.6,
        },
      });
    })
    .catch(error => console.error('Error loading bicycle lanes:', error));
    map.researchLayer = L.geoJSON(null).addTo(map);
    return map;
}

function displayFilteredFishnetData(mapObj, data, color) {
  mapObj.researchLayer.clearLayers(); // 清除现有的 researchLayer 内容
  L.geoJSON(data, { // 使用现有的 researchLayer 更新数据和样式
    style: {
      fillColor: color,
      weight: 1,
      opacity: 0.8,
      color: 'white',
      fillOpacity: 0.7,
    },
    onEachFeature: (feature, layer) => {
      mapObj.researchLayer.addLayer(layer); // 将图层添加到现有的 researchLayer 中
    },
  });
  mapObj.galleryLayer.resetStyle();
  mapObj.riskScoreLayer.resetStyle();
}

function highlightFeature(e) {
  let layer = e.target;
  let Prediction_Group = layer.feature.properties.Prediction_Group;
  let fillColor;
  if (Prediction_Group === 'Low') {
    fillColor = "#d1e0ff";
  } else if (Prediction_Group === 'Medium') {
    fillColor = "#947E93";
  } else if (Prediction_Group === 'High') {
    fillColor = "#561C26";
  } else {
    fillColor = "#D9D9D9";
  }
  layer.setStyle({
    fillColor: fillColor,
    stroke: true,
    color: "#000000",
    opacity: 0.7,
    weight: 1,
    fillOpacity: 0.7,
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}


function resetHighlight(layer) {
  layer.setStyle({
    color: "#FCBCB4",
    stroke: true,
    opacity: 0.5,
    weight: 2,
  });
}

function ongallerySelected(e) {
  let layer = e.target;
  layer.setStyle({
    color: "#023047",
    stroke: true,
    opacity: 0.5,
    weight: 2,
  });
}

function getColorByRiskScore(score) {
  if (score === 'High') {
    return '#561C26';
  } else if (score === 'Medium') {
    return '#947E93';
  } else if (score === 'Low') {
    return '#d1e0ff';
  } else {
    return '#FF94B1';
  }
}

function getPolygonStyle(feature) {
  return {
    fillColor: getColorByRiskScore(feature.properties['Prediction_Group']),
    color: "#FF94B1",
    weight: 2,
    opacity: 0.2,
    fillOpacity: 0.5,
  };
}



export {
        initMap,displayFilteredFishnetData
      };
