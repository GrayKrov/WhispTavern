<template>
  <footer class="krov-footer" role="contentinfo">
    <div class="inner">
      <div class="rule"></div>
      <figure class="epigraph">
        <blockquote>
          Imagination builds worlds; code gives them life.
        </blockquote>
        <figcaption>— Krov</figcaption>
      </figure>
    </div>
  </footer>
</template>

<script setup>
// minimal
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.krov-footer {
  margin-top: 0;
  background: #111;
  color: #e8e8e8;
  padding: $sp-4 $sp-2 $sp-4;
}
.inner {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 $sp-2;
  text-align: center;
}
.rule {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  margin-bottom: $sp-3;
}
.epigraph {
  margin: 0;
  blockquote {
    margin: 0 0 0.35rem 0;
    font-family: ui-serif, Georgia, "Times New Roman", serif;
    font-style: italic;
    font-size: clamp(1.1rem, 1rem + 1vw, 1.6rem);
    color: #f0f0f0;
  }
  figcaption {
    opacity: 0.85;
    letter-spacing: 0.02em;
  }
}

@media (max-width: 768px) {
  .krov-footer {
    padding: $sp-3 $sp-2;
  }
}
@media (max-width: 640px) {
  .krov-footer {
    padding: $sp-3 $sp-1;
  }
}
</style>
