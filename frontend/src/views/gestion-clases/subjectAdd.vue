<template>
    <div class="main-container">
        <headerComponent></headerComponent>
        <div class="content content-width" >
            <div class="form-group">
                <div class="mb-3">
                    <label for="carrera">Carrera</label>
                    <input type="text" class="form-control" v-model="name_career">
                </div>
            </div>

            <div class="form-group">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="carrera">No. Cuatrimestre</label>
                        <select class="form-control" id="subjectSelected" v-model="period">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="materia">Nemonico</label>
                        <select class="form-control" id="subjectSelected" v-model="short_name">
                            <option value="IDGS">IDGS</option>
                        </select>
                    </div>
                </div>
            </div>
        
        
            <div class="form-group mb-3">
                <div>
                    <label for="carrera">Materia</label>
                    <input type="text" class="form-control" v-model="name_subject">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <label for="materia">Objetivo de aprendizaje</label>
                    <input type="text" class="form-control form-objetive mb-3" v-model="objetive">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <button class="btn btn-outline-secondary btn-color" type="button" @click="registerSubject">Registrar materia</button>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
    import headerComponent from '@/components/header-component.vue';
    import 'bootstrap/dist/css/bootstrap.css';
    import {ref} from 'vue';
    import {store} from "@/stores/user-store.js"

    export default {
        name: "SubjectAdd",
        components: {headerComponent},
    
        setup() {
            const userStore = store();
            const name_career = ref("");
            const short_name = ref("");
            const period = ref("");
            const name_subject = ref("");
            const objetive = ref("");

            const registerSubject = async () => {
                try {
                    await userStore.newSubject(name_subject.value, name_career.value, short_name.value, objetive.value, period.value);
                    // Limpiar los campos después de un registro exitoso
                    name_subject.value = "";
                    name_career.value = "";
                    short_name.value = "";
                    objetive.value = "";
                    period.value = "";

                    // Puedes mostrar un mensaje de éxito al usuario si lo deseas
                    console.log("Materia registrada con éxito");
                } catch (error) {
                    // Mostrar un mensaje de error al usuario
                    console.log("Error al registrar la materia:", error);
                }
            };

            
            return{
                name_subject,
                name_career,
                short_name,
                objetive,
                period,
                registerSubject,
            }

        },


    };

    //Investigar para que sirve ref en vue
</script>

<style src="@/assets/css/style.css"></style>
