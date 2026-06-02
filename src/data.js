import Chart from 'chart.js/auto';
import jsonData from './data.json';

(async function() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    // Fetch data from the API
    const datasensor = data.map(item => ({
      sensor: item.sensor,
        
      Temperature: item.Temperature,
      Humidity: item.Humidity
    }));
    datasensor.forEach(item => {
      console.log(`Sensor: ${item.sensor}, Temperature: ${item.Temperature}, Humidity: ${item.Humidity}`);
    });

    // Create the chart
    new Chart(document.getElementById('data'), {
      type: 'line',
      data: {
        labels: datasensor.map((item, index) => index + 1), // Label each point by its index
        datasets: [
          {
            label: 'Temperature',
            data: datasensor.map(item => item.Temperature),
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Humidity',
            data: datasensor.map(item => item.Humidity),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only draw the right y-axis grid
            },
            title: {
              display: true,
              text: 'Humidity'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})();