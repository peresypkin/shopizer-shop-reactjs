import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { setProductID } from "../../redux/actions/productActions";
import { connect } from "react-redux";
const ProductGridListSingle = ({
  product,
  // currency,
  addToCart,
  // addToWishlist,
  // addToCompare,
  cartItem,
  // wishlistItem,
  // compareItem,
  sliderClassName,
  spaceBottomClass,
  setProductID,
  defaultStore
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  // const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = product.originalPrice;
  const finalDiscountedPrice = product.finalPrice;
  const onClickProductDetails = (id) => {
    setProductID(id)
  }

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
              {
                product.image && <img className="default-img" src={product.image.imageUrl} alt="" />
              }
              {
                product.images.length > 1 ? <img className="hover-img" src={product.images[1]} alt="" /> : <img className="hover-img" src={product.image.imageUrl} alt="" />
              }
            </Link>
            {/* {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                    ""
                  )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
                ""
              )} */}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)} title="Select options">
                  <i className="fa fa-cog"></i>
                </Link>
              </div>
              <div className="pro-same-action pro-cart">
                {/* {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Buy now{" "}
                  </a>
                ) : product.variation && product.variation.length >= 1 ? ( */}
                {/* <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                  Select Option
                  </Link> */}
                {/* ) : product.stock && product.stock > 0 ? ( */}
                {
                  product.available && product.canBePurchased && product.visible && product.quantity > 0 ?
                    (
                      <button
                        onClick={() => addToCart(product, addToast, cartItem, 1, defaultStore)}
                        // className="active"
                        // disabled={cartItem !== undefined && cartItem.quantity > 0}
                        title="Add to cart"
                      > {" "}  <i className="pe-7s-cart"></i>{" "}Add to cart</button>
                    )
                    :
                    (
                      <button disabled className="active">
                        Out of Stock
                      </button>
                    )
                }

                {/* ) : (
                        <button disabled className="active">
                          Out of Stock
                  </button>
                      )} */}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                {product.description.name}
              </Link>
            </h3>
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
            <div className="product-price">
              {product.discounted ? (
                <Fragment>
                  <span>{finalDiscountedPrice}</span>{" "}
                  <span className="old">
                    {finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                  <span>{finalProductPrice} </span>
                )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                    {
                      product.image && <img className="default-img img-fluid" src={product.image.imageUrl} alt="" />
                    }
                    {product.images.length > 1 ?
                      <img
                        className="hover-img img-fluid"
                        src={product.images[1]}
                        alt=""
                      />
                      :
                      <img
                        className="hover-img img-fluid"
                        src={product.image.imageUrl}
                        alt=""
                      />
                    }

                  </Link>
                  {/* {product.discount || product.new ? (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                          ""
                        )}
                      {product.new ? <span className="purple">New</span> : ""}
                    </div>
                  ) : (
                      ""
                    )} */}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                    {product.description.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {product.discounted ? (
                    <Fragment>
                      <span>
                        {finalDiscountedPrice}
                      </span>{" "}
                      <span className="old">
                        {finalProductPrice}
                      </span>
                    </Fragment>
                  ) : (
                      <span>{finalProductPrice} </span>
                    )}
                </div>
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
                <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>
                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {/* {product.affiliateLink ? (
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {" "}
                        Buy now{" "}
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                      >
                        Select Option
                      </Link>
                    ) : product.stock && product.stock > 0 ? (
                      <button
                        onClick={() => addToCart(product, addToast)}
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Added to cart"
                            : "Add to cart"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Added"
                          : "Add to cart"}
                      </button>
                    ) : ( */}
                    {
                      product.available && product.canBePurchased && product.visible && product.quantity > 0 ?

                        (
                          // product, addToast, cartItem, 1, defaultStore
                          <button
                            onClick={() => addToCart(product, addToast, cartItem, 1, defaultStore)}
                            title="Add to cart"> {" "} <i className="pe-7s-cart"></i>{" "} Add to cart
                           </button>
                        )
                        :
                        (
                          <button disabled className="active">
                            Out of Stock
                          </button>
                        )
                    }

                    {/* )} */}
                  </div>

                  {/* <div className="shop-list-wishlist ml-10">
                    <button
                      className={wishlistItem !== undefined ? "active" : ""}
                      disabled={wishlistItem !== undefined}
                      title={
                        wishlistItem !== undefined
                          ? "Added to wishlist"
                          : "Add to wishlist"
                      }
                      onClick={() => addToWishlist(product, addToast)}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div> */}
                  {/* <div className="shop-list-compare ml-10">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={
                        compareItem !== undefined
                          ? "Added to compare"
                          : "Add to compare"
                      }
                      onClick={() => addToCompare(product, addToast)}
                    >
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        defaultStore={defaultStore}
        // currency={currency}
        // discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}

        // wishlistitem={wishlistItem}
        // compareitem={compareItem}
        addtocart={addToCart}

        cartData={cartItem}
        // addtowishlist={addToWishlist}
        // addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  // addToCompare: PropTypes.func,
  // addToWishlist: PropTypes.func,
  // cartItem: PropTypes.object,
  // compareItem: PropTypes.object,
  // currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  // wishlistItem: PropTypes.object
};
const mapStateToProps = state => {
  return {
    defaultStore: state.merchantData.defaultStore
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setProductID: (value) => {
      dispatch(setProductID(value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductGridListSingle);
// export default ProductGridListSingle;
