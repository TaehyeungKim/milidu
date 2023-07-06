/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            // source: "/:path*",
            source: "/certs",

            //real backend
            destination: "https://milidu-backend-ykzlu.run.goorm.site/certs",

            //self backend
            // destination: "https://milidu-selfserver.run.goorm.site/certs"
          },
          // {
          //   source: "/cert_stats",
          //   has: [
          //     {
          //       key: 'cert_code',
          //       type: 'query',
          //       value: '0490'
          //     }
          //   ],

          //   //real backend
            

          //   //self backend
          //   destination: "https://milidu-selfserver.run.goorm.site/cert_stats"
          //   //real backend
          //   destination: "https://milidu-backend-ykzlu.run.goorm.site/certs",
          // },
          {
            source: "/get_unischedule",
            destination: "https://milidu-backend-ykzlu.run.goorm.site/get_unischedule",
          },
          {
            source: "/create_cert_review",
            destination: "https://milidu-backend-ykzlu.run.goorm.site/create_cert_review",
          },
          {
            source: "/get_cert_review",
            destination: "https://milidu-backend-ykzlu.run.goorm.site/get_cert_review",
          }
        ];
      }
}

module.exports = nextConfig
