const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Configure any specific rules if needed
        '*.mdx': ['mdx-loader']
      },
      resolveAlias: {
        // Add any module aliases if needed
      }
    }
  }
});
