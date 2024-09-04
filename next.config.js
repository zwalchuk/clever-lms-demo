/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async redirects() {
      return [
        {
          source: '/assignment',
          destination: 'https://clever.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fsections%2F657b35c16a1a3e5c217dcd7c%2Fassignments%2F5ff65653-5ed9-488a-b0c5-8122034694e1%2Fsubmissions%2F657b35c16a1a3e5c217dcd34%2Fedit&client_id=3d2df1a3962de1bce06b',
          permanent: false,
        },
      ]
    },
  }
