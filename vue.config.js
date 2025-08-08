// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "/src/assets/styles/_vars.scss"      as *;
          @use "/src/assets/styles/_mixins.scss"    as *;
          @use "/src/assets/styles/_functions.scss" as *;
        `,
      },
    },
  },
};
