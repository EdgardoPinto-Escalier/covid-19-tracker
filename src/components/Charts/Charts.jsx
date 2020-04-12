import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData()); 
    };

    fetchApi();
  }, []);

  const lineChart = (
    dailyData.length
      ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "INFECTED",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "DEATHS",
              borderColor: "red",
              backgroundColor: "#ff1744",
              fill: true,
            }
          ],
        }}
      />
    ) : null
  );

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: ["#3333ff", "#64dd17", "#ff1744"],
            data: [confirmed.value, recovered.value, deaths.value]
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current stats in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Charts;