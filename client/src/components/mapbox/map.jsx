import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import "./map.css";
const Map = ({ tour }) => {
  //   console.log(tour.locations);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicWlhbmppbmduaW5nIiwiYSI6ImNsbGIwb2J0ZDAyY24zcG1pdWxhbTZzcnoifQ.Zyhdn6IM9W7GlzD_EK15LA";

    // const geojson = {
    //   type: "FeatureCollection",
    //   features: tour.locations.map((location) => {
    //     return {
    //       type: "Feature",
    //       geometry: {
    //         type: location.type,
    //         coordinates: location.coordinates,
    //       },
    //       properties: {
    //         description: location.description,
    //       },
    //     };
    //   }),
    // };
    // console.log(geojson);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      scrollZoom: false,
    });
    const bounds = new mapboxgl.LngLatBounds();

    tour.locations.forEach(function (loc) {
      //   console.log(loc);
      var el = document.createElement("div");
      el.className = "marker";

      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      new mapboxgl.Popup({
        offset: 30,
        closeOnClick: false,
      })
        .setLngLat(loc.coordinates)
        .setHTML("<p>" + "day " + loc.day + ":" + loc.description + "</p>")
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 50,
        right: 50,
      },
    });
    map.on("load", function () {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: tour.locations.map((location) => {
                return location.coordinates;
              }),
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#55c57a",
          "line-opacity": 0.6,
          "line-width": 3,
        },
      });
    });
  }, []);
  return (
    <>
      <head>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <div id="map" />
    </>
  );
};

export default Map;
