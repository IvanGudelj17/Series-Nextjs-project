// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvmaze.com",
      },
    ],
  },
};
