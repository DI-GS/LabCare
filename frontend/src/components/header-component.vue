<template>
  <body>
    <!-- navbar -->
    <nav class="navbar">
      <div class="logo_item">
        <i class="bx bx-menu" id="sidebarOpen"></i>
        <span class="logo-lab">Lab</span><span class="logo-care">Care</span>
      </div>

      <div class="navbar_content">
        <i class="bi bi-grid"></i>
        <i class='' id="darkLight"></i>
      </div>
    </nav>

    <!-- sidebar -->
    <nav class="sidebar">
      <div class="menu_content">
        <ul class="menu_items">
          <div class="menu_title menu_dahsboard"></div>
        </ul>

        <ul class="menu_items">
          <li class="item">
            <router-link class="navlink" :to="{name: 'ViewUsers'}"><a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-user-circle"></i>
              </span>
              <span class="navlink">Usuarios</span>
            </a></router-link>
</li>

<li class="item">
            <router-link class="navlink" :to="{name: 'ViewPago'}"><a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-calendar"></i>
              </span>
              <span class="navlink">Pagos</span>
            </a></router-link>
</li>
          <!-- End -->

          <li class="item">
            <router-link class="navlink" :to="{name: 'schedulesView'}"><a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-calendar"></i>
              </span>
              <span class="navlink">Horarios</span>
            </a></router-link>
          </li>
         <li class="item">
            <router-link class="navlink" :to="{name: 'ViewClassrooms'}" ><a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-home-alt-2"></i>
              </span>
              <span class="navlink">Aulas</span>
            </a></router-link>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-id-card"></i>
              </span>
              <span class="navlink">Tarjetas</span>
            </a>
          </li>
          <li class="item">
            <router-link class="navlink" :to="{name: 'subjectSheetsView'}"><a href="#" class="nav_link"></a>
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-note"></i>
              </span>
              <span class="navlink">Hojas de asignatura</span>
            </a></router-link>
          </li>
          <li class="item">
            <router-link class="navlink" :to="{name: 'subjectView'}"><a href="#" class="nav_link"></a>
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-spreadsheet"></i>
              </span>
              <span class="navlink">Materias</span>
            </a></router-link>
          </li>
        </ul>

        <ul class="menu_items">
          <div class="menu_title menu_analisis"></div>
        </ul>
        <ul class="menu_items">
        <li class="item">
          <a href="#" class="nav_link">
            <span class="navlink_icon">
              <i class="bx bx-notepad"></i>
            </span>
            <span class="navlink">Informes</span>
          </a>
        </li>
        <li class="item">
          <router-link class="navlink" :to="{name: 'ViewGraphics'}"><a href="#" class="nav_link"></a>
          <a href="#" class="nav_link">
            <span class="navlink_icon">
              <i class="bx bx-bar-chart-alt-2"></i>
            </span>
            <span class="navlink">Estadísticas</span>
          </a></router-link>
        </li>
      </ul>

        <ul class="menu_items">
          <div class="menu_title menu_setting"></div>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-user-circle"></i>
              </span>
              <span class="navlink">Configuración</span>
            </a>
          </li>
        </ul>

        <!-- Sidebar Open / Close -->
        <div class="bottom_content">
          <div class="bottom expand_sidebar">
            <span> Anclar</span>
            <i class='bx bx-log-in' ></i>
          </div>
          <div class="bottom collapse_sidebar">
            <span> Ocultar</span>
            <i class='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
  </body>
</template>

<script>
import { store } from "@/stores/user-store";
import { onMounted} from "vue";
import { useRouter } from "vue-router";
export default {
  name: "headerComponent",


  setup() {
    const userStore = store();
    const router = useRouter();

   const salir=()=>{
      userStore.logout()
      router.push("/home");
    }

    const searchAside=()=>{
    const body = document.querySelector("body");
    const darkLight = document.querySelector("#darkLight");
    const sidebar = document.querySelector(".sidebar");
    const submenuItems = document.querySelectorAll(".submenu_item");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    const sidebarExpand = document.querySelector(".expand_sidebar");
    sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

    sidebarClose.addEventListener("click", () => {
      sidebar.classList.add("close", "hoverable");
    });
    sidebarExpand.addEventListener("click", () => {
      sidebar.classList.remove("close", "hoverable");
    });

    sidebar.addEventListener("mouseenter", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    });
    sidebar.addEventListener("mouseleave", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    });

    darkLight.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        document.setI;
        darkLight.classList.replace("bx-sun", "bx-moon");
      } else {
        darkLight.classList.replace("bx-moon", "bx-sun");
      }
    });

    submenuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.classList.toggle("show_submenu");
        submenuItems.forEach((item2, index2) => {
          if (index !== index2) {
            item2.classList.remove("show_submenu");
          }
        });
      });
    });

    if (window.innerWidth < 768) {
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
        }

    onMounted(()=> {
    searchAside();
  })

    return{
      searchAside,
      salir,
    }
    
  },


};
</script>

<style src="@/assets/css/style.css"></style>
