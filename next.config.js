const withTM = require("next-transpile-modules");
/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true,
};

module.exports = withTM([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
])(nextConfig);
