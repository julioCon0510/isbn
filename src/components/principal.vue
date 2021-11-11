<template>
  <div class="text-center fondo">
    <div class="views-d">
      <span>SISTEMA GESTIÓN DE BIBLIOTECA </span>
      <div class="d-grid gap-2 col-5 mx-auto pt-5">
        <input
          class="form-control text-uppercase"
          placeholder="Ingresar código ISBN"
          id="isbn"
          v-model="message"
        />
      </div>
      <div class="d-grid gap-2 col-2 mx-auto pt-5">
        <button
          class="btn btn-lg btn-light"
          @click="$router.push(`/search/${message}`)"
        >
          FILTRAR LIBRO/ VER TODOS
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Books",
  props: ["booksList"],
  data() {
    return { message: "" };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
.views-d {
  padding-top: 300px;
}
.views-d span {
  font-size: 60px;
  color: aliceblue;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
}
.btn.btn-lg.btn-light {
  opacity: 0.7;
}
#isbn::-webkit-input-placeholder {
  text-align: center;
}
</style>
