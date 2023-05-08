  import { showgalleryDataInForm } from './galleryinfo.js';
  import { initMap} from './map.js';
  import { downloadgalleries } from './position.js';

const toggleGridColorButton = document.getElementById('savebutton');
const toggleLanesButton = document.getElementById('lanes');
const cleanButton = document.getElementById('clean');
let baseMap = initMap();
window.baseMap=baseMap;


function updateselectedgalleryPositionOn(gallery) {
  baseMap.selectedLayer.clearLayers();
  baseMap.selectedLayer.addData(gallery);
  baseMap.fitBounds(baseMap.selectedLayer.getBounds());
}

function ongalleriesLoadSuccess(data) {
    baseMap.galleryLayer.addData(data);
    baseMap.riskScoreLayer.addData(data);
    
  }

function toggleGridColorVisibility() {
    if (baseMap.hasLayer(baseMap.riskScoreLayer)) {
      baseMap.removeLayer(baseMap.riskScoreLayer);
      baseMap.addLayer(baseMap.galleryLayer);
    } else {
      baseMap.removeLayer(baseMap.galleryLayer);
      baseMap.addLayer(baseMap.riskScoreLayer);
    }
    const legendEl = document.getElementById('legend');
    legendEl.classList.toggle('visible');
  }
// `ongallerySelected` will be called if and when the user clicks on a gallery on the
// map.
function ongallerySelected(evt) {
    const gallery = evt.layer.feature;
    showgalleryDataInForm(gallery);
  }

function toggleLanesVisibility() {
  if (baseMap.hasLayer(baseMap.laneLayer)) {
    baseMap.removeLayer(baseMap.laneLayer);
  } else {
    baseMap.addLayer(baseMap.laneLayer);
  }
}

function cleanResearchLayer() {
  baseMap.researchLayer.clearLayers();
  baseMap.removeLayer(baseMap.riskScoreLayer); // 移除 riskScoreLayer
  if (!baseMap.hasLayer(baseMap.galleryLayer)) { // 如果 galleryLayer 不在地图上，将其添加到地图上
    baseMap.addLayer(baseMap.galleryLayer);
  }
  baseMap.galleryLayer.resetStyle(); // 重置 galleryLayer 的样式
}

  function setupInteractionEvents() {
    baseMap.galleryLayer.addEventListener('click', ongallerySelected);
    toggleGridColorButton.addEventListener('click', toggleGridColorVisibility);
    toggleLanesButton.addEventListener('click', toggleLanesVisibility);
    cleanButton.addEventListener('click', cleanResearchLayer);

  }


  downloadgalleries(ongalleriesLoadSuccess);
  setupInteractionEvents();

  export{
    updateselectedgalleryPositionOn,
  };