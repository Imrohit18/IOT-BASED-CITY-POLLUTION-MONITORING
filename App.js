import "./styles.css";
// import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import GaugeChart from "react-gauge-chart";
import { Line } from "react-chartjs-2";

import { Container, Row, Col } from "react-bootstrap";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Temperature_Data_Array = [];
const Humidity_Data_Array = [];
const HeatIndex_Data_Array = [];
const Acetona_Data_Array = [];
const CO_Data_Array = [];
const CO2_Data_Array = [];
const NH4_Data_Array = [];
const Tolueno_Data_Array = [];
const TimeStamp_Data_Array = [];

const state = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: Tolueno_Data_Array
    }
  ]
};

const Plot_Temperature = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "Temperature (°C)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(245, 144, 66,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: Temperature_Data_Array
    }
  ]
};

const Plot_Humidity = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "Humidity(%)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,

      data: Humidity_Data_Array
    }
  ]
};

const Plot_HeatIndex = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "HeatIndex",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(66, 245, 212,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: HeatIndex_Data_Array
    }
  ]
};

const Plot_Acetona = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "Acetona (PPM)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(173, 245, 66,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: Acetona_Data_Array
    }
  ]
};

const Plot_CO = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "CO (PPM)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(66, 245, 173,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: CO_Data_Array
    }
  ]
};

const Plot_CO2 = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "CO2 (PPM)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(66, 138, 245,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: CO2_Data_Array
    }
  ]
};

const Plot_NH4 = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "NH4 (PPM)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(169, 3, 252,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: NH4_Data_Array
    }
  ]
};

const Plot_Tolueno = {
  labels: TimeStamp_Data_Array,
  datasets: [
    {
      label: "Tolueno (PPM)",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(22, 8, 209,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: Tolueno_Data_Array
    }
  ]
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnJYaPdAPGpXi1laDjmGxIVUSjlqPEqa8",
  authDomain: "city-pollution-monitoring.firebaseapp.com",
  databaseURL: "https://city-pollution-monitoring-default-rtdb.firebaseio.com",
  projectId: "city-pollution-monitoring",
  storageBucket: "city-pollution-monitoring.appspot.com",
  messagingSenderId: "285782074402",
  appId: "1:285782074402:web:88125da0b3ab510108167b",
  measurementId: "G-GJ163R090R"
};

const chartStyle = {
  height: 250,
  width: 350,
  textColor: "#000"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();
const WhetherData = ref(db, "Location");
onValue(WhetherData, (snapshot) => {
  // const data = snapshot.val();
  // console.log(data);
});

const dbRef = ref(db, "Location");
var Gauge_Acetona, Gauge_CO, Gauge_CO2, Gauge_HeatIndex, Gauge_Humidity;
var Gauge_NH4, Gauge_Temperature, Gauge_Tolueno;

export default function App() {
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // ...
        // console.log(childKey);
        // console.log(childData);
        // console.log("Temperature " + childData.Temperature);
        Gauge_Temperature = childData.Temperature * 0.01;
        Gauge_Humidity = childData.Humidity * 0.01;
        Gauge_HeatIndex = childData.HeatIndex * 0.01;
        Gauge_Acetona = childData.Acetona;
        Gauge_CO = childData.CO;
        Gauge_CO2 = childData.CO2;
        Gauge_NH4 = childData.NH4;
        Gauge_Tolueno = childData.Tolueno;

        Temperature_Data_Array.push(childData.Temperature);
        Humidity_Data_Array.push(childData.Humidity);
        HeatIndex_Data_Array.push(childData.HeatIndex);
        Acetona_Data_Array.push(childData.Acetona);
        CO_Data_Array.push(childData.CO);
        CO2_Data_Array.push(childData.CO2);
        NH4_Data_Array.push(childData.NH4);
        Tolueno_Data_Array.push(childData.Tolueno);
        TimeStamp_Data_Array.push(childData.TimeStamp);
      });
    },
    {
      onlyOnce: true
    }
  );
  return (
    <div className="App">
      <h1>City Pollution Monitoring System</h1>

      <Container>
        <Row>
          <Col sm>
            <h3> Temperature </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              nrOfLevels={5}
              formatTextValue={(value) => value + "        °C"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_Temperature}
            />
          </Col>
          <Col sm>
            <h3> Humidity </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              nrOfLevels={4}
              formatTextValue={(value) => value + "        %"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_Humidity}
            />
          </Col>
          <Col sm>
            <h3 style={{ text: "center" }}> Heat Index </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              nrOfLevels={4}
              formatTextValue={(value) => value + "        °C"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_HeatIndex}
            />
          </Col>

          <Col sm>
            <h3 style={{ text: "center" }}> Acetona </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              formatTextValue={(value) => value + "(k)        ppm"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_Acetona * 0.001}
            />
          </Col>
          <Col sm>
            <h3 style={{ text: "center" }}> CO </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              nrOfLevels={4}
              formatTextValue={(value) => value + "(k)        ppm"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_CO * 0.001}
            />
          </Col>
          <Col sm>
            <h3 style={{ text: "center" }}> CO2 </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              nrOfLevels={4}
              formatTextValue={(value) => value + "(k)        ppm"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_CO2 * 0.001}
            />
          </Col>

          <Col sm>
            <h3 style={{ text: "center" }}> NH4 </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              formatTextValue={(value) => value + "(k)        ppm"}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_NH4 * 0.001}
            />
          </Col>
          <Col sm>
            <h3 style={{ text: "center" }}> Tolueno </h3>
            <GaugeChart
              id="gauge-chart3"
              textColor="#000"
              style={chartStyle}
              formatTextValue={(value) => value + "(k)        ppm "}
              colors={["#FFC371", "#FF5F6D"]}
              arcWidth={0.3}
              percent={Gauge_Tolueno * 0.001}
            />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col sm>
            <Line
              data={Plot_Temperature}
              options={{
                title: {
                  display: true,
                  text: "Temperature",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>
          <Col sm>
            <Line
              data={Plot_Humidity}
              options={{
                title: {
                  display: true,
                  text: "Humidity",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>
          <Col sm>
            <Line
              data={Plot_HeatIndex}
              options={{
                title: {
                  display: true,
                  text: "Heat Index",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>

          <Col sm>
            <Line
              data={Plot_Acetona}
              options={{
                title: {
                  display: true,
                  text: "Acetona (PPM)",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>
          <Col sm>
            <Line
              data={Plot_CO}
              options={{
                title: {
                  display: true,
                  text: "CO",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>
          <Col sm>
            <Line
              data={Plot_CO2}
              options={{
                title: {
                  display: true,
                  text: "CO2",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>

          <Col sm>
            <Line
              data={Plot_NH4}
              options={{
                title: {
                  display: true,
                  text: "NH4",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>

          <Col sm>
            <Line
              data={Plot_Tolueno}
              options={{
                title: {
                  display: true,
                  text: "Tolueno",
                  fontSize: 10
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
