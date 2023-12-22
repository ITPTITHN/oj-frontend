const withTM = require("next-transpile-modules");
/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "standalone",
};

module.exports = withTM([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
])(nextConfig);
