const xml2js = require("xml2js");
const parser = new xml2js.Parser();
let CanadianBorders = [];
let MexicanBorders = [];

const fetchCrossingData = async () => {
  let crossingData = [];
  const response = await fetch("https://bwt.cbp.gov/xml/bwt.xml");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    if (err) {
      console.error("error", err);
      return;
    }
    crossingData = result;

    CanadianBorders = [];
    MexicanBorders = [];
    for (const item in crossingData.border_wait_time.port) {
      let thisBorder = crossingData.border_wait_time.port[item];
      if (thisBorder.border == "Canadian Border") {
        CanadianBorders.push({
          border: thisBorder.border,
          borderRegion: thisBorder.port_name,
          crossingName: thisBorder.crossing_name,
          hours: thisBorder.hours,
          portStatus: thisBorder.port_status,
          passengerVehicleWait:
            thisBorder.passenger_vehicle_lanes[0].standard_lanes[0]
              .delay_minutes,
          pedestrianLaneWait:
            thisBorder.pedestrian_lanes[0].standard_lanes[0].delay_minutes,
        });
      } else {
        MexicanBorders.push({
          border: thisBorder.border,
          borderRegion: thisBorder.port_name,
          crossingName: thisBorder.crossing_name,
          hours: thisBorder.hours,
          portStatus: thisBorder.port_status,
          passengerVehicleWait:
            thisBorder.passenger_vehicle_lanes[0].standard_lanes[0]
              .delay_minutes,
          pedestrianLaneWait:
            thisBorder.pedestrian_lanes[0].standard_lanes[0].delay_minutes,
        });
      }
    }
  });

  return {
    lastUpdatedDate: crossingData.border_wait_time.last_updated_date,
    lastUpdatedTime: crossingData.border_wait_time.last_updated_time,
    numOfPorts: crossingData.border_wait_time.number_of_ports,
    allMexicanPorts: MexicanBorders,
    allCanadianPorts: CanadianBorders,
  };
};
module.exports = { fetchCrossingData };
