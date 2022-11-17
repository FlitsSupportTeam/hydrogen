import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'IN',
    defaultLanguageCode: 'EN',
    storeDomain: 'flits-plus.myshopify.com', // Oxygen.env.PUBLIC_STORE_DOMAIN
    storefrontToken: 'a63ff125050d5f859e2d2b21952ea1b2', // Oxygen.env.PUBLIC_STOREFRONT_API_TOKEN
    privateStorefrontToken: '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',//Oxygen.env.PRIVATE_STOREFRONT_API_TOKEN
    storefrontApiVersion: '2022-07',
    storefrontId: Oxygen.env.PUBLIC_STOREFRONT_ID,
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
