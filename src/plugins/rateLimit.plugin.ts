import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';

export default fp(async (fastify) => {
  fastify.register(rateLimit, {
    global: true,
    max: 100, // Max requests per time window
    timeWindow: '1 minute', // Time window as string or milliseconds
    allowList: [], // You can add IPs here to skip rate limiting
    ban: 2, // Optional: temporarily block after X violations
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
    errorResponseBuilder: function (req, context) {
      return {
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Please wait before retrying.`,
        statusCode: 429,
      };
    },
  });
});
