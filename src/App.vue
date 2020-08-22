<template>
  <div id="app">
    <div class="nav">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/logo.png" />
        </router-link>
      </div>
      <div class="search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="links">
        <router-link to="/add">
          <i class="fa fa-plus"></i>
        </router-link>
        <a href="#">
          <i class="fa fa-users-cog"></i>
        </a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./assets/css/style.scss";

.nav {
  width: 100%;
  height: 70px;
  box-shadow: 0 0 10px rgb(190, 190, 190);
  background-color: $nav-background;
  div {
    float: left;
  }
  .logo {
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
      &:hover {
        background-color: darken($nav-background, 3);
      }
    }
  }
}
</style>
