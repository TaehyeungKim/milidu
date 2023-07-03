/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/:path*",
            destination: "https://milidu-backend-zqddn.run.goorm.site/:path*",
          },
        ];
      }
}

module.exports = nextConfig
