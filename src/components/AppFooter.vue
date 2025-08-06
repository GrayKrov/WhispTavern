<template>
  <footer :class="['footer', { 'transparent-footer': isTransparent }]">
    <p>&copy; 2025 WhispTavern. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  props: {
    isTransparent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  background-color: #3c2f2f;
  color: #f1eae0;
  text-align: center;
  padding: 1rem;
  font-size: 0.95rem;
  font-family: "Georgia", serif;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.transparent-footer {
  background-color: transparent !important;
  box-shadow: none;
}

@media (max-width: 768px) {
  .footer {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .footer {
    font-size: 0.85rem;
    padding: 0.65rem;
  }
}
</style>
