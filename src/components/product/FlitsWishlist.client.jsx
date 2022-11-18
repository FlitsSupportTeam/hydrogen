import {fetchSync} from '@shopify/hydrogen';
import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export function FlitsWishlist(product) {
  const handleClick = () => {
    // let params = {
    //   customer_hash:
    //     'bd99e18813e522e5c316bfc797a2cfd59316df43c01b6d9b5332eb1168c7a5cb',
    //   token: 'aea2d51a7001fb777e1ad17a4a646612',
    //   customer_id: '6335585747109',
    //   customer_email: 'james@getflits.com',
    //   product_id: '7969517338789',
    //   product_handle: 'bangle-bracelet',
    //   product_title: 'Bangle Bracelet',
    //   product_image:
    //     '//cdn.shopify.com/s/files/1/0616/2566/3653/products/bangle-bracelet-with-jewels_925x_0dbaba1d-1b52-4132-8526-59bc062865bc_small.jpg?v=1662032396',
    //   wsl_product_count: '1',
    // };

    let params = {
      // customer_hash:
      //   'bd99e18813e522e5c316bfc797a2cfd59316df43c01b6d9b5332eb1168c7a5cb',
      // token: '268c7946247c11a462970ec8ee0b195b',
      customer_id: '6335585747109',
      customer_email: 'james@getflits.com',
      product_id: '7969514815653',
      product_handle: 'ocean-blue-shirt',
      product_title: 'Ocean Blue Shirt',
      product_image:
        '//cdn.shopify.com/s/files/1/0616/2566/3653/products/young-man-in-bright-fashion_925x_935f447e-2403-4228-91af-0ade63b6bf80.jpg?v=1662032341',
      wsl_product_count: '1',
    };
    let addUrl =
      'https://app.getflits.com/api/1/'+Oxygen?.env?.PRIVATE_FLITS_USER_ID+'/wishlist/add_to_wishlist?token='+Oxygen?.env?.PRIVATE_FLITS_TOKEN;
    // '//flits-support-workplace-8.myshopify.com/apps/flits/api/1/25014/wishlist/add_to_wishlist';
    const things = fetchSync(addUrl, {
      method: 'POST',
      data: params,
      contentType: 'application/x-www-form-urlencoded',
      // headers:{
      //   'access-control-allow-origin' : '*',
      // }
      // mode: 'no-cors',x
    }).json();
  };

  return (
    <div className="flits-wishlist">
      <div className="filts-wishlist-product-style flits-wishlist-button-style">
        <a
          onClick={handleClick}
          className="flits-wls-button flits-wls-two flits-wls-desktop flits-wls-button-secondary flits-wls-button-full-width flits-wls-animate flits-wls-active"
          data-flits-product-id={product.data.id}
          data-flits-product-title={product.data.title}
          data-flits-product-handle="leather-anchor"
          data-flits-product-image="//cdn.shopify.com/s/files/1/0631/7647/4823/products/anchor-bracelet-mens_925x_461b53d4-8141-4b21-a21a-ed5b0e64300d_small.jpg?v=1664371286"
          data-flits-customer-id="6144185532615"
          data-flits-customer-email="james@getflits.com"
          data-tippy-content="Added to Wishlist"
        >
          <div className="flits-wls-icon-with-text ">
            <div className="flits-wls-icon-with-text-icon">
              <div className="flits-btn-effect">
                <svg
                  className="flits-wls-heart-full flits-wls-icon-svg flits-wls-icon-svg-color-blue"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <div className="flits-wls-effect-group">
                  <span className="flits-wls-effect"></span>
                  <span className="flits-wls-effect"></span>
                  <span className="flits-wls-effect"></span>
                  <span className="flits-wls-effect"></span>
                  <span className="flits-wls-effect"></span>
                </div>
              </div>
            </div>
            <div className="flits-wls-icon-with-text-text">Add to Wishlist</div>
          </div>
        </a>
        <a className="flits-wls-count-btn">1</a>
      </div>
    </div>
  );
}
