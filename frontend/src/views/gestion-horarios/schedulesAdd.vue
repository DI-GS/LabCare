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
        <input type="text" class="teacher_input" id="teacher" list="teacherOptions" placeholder="Buscar Maestro...">
        <datalist id="teacherOptions">
            <option value="Lizbeth Noriega"></option>
            <option value="Mildred Green"></option>
            <option value="Brenda Mariana"></option>
            <!-- Agregar más opciones según necesites -->
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
      <td v-for="(day, dayIndex) in days" :key="dayIndex" class="editable" @click="openModal"></td>
    </tr>
  </tbody>
      </table>
    </section>
        <button id="save">Guardar</button>

    

    
<div id="modal_horarios" class="modal_horarios">
    <div class="modal-horarios-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Registro de Materia</h2>
        <div class="input-group">
            <label for="subject">Materia:</label>
            <input type="text" id="subject" name="subject" list="subjectOptions">
            <datalist id="subjectOptions">
                <option value="Integradora 1"></option>
                <option value="Administración del tiempo"></option>
                <option value="Matemáticas para ingeniería 1"></option>
            </datalist>
        </div>
        <div class="input-group">
            <label for="career">Carrera:</label>
            <input type="text" id="career" name="career" list="careerOptions">
            <datalist id="careerOptions">
                <option value="IDGS"></option>
                <option value="LINM"></option>
                <option value="IER"></option>
            </datalist>
        </div>
        <div class="input-group">
            <label for="grade">Grado:</label>
            <input type="text" id="grade" name="grade" list="gradeOptions">
            <datalist id="gradeOptions">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
            </datalist>
        </div>
        <div class="input-group">
            <label for="group">Grupo:</label>
            <input type="text" id="group" name="group" list="groupOptions">
            <datalist id="groupOptions">
                <option value="A"></option>
                <option value="B"></option>
                <option value="C"></option>
            </datalist>
        </div>
        <div class="input-group">
            <label for="build">Edificio/Aula:</label>
            <input type="text" id="build" name="group" list="buildOptions">
            <datalist id="buildOptions">
                <option value="A-205"></option>
                <option value="B-102"></option>
                <option value="F-210"></option>
            </datalist>
        </div>
        <button id="save-changes" @click="saveChanges">Guardar Cambios</button>
    </div>
</div>
</div>
</body>
  </template>
  
  <script>
import { ref } from 'vue';
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

    const selectedCell = ref(null);
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const lastname = ref("");
    const rol = ref("");
    const router = useRouter();
    const userStore = store();

    const handleSubmit = async () => {
  try {
      await userStore.createNewUser(name.value, lastname.value, email.value, password.value, repassword.value, rol.value);
      email.value = "";
      password.value = "";
      repassword.value = "";
      name.value = "";
      lastname.value = "";
      rol.value = "";
      router.push("home");
    
  } catch (error) {
    console.log("desde loginComponents: ", error);
    if (error.error) {
      // eslint-disable-next-line no-undef
      alertError(error.error);
    }
    if (error.errors) {
      // eslint-disable-next-line no-undef
      alertError(error.errors[0].msg);
    }
  }
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


        const formattedContent = `${subjectInput.value}\n${gradeInput.value}°${groupInput.value} - ${careerInput.value}\n${buildInput.value}`;
        selectedCell.value.innerHTML = `<pre>${formattedContent}</pre>`;

          closeModal()

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
      }
    


     
  
      return{
        openModal,
        saveChanges,
        closeModal,
        handleSubmit,
        days,
      hours,
      addNewHour,
      removeDay,
      removeHour,
      addNewDay,
      allDays,
      selectedDay
      }
      
    },
  
  
  };
  </script>
  <style src="@/assets/css/style.css"></style>