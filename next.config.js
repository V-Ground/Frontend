const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      NEXT_PUBLIC_BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [...securityHeaders],
        },
      ]
    },
    webpack: (config, { webpack }) => {
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
      );
      return config;
    },
    poweredByHeader: false,
    generateEtags: false,
    reactStrictMode: true,
  }
};