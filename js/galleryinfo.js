const galleryEl = document.getElementById('info');

function showgalleryDataInForm(gallery) {

    const Age = gallery.properties['Med_Age'];
    const roundedAge= Age.toFixed(2);
    const Walking_to_work = gallery.properties['walk_to_work'];
    const roundedWalking = Math.round(Walking_to_work);
    const displayWalking = roundedWalking + 'ppl';
    const Percentage_of_Car_Commuters = gallery.properties['Percent_Taking_car_Trans'];
    const roundedPercentage = (Percentage_of_Car_Commuters * 100).toFixed(2);
    const displayPercentage = roundedPercentage + '%';
    const Number_of_Traffic_Signals = gallery.properties['signal_count'];
    const Speed = gallery.properties['speed'];
    const roundedSpeed = Speed.toFixed(2);
    const displaySpeed = roundedSpeed + 'mph';
    const Presence_of_Bike_Lanes = gallery.properties['has_bike_lanes'];
    const Travel_Lanes = gallery.properties['travel_lane_width'];
    const roundedTravel = Travel_Lanes.toFixed(2);
    const displayTravel = roundedTravel + 'feet';
    
    const Risk = gallery.properties['Prediction_Group'];
    galleryEl.innerHTML = 'Prediction Bike Crashes Risk: '+Risk;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Median Age: '+ roundedAge;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Walking to Work: '+ displayWalking;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Percentage of Car Commuters: '+displayPercentage;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Number of Traffic Signals: '+Number_of_Traffic_Signals;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Average Speed: '+displaySpeed;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Presence of Bike Lanes: '+Presence_of_Bike_Lanes;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'Travel Lanes Width: '+displayTravel;
    galleryEl.innerHTML += '<br></br>';

}
  export {
    showgalleryDataInForm,
  };