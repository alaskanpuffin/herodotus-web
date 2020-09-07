<template>
  <div class="nav">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/logo.png" />
      </router-link>
    </div>
    <div class="search">
      <input type="text" v-debounce:300ms="applySearch" v-model="search" placeholder="Search" />
    </div>
    <div class="links">
      <router-link to="/add" v-if="$store.state.userAuthenticated == true">
        <i class="fa fa-plus"></i>
      </router-link>
      <a v-if="$store.state.userAuthenticated == true">
        <i class="fa fa-users-cog"></i>
        <div class="dropdown">
          <router-link to="/settings/general">Settings</router-link>
          <a @click="logoutUser">Logout</a>
        </div>
      </a>
      <router-link to="/login" v-if="$store.state.userAuthenticated == false">
        <i class="fa fa-sign-in-alt"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Configuration from "@/configuration.js";

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "TheNavBar",
  data: function () {
    return {
      search: "",
    };
  },
  methods: {
    logoutUser: function () {
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };
      axios
        .post(`${apiRoot}/api/auth/logout/`, {}, config)
        .then(() => {
          this.$cookies.remove("token");
          this.$store.state.userAuthenticated = false;
          toastr.success("You have been logged out.");
        })
        .catch((error) => {
          console.log(error);
          toastr.error("An error has occured.");
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    applySearch: function () {
      if (this.$route.name != "SearchResults" && this.search != "") {
        this.$router.push("/search/");
      }
      this.$nextTick(() => {
      this.$store.state.search = this.search;
      });
    },
  },
  mounted() {
    if (this.$store.state.userAuthenticated == true) {
      var config = {
        headers: {
          Authorization: "Token " + this.$cookies.get("token"),
        },
      };

      axios.options(`${apiRoot}/checktoken/`, config).catch((error) => {
        if (error.response.status == 401) {
          this.$cookies.remove("token");
          this.$store.state.userAuthenticated = false;
          this.$router.push("/");
          toastr.error(
            "Your authentication token has expired, please login again."
          );
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
$nav-background: #fff;

.nav {
  width: 100%;
  height: 70px;
  box-shadow: 0 0 10px rgb(190, 190, 190);
  background-color: $nav-background;
  div {
    float: left;
  }
  .logo {
    height: 70px;
    img {
      height: 40px;
      margin: 15px 30px;
    }
  }
  .search {
    width: calc(70% - 280px);
    min-width: 300px;
    input {
      width: 100%;
      background-color: darken($nav-background, 5);
      border: none;
      height: 40px;
      margin: 15px 0;
      border-radius: 3px;
      font-size: 20px;
      padding: 0 15px;
      box-sizing: border-box;
      transition: 0.3s;
      &:focus {
        background-color: darken($nav-background, 3);
      }
    }
  }
  .links {
    float: right;
    a {
      line-height: 70px;
      height: 70px;
      display: inline-block;
      padding: 0 15px;
      font-size: 25px;
      color: rgb(26, 26, 26);
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background-color: darken($nav-background, 3);
      }
      & .dropdown {
        display: none;
        position: absolute;
        right: 0;
        background-color: $nav-background;
        z-index: 999;
        a {
          display: block;
          font-size: 20px;
          height: 50px;
          line-height: 50px;
        }
      }
      &:hover .dropdown {
        display: block;
      }
    }
  }
}
</style>