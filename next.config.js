/** @type {import('next').NextConfig} */

const PATH = "https://selectionhistory-jentv.run.goorm.site"

const nextConfig = {
    async rewrites() {
        return [
          {
            // source: "/:path*",
            source: "/certs",

            //real backend
            destination: `${PATH}/certs`,

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
            destination: `${PATH}/get_unischedule`,
          },
          {
            source: "/create_cert_review",
            destination: `${PATH}/create_cert_review`,
          },
          {
            source: "/get_cert_review",
            destination: `${PATH}/get_cert_review`,
          },
          {
            source: "/cert_test_schedule",
            destination: `${PATH}/cert_test_schedule`,
          },
          {
            source: "/get_lecture",
            destination: `${PATH}/get_lecture`,
          },
          {
            source: "/create_lect_review",
            destination: `${PATH}/create_lect_review`,
          },
          {
            source: "/get_lect_review",
            destination: `${PATH}/get_lect_review`,
          },
          {
            source: "/signup_register",
            destination: `${PATH}/signup`,
          },
          {
            source: "/login",
            destination: `${PATH}/login`,
          },
          {
            source: "/bookSearch",
            destination: "https://www.nl.go.kr/NL/search/openApi/search.do"
          },
          {
            source: "/check_username",
            destination: `${PATH}/check_username`
          },
          {
            source: "/get_cert_review",
            destination: `${PATH}/get_cert_review`
          }
         
        ];
      }
}

module.exports = nextConfig
