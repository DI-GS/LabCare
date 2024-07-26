<template>
    <headerComponent></headerComponent>
    <head>
        <title>Gráficas</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <div class="main-container content padding">
        <canvas ref="chartCanvas"></canvas>
    <div>
      <label for="dataInput">Enter new data (comma separated):</label>
      <input id="dataInput" v-model="newData" placeholder="10, 20, 30, 40" />
      <button @click="updateChartData">Update Chart</button>
    </div>
    <div>
      <label for="periodSelect">Select Period:</label>
      <select id="periodSelect" v-model="selectedPeriod" @change="updateChartPeriod">
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import headerComponent from "@/components/header-component.vue";
  
  Chart.register(...registerables);
  
  export default {
    name: "viewGraphics",
  components: { headerComponent },
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const newData = ref('');
    const selectedPeriod = ref('monthly');

    const dataSets = {
      monthly: {
        labels: ['January', 'February', 'March', 'April'],
        data: [65, 59, 80, 81]
      },
      quarterly: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [150, 200, 250, 300]
      },
      yearly: {
        labels: ['2020', '2021', '2022', '2023'],
        data: [500, 600, 700, 800]
      }
    };

    const initializeChart = (period) => {
      const ctx = chartCanvas.value.getContext('2d');
      const { labels, data } = dataSets[period];
      chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Usage Statistics',
            data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    const updateChartData = () => {
      const data = newData.value.split(',').map(Number);
      chartInstance.value.data.datasets[0].data = data;
      chartInstance.value.update();
    };

    const updateChartPeriod = () => {
      const period = selectedPeriod.value;
      chartInstance.value.destroy();
      initializeChart(period);
    };

    onMounted(() => {
      initializeChart(selectedPeriod.value);
    });

    return {
      chartCanvas,
      newData,
      selectedPeriod,
      updateChartData,
      updateChartPeriod
    };
  }
};
</script>

<style scoped>
canvas {
  max-width: 600px;
}
div {
  margin-top: 20px;
}
</style>