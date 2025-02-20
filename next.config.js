const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    turbo: {
      loaders: {
        // Configure any specific loaders if needed
      },
      resolveAlias: {
        // Add any module aliases if needed
      }
    }
  }
});
