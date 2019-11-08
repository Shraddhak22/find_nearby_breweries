var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.36, lng: -71.057 },
    zoom: 5
  });
}
window.onload = () => {
  const searchElement = document.querySelector("[data-city-search]");
  // const searchBox = new google.maps.places.SearchBox(searchElement);
  var options = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" }
  };

  var autocomplete = new google.maps.places.Autocomplete(
    searchElement,
    options
  );
  google.maps.event.addListener(autocomplete, "place_changed", () => {
    const place = autocomplete.getPlace().address_components[2].long_name;
    if (place == null) return;
    console.log(place);
    fetch("/openbreweries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "apllication/json"
      },
      body: JSON.stringify({
        state: place
      })
    })
      .then(res => res.json())
      .then(data => {
        debugger;
        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        var icon = {
          url: "./images/beer_bottle.jpg", // url
          scaledSize: new google.maps.Size(20, 30) // size
        };

        for (i = 0; i < data.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(
              data[i].latitude,
              data[i].longitude
            ),
            icon: icon,
            map: map
          });

          google.maps.event.addListener(
            marker,
            "mouseover",
            (function(marker, i) {
              return function() {
                infowindow.setContent(data[i].name);
                infowindow.open(map, marker);
              };
            })(marker, i)
          );

          google.maps.event.addListener(
            marker,
            "click",
            (function(marker, i) {
              return function() {
                window.open(data[i].website_url);
              };
            })(marker, i)
          );
        }
      });
  });
};
