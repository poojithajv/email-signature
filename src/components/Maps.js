//  Import necessary libraries
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import * as XLSX from "xlsx";
import { CgArrowLongLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ZipCodeFromExcel = () => {
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem("locations")) || []
  ); //localStorage.getItem("Location")
  const [zipCodes, setZipCodes] = useState([]);
  const previousZipcodes = locations.map((each) => each.label);
  const navigate = useNavigate();
  //console.log(loading);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const extractedLocations = data.map((row) => row.Zipcodes);
      const newZipcodes = extractedLocations.filter(
        (zip) => !previousZipcodes.some((prevZip) => prevZip === zip)
      );
      // console.log(newZipcodes);
      if (previousZipcodes.length > 0) {
        setZipCodes(newZipcodes);
      } else {
        setZipCodes(extractedLocations);
      }
    };
    if (file) {
      reader.readAsBinaryString(file);
    }
  };
  const customIcon = new Icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  const getCoordinatesFromZIP = async (each, delay) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${each}&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        if (lat && lon) {
          setLocations((prevLocations) => [
            ...prevLocations,
            { lat: parseFloat(lat), lng: parseFloat(lon), label: each },
          ]);
        } else {
          console.error("Latitude or longitude is undefined");
        }
      } else {
        console.error("No coordinates found for ZIP code");
      }
    } catch (error) {
      console.error("Error fetching coordinates for ZIP code:", error);
    } finally {
      // Add a delay before making the next call
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };
  useEffect(() => {
    const delay = 1100;
    zipCodes.forEach((each, index) => {
      setTimeout(() => {
        getCoordinatesFromZIP(each, delay);
        if (index === zipCodes.length - 1) {
          toast.success("Completed");
          //console.log("completed");
        }
      }, index * delay);
    });
  }, [zipCodes]);
  useEffect(() => {
    // Remove duplicates using Set
    const uniqueLocations = Array.from(
      new Set(locations.map(JSON.stringify))
    ).map(JSON.parse);
    // Set unique locations to localStorage
    localStorage.setItem("locations", JSON.stringify(uniqueLocations));
  }, [locations]);
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear?")) {
      localStorage.removeItem("locations");
      localStorage.removeItem("zipCodes");
      setLocations([]);
      setZipCodes([]);
      window.location.reload();
    }
  };
  return (
    <>
      <div className="top-container-map">
        <CgArrowLongLeft style={{ marginTop: "7px" }} size={15} />
        <span
          style={{ cursor: "pointer", marginTop: "6px" }}
          onClick={() => navigate("/")}
        >
          {" "}
          Back
        </span>
        <input
          style={{ marginTop: "20px" }}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>
      <MapContainer
        center={[12, 77]} // Centered around the india
        //center={[0, 0]} // Centered around the world
        zoom={2}
        style={{ height: "420px", width: "90%", margin: "auto" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations?.map((location, index) => (
          <Marker
            icon={customIcon}
            key={index}
            position={[location.lat, location.lng]}
          >
            <Popup>{location?.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={handleClearData}
        style={{ width: "100px" }}
        className="submit"
      >
        CLEAR
      </button>
    </>
  );
};
export default ZipCodeFromExcel;