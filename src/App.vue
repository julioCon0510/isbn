<template>
  <div class="fondo" id="app">
    <div id="header"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import data from "./assets/books.json";
export default {
  name: "App",
  components: {
    // Principal,
  },
  created() {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(data.books));
    }
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
