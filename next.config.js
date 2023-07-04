/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            // source: "/:path*",
            source: "/certs",
            destination: "https://milidu-backend-zqddn.run.goorm.site/certs",
          },
        ];
      }
}

module.exports = nextConfig
