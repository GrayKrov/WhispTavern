<template>
  <main class="notfound">
    <h1>Lost in the woods</h1>
    <p>You took a wrong turn past the mossy signpost.</p>
    <div class="actions">
      <RouterLink class="btn btn--primary" to="/">Back to Home</RouterLink>
      <RouterLink class="btn btn--ghost" to="/community"
        >Visit the Community</RouterLink
      >
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "NotFoundPage",
  components: { RouterLink },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.notfound {
  min-height: calc(100vh - 6rem);
  display: grid;
  place-content: center;
  text-align: center;
  padding: $sp-4;
}
h1 {
  margin: 0 0 $sp-2;
}
p {
  margin: 0 0 $sp-3;
  color: #4b3f33;
}
.actions {
  display: inline-flex;
  gap: $sp-2;
  flex-wrap: wrap;
  justify-content: center;
}

/* Buttons reuse your Community/Home styles */
.btn {
  display: inline-block;
  padding: $sp-2 $sp-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.btn--primary {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}
.btn--ghost {
  background: rgba(0, 0, 0, 0.06);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.08);
}
</style>
