/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "wow.zamimg.com",
      "cdn.discordapp.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
