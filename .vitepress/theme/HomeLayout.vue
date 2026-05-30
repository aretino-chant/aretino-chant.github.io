<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-features-before>
      <div class="home-try-it">
        <h2>Try it</h2>
        <p>Edit the source below — the notation updates as you type.</p>
        <AretinoEditor source="KGcyKSBnIGEgYiBnLiBhYiBhIGcgZV9kXyAsIGcgYWIgYWcgZy4gfHwKdzogQWwtbGUtbHUtaWEsIGFsLWxlLWx1LWlhLCBhbC1sZS1sdS1pYS4=" />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.home-try-it {
  max-width: var(--vp-layout-max-width, 1280px);
  margin: 0 auto;
  padding: 40px 24px 0;
}

@media (min-width: 768px) {
  .home-try-it {
    padding: 56px 48px 0;
  }
}

.home-try-it h2 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  border: none;
  padding: 0;
}

.home-try-it p {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}
</style>
