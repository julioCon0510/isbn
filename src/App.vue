<template>
  <div class="fondo" id="app">
    <div id="header"></div>
    <!-- <Principal v-bind:booksList="copyData" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Principal from "./components/principal.vue";
// import Modal from "./components/modlal.vue";

export default {
  name: "App",
  components: {
    // Principal,
  },
  data() {
    return {
      books: [
        {
          isbn: "A874B69Q",
          name: "Libro 1",
          status: "Disponible",
        },
        {
          isbn: "T878B85Z",
          name: "Libro 2",
          status: "Disponible",
        },
      ],
      copyData: [],
    };
  },
  created() {
    this.copyData = [...this.books];
  },
};
</script>

<style >
.fondo {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://cdn.cnn.com/cnnnext/dam/assets/181019231020-longo-libros-pagni-full-169.jpg");
  /* text-align: center; */
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  height: 100vh;
}
</style>

