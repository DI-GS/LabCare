<template>
  <headerComponent></headerComponent>
  <head>
    <title>Gráficas</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <div class="main-container content padding">
    <div class="chart-container">
      <canvas ref="chartCanvas1"></canvas>
    </div>

    <div class="chart-container">
      <canvas ref="chartCanvas2"></canvas>
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
    const chartCanvas1 = ref(null);
    const chartCanvas2 = ref(null);
    const chartInstance1 = ref(null);
    const chartInstance2 = ref(null);

    const initializeChart1 = () => {
      const ctx1 = chartCanvas1.value.getContext('2d');
      chartInstance1.value = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dieciembre'],
          datasets: [{
            label: 'Uso Mensual de Aulas',
            data: [158, 139, 170, 149, 132, 148, 122, 110, 140, 132, 98, 34],
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

    const initializeChart2 = () => {
      const ctx2 = chartCanvas2.value.getContext('2d');
      chartInstance2.value = new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023'],
          datasets: [{
            label: 'Uso Anual de Laboratorios',
            data: [130, 129, 100, 150],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true
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

    onMounted(() => {
      initializeChart1();
      initializeChart2();
    });

    return {
      chartCanvas1,
      chartCanvas2
    };
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.chart-container {
  width: 45%;
  margin: 20px 0;
}

canvas {
  width: 100%;
  height: 400px; /* Ajusta la altura como desees */
}

@media (max-width: 768px) {
  .chart-container {
    width: 100%;
  }
}
</style>
