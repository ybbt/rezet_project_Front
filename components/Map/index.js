// import React from "react";

import { useMemo, memo, useState, useEffect, useCallback } from "react";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { DirectionsRenderer } from "@react-google-maps/api";

import axiosConfigured from "../../libs/axiosInstance"; //! прибрати

import { useSelector /* , useDispatch */ } from "react-redux";

const API_KEY = "AIzaSyB_aINHPQ0-Z4SI_nYOUSzbAYeJ_auuSwE";

Geocode.setApiKey(API_KEY);
// Geocode.enableDebug();

const defaultLat = 47.8079508;
const defaultLng = 35.181579;

// const autocompleteStyle = {
//     width: "90%",
//     height: "40px",
//     marginTop: "10px",
// };

export const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

//#region
// function getCity(addressArray) {
//     let city = "";

//     for (let i = 0; i < addressArray.length; i++) {
//         if (
//             addressArray[i].types[0] &&
//             addressArray[i].types[0] === "locality"
//         ) {
//             city = addressArray[i].long_name;

//             return city;
//         }
//     }

//     return false;
// }

// function getCountry(addressArray) {
//     let country = "";

//     for (let i = 0; i < addressArray.length; i++) {
//         if (
//             addressArray[i].types[0] &&
//             addressArray[i].types[0] === "country"
//         ) {
//             country = addressArray[i].long_name;

//             return country;
//         }
//     }

//     return false;
// }

// function getArea(addressArray) {
//     let area = "";
//     for (let i = 0; i < addressArray.length; i++) {
//         if (addressArray[i].types[0]) {
//             for (let j = 0; j < addressArray[i].types.length; j++) {
//                 if (
//                     addressArray[i].types[j] === "sublocality_level_1" ||
//                     addressArray[i].types[j] === "locality"
//                 ) {
//                     area = addressArray[i].long_name;
//                     return area;
//                 }
//             }
//         }
//     }
//     return false;
// }

// function getState(addressArray) {
//     let state = "";
//     for (let i = 0; i < addressArray.length; i++) {
//         for (i = 0; i < addressArray.length; i++) {
//             if (
//                 addressArray[i].types[0] &&
//                 addressArray[i].types[0] === "administrative_area_level_1"
//             ) {
//                 state = addressArray[i].long_name;
//                 return state;
//             }
//         }
//     }
//     return false;
// }

// const AutocompleteTest = ({ onPlaceSelected }) => {
//     return (
//         <Autocomplete
//             style={autocompleteStyle}
//             onPlaceSelected={onPlaceSelected}
//             types={[]}
//         />
//     );
// };

// const libraries = ["places"];

// const AutocompleteMemo = /* React.memo */ useMemo(AutocompleteTest);
//#endregion

function Map({ onMarkerDragEnd }) {
    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    console.log(signedUserStore, "signedUserStore ------------------------");

    const [state, setState] = /* React. */ useState({
        // address: "",
        // city: "",
        // area: "",
        // state: "",
        // country: "",
        mapPositionLat: signedUserStore.lat,
        mapPositionLng: signedUserStore.lng,
        markerPositionLat: signedUserStore.lat,
        markerPositionLng: signedUserStore.lng,
    });

    const [map, setMap] = useState(null);

    const onMapLoad = (map) => {
        // console.log("map: ", map);
        setMap(map);
    };

    console.log(state, "state start");

    // const AutocompleteMemo = useMemo(AutocompleteTest);

    const onClick = async (...args) => {
        setState(function set(prevState) {
            return {
                ...prevState,
                ...{
                    markerPositionLat: args[0].latLng.lat(),
                    markerPositionLng: args[0].latLng.lng(),
                },
            };
        });

        //#region
        // try {
        //     const response = await Geocode.fromLatLng(
        //         args[0].latLng.lat(),
        //         args[0].latLng.lng()
        //     );
        //     console.log(response, "response");

        //     const address = response.results[0].formatted_address;
        //     console.log(address);

        //     const addressArray = response.results[0].address_components;

        //     const city = getCity(addressArray);

        //     const area = getArea(addressArray);

        //     const state = getState(addressArray);

        //     const country = getCountry(addressArray);

        //     setState(function set(prevState) {
        //         return Object.assign({}, prevState, {
        //             address: address || "",
        //             area: area || "",
        //             city: city || "",
        //             state: state || "",
        //             country: country || "",
        //         });
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        //#endregion

        const result = await axiosConfigured.put(
            "/me/location",
            // formData
            {
                lat: args[0].latLng.lat(),
                lng: args[0].latLng.lng(),
                // avatar: file,
            }
        );
    };

    const { isLoaded, loadError, url } = useLoadScript({
        id: "map",
        googleMapsApiKey: API_KEY,
        // libraries,
    });

    //#region

    // console.log(
    //     "isLoaded: ",
    //     isLoaded,
    //     " loadError: ",
    //     loadError,
    //     " url: ",
    //     url
    // );

    // const onPlaceSelected = /* React. */ useCallback(function callback(place) {
    //     const address = place.formatted_address;
    //     const addressArray = place.address_components;
    //     const city = getCity(addressArray);
    //     const area = getArea(addressArray);
    //     const state = getState(addressArray);
    //     const latValue = place.geometry.location.lat();
    //     const lngValue = place.geometry.location.lng();

    //     setState({
    //         address: address || "",
    //         area: area || "",
    //         city: city || "",
    //         state: state || "",
    //         markerPositionLat: latValue,
    //         markerPositionLng: lngValue,
    //         mapPositionLat: latValue,
    //         mapPositionLng: lngValue,
    //     });
    // }, []);
    //#endregion

    const center = {
        lat: state./* marker */ mapPositionLat,
        lng: state./* marker */ mapPositionLng,
    };

    // const center = /* React. */ useMemo(
    //     function memo() {
    //         return {
    //             lat: state.markerPositionLat,
    //             lng: state.markerPositionLng,
    //         };
    //     },
    //     [state.markerPositionLat, state.markerPositionLng]
    // );

    useEffect(() => {
        console.log(state, "popal");
        if (map) {
            // console.log(map.panTo, "if");
            map.panTo({
                lat: state.markerPositionLat,
                lng: state.markerPositionLng,
            });
        }
    }, [state.markerPositionLat, state.markerPositionLng]);

    return isLoaded ? (
        <div>
            <GoogleMap
                id="user-location"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                onClick={(e) => onClick(e)}
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

export default /* React. */ memo(Map);
