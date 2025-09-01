<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} Basile Audard. Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA-4.0</a> · Powered by <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No props or logic needed for now
</script>

<style scoped>
.footer {
  background: var(--panel);
  border-top: 1px solid var(--ring);
  padding: 2rem 0;
  margin-top: 4rem;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.footer-content p {
  color: var(--muted);
  font-size: 0.875rem;
  margin: 0;
  transition: color 0.3s ease;
}

.footer-content a {
  color: var(--accent);
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-content a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

/* Light theme footer */
html[style*="--bg: #ffffff"] .footer {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}
</style>
