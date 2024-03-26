// MarkerContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Earth } from './index.jsx';
import markersData from './markers.js'; // Renamed to avoid naming conflict

const MarkerContext = createContext();


export const useMarker = () => useContext(MarkerContext);

// MarkerContext.js
export const MarkerProvider = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState(markersData);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const closeOverlay = () => {
    setSelectedMarker(null);
  };

  return (
    <MarkerContext.Provider value={{ markers, selectedMarker, handleMarkerClick, closeOverlay }}>
      {children}
    </MarkerContext.Provider>
  );
};