import React from "react";

const EmptyDiv = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
        fontWeight: "bold",
        fontSize: "20px",
        color: "darkgray",
      }}
    >
      No data available
    </div>
  );
};

export default EmptyDiv;
