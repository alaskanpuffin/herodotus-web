<template>
  <form @submit.prevent="submitForm" novalidate="true" ref="form">
    <div class="row">
      <div class="col-12 form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>
      <div class="col-12 form-group">
        <label for="email">E-Mail Address</label>
        <input type="text" id="email" v-model="form.email" required />
      </div>
      <div class="col-6 form-group">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="form.first_name" />
      </div>
      <div class="col-6 form-group">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="form.last_name" />
      </div>
      <div class="col-6 form-group">
        <label>
        <input type="checkbox" v-model="form.is_staff" />
        Admin User
        </label>
      </div>
      <div class="col-12 form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button>
          <span v-if="submitLoading == false">Submit</span>
          <span v-if="submitLoading == true">
            <i class="fa fa-spinner fa-pulse"></i>
          </span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Pristine from "pristinejs";

export default {
  props: {
    form: Object,
    submitLoading: Boolean,
  },
  data: function () {
    return {
      scrapeLoading: false,
      pristine: null,
    };
  },
  methods: {
    submitForm: function () {
      if (this.pristine.validate() == true && this.submitLoading == false) {
        this.$parent.submitForm();
      }
    },
  },
  mounted() {
    this.pristine = new Pristine(
      this.$refs.form,
      { errorClass: "error" },
      true
    );
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  margin: 25px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgb(201, 201, 201);
  background-color: #fff;
  box-sizing: border-box;
  padding: 40px 60px;
  .divider {
    height: 1px;
    width: 100%;
    margin: 30px 0;
    background-color: rgb(238, 238, 238);
  }
}
.form-group.error textarea {
  border-bottom: solid rgb(224, 94, 94) 3px;
}
</style>