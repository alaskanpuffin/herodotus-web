<template>
  <div id="tag-card">
    <div id="title-block" v-if="edit == false">
      <h2 :style="'background-color: ' + tag.color + '; color: ' + color + ';'">
        {{ tag.title }}
      </h2>
    </div>
    <div v-else>
      <input type="text" v-model="tag.title" id="title" />
      <input type="text" v-model="tag.color" id="color" placeholder="#FFFFFF" />
    </div>
    <div id="actions" v-if="edit == false">
      <a @click="editTag">
        <i class="fa fa-pen"></i>
      </a>
      <a id="delete-tag" @click="deleteTag">
        <i v-if="loading == false" class="fa fa-trash"></i>
        <i v-if="loading == true" class="fa fa-spinner fa-pulse"></i>
      </a>
    </div>
    <div id="actions" v-else>
      <a @click="confirmEdit">
        <i v-if="editloading == false" class="fa fa-check"></i>
        <i v-if="editloading == true" class="fa fa-spinner fa-pulse"></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Configuration from "@/configuration.js";
import contrast from "contrast";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "TagCard",
  props: ["tag"],
  data: function () {
    return {
      loading: false,
      editloading: false,
      edit: false,
    };
  },
  computed: {
    color: function () {
      if (!this.tag.color || contrast(this.tag.color) === "light") {
        return "#000";
      } else {
        return "#fff";
      }
    },
  },
  methods: {
    deleteTag: function () {
      if (this.loading == false) {
        if (confirm("Are you sure you want to delete this tag?") == true) {
          this.loading = true;
          var config = {
            headers: {
              Authorization: "Token " + this.$cookies.get("token"),
            },
          };
          axios
            .delete(`${apiRoot}/tag/${this.tag.id}/`, config)
            .then(() => {
              toastr.success("The user was successfully deleted.");
              this.$emit("remove");
            })
            .catch((error) => {
              console.log(error);
              toastr.error("An error has occured.");
            })
            .then(() => {
              this.loading = false;
            });
        }
      }
    },
    editTag: function () {
      this.edit = true;
    },
    confirmEdit: function () {
      this.editloading = true;
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .put(`${apiRoot}/tag/${this.tag.id}/`, this.tag, config)
        .then(() => {
          toastr.success("The tag was successfully updated.");
          this.edit = false;
        })
        .catch((error) => {
          console.log(error);
          toastr.error("An error has occured.");
        })
        .then(() => {
          this.editloading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#title {
  width: 150px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
#color {
  width: 100px;
  height: 30px;
  line-height: 30px;
}
#tag-card {
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 3px rgb(204, 204, 204);
  padding: 10px 20px;
  margin-top: 15px;
  position: relative;
  h2 {
    height: 30px;
    line-height: 30px;
    width: fit-content;
    background-color: rgb(230, 230, 230);
    color: #000;
    display: block;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 18px;
  }
  input[type="text"] {
    height: 30px !important;
  }
  #actions {
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    a {
      width: 30px;
      height: 30px;
      margin: 10px 0;
      margin-right: 20px;
      display: inline-block;
      background-color: rgb(230, 230, 230);
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      color: #000;
    }
  }
}
</style>