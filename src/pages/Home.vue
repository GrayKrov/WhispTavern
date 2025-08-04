<template>
  <div class="home-page">
    <img
      src="@/assets/images/BannerTop.jpg"
      class="banner"
      alt="Community Banner"
    />
    <section class="about">
      <h1>About Us</h1>
      <p>
        Welcome to WhispTavern — where communities gather, stories are shared,
        and creators thrive.
      </p>
      <h2>Our Mission</h2>
      <p>
        To provide a cozy, supportive platform for creators and communities to
        express, connect, and grow.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped lang="scss">
.banner {
  display: block;
  margin: 2rem auto;
  max-width: 90%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.about {
  padding: 2rem;
  text-align: center;
}
</style>
