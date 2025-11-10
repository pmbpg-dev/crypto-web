const convertData = async (data, type) => {
  const dataChart = await data[type];
  const convertedData = await dataChart.map((i) => {
    return {
      date: i[0],
      [type]: i[1],
    };
  });
  return convertedData;
};

export { convertData };
