// import { React } from "react";

import { useMemo, useState, useEffect, useCallback } from "react";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";

const API_KEY = "AIzaSyB_aINHPQ0-Z4SI_nYOUSzbAYeJ_auuSwE";

Geocode.setApiKey(API_KEY);
Geocode.enableDebug();

const defaultLat = 55.686757;
const defaultLng = 21.157926;

const autocompleteStyle = {
    width: "90%",
    height: "40px",
    marginTop: "10px",
};

export const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

function getCity(addressArray) {
    let city = "";

    for (let i = 0; i < addressArray.length; i++) {
        if (
            addressArray[i].types[0] &&
            addressArray[i].types[0] === "administrative_area_level_1"
        ) {
            city = addressArray[i].long_name;

            return city;
        }
    }

    return false;
}

function getArea(addressArray) {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
            for (let j = 0; j < addressArray[i].types.length; j++) {
                if (
                    addressArray[i].types[j] === "sublocality_level_1" ||
                    addressArray[i].types[j] === "locality"
                ) {
                    area = addressArray[i].long_name;
                    return area;
                }
            }
        }
    }
    return false;
}

function getState(addressArray) {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
        for (i = 0; i < addressArray.length; i++) {
            if (
                addressArray[i].types[0] &&
                addressArray[i].types[0] === "administrative_area_level_1"
            ) {
                state = addressArray[i].long_name;
                return state;
            }
        }
    }
    return false;
}

// const AutocompleteTest = ({ onPlaceSelected }) => {
//     return (
//         <Autocomplete
//             style={autocompleteStyle}
//             onPlaceSelected={onPlaceSelected}
//             types={[]}
//         />
//     );
// };

const libraries = ["places"];

// const AutocompleteMemo = /* React.memo */ useMemo(AutocompleteTest);

const onClick = (...args) => {
    console.log("onClick args: ", args);
};

const onMapLoad = (map) => {
    console.log("map: ", map);
};

function Map({ onMarkerDragEnd }) {
    // const AutocompleteMemo = useMemo(AutocompleteTest);

    const [state, setState] = /* React. */ useState({
        address: "",
        city: "",
        area: "",
        state: "",
        mapPositionLat: defaultLat,
        mapPositionLng: defaultLng,
        markerPositionLat: defaultLat,
        markerPositionLng: defaultLng,
    });

    const { isLoaded, loadError, url } = useLoadScript({
        id: "map",
        googleMapsApiKey: API_KEY,
        libraries,
    });

    console.log(
        "isLoaded: ",
        isLoaded,
        " loadError: ",
        loadError,
        " url: ",
        url
    );

    /* React. */ useEffect(function onMount() {
        Geocode.fromLatLng(state.mapPositionLat, state.mapPositionLng)
            .then(
                (response) => {
                    const address = response.results[0].formatted_address;

                    const addressArray = response.results[0].address_components;

                    const city = getCity(addressArray);

                    const area = getArea(addressArray);

                    const state = getState(addressArray);

                    setState(function set(prevState) {
                        return Object.assign({}, prevState, {
                            address: address || "",
                            area: area || "",
                            city: city || "",
                            state: state || "",
                        });
                    });
                },
                (error) => {
                    console.error(error);
                }
            )
            .catch(function error(err) {
                console.log(err);
            });
    });

    const onPlaceSelected = /* React. */ useCallback(function callback(place) {
        const address = place.formatted_address;
        const addressArray = place.address_components;
        const city = getCity(addressArray);
        const area = getArea(addressArray);
        const state = getState(addressArray);
        const latValue = place.geometry.location.lat();
        const lngValue = place.geometry.location.lng();

        setState({
            address: address || "",
            area: area || "",
            city: city || "",
            state: state || "",
            markerPositionLat: latValue,
            markerPositionLng: lngValue,
            mapPositionLat: latValue,
            mapPositionLng: lngValue,
        });
    }, []);

    const center = /* React. */ useMemo(
        function memo() {
            return {
                lat: state.markerPositionLat,
                lng: state.markerPositionLng,
            };
        },
        [state.markerPositionLat, state.markerPositionLng]
    );

    return isLoaded ? (
        <div>
            <GoogleMap
                id="bicycling-example"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                onClick={onClick}
                onLoad={onMapLoad}
            >
                <Marker
                    draggable
                    onDragEnd={onMarkerDragEnd}
                    position={center}
                />
            </GoogleMap>

            {/* <AutocompleteMemo prop={onPlaceSelected} /> */}
        </div>
    ) : (
        <div>Loading</div>
    );
}

// export default useMemo(Map);
export default Map;
