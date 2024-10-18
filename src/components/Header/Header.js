import React from "react";
import styles from "./header.module.css";
import { Tab, Tabs } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Header = ({ coinData, toggleScreen, handleChange, value }) => {
  return (
    <div
      className={
        toggleScreen ? styles.headerContainer : styles.toggleHeaderScreen
      }
    >
      <div className={styles.priceContainer}>
        <div style={{ display: "flex", gap: "10px" }}>
          <img
            style={{ width: "60px", height: "60px", marginTop: "10px" }}
            src={coinData?.image?.large}
            alt=""
          />
          <div>
            {coinData && (
              <>
                <h1>
                  {coinData.market_data.current_price.usd.toFixed(2)}{" "}
                  <span
                    style={{
                      fontSize: "25px",
                      color: "darkgray",
                      position: "absolute",
                      padding: "10px 0 0 5px",
                    }}
                  >
                    USD
                  </span>
                </h1>
                <p
                  style={{
                    color:
                      coinData?.market_data.price_change_percentage_24h < 0
                        ? "red"
                        : "#67bf6b",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {coinData?.market_data.price_change_percentage_24h < 0 ? (
                    <TrendingDownIcon />
                  ) : (
                    <TrendingUpIcon />
                  )}
                  {coinData?.market_data?.price_change_24h?.toFixed(2)} (
                  {coinData?.market_data?.price_change_percentage_24h?.toFixed(
                    2
                  )}{" "}
                  %)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tabContainer}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Summary" className={styles.tab} />
          <Tab label="Chart" className={styles.tab} />
          <Tab label="Statistics" className={styles.tab} />
          <Tab label="Analytics" className={styles.tab} />
          <Tab label="Settings" className={styles.tab} />
        </Tabs>
      </div>
    </div>
  );
};

export default Header;
