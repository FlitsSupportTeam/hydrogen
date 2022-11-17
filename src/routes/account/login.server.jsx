import {Suspense} from 'react';
import {
  useShopQuery,
  CacheLong,
  CacheNone,
  Seo,
  gql,
  parseMetafieldValue,
} from '@shopify/hydrogen';

import {AccountLoginForm} from '~/components';
import {Layout} from '~/components/index.server';
import {FlitsSocialLogin} from '~/components';

export default function Login({response}) {
  response.cache(CacheNone());

  const {
    data: {
      shop: {name, socialLoginPaid, socialLoginEnable},
    },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: '*',
  });

  const socialLoginPaidValue = parseMetafieldValue(socialLoginPaid);
  const socialLoginEnableValue = parseMetafieldValue(socialLoginEnable);

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Login'}} />
      </Suspense>
      <AccountLoginForm shopName={name} />
      {socialLoginPaidValue == '1' && socialLoginEnableValue == '1' ? (
        <FlitsSocialLogin />
      ) : null}
    </Layout>
  );
}

export async function api(request, {session, queryShop}) {
  if (!session) {
    return new Response('Session storage not available.', {status: 400});
  }

  const jsonBody = await request.json();

  if (!jsonBody.email || !jsonBody.password) {
    return new Response(
      JSON.stringify({error: 'Incorrect email or password.'}),
      {status: 400},
    );
  }

  const {data, errors} = await queryShop({
    query: LOGIN_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
      },
    },
    // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
    cache: CacheNone(),
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    await session.set(
      'customerAccessToken',
      data.customerAccessTokenCreate.customerAccessToken.accessToken,
    );

    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: data?.customerAccessTokenCreate?.customerUserErrors ?? errors,
      }),
      {status: 401},
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

const SHOP_QUERY = gql`
  query shopInfo {
    shop {
      name
      socialLoginPaid: metafield(
        namespace: "Flits"
        key: "IS_SOCIAL_LOGIN_PAID"
      ) {
        value
        type
      }
      socialLoginEnable: metafield(
        namespace: "Flits"
        key: "IS_SOCIAL_LOGIN_ENABLE"
      ) {
        value
        type
      }
    }
  }
`;
