<!-- src/pages/internal/InternalLogin.vue -->
<template>
  <div class="login">
    <header class="top">
      <h1>Internal Login</h1>
      <p class="sub">Enter your credentials to access the intake dashboard.</p>
    </header>

    <form class="card" @submit.prevent="onSubmit">
      <label class="row">
        <span>Username</span>
        <input
          v-model.trim="user"
          type="text"
          autocomplete="username"
          required
        />
      </label>

      <label class="row">
        <span>Password</span>
        <input
          v-model.trim="pass"
          type="password"
          autocomplete="current-password"
          required
        />
      </label>

      <p v-if="err" class="error">{{ err }}</p>

      <button class="btn" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { login as authLogin } from "@/utils/auth";

const router = useRouter();
const route = useRoute();
const user = ref("");
const pass = ref("");
const err = ref("");

async function onSubmit() {
  const ok = await authLogin(user.value, pass.value); // uses utils/auth.js
  if (ok) {
    const dest = route.query.redirect || "/internal/intake";
    router.replace(String(dest));
  } else {
    err.value = "Invalid username or password.";
  }
}
</script>

<script>
// Give the component a multi-word name for ESLint happiness
export default {
  name: "InternalLoginPage",
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.login {
  max-width: 520px;
  margin: 0 auto;
  padding: ($sp-4 + $sp-2) $sp-3 $sp-4;
}

.top {
  margin-bottom: $sp-2;
  h1 {
    margin: 0;
  }
  .sub {
    margin: $sp-1 0 0;
    color: #555;
  }
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  background: #fff;
  padding: $sp-3;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.row {
  display: grid;
  gap: 0.35rem;
  margin-bottom: $sp-2;

  span {
    font-weight: 700;
  }
  input {
    font: inherit;
    padding: 0.55rem 0.7rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.6rem;
  }
}

.error {
  color: #8a1a1a;
  font-weight: 700;
  margin: 0 0 $sp-2 0;
}

.btn {
  display: inline-block;
  font-weight: 800;
  padding: 0.6rem 1rem;
  border-radius: 0.66rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: linear-gradient(#f9f5ee, #f7f1e8);
  cursor: pointer;
}
</style>
