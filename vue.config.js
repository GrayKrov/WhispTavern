// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/_vars.scss" as *;
          @use "@/assets/styles/_mixins.scss" as *;
          @use "@/assets/styles/_functions.scss" as *;
        `,
      },
    },
  },
};
