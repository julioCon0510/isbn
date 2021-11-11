<template>
  <!-- Modal -->
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              PRESTAR LIBRO - {{ isbnSelect }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label class="mb-2">Nombre de solicitante</label>
            <input class="form-control" v-model="text" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="savedata(text)"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal detalle -->
    <div
      class="modal fade"
      id="ModlaDetail"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              DETALLE DE PRESTAMO - {{ func.isbn }}
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <label for="">Solicitante</label>
                <input
                  type="text"
                  class="form-control m-1"
                  disabled
                  v-model="func.applicant"
                />
              </div>
              <div class="col-md-6">
                <label for="">Nombre libro</label>
                <input
                  type="text"
                  class="form-control m-1"
                  disabled
                  v-model="func.name"
                />
              </div>
              <div class="col-md-6">
                <label for="">Fecha de prestamo</label>
                <input
                  type="text"
                  class="form-control m-1"
                  disabled
                  v-model="func.dateInit"
                />
              </div>
              <div class="col-md-6">
                <label for="">Fecha max de entrega</label>
                <input
                  type="text"
                  class="form-control m-1"
                  disabled
                  v-model="func.dateFin"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "Books",
  props: ["isbnSelect"],
  data() {
    return {
      text: "",
    };
  },
  computed: {
    func() {
      let parser = JSON.parse(localStorage.getItem("data"));
      // alamcenar el prestamo
      let f = parser.filter((el) => el.isbn == this.isbnSelect);

      if (f.length > 0) {
        return f[0];
      } else {
        return [];
      }
    },
  },
  methods: {
    savedata(text) {
      if (text.trim() == "") {
        Swal.fire({
          title: "Campo requerido",
          text: "Por favor proporcionar el nombre del solicitante",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      let extraerNu = this.isbnSelect.replace(/\D/g, "");
      let arr = extraerNu.split("");
      let suma = 0;
      arr.forEach((element) => {
        suma += Number(element);
      });

      let contador = 0;
      // 05/24/2017
      let now = new Date();
      let dinit = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      // calcular que dia es domingo y dia habil de entrega
      while (contador < 15) {
        if (contador > 0) {
          let yesterdayMs = now.getTime() + 1000 * 60 * 60 * 24 * 1; //agregar un dia por cada recorrido
          now.setTime(yesterdayMs);
        }
        if (now.getDay() != 0) {
          contador += 1;
        }
      }
      let dfin = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      let parser = JSON.parse(localStorage.getItem("data"));

      // alamcenar el prestamo
      let f = parser.map((el) => {
        if (el.isbn == this.isbnSelect) {
          if (suma > 30) {
            el.dateInit = dinit;
            el.dateFin = dfin;
          }
          el.status = false;
          el.applicant = text;
        }
        return el;
      });
      localStorage.setItem("data", JSON.stringify(f));
      this.text = "";
      this.$router.go();
    },
  },
};
</script>