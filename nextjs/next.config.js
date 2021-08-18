module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Needed by zx
    config.experiments = { topLevelAwait: true }
    return config
  },
}
