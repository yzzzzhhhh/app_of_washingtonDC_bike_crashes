async function downloadgalleries(onSuccess, onFailure) {
  const resp = await fetch('data/fishnet_full.geojson');
  if (resp.status === 200) {
    const data = await resp.json();
    if (onSuccess) { onSuccess(data) }
  } else {
    alert('Oh no, I failed to download the data.');
    if (onFailure) { onFailure() }
  }
}


import {displayFilteredFishnetData} from './map.js';
const galleryInput = document.querySelector('#researchbox');
const galleryButton = document.querySelector('#researchbutton');
let gallerydata;

async function fetchGalleryData() {
  let response = await fetch('data/fishnet_full.geojson');
  gallerydata = await response.json();
}

fetchGalleryData();

export function searchForPredictionGroup(group) {
  const filteredFeatures = gallerydata.features.filter(
    feature => feature.properties.Prediction_Group.toLowerCase() === group.toLowerCase()
  );
  return {
    type: 'FeatureCollection',
    features: filteredFeatures,
  };
}

galleryButton.addEventListener("click", () => {
    const filterValue = galleryInput.value.trim();
    if (filterValue === 'Low' || filterValue === 'Medium' || filterValue === 'High') {
      const filteredData = searchForPredictionGroup(filterValue);
      const getColor = value => {
        switch (value.toLowerCase()) {
          case 'Low':
            return '#d1e0ff';
          case 'Medium':
            return '#947E93';
          case 'High':
            return '#561C26';
          default:
            return '#31572c';
        }
      };
      // 将 displayFilteredFishnetData() 函数从 map.js 文件导入到 main.js 文件中
      displayFilteredFishnetData(baseMap, filteredData, getColor(filterValue));
    } else {
      alert('Please enter a valid value: Low, Medium, or High');
    }
  });


export {
  downloadgalleries,
};