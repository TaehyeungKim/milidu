/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            // source: "/:path*",
            source: "/certs",
            destination: "https://milidu-backend-ykzlu.run.goorm.site/certs",
          },
          {
            source: "/get_unischedule",
            destination: "https://milidu-backend-ykzlu.run.goorm.site/get_unischedule",
          }
        ];
      }
}

module.exports = nextConfig
