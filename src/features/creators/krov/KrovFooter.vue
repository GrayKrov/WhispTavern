<!-- src/features/creators/krov/KrovFooter.vue -->
<template>
  <footer class="krov-footer" role="contentinfo" aria-label="Krov footer">
    <div class="inner">
      <figure class="epigraph">
        <blockquote>
          <span class="mark left">“</span>
          Imagination builds worlds; code gives them life.
          <span class="mark right">”</span>
        </blockquote>
        <figcaption>— Krov</figcaption>
      </figure>
    </div>
  </footer>
</template>

<script setup>
// nothing needed
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

/* -------- Footer shell -------- */
.krov-footer {
  position: relative;
  background: #111; /* deep charcoal */
  color: #e9e9e9;
  padding: $sp-4 $sp-2;
  margin-top: $sp-4;
  overflow: hidden;
  isolation: isolate; /* keep pseudo-elements contained */

  /* subtle architectural grid */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background: repeating-linear-gradient(
        to right,
        #fff 0,
        #fff 1px,
        transparent 1px,
        transparent 14px
      ),
      repeating-linear-gradient(
        to bottom,
        #fff 0,
        #fff 1px,
        transparent 1px,
        transparent 14px
      );
    pointer-events: none;
  }

  /* top hairline accent */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.25) 15%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.25) 85%,
      transparent 100%
    );
    opacity: 0.7;
  }
}

/* -------- watermark sigil (bottom-right) -------- */
.krov-footer .inner::after {
  content: "";
  position: absolute;
  right: $sp-3;
  bottom: $sp-2;
  width: 72px;
  height: 72px;
  background: url("@/assets/logos/krov-logo.png") center/contain no-repeat;
  filter: grayscale(1) contrast(1.05) brightness(1.1);
  opacity: 0.08; /* faint */
  pointer-events: none;
}

/* -------- content container -------- */
.inner {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 $sp-2;
  text-align: center;
}

/* -------- epigraph (quote + author) -------- */
.epigraph {
  margin: 0;
}

.epigraph blockquote {
  position: relative;
  margin: 0 0 $sp-2 0;
  font-family: "Georgia", serif;
  font-style: italic;
  font-size: clamp(1.1rem, 1rem + 1vw, 1.5rem);
  line-height: 1.5;
  color: #f0f0f0;
  display: inline-block;
  padding: $sp-2 $sp-3;

  /* subtle inner rule lines for structure */
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: $sp-2;
    right: $sp-2;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
}

/* oversized quotation marks */
.mark {
  position: relative;
  display: inline-block;
  font-size: 1.5em;
  line-height: 0;
  vertical-align: -0.15em;
  color: #dcdcdc;
  opacity: 0.65;
}
.mark.left {
  margin-right: 0.125em;
}
.mark.right {
  margin-left: 0.125em;
}

/* author */
.epigraph figcaption {
  color: #cfcfcf;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: 0.95rem;
  opacity: 0.9;
}

/* -------- responsive polish -------- */
@include respond(md) {
  .krov-footer {
    padding: $sp-3 $sp-2;
  }
  .krov-footer .inner::after {
    width: 64px;
    height: 64px;
  }
}

@include respond(sm) {
  .krov-footer {
    padding: $sp-3 $sp-1;
  }
  .krov-footer .inner::after {
    width: 56px;
    height: 56px;
    right: $sp-2;
  }
  .epigraph blockquote {
    padding: $sp-2 $sp-2;
  }
}
</style>
