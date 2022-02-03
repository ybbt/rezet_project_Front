// import React from "react";

import { useMemo, memo, useState, useEffect, useCallback } from "react";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
// import Autocomplete from "react-google-autocomplete";
import { Autocomplete } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";

import axiosConfigured from "../../libs/axiosInstance"; //! прибрати

import { useSelector, useDispatch } from "react-redux";

import { useUpdateLocationMutation } from "../../redux/api.js";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { changeLocation } from "../../redux/slices/authSlice";

// const API_KEY = "AIzaSyB_aINHPQ0-Z4SI_nYOUSzbAYeJ_auuSwE";

// Geocode.setApiKey(/* API_KEY */ process.env.NEXT_PUBLIC_API_KEY);
// Geocode.enableDebug();

//!
// const autocompleteStyle = {
//     width: "90%",
//     height: "40px",
//     marginTop: "10px",
// };

export const mapContainerStyle = {
    height: "400px",
    width: "100%",
};
//!
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

// function Map({ onMarkerDragEnd }) {
//     const signedUserStore = useSelector(
//         (state) => state.authReducer.signedUser
//     );

//     // console.log(signedUserStore, "signedUserStore ------------------------");

//     const [updateLocation] = useUpdateLocationMutation();

//     const [mapState, setMapState] = /* React. */ useState({
//         // address: "",
//         // city: "",
//         // area: "",
//         // state: "",
//         // country: "",
//         mapPositionLat: signedUserStore.lat,
//         mapPositionLng: signedUserStore.lng,
//     });

//     const [markerState, setMarkerState] = /* React. */ useState({
//         markerPositionLat: signedUserStore.lat,
//         markerPositionLng: signedUserStore.lng,
//     });

//     const [map, setMap] = useState(null);
//     const startCenter = {
//         lat: mapState.mapPositionLat /* marker */,
//         lng: mapState.mapPositionLng /* marker */,
//     };
//     // const [center, setCenter] = useState({
//     //     lat: state.mapPositionLat,
//     //     lng: state.mapPositionLng,
//     // });

//     const onMapLoad = (map) => {
//         // console.log("map: ", map);
//         setMap(map);
//     };

//     // console.log(state, "state start");

//     // const AutocompleteMemo = useMemo(AutocompleteTest);

//     const onClick = async (...args) => {
//         setMarkerState(function set(prevState) {
//             return {
//                 ...prevState,
//                 ...{
//                     markerPositionLat: args[0].latLng.lat(),
//                     markerPositionLng: args[0].latLng.lng(),
//                 },
//             };
//         });

//         //#region
//         // try {
//         //     const response = await Geocode.fromLatLng(
//         //         args[0].latLng.lat(),
//         //         args[0].latLng.lng()
//         //     );
//         //     console.log(response, "response");

//         //     const address = response.results[0].formatted_address;
//         //     console.log(address);

//         //     const addressArray = response.results[0].address_components;

//         //     const city = getCity(addressArray);

//         //     const area = getArea(addressArray);

//         //     const state = getState(addressArray);

//         //     const country = getCountry(addressArray);

//         //     setState(function set(prevState) {
//         //         return Object.assign({}, prevState, {
//         //             address: address || "",
//         //             area: area || "",
//         //             city: city || "",
//         //             state: state || "",
//         //             country: country || "",
//         //         });
//         //     });
//         // } catch (error) {
//         //     console.log(error);
//         // }
//         //#endregion

//         // const result = await axiosConfigured.put(
//         //     "/me/location",
//         //     // formData
//         //     {
//         // lat: args[0].latLng.lat(),
//         // lng: args[0].latLng.lng(),
//         //         // avatar: file,
//         //     }
//         // );

//         updateLocation({
//             data: { lat: args[0].latLng.lat(), lng: args[0].latLng.lng() },
//         });
//     };

//     const { isLoaded, loadError, url } = useLoadScript({
//         id: "map",
//         googleMapsApiKey: API_KEY,
//         // libraries,
//     });

//     //#region

//     // console.log(
//     //     "isLoaded: ",
//     //     isLoaded,
//     //     " loadError: ",
//     //     loadError,
//     //     " url: ",
//     //     url
//     // );

//     // const onPlaceSelected = /* React. */ useCallback(function callback(place) {
//     //     const address = place.formatted_address;
//     //     const addressArray = place.address_components;
//     //     const city = getCity(addressArray);
//     //     const area = getArea(addressArray);
//     //     const state = getState(addressArray);
//     //     const latValue = place.geometry.location.lat();
//     //     const lngValue = place.geometry.location.lng();

//     //     setState({
//     //         address: address || "",
//     //         area: area || "",
//     //         city: city || "",
//     //         state: state || "",
//     //         markerPositionLat: latValue,
//     //         markerPositionLng: lngValue,
//     //         mapPositionLat: latValue,
//     //         mapPositionLng: lngValue,
//     //     });
//     // }, []);
//     //#endregion

//     // const center = /* React. */ useMemo(
//     //     function memo() {
//     //         return {
//     //             lat: state.markerPositionLat,
//     //             lng: state.markerPositionLng,
//     //         };
//     //     },
//     //     [state.markerPositionLat, state.markerPositionLng]
//     // );

//     useEffect(() => {
//         console.log(
//             markerState,
//             mapState,
//             "popal            -----------------------            STATE"
//         );
//         if (map) {
//             const newCenter = {
//                 lat: markerState.markerPositionLat,
//                 lng: markerState.markerPositionLng,
//             };
//             // console.log(newCenter, "newCenter");
//             map.panTo({
//                 lat: markerState.markerPositionLat,
//                 lng: markerState.markerPositionLng,
//             });
//             // setState(function set(prevState) {
//             //     return {
//             //         ...prevState,
//             //         ...{
//             //             mapPositionLat: prevState.markerPositionLat,
//             //             mapPositionLng: prevState.markerPositionLng,
//             //         },
//             //     };
//             // });
//         }
//     }, [markerState.markerPositionLat, markerState.markerPositionLng]);

//     return isLoaded ? (
//         <div>
//             <GoogleMap
//                 id="bicycling-example"
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={15}
//                 center={startCenter}
//                 onClick={(e) => onClick(e)}
//                 onLoad={onMapLoad}
//             >
//                 <Marker
//                     // icon={"marker.png"}
//                     draggable={false}
//                     onDragEnd={onMarkerDragEnd}
//                     position={{
//                         lat: markerState.markerPositionLat,
//                         lng: markerState.markerPositionLng,
//                     }}
//                 />
//             </GoogleMap>

//             {/* <AutocompleteMemo prop={onPlaceSelected} /> */}
//         </div>
//     ) : (
//         <div>Loading</div>
//     );
// }

import { useGetAuthentificationQuery } from "../../redux/api.js";

function Map({ onMarkerDragEnd }) {
    const defaultLat = 47.8079508;
    const defaultLng = 35.181579;

    let startPosition = { lat: defaultLat, lng: defaultLng };

    const signedUserStore = useSelector(
        (state) => state.authReducer.signedUser
    );

    const dispatch = useDispatch();

    // const { signedUser } = useGetAuthentificationQuery(undefined, {
    //     selectFromResult: ({ data }) => ({
    //         signedUser: data.data,
    //     }),
    // });

    const [updateLocation] = useUpdateLocationMutation();

    const [positionState, setPositionState] = /* React. */ useState({
        // mapPositionLat: signedUserStore.lat,
        // mapPositionLng: signedUserStore.lng,
        markerPositionLat: signedUserStore.lat /* signedUser.lat */,
        markerPositionLng: signedUserStore.lng /* signedUser.lng */,
    });

    const [map, setMap] = useState(null);

    const onMapLoad = (map) => {
        console.log("map: ", map);
        setMap(map);
    };

    useEffect(() => {
        console.log(positionState, "==============map================");
        if (map) {
            console.log(positionState, "positionState->->->->->->->->->");
            if (
                positionState.markerPositionLat &&
                positionState.markerPositionLng
            ) {
                startPosition = {
                    lat: positionState.markerPositionLat,
                    lng: positionState.markerPositionLng,
                };
            }

            const result = map.panTo(startPosition);
        }
    }, [map]);

    // console.log(signedUser, "USER =========>>>>>>>>>>>>>>>>>>");

    // console.log(positionState, "state start");

    // const AutocompleteMemo = useMemo(AutocompleteTest);

    const onClick = async (...args) => {
        setPositionState(function set(prevState) {
            return {
                ...prevState,
                ...{
                    markerPositionLat: args[0].latLng.lat(),
                    markerPositionLng: args[0].latLng.lng(),
                },
            };
        });

        showConfirm({ lat: args[0].latLng.lat(), lng: args[0].latLng.lng() });

        // updateLocation({
        //     data: { lat: args[0].latLng.lat(), lng: args[0].latLng.lng() },
        // });
    };

    function showConfirm(location) {
        Modal.confirm({
            title: "Save location",
            icon: <ExclamationCircleOutlined />,
            content: "Do you Want Save this location in Profile?",
            async onOk() {
                console.log("OK");
                const { isError: isErrorLocation, data: dataLocation } =
                    await updateLocation({
                        data: location,
                    });
                if (!isErrorLocation) {
                    dispatch(changeLocation(location));
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    const { isLoaded, loadError, url } = useLoadScript({
        id: "map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
        // libraries,
    });

    console.log(process.env.NEXT_PUBLIC_API_KEY, "API_KEY");

    // const center = {
    //     lat: positionState.mapPositionLat,
    //     lng: positionState.mapPositionLng,
    // };

    useEffect(() => {
        console.log(positionState, "==============popal================");
        if (map) {
            console.log(map.panTo, "if");
            map.panTo({
                lat: positionState.markerPositionLat,
                lng: positionState.markerPositionLng,
            });
        }
    }, [positionState.markerPositionLat, positionState.markerPositionLng]);

    console.log(startPosition, "startPosition");

    return isLoaded ? (
        <div>
            <GoogleMap
                id="userLocation"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={null}
                onClick={(e) => onClick(e)}
                onLoad={onMapLoad}
            >
                <Marker
                    draggable={false}
                    onDragEnd={onMarkerDragEnd}
                    position={{
                        lat: positionState.markerPositionLat,
                        lng: positionState.markerPositionLng,
                    }}
                />
            </GoogleMap>

            {/* <AutocompleteMemo prop={onPlaceSelected} /> */}
        </div>
    ) : (
        <div>Loading</div>
    );
}

export default /* React. */ memo(Map);
