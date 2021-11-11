<template>
  <div>
    <div class="container">
      <br />
      <br />
      <br />
      <br />
      <Modals v-bind:isbnSelect="isb" />
      <button class="btn btn-lg btn-light mb-3" @click="$router.push(`/`)">
        Inicio
      </button>
      <div class="card p-3">
        <h3>Listado de libros</h3>
        <div class="d-grid gap-2 col-5">
          <input
            class="form-control"
            placeholder="Ingresar código ISBN"
            id="isbn"
            v-model="text"
            @input="filter(text)"
            autocomplete="off"
          />
        </div>
        <br />
        <table class="table table-striped table-hover p-4">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>NOMBRE DEL LIBRO</th>
            </tr>
          </thead>
          <tbody v-bind:key="book.id" v-for="book in b">
            <tr>
              <td width="30%">{{ book.isbn }}</td>
              <td width="30%">{{ book.name }}</td>
              <td width="30%" class="text-left">
                <div v-if="book.status === true">
                  <button @click="provide(book.isbn)" class="btn btn-primary">
                    Prestar
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-danger" @click="detail(book.isbn)">
                    Ver detalle
                  </button>
                  <button
                    class="btn btn-success"
                    @click="bookReceipt(book.isbn)"
                  >
                    Recibir libro
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import data from "../assets/books.json";
import Modals from "./modal.vue";
export default {
  components: { Modals },
  data() {
    return {
      data,
      text: "",
      b: [],
      isb: 0,
    };
  },
  created() {
    let URL = window.location.hash;
    const arrayUrl = URL.split("/");
    const isbn = arrayUrl[2];
    this.text = isbn;
    this.filter(isbn);
    // localStorage.removeItem('data');

    if (localStorage.getItem("data") == null) {
      localStorage.setItem("data", JSON.stringify(this.data.books));
      console.log("null");
    }
  },
  methods: {
    filter(isbn) {
      let parse = JSON.parse(localStorage.getItem("data"));
      // let parse = this.data.books;
      if (isbn == "") {
        this.b = [...parse];
      } else {
        isbn = isbn.toLowerCase();
        let tem = parse.map((el) => {
          let status = false;
          for (const key in el) {
            if (el[key] !== "" && el[key] != true) {
              if (key == "name" || key == "isbn") {
                let cam = el[key].toLowerCase();
                if (cam.indexOf(isbn) !== -1) {
                  status = true;
                }
              }
            }
          }
          if (status) {
            return el;
          } else {
            return null;
          }
        });
        this.b = tem.filter(Boolean);
      }
    },
    provide(isbn) {
      let palindrome = isbn.split("").reverse().join("");
      // saber si es palindromo
      if (palindrome == isbn) {
        Swal.fire({
          title: "No permitido",
          text: "Los libros palíndromos solo se pueden utilizar en la biblioteca",
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        return null;
      }
      this.isb = isbn;
      const myModal = new Modal(document.getElementById("staticBackdrop"), {
        backdrop: true,
      });
      myModal.show();
      //   *******
    },
    bookReceipt(isbn) {
      Swal.fire({
        title: "Entrega de libro",
        text: "¿Desea recibir el libro ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, recibir!",
      }).then((result) => {
        if (result.isConfirmed) {
          let parser = JSON.parse(localStorage.getItem("data"));

          let f = parser.map((el) => {
            if (el.isbn == isbn) {
              el.dateInit = "";
              el.dateFin = "";
              el.status = true;
              el.applicant = "";
            }
            return el;
          });
          Swal.fire(
            "Correcto!",
            "El libro a sido recibido correctamente.",
            "success"
          );
          localStorage.setItem("data", JSON.stringify(f));
          setTimeout(() => {
            this.$router.go();
          }, 1000);
        }
      });
    },
    detail(isbn) {
      this.isb = isbn;
      const myModal = new Modal(document.getElementById("ModlaDetail"), {
        backdrop: true,
      });
      myModal.show();
    },
  },
};
</script>