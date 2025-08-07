<!-- src/features/creators/krov/KrovNavBar.vue -->
<template>
  <nav class="krov-navbar">
    <div class="logo">KROV</div>
    <ul class="links">
      <li><a href="/">Home</a></li>
      <li><a href="/community">Community</a></li>
    </ul>
  </nav>
</template>

<script setup>
// no props
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.krov-navbar {
  display: flex;
  justify-content: space-between;
  background: #111;
  padding: $sp-2 $sp-3;
  color: #eee;
  font-family: "Inter", sans-serif;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .links {
    display: flex;
    gap: $sp-4;

    a {
      color: #ccc;
      text-decoration: none;
      font-weight: 500;
      @include transition(color);

      &:hover {
        color: #fff;
      }
    }
  }
}

@include respond(sm) {
  .krov-navbar {
    flex-direction: column;
    align-items: flex-start;

    .links {
      margin-top: $sp-2;
      gap: $sp-2;
    }
  }
}
</style>
