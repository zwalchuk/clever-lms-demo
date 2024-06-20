/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async redirects() {
      return [
        {
          source: '/assignment',
          destination: 'https://clever.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fsections%2F664d092a26cf6205b829d4ee%2Fassignments%2Ff30e7582-4e0e-483c-b18b-2a4eab9d83e8%2Fsubmissions%2F664d092426cf6205b826b284%2Fedit&client_id=3d2df1a3962de1bce06b',
          permanent: false,
        },
      ]
    },
  }
