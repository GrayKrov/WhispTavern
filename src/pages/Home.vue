<template>
  <div class="home-page">
    <img
      src="@/assets/images/BannerTop.jpg"
      class="banner"
      alt="Community Banner"
    />
    <section class="about">
      <h1>About Us & Our Mission</h1>
      <p>
        WhispTavern is a cozy, all-in-one community built around friendship,
        creativity, and shared passions. From late-night gaming sessions and
        immersive roleplay worlds to collaborative storytelling and custom
        creations, we’re a home for those who thrive in good company and deep
        lore.
      </p>
      <p>
        Our community comes together around games like REPO, League of Legends,
        Among Us, and a rotating mix of party and co-op games—whatever brings
        the most laughs and good times. Whether it’s a one-shot D&D night or a
        new group discovery, there’s always something brewing.
      </p>
      <p class="mission">
        <strong>Our mission is simple:</strong><br />
        Foster meaningful connections through games, stories, and shared
        imagination—while keeping it real, cozy, and fun.
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
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.5rem 1rem 2rem; // ✅ increased top padding to clear fixed navbar
}

.banner {
  display: block;
  margin: 1.5rem auto 1rem;
  max-width: 85%;
  max-height: 220px;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.about {
  max-width: 720px;
  padding: 1.5rem 1rem;
  background-color: #f7f3e9;
  border-radius: 1rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  font-family: "Georgia", serif;
  color: #3a2b1c;
  line-height: 1.6;
  text-align: center;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-family: "Palatino Linotype", "Book Antiqua", serif;
    color: #4e3a27;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .mission {
    font-style: italic;
    font-size: 1.05rem;
    color: #3e2a1c;
  }
}

@media (max-width: 768px) {
  .banner {
    max-width: 95%;
    max-height: 180px;
  }

  .about {
    padding: 1.25rem 1rem;

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }

    .mission {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .banner {
    max-height: 150px;
  }

  .about {
    padding: 1rem 0.75rem;

    h1 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.9rem;
    }

    .mission {
      font-size: 0.95rem;
    }
  }
}
</style>
