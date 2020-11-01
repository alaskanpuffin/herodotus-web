<template>
  <div id="nav">
    <router-link to="/settings/general">General</router-link>
    <router-link to="/settings/tags">Tags</router-link>
    <router-link to="/settings/users">Users</router-link>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  width: 100%;
  a {
      display: block;
      padding: 20px 40px;
      font-size: 25px;
      font-weight: bold;
      text-decoration: none;
      color: rgb(31, 31, 31);
      transition: 0.3s;
      &:hover {
          background-color: rgb(245, 245, 245);
      }
      &:not(:last-child) {
          border-bottom: solid rgb(223, 223, 223) 1px;
      }
  }
}
</style>