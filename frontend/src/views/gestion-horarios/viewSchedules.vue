<template>
  <headerComponent></headerComponent>
  <div class="main-container content padding">
    <div class="container my-5">
      <router-link :to="{ name: 'schedulesAdd' }" class="btn btn-sm btn-success">Nuevo Horario</router-link>
      <div class="row">
        <table id="example" class="table table-striped" style="width: 100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in data" :key="user._id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name + " " + user.lastname }}</td>
              <td>
                <button class="btn btn-sm btn-secondary" @click="openModal(user)">
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteUser(user)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal personalizado -->
<div v-if="showModal" class="custom-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Horarios de {{ selectedTeacher.name }} {{ selectedTeacher.lastname }}</h5>
      <button type="button" class="btn-close" @click="closeModal">Cerrar</button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="saveSchedules">
        <div v-for="(schedule, index) in schedules" :key="index" class="mb-3">
          <div class="form-group">
            <label for="day">Día</label>
            <input type="text" class="form-control" v-model="schedule.dia_semana" placeholder="Día" required />
          </div>
          <div class="form-group">
            <label for="subject">Materia</label>
            <input type="text" class="form-control" v-model="schedule.subject" placeholder="Materia" required />
          </div>
          <div class="form-group">
            <label for="hourRange">Rango de Horas</label>
            <div class="d-flex">
              <input type="number" class="form-control me-2" v-model.number="schedule.hourRange.startTime.HH" placeholder="Hora Inicio (HH)" min="0" max="23" required />
              <input type="number" class="form-control me-2" v-model.number="schedule.hourRange.startTime.mm" placeholder="Minuto Inicio (mm)" min="0" max="59" required />
              <input type="number" class="form-control me-2" v-model.number="schedule.hourRange.endTime.HH" placeholder="Hora Fin (HH)" min="0" max="23" required />
              <input type="number" class="form-control" v-model.number="schedule.hourRange.endTime.mm" placeholder="Minuto Fin (mm)" min="0" max="59" required />
            </div>
          </div>
          <!-- Agrega otros campos según sea necesario -->
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  </div>
</div>
<div v-if="showModal" class="modal-backdrop" @click="closeModal"></div>

  </div>
</template>


<script>
import headerComponent from "@/components/header-component.vue";

export default {
  name: "viewSchedules",
  components: { headerComponent },
  data() {
    return {
      data: [],
      selectedTeacher: {},
      schedules: [],
      showModal: false
    };
  },
  mounted() {
    this.fetchTeachersWithSchedules();
  },
  methods: {
    async fetchTeachersWithSchedules() {
      try {
        const response = await fetch('http://localhost:27017/api/teachersWithSchedules');
        const result = await response.json();
        this.data = result;
      } catch (error) {
        console.error('Error fetching teachers with schedules:', error);
      }
    },
    openModal(teacher) {
  this.selectedTeacher = teacher;
  this.fetchSchedules(teacher._id);
  console.log('Selected Teacher:', teacher); // Verifica el objeto teacher
  console.log('Fetching schedules for:', teacher._id);
  this.showModal = true;
},
    closeModal() {
      this.showModal = false;
    },
    async fetchSchedules(teacherId) {
  try {
    const response = await fetch(`http://localhost:27017/api/schedules/${teacherId}`);
    const result = await response.json();
    this.schedules = result.horario || []; // Asegúrate de que schedules siempre sea un array
    console.log('Fetched schedules:', this.schedules); // Verifica los horarios obtenidos
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
},
    async saveSchedules() {
      try {
        const response = await fetch('http://localhost:27017/api/updateSchedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            teacher: this.selectedTeacher._id,
            schedule: this.schedules
          })
        });
        if (response.ok) {
          alert('Horarios actualizados con éxito');
          this.closeModal();
        } else {
          alert('Error al actualizar horarios');
        }
      } catch (error) {
        console.error('Error updating schedules:', error);
      }
    },
    async deleteUser(user) {
  try {
    const response = await fetch(`http://localhost:27017/api/deleteSchedules/${user._id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Actualiza la interfaz de usuario si es necesario
      alert('Horarios eliminados con éxito');
    } else {
      alert('Error al eliminar horarios');
    }
  } catch (error) {
    console.error('Error deleting schedules:', error);
  }
}
  }
};
</script>
<style scoped>/* Estilos para el modal personalizado */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Para asegurarse de que esté sobre otros contenidos */
}

.modal-content {
  background: white;
  border-radius: 0.3rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 100%;
  max-width: 600px; /* Ajusta el ancho máximo según sea necesario */
  max-height: 80vh; /* Ajusta la altura máxima del modal */
  overflow: hidden; /* Evita el desbordamiento */
  position: relative; /* Permite posicionar el botón de cerrar dentro del modal */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0; /* Línea de separación */
  padding-bottom: 0.5rem;
  margin-bottom: 1rem; /* Espacio debajo del encabezado */
  position: relative;
}

.modal-body {
  overflow-y: auto; /* Añade scrollbar vertical si el contenido es demasiado largo */
  max-height: calc(80vh - 3rem); /* Ajusta la altura máxima del contenido del modal */
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute; /* Asegura que el botón esté siempre en la esquina superior derecha */
  top: 0.5rem;
  right: 0.5rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040; /* Para asegurarse de que esté detrás del modal */
}


</style>

