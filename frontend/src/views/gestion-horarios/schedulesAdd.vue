<template>
    <headerComponent></headerComponent>
    <head>
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
                    <th>Horario</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Horario">8:00 - 8:50</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">8:50 - 9:40</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">RECESO</td>
                </tr>
                <tr>
                    <td data-label="Horario">10:00 - 10:50</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">10:50 - 11:40</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">11:40 - 12:30</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">12:30 - 13:20</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">13:20 - 14:10</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
                <tr>
                    <td data-label="Horario">14:10 - 15:00</td>
                    <td data-label="Lunes" class="editable"></td>
                    <td data-label="Martes" class="editable"></td>
                    <td data-label="Miércoles" class="editable"></td>
                    <td data-label="Jueves" class="editable"></td>
                    <td data-label="Viernes" class="editable"></td>
                </tr>
            </tbody>
        </table>
    </section>

   <button id="save">Guardar</button>

    

    
<div id="modal_horarios" class="modal_horarios">
    <div class="modal-horarios-content">
        <span class="close">&times;</span>
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
        <button id="save-changes">Guardar Cambios</button>
    </div>
</div>
</div>
</body>
  </template>
  
  <script>
import headerComponent from '@/components/header-component.vue';

  //import { store } from "@/stores/user-store";
  export default {
    name: "schedulesAdd",
components: {headerComponent},
  
  
    setup() {
        document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal_horarios");
    const closeBtn = document.querySelector(".close");
    const saveChangesBtn = document.getElementById("save-changes");

    let selectedCell = null;

    // Agregar un evento clic a las celdas editables para abrir el modal
    const editableCells = document.querySelectorAll(".editable");
    editableCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            modal.style.display = "block";
            selectedCell = cell;
        });
    });

    // Evento clic para cerrar el modal al hacer clic en el botón "Cerrar" (X)
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Evento clic para guardar los cambios y actualizar las celdas
    saveChangesBtn.addEventListener("click", () => {
        if (selectedCell) {
            const subjectInput = document.getElementById("subject");
            const gradeInput = document.getElementById("grade");
            const groupInput = document.getElementById("group");
            //const teacherInput = document.getElementById("teacher");
            const careerInput = document.getElementById("career");
            const buildInput = document.getElementById("build");
            const formattedContent = `${subjectInput.value}\n${gradeInput.value}°${groupInput.value} - ${careerInput.value}\n${buildInput.value}`;
            selectedCell.innerHTML = `<pre>${formattedContent}</pre>`;
            
            modal.style.display = "none";

            // Limpiar los campos del modal después de guardar los cambios
            subjectInput.value = "";
            gradeInput.value = "";
            groupInput.value = "";
            careerInput.value = "";
            buildInput.value = "";

            selectedCell = null;
        }
    });
});

     
  
      return{

      }
      
    },
  
  
  };
  </script>
  <style src="@/assets/css/style.css"></style>
  