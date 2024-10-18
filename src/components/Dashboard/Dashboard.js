import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";
import Chart from "../Chart/Chart";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { CircularProgress } from "@mui/material";
import { settingChartData } from "../utlls/Helper";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { TIME_RANGES } from "../utlls/constant";
import Header from "../Header/Header";
import EmptyDiv from "../EmptyDiv";

const Dashboard = () => {
  const [coinData, setCoinData] = useState(null);
  const [coinPrices, setCoinPrices] = useState(7);
  const [value, setValue] = React.useState(1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const [toggleScreen, setToggleScreen] = useState(true);

  const [activeRange, setActiveRange] = useState("1w"); // Default selected range

  const handleRangeChange = (range) => {
    setActiveRange(range);
    const days = TIME_RANGES[range];
    setCoinPrices(days);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCoinData = async () => {
    await axios
      .get(`https://api.coingecko.com/api/v3/coins/bitcoin`)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
      });
  };

  const getCoinPrices = (id, days) => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      )
      .then((response) => {
        settingChartData(setChartData, coinData, response?.data?.prices);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setChartData({
          labels: [],
          datasets: [],
        });
      });
  };

  useEffect(() => {
    const fetchCoinDataAndPrices = async () => {
      await getCoinData(); // Fetch coin data
      getCoinPrices("bitcoin", coinPrices); // Fetch prices only after coin data
    };
    fetchCoinDataAndPrices();
  }, [coinPrices, activeRange]);

  return (
    <div className={styles.dashboardContainer}>
      <Header
        coinData={coinData}
        value={value}
        handleChange={handleChange}
        toggleScreen={toggleScreen}
      />
      {value === 1 ? (
        <>
          <div className={styles.subTab}>
            <div className={styles.chartFilterContainer}>
              <div className={styles.leftContainer}>
                <div>
                  <div onClick={() => setToggleScreen(!toggleScreen)}>
                    {toggleScreen ? (
                      <div className={styles.fullScreen}>
                        <OpenInFullIcon />
                        Full Screen
                      </div>
                    ) : (
                      <div className={styles.fullScreen}>
                        <CloseFullscreenIcon />
                        Exit Full Screen
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.compare}>
                  <ControlPointIcon />
                  Compare
                </div>
              </div>
              <div className={styles.chartControls}>
                <div className={styles.timeRange}>
                  {Object.keys(TIME_RANGES).map((range) => (
                    <button
                      key={range}
                      className={activeRange === range ? styles.active : ""}
                      onClick={() => handleRangeChange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Container with smooth transition */}
          <div
            className={`${styles.chartContainer} ${
              toggleScreen ? styles.expanded : ""
            }`}
          >
            {loading ? (
              <div className={styles.emptyContainer}>
                <CircularProgress />
              </div>
            ) : chartData?.datasets?.length ? (
              <Chart chartData={chartData} />
            ) : (
              <div className={styles.emptyContainer}>
                Too many requests from the API, please try again after a minute
              </div>
            )}
          </div>
        </>
      ) : (
        <EmptyDiv />
      )}
    </div>
  );
};

export default Dashboard;
