export const prodConfig = {
  baseUrl: 'https://api.hoi.com',
  apiKey: process.env.PROD_API_KEY || '',
  timeout: 30000,
  retries: 2
};

