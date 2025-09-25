const CSP_NONCE_PLACEHOLDER = '__CSP_NONCE__';

const marketingScriptSources = {
  scriptSrc: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  connectSrc: [
    'https://www.google-analytics.com',
  ],
  imgSrc: [
    'https://www.google-analytics.com',
  ],
};

function createContentSecurityPolicy({ withAnalytics = false } = {}) {
  const directives = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "font-src": ["'self'", 'https:', 'data:'],
    "img-src": ["'self'", 'data:', 'blob:'],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
      `'nonce-${CSP_NONCE_PLACEHOLDER}'`,
      "'strict-dynamic'",
    ],
    "script-src-attr": ["'none'"],
    "style-src": ["'self'", 'https:', "'unsafe-inline'"],
    "connect-src": ["'self'", 'https:', 'wss:'],
    "frame-ancestors": ["'none'"],
    "worker-src": ["'self'", 'blob:'],
  };

  if (withAnalytics) {
    directives['script-src'].push(...marketingScriptSources.scriptSrc);
    directives['connect-src'].push(...marketingScriptSources.connectSrc);
    directives['img-src'].push(...marketingScriptSources.imgSrc);
  }

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${Array.from(new Set(values)).join(' ')}`)
    .join('; ');
}

function buildSecurityHeaders({ isProd, withAnalytics }) {
  const headers = [
    {
      key: 'Content-Security-Policy',
      value: createContentSecurityPolicy({ withAnalytics }),
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Permissions-Policy',
      value: [
        'accelerometer=()',
        'autoplay=()',
        'camera=()',
        'display-capture=()',
        'encrypted-media=()',
        'fullscreen=(self)',
        'geolocation=()',
        'gyroscope=()',
        'magnetometer=()',
        'microphone=()',
        'midi=()',
        'payment=()',
        'picture-in-picture=()',
        'publickey-credentials-get=()',
        'usb=()'
      ].join(', '),
    },
  ];

  if (isProd) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    });
  }

  return headers;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'cookie',
            key: 'marketing-consent',
            value: 'granted',
          },
        ],
        headers: buildSecurityHeaders({ isProd, withAnalytics: true }),
      },
      {
        source: '/:path*',
        headers: buildSecurityHeaders({ isProd, withAnalytics: false }),
      },
    ];
  },
};

module.exports = nextConfig;
module.exports.createContentSecurityPolicy = createContentSecurityPolicy;
module.exports.buildSecurityHeaders = buildSecurityHeaders;
module.exports.CSP_NONCE_PLACEHOLDER = CSP_NONCE_PLACEHOLDER;
