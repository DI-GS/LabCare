<template>
    <headerComponent></headerComponent>
    <head>
 
    <!-- Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
        <title>Registro de Horarios</title>
    </head>
<body>
  <div class="main-container content padding">
    <div class="teacher-select">
    <label for="teacherInput" class="teacher_label">Seleccione un Maestro: </label>
    <input type="text" class="teacher_input" id="teacher" list="teacherOptions" v-model="selectedTeacher" placeholder="Buscar Maestro...">
    <datalist id="teacherOptions">
          <option v-for="teacher in teacherOptions" :key="teacher.id" :value="teacher.value">
            {{ teacher.value }}
          </option>
        </datalist>
</div>
<div class="cycle-select">
    <label for="cycleInput" class="cycle_label">Ingrese el Ciclo: </label>
    <input type="text" class="cycle_input" id="cycle" list="cycleOptions" v-model="selectedCycle" placeholder="Selecciona un ciclo...">
    <datalist id="cycleOptions">
        <option v-for="cycle in cycleOptions" :key="cycle" :value="cycle">
            {{ cycle }}
        </option>
    </datalist>
</div>



    <section class="schedules_section">
      <table id="schedule-table">
        <thead>
          <tr>
            <th>
              Horario
              <button class="remove-day-btn" @click="addNewHour" >+</button>
            </th>
            <th v-for="(day, index) in days" :key="index">
              {{ day.name }}
              <button class="remove-day-btn" @click="removeDay(index)" v-if="days.length > 1">&times;</button>
            </th>
            <th>
    <select v-model="selectedDay">
      <option v-for="(day, index) in allDays" :key="index" :value="day">
        {{ day }}
      </option>
    </select>
    <button class="remove-day-btn" @click="addNewDay">+</button>
  </th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="hourRange in hours" :key="hourRange.id">
      <td data-label="Horario">
        <label for="hourRange"></label>
        <VueTimepicker
          v-model="hourRange.startTime"
          format="HH:mm"
          :time="{ min: '08:00', max: '15:30' }"
          class="time-picker-input"
        />
        <label for="hourRange">- </label>
        <VueTimepicker
          v-model="hourRange.endTime"
          format="HH:mm"
          :time="{ min: '08:00', max: '15:30' }"
          class="time-picker-input"
        />
        <button class="btn btn-sm btn-danger"  @click="removeHour(hourRange.id)"><i class="fa-solid fa-trash-can"></i></button>
      </td>
      <td v-for="(day, dayIndex) in days" :key="dayIndex" class="editable" @click="openModal" :data-day="day.name"></td>

    </tr>
  </tbody>
      </table>
    </section>
        <button id="save" @click="guardar()">Guardar</button>

    

        <div id="modal_horarios" class="modal_horarios">
    <div class="modal-horarios-content">
        <span class="close" @click="closeModal">&times;</span>
        
        <!-- Input para Carrera -->
        <div class="input-group">
            <label for="career">Carrera:</label>
            <input 
                type="text" 
                id="career" 
                list="careerOptions" 
                v-model="selectedCareer" 
                @input="fetchSubjects"
                placeholder="Selecciona una carrera..."
            />
            <datalist id="careerOptions">
                <option v-for="career in careers" :key="career.nombre" :value="career.nombre">
                    {{ career.nombre }}
                </option>
            </datalist>
        </div>

        <!-- Input para Materia -->
        <div v-if="subjects.length" class="input-group">
            <label for="subject">Materia:</label>
            <input 
                type="text" 
                id="subject" 
                v-model="selectedSubject" 
                list="subjectOptions"
                placeholder="Selecciona una materia..."
            />
            <datalist id="subjectOptions">
                <option v-for="subject in subjects" :key="subject.id" :value="subject.name_subject">
                    {{ subject.name_subject }}
                </option>
            </datalist>
        </div>

        <!-- Input para Grado -->
        <div class="input-group">
            <label for="grade">Grado:</label>
            <input 
                type="text" 
                id="grade" 
                list="gradeOptions"
                placeholder="Selecciona un grado..."
            />
            <datalist id="gradeOptions">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </datalist>
        </div>

        <!-- Input para Grupo -->
        <div class="input-group">
            <label for="group">Grupo:</label>
            <input 
                type="text" 
                id="group" 
                list="groupOptions"
                placeholder="Selecciona un grupo..."
            />
            <datalist id="groupOptions">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </datalist>
        </div>

        <!-- Input para Edificio/Aula -->
        <div class="input-group">
          <label for="build">Edificio/Aula:</label>
            <input 
                type="text" 
                id="build" 
                list="buildOptions" 
                v-model="selectedBuildOption"  
                placeholder="Selecciona un edificio/aula..."
            />
            <datalist id="buildOptions">
                <option v-for="option in buildOptions" :key="option.id" :value="option.display">
                    <!-- Aquí solo muestra el valor del option -->
                </option>
            </datalist>
        </div>

        <!-- Botón para guardar cambios -->
        <button id="save-changes" @click="saveChanges">Guardar Cambios</button>
    </div>
</div>
</div>
</body>
  </template>
  
  <script>
import { ref,onMounted, watch  } from 'vue';
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
import headerComponent from "@/components/header-component.vue"
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

  //import { store } from "@/stores/user-store";
  export default {
    name: "schedulesAdd",
components: {headerComponent, VueTimepicker},
  
  
    setup() {
      const cycleOptions = ref([]);
      const teacherOptions  = ref([]);
      const selectedTeacher= ref(''); // Para almacenar el maestro seleccionado
      const selectedCycle= ref('');
      const selectedCell = ref(null);
    const dataUsuario = ref([]);
    const userStore = store();
      const selectedCareer = ref('');
    const selectedSubject = ref('');
    const careers = ref([]);
    const subjects = ref([]);
    const buildOptions = ref([]);
    const selectedBuildOption = ref('');
        const allDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
         const availableDays = allDays.filter(day => day !== 'Domingo');
    const days = ref(availableDays.map((name, index) => ({ id: index + 1, name })));
    const hours = ref([{ id: 1 }]); // Inicia con al menos un rango horario
    const selectedDay = ref(allDays[0]); // Inicia con el primer día seleccionado
      
    const addNewHour = () => {
      hours.value.push({ id: generateId() });
    };

    const removeHour = (hourId) => {
      const index = hours.value.findIndex((hour) => hour.id === hourId);
      if (index !== -1) {
        hours.value.splice(index, 1);
      }
    };
    const guardar = async () => {
  const scheduleData = [];

  // Obtén todas las filas del cuerpo de la tabla
  const rows = document.querySelectorAll('#schedule-table tbody tr');

  rows.forEach((row, rowIndex) => {
    // Obtén el rango de horas de la fila
    const hourRange = hours.value[rowIndex] || {};
    
    // Recorre cada celda en la fila
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      if (cell.dataset.cellData) {
        const cellData = JSON.parse(cell.dataset.cellData);
        const day = cell.dataset.day;  // Obtén el día desde el dataset de la celda

        // Agrega los datos al array scheduleData
        scheduleData.push({
          hourRange: {
            startTime: hourRange.startTime || { HH: "", mm: "" },
            endTime: hourRange.endTime || { HH: "", mm: "" }
          },
          dia_semana: day, // Usa 'dia_semana' en lugar de 'day'
          ...cellData
        });
      }
    });
  });

  const data = {
    teacher: selectedTeacher.value,
    cycle: selectedCycle.value,
    schedule: scheduleData
  };

  try {
    const response = await fetch('http://localhost:27017/api/createSchedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Horarios guardados exitosamente');
    } else {
      const errorData = await response.json();
      console.error('Error al guardar horarios:', errorData);
    }
  } catch (error) {
    console.error('Error al guardar horarios:', error);
  }
};



    const addNewDay = () => {
  const selectedDayValue = selectedDay.value;
  
  // Verificar si el día ya está en la lista
  const isDayAlreadyAdded = days.value.some(day => day.name === selectedDayValue);
  
  // Si no está en la lista, agrégalo
  if (!isDayAlreadyAdded) {
    days.value.push({ id: generateId(), name: selectedDayValue });
  }
};

    const removeDay = (dayIndex) => {
      if (days.value.length > 1) {
        days.value.splice(dayIndex, 1);
      }
    };

    const generateId = () => {
      return '_' + Math.random().toString(36).substr(2, 9);
    };

 

   

    const openModal = (event) => {
    // Verifica si el evento tiene un objetivo (target) y si es una celda editable
    const cell = event?.target?.classList.contains('editable') ? event.target : null;

    if (cell) {
      selectedCell.value = cell;

      const modal = document.getElementById('modal_horarios');
      if (modal) {
        modal.style.display = 'block';
      } else {
        console.error("No se pudo encontrar el modal con ID 'modal_horarios'");
      }
    }
  };

    // Evento clic para cerrar el modal al hacer clic en el botón "Cerrar" (X)
    const closeModal = () => {
    const modal = document.getElementById('modal_horarios');
    modal.style.display = "none";
    };

    // Evento clic para guardar los cambios y actualizar las celdas
    const saveChanges = () => {
  if (selectedCell.value) {
    const subjectInput = document.getElementById('subject');
    const gradeInput = document.getElementById('grade');
    const groupInput = document.getElementById('group');
    const careerInput = document.getElementById('career');
    const buildInput = document.getElementById('build');

    // Crea un objeto con la información
    const cellData = {
      subject: subjectInput.value,
      grade: gradeInput.value,
      group: groupInput.value,
      career: careerInput.value,
      build: buildInput.value
    };

    // Almacena la información en la celda
    selectedCell.value.dataset.cellData = JSON.stringify(cellData);
    selectedCell.value.innerHTML = `<pre>${subjectInput.value}\n${gradeInput.value}°${groupInput.value} - ${careerInput.value}\n${buildInput.value}</pre>`;

    closeModal();

    // Limpiar los campos del modal después de guardar los cambios
    subjectInput.value = '';
    gradeInput.value = '';
    groupInput.value = '';
    careerInput.value = '';
    buildInput.value = '';

    selectedCell.value = null;
  } else {
    console.error('Alguno de los elementos de entrada no se encontró en el DOM.');
  }
};

    

      const fetchSubjects = async () => {
      if (selectedCareer.value) {
        try {
          const response = await fetch(`http://localhost:27017/api/materias?career=${encodeURIComponent(selectedCareer.value)}`); // Cambia la URL a tu endpoint
          subjects.value = await response.json();
        } catch (error) {
          console.error('Error al cargar las materias:', error);
        }
      } else {
        subjects.value = [];
      }
    };  
watch(selectedCareer, (newCareer) => {
  fetchSubjects();
});

const fetchCareers = async () => {
      try {
        const response = await fetch('http://localhost:27017/api/carreras'); // Cambia la URL a tu endpoint
        careers.value = await response.json();
      } catch (error) {
        console.error('Error al cargar las carreras:', error);
      }
    };
    const fetchBuildOptions = async () => {
      try {
        const response = await fetch('http://localhost:27017/api/aulas');
        const data = await response.json();
       
        buildOptions.value = data.map(item => ({
          id: item.id,
          display: `${item.Edificio}-${item.Aula}` // Combina edificio y aula
        }));
      } catch (error) {
        console.error('Error fetching build options:', error);
      }
    };

    const loadTeachers = async () => {
      try {
        const response = await fetch('http://localhost:27017/api/teachers');
        const data = await response.json();

        teacherOptions.value = data.map(item => ({
          id: item.id,
          value: item.value
        }));
      } catch (error) {
        console.error('Error fetching teacher options:', error);
      }
};

const generateCycleOptions = () => {
      const currentYear = new Date().getFullYear();
      const cycleLetters = ['S', 'M', 'E']; // Letras específicas para los ciclos

      const cycles = cycleLetters.map(letter => `${currentYear}${letter}`);
      cycleOptions.value = cycles;
    };
    onMounted(() => {
        fetchBuildOptions();
        fetchCareers();
        loadTeachers();
        generateCycleOptions();
      });
     
  
      return{
        openModal,
        saveChanges,
        closeModal,
        cycleOptions,
        days,
      hours,
      addNewHour,
      removeDay,
      removeHour,
      addNewDay,
      allDays,
      selectedDay,
      guardar,
      buildOptions, 
      dataUsuario,
      selectedCareer,
      selectedSubject,
      careers,
      subjects,
      fetchSubjects,
      selectedBuildOption,
       selectedTeacher, 
       selectedCycle,
       teacherOptions
      
      }
      
    },
  
  
  };
  </script>
  <style src="@/assets/css/style.css"></style>