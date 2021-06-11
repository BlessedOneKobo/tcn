<script>
export default {
  data() {
    return {
      errorData: {
        username: "",
        password: "",
        general: "",
      },
      formData: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    buttonText() {
      return this.loading ? "Loading..." : "Login";
    },
  },
  methods: {
    async logIn() {
      if (this.loading) {
        return;
      }

      this.errorData.username = this.validate("username");
      this.errorData.password = this.validate("password");

      if (this.errorData.username || this.errorData.password) {
        return;
      }

      this.loading = true;
      const response = await fetch("http://193.148.63.148:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const json = await response.json();
      this.loading = false;

      if (!response.ok) {
        this.errorData.general = json.message;
        return;
      }

      localStorage.setItem("tcn-accessToken", json.token);
      this.$router.push({ name: "Home" });
    },
    validate(modelName) {
      if (this.formData[modelName]) {
        return "";
      }

      return "Required";
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="login-card">
      <h2>Login</h2>
      <p>{{ errorData.general }}</p>
      <form @submit.prevent="logIn" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model.trim="formData.username"
            id="username"
            :disabled="loading"
            @input="errorData.username = validate('username')"
          />
          <small>{{ errorData.username }}</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model.trim="formData.password"
            id="password"
            :disabled="loading"
            @input="errorData.password = validate('password')"
          />
          <small>{{ errorData.password }}</small>
        </div>
        <div>
          <button :disabled="loading">{{ buttonText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.25em;
}
.login-card {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 2em 4em;
}
h2 {
  text-align: center;
}
.form-group {
  font-size: 1.125em;
  margin-bottom: 1em;
}
input {
  border: 0;
  padding: 0.35em;
}
button {
  min-width: 6em;
  color: #fff;
  background-color: #778495;
  font-weight: bold;
  text-transform: uppercase;
}
button[disabled] {
  pointer-events: none;
  cursor: default;
  opacity: 0.4;
}
small {
  display: block;
  color: red;
  margin-top: 0.25em;
  font-size: 0.75em;
}
</style>
