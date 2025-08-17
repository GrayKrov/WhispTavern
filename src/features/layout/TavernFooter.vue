<!-- src/features/layout/TavernFooter.vue -->
<template>
  <footer class="footer">
    <div class="inner">
      <div class="brand-line" aria-label="WhispTavern footer brand">
        <CrestBadge class="crest" :size="22" />
        <span class="wordmark">WHISPTAVERN</span>
        <CrestBadge class="crest" :size="22" />
      </div>
      <p class="fine">© {{ year }} WhispTavern — Made with camaraderie.</p>
    </div>
  </footer>
</template>

<script setup>
import CrestBadge from "@/components/CrestBadge.vue";
const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
@use "@/assets/styles/tokens" as t;

.footer {
  background: linear-gradient(#efe9e1, #eae2d8);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.15) inset;
}
.inner {
  max-width: t.$container-max;
  margin: 0 auto;
  padding: t.$space-6 t.$space-3;
  text-align: center;
}
.brand-line {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}
.wordmark {
  letter-spacing: 0.35em;
  font-weight: 800;
  color: #6a5a4b;
}
.fine {
  margin: t.$space-3 0 0;
  opacity: 0.7;
}

/* Responsiveness */
@media (max-width: 560px) {
  .brand-line {
    gap: 0.5rem;
    padding: 0.5rem 0.8rem;
  }
  .wordmark {
    letter-spacing: 0.28em;
    font-size: 0.9rem;
  }
}
@media (max-width: 400px) {
  .brand-line {
    padding: 0.45rem 0.7rem;
  }
  .wordmark {
    letter-spacing: 0.22em;
    font-size: 0.85rem;
  }
}
@media (max-width: 340px) {
  .brand-line {
    gap: 0.4rem;
  }
  .crest {
    transform: scale(0.9);
  }
  .wordmark {
    letter-spacing: 0.18em;
    font-size: 0.8rem;
  }
}
</style>
