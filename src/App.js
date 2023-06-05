import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function App() {
  const rondes = [
    "49.443",
    "44.396",
    "43.830",
    "44.651",
    "44.511",
    "43.889",
    "44.243",
    "46.280",
    "43.386",
    "43.942",
    "44.244",
    "43.916",
    "44.388",
    "43.087",
    "44.412",
    "43.019",
    "43.282",
    "45.252",
    "45.510",
    "43.092",
    "43.005",
    "44.227",
    "44.057",
    "43.788",
    "77.023",
    "56.605",
    "49.940",
    "47.774",
    "45.914",
    "45.830",
    "45.498",
    "45.298",
    "44.696",
    "45.889",
    "45.506",
    "47.079",
    "53.028",
    "48.042",
    "46.675",
    "47.076",
    "45.933",
    "48.665",
    "48.658",
    "47.554",
    "47.647",
    "47.732",
    "78.078",
    "46.119",
    "46.470",
    "47.156",
    "47.491",
    "48.655",
    "47.887",
    "50.317",
    "56.467",
    "58.066",
    "56.318",
    "54.908",
    "56.189",
    "56.731",
    "55.874",
    "57.311",
    "57.267",
    "57.484",
    "54.764",
    "55.085",
    "55.422",
    "54.909",
    "113.594",
    "60.055",
    "59.250",
    "58.207",
    "55.240",
    "54.653",
    "56.733",
    "52.945",
    "51.837",
    "52.106",
    "54.255",
    "51.885",
    "51.973",
    "53.664",
    "50.708",
    "60.051",
    "53.614",
    "53.245",
    "59.718",
    "103.771",
    "49.412",
    "46.379",
    "47.011",
    "48.554",
    "45.723",
    "46.210",
    "45.807",
    "45.414",
    "45.420",
    "45.015",
    "45.154",
    "44.891",
    "54.748",
    "45.787",
    "46.402",
    "45.342",
    "45.668",
    "46.270",
    "46.017",
    "47.080",
    "45.473",
    "45.846",
    "45.426",
    "46.706",
    "77.707",
    "46.739",
    "46.626",
    "47.331",
    "47.353",
    "47.082",
    "48.259",
    "47.215",
    "47.032",
    "46.947",
    "66.901",
    "45.106",
    "44.952",
    "44.887",
    "44.866",
    "45.514",
    "45.162",
    "44.759",
    "46.749",
    "51.770",
    "48.119",
    "47.990",
    "49.329",
    "48.863",
    "79.027",
    "51.869",
    "53.750",
    "52.880",
    "54.357",
    "54.459",
    "54.360",
    "53.920",
    "54.330",
    "56.093",
    "56.060",
    "55.246",
    "54.688",
    "54.259",
    "54.873",
    "54.758",
    "54.330",
    "54.564",
    "54.603",
    "54.187",
    "54.762",
    "54.669",
    "87.832",
    "58.056",
    "56.838",
    "59.563",
    "57.125",
    "57.424",
    "57.144",
    "57.310",
    "56.745",
    "60.101",
    "56.555",
    "57.774",
    "57.440",
    "57.555",
    "58.172",
    "57.545",
    "56.952",
    "57.959",
    "57.234",
    "56.794",
    "56.943",
    "56.744",
    "84.662",
    "55.101",
    "54.769",
    "60.563",
    "54.160",
    "56.063",
    "54.254",
    "57.581",
    "54.220",
    "53.522",
    "58.644",
    "54.054",
    "53.521",
    "54.733",
    "85.239",
    "55.388",
    "54.937",
    "60.742",
    "56.108",
    "55.674",
    "55.489",
    "55.456",
    "54.703",
    "60.745",
    "55.368",
    "55.121",
    "54.880",
    "55.698",
    "56.296",
    "83.754",
    "55.724",
    "55.397",
    "55.225",
    "61.255",
    "54.658",
    "54.511",
    "65.471",
    "54.050",
    "54.915",
    "55.056",
    "54.841",
    "54.822",
    "54.188",
    "53.968",
    "54.983",
    "87.283",
    "56.303",
    "56.273",
    "55.298",
    "55.665",
    "55.752",
    "55.584",
    "55.590",
    "54.854",
    "56.625",
    "55.058",
  ];

  let pits = rondes
    .map((rondetijd, index) => {
      return rondetijd > 70 ? { x: index + 1, label: index, y: 1 } : false;
    })
    .filter((elem) => elem);
  let newRondes = rondes.map((rondetijd, index) => {
    return { x: index, y: rondetijd };
  });

  const stints = pits.map((element, index) => {
    return newRondes.slice(index ? pits[index - 1].x : 0, element.x);
  });

  const calcAverage = (stint, lap, lapIndex) => {
    let time = parseFloat(lap.y);
    if (lapIndex) {
      stint.map((prevLap, index) =>
        index <= lapIndex ? (time += parseFloat(prevLap.y)) : false
      );
    }
    time = time / (lapIndex + 1);

    return time;
  };

  const averages = stints.map((stint, index) => {
    // console.log(index);
    return stint.map((lap, lapIndex) => {
      return { x: lap.x, y: calcAverage(stint, lap, lapIndex) };
    });
  });
  // console.log(averages);
  let rondeLabels = rondes.map((rondetijd, index) => {
    return index;
  });

  let stintTime = stints.map((stint, index) => {
    return Math.round(
      stint.reduce((prevLap, lap, lapIndex) => {
        if (prevLap.y) {
          return parseFloat(prevLap.y) + parseFloat(lap.y);
        }
        return parseFloat(prevLap) + parseFloat(lap.y);
      }) / 60
    );
  });

  pits.map((stint, stintIndex) => {
    stint.y = stintTime[stintIndex];
  });

  console.log(pits);

  let dataSets = [
    {
      label: "Rondetijden",
      data: rondes,
    },
    {
      label: "Pit lap / stint time in minutes",
      data: pits,
    },
  ];

  stints.map((stint, index) => {
    dataSets.push({
      label: "Stint:" + index,
      data: stint,
    });
  });

  averages.map((stint, index) => {
    dataSets.push({
      label: "Avg. Stint:" + index,
      data: stint,
    });
  });

  return (
    <div className="App">
      <Line
        datasetIdKey="id"
        data={{
          labels: rondeLabels,
          datasets: dataSets,
        }}
      ></Line>
    </div>
  );
}

export default App;
