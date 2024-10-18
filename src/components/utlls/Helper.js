export const convertDate = (number) => {
  const date = new Date(number);
  return date.getDate() + "/" + (date.getMonth() + 1);
};

export const settingChartData = (setChartData, coin, prices) => {
  setChartData({
    labels: prices?.map((data) => convertDate(data[0])),
    datasets: [
      {
        label: coin?.name ?? "",
        data: prices?.map((data) => data[1]),
        borderWidth: 2,
        fill: true,
        tension: 0.25,
        backgroundColor: "#f8f8ff",
        borderColor: "#4B40EE",
        pointRadius: 0,
      },
    ],
  });
};
