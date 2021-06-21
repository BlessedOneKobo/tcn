<script>
import { LOGIN_ADDR, STORAGE_KEY } from "@/constants";
import { RouteEnum } from "@/router";

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

      this.errorData.general = "";
      this.loading = true;

      let response;
      let json;

      try {
        response = await fetch(LOGIN_ADDR, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });
        json = await response.json();

        if (!response.ok) {
          throw new Error(json.message);
        }

        localStorage.setItem(STORAGE_KEY, json.token);
        this.$router.push(RouteEnum.HOME);
      } catch (err) {
        this.errorData.general =
          err.message || "Could not log in. Please try again";
      }

      this.loading = false;
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
      <p v-if="errorData.general" class="error general">
        {{ errorData.general }}
      </p>
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
          <small class="error">{{ errorData.username }}</small>
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
          <small class="error">{{ errorData.password }}</small>
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
form {
  margin: 0 auto;
  max-width: 60%;
  text-align: center;
}
.error {
  display: block;
  color: red;
}
.error.general {
  padding: 1em;
  background-color: #fff;
  margin: 2em auto;
  text-align: center;
  max-width: 75%;
}
.error:not(:.general) {
  margin-top: 0.25em;
  font-size: 0.75em;
}
</style>
