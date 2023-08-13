import { useEffect } from "react";
import "./tourDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorCardIndex,
  selectorTours,
} from "../store/tours/tours.selector";
// import { url } from "inspector";
const TourDetails = () => {
  const cardIndex = useSelector(selectorCardIndex);
  const tours = useSelector(selectorTours);
  const tour = tours.data[cardIndex];
  // console.log(tour);
  const convertDateFormat = () => {
    const dateObject = new Date(tour.startDates[0]);
    const options = { year: "numeric", month: "short", timeZone: "UTC" };
    const formattedDate = dateObject.toLocaleString("en-AU", options);
    console.log(formattedDate);
    return formattedDate;
  };
  useEffect(() => {
    // const tour = tours[cardIndex];
  }, []);

  return (
    <>
      <section
        className="section-header"
        style={{
          backgroundImage: `url('/img/tours/${tour.imageCover}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>
              {`${tour.name.split(" ")[0]}${tour.name.split(" ")[1]}`} <br />
              {`${tour.name.split(" ")[2]}`}
            </span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.address}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">
                  {convertDateFormat()}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{tour.difficulty}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-user"></use>
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">{tour.maxGroupSize}</span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="img/icons.svg#icon-star"></use>
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">
                  {tour.ratingsAverage} / 5
                </span>
              </div>
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => {
                return (
                  <div className="overview-box__detail">
                    <img
                      src={`img/users/${guide.photo}`}
                      alt={guide.role}
                      className="overview-box__img"
                    />
                    <span className="overview-box__label">{guide.role}</span>
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name}</h2>
          <p className="description__text">{tour.description.split("\n")[0]}</p>
          <p className="description__text">{tour.description.split("\n")[1]}</p>
        </div>
      </section>

      <section className="section-pictures">
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--1"
            src={`img/tours/${tour.images[0]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--2"
            src={`img/tours/${tour.images[1]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
        <div className="picture-box">
          <img
            className="picture-box__img picture-box__img--3"
            src={`img/tours/${tour.images[2]}`}
            alt="The Park Camper Tour 1"
          />
        </div>
      </section>

      <section className="section-map">
        <div id="map"></div>
        {/* <script>
          mapboxgl.accessToken =
            'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';
  
          const geojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-112.987418, 37.198125]
                },
                properties: {
                  description: 'Zion Canyon National Park'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-111.376161, 36.86438]
                },
                properties: {
                  description: 'Antelope Canyon'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-112.115763, 36.058973]
                },
                properties: {
                  description: 'Grand Canyon National Park'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-116.107963, 34.011646]
                },
                properties: {
                  description: 'Joshua Tree National Park'
                }
              }
            ]
          };
  
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h',
            scrollZoom: false
          });
  
          const bounds = new mapboxgl.LngLatBounds();
  
          geojson.features.forEach(function(marker) {
            var el = document.createElement('div');
            el.className = 'marker';
  
            new mapboxgl.Marker({
              element: el,
              anchor: 'bottom'
            })
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
  
            new mapboxgl.Popup({
              offset: 30,
              closeOnClick: false
            })
              .setLngLat(marker.geometry.coordinates)
              .setHTML('<p>' + marker.properties.description + '</p>')
              .addTo(map);
  
            bounds.extend(marker.geometry.coordinates);
          });
  
          map.fitBounds(bounds, {
            padding: {
              top: 200,
              bottom: 150,
              left: 50,
              right: 50
            }
          });
  
          map.on('load', function() {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [-112.987418, 37.198125],
                      [-111.376161, 36.86438],
                      [-112.115763, 36.058973],
                      [-116.107963, 34.011646]
                    ]
                  }
                }
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#55c57a',
                'line-opacity': 0.6,
                'line-width': 3
              }
            });
          });
        </script> */}
      </section>

      <section className="section-reviews">
        <div className="reviews">
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                src="img/users/user-7.jpg"
                alt="Jim Brown"
                className="reviews__avatar-img"
              />
              <h6 className="reviews__user">Jim Brown</h6>
            </div>
            <p className="reviews__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              dignissimos sint quo commodi corrupti accusantium veniam saepe
              numquam.
            </p>
            <div className="reviews__rating">
              <svg className="reviews__star reviews__star--active">
                <use href="img/icons.svg#icon-star"></use>
              </svg>
              <svg className="reviews__star reviews__star--active">
                <use href="img/icons.svg#icon-star"></use>
              </svg>
              <svg className="reviews__star reviews__star--active">
                <use href="img/icons.svg#icon-star"></use>
              </svg>
              <svg className="reviews__star reviews__star--active">
                <use href="img/icons.svg#icon-star"></use>
              </svg>
              <svg className="reviews__star reviews__star--active">
                <use href="img/icons.svg#icon-star"></use>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="img/logo-white.png" alt="Natours logo" className="" />
          </div>
          <img src="img/tour-5-2.jpg" alt="" className="cta__img cta__img--1" />
          <img src="img/tour-5-1.jpg" alt="" className="cta__img cta__img--2" />

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              10 days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            <button className="btn btn--green span-all-rows">
              Book tour now!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetails;
