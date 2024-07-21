<template>
    <headerComponent></headerComponent>
    <head>
        <title>Horarios</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- DataTable -->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.datatables.net/buttons/2.3.3/css/buttons.bootstrap5.min.css"
    />
    <!-- Bootstrap-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    />
    <!-- Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
<div class="main-container content padding">
  <div class="container my-5">
      <router-link :to="{ name: 'schedulesAdd' }" class="btn btn-sm btn-success">Nuevo Horario</router-link>
      <div class="row">
        <table id="example" class="table table-striped" style="width: 100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in data" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name+ " " + user.lastname }}</td>
              <td>
                <button class="btn btn-sm btn-secondary">
                  <i class="fa-solid fa-pencil" ></i>
                </button>
                <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can" @click="deleteUser(user)"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
  </body>

  </template>
  
  <script>

import "datatables.net";
import "datatables.net-bs5";
import headerComponent from "@/components/header-component.vue";


export default {
  name: "viewSchedules",
  components: { headerComponent },
  setup() {
  }}
</script>
<style src="@/assets/css/style.css"></style>
  