import React, { useState, useEffect } from "react";
import SliderProductDetailContainer from "../../containers/SliderProductDetail";
import Variants from "../../containers/Variants";
import { Row, Col, Typography, Rate } from "antd";
import currencyRupiah from "../../library/currency";
import Shipping from "../../components/Shipping";
import strings from "../../localization/localization";
import Quantity from "../../components/Quantity";
import "./style.sass";
import Skeleton from "react-loading-skeleton";
import Breadcrumbs from "../../components/Breadcrumbs/index.jsx";
import Button from "../../components/Button";
import { useRootContext } from "../../hoc/RootContext";
import Product from "../../repository/Product";
import Breadcrumb from "../../repository/Breadcrumb/index";
import { convertToCategoryName } from "../../library/regex";
import PATH_URL from "../../routers/path";
import TabsProductDetail from "./tabsProductDetail";
import history from "../../routers/history";

const { Text } = Typography;

export default function ProductDetail(props) {
  const [images, setImages] = useState([]);
  const [imageVariant, setImageVariant] = useState({});
  const [defaultImage, setDefaultImage] = useState({});
  const [information, setInformation] = useState({});
  const [data, setData] = useState({ sku: {} });
  const [quantity, setQuantity] = useState(1);
  const [alertVariant, setAlertVariant] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isUpdateImageVariant, setIsUpdateImageVariant] = useState(false);
  const [blurAlertVariant, setBlurAlertVariant] = useState(false);
  const [price, setPrice] = useState({});
  const [variants, setVariants] = useState([]);
  const [id, setId] = useState("");
  const [product, setProduct] = useState({});
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [breadcrumbsApi, setBreadcrumbsApi] = useState({});
  const { isAuthenticated } = useRootContext();
  const totalShipping = countTotalAmount();
  const breadcrumbs = [];
  const productId = props.match.params.productId;
  let pathTemp = "/category";

  Object.values(breadcrumbsApi).forEach(value => {
    pathTemp = pathTemp + "/" + value;
    const breadcrumb = {
      label: convertToCategoryName(value),
      link: pathTemp
    };
    breadcrumbs.push(breadcrumb);
  });

  const breadcrumbNameProduct = {
    label: information.name
  };

  breadcrumbs.push(breadcrumbNameProduct);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetail();
  }, []);

  async function getBradcrumb(categoryId) {
    let breadcrumbs = await Breadcrumb.getByCategory({
      params: categoryId
    });
    if (breadcrumbs.status === 200) {
      setBreadcrumbsApi(breadcrumbs.data.data);
    } else {
      setBreadcrumbsApi({});
    }
  }

  async function getProductDetail() {
    let productDetail = await Product.get({
      loading: setLoading,
      productId: productId
    });

    if (productDetail.status === 200) {
      const product = productDetail.product;
      setProduct(product);
      setId(product.id);
      setDefaultImage(product.defaultImage);
      setImages(product.images);
      setVariants(product.variants);
      setInformation(product.information);
      setPrice(product.price);
      setVideoUrl(product.videoUrl);
      getBradcrumb(product.breadcrumb);
      setIsProductAvailable(true);
    } else {
      handleProductDetailNotFound(productDetail);
    }
  }

  function handleProductDetailNotFound(error) {
    if (error.status !== 200) {
      props.history.push(PATH_URL.NOT_FOUND);
    }
  }

  function actionUpdateSku(sku) {
    const dataSku = { ...data, sku };
    setData(dataSku);
  }

  function actionUpdateQuantity(quantity) {
    setQuantity(quantity);
    setIsUpdateImageVariant(false);
  }

  function countTotalAmount() {
    const subTotal = price.fee && price.fee.shipmentFee.difference * quantity;
    const total = subTotal;
    return total;
  }

  function actionUpdateImageVariant(image) {
    setIsUpdateImageVariant(true);
    setImageVariant(image);
  }

  function actionUpdateSelectVariant(e) {
    setIsUpdateImageVariant(e);
  }

  function actionSubmitToCheckout() {
    const image = images.find(image => image.isDefault === true).defaultImage;
    const items = {
      shipmentFee: price.fee.shipmentFee,
      image,
      name: information.name,
      price: price.amount,
      productId: id,
      quantity: quantity,
      sku: data.sku,
      maxOrder: information.maxOrder
    };
    const indexesToLocalstorage = JSON.stringify(items);
    localStorage.setItem("product", indexesToLocalstorage);
    if (variants.length > 0) {
      variantAlert();
    } else if (variants.length < 1) {
      if (isAuthenticated !== false) {
        redirectCheckout();
      } else {
        redirectLogin();
      }
    }
  }

  function redirectLogin() {
    return history.push({
      pathname: "/login",
      state: {
        nextPage: "/checkout"
      }
    });
  }

  function redirectCheckout() {
    return history.push("/checkout");
  }

  function variantAlert() {
    if (data.sku.length === undefined) {
      setAlertVariant(strings.product_detail_warning_variant_one_item);
      setBlurAlertVariant(true);
    } else {
      if (data.sku.length < variants.length) {
        setAlertVariant(strings.product_detail_warning_variant_two_item);
        setBlurAlertVariant(true);
      } else {
        if (isAuthenticated !== false) {
          redirectCheckout();
        } else {
          redirectLogin();
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div className="container mp-product-detail">
        <div className="mp-product-detail__header">
          <Breadcrumbs breadcrumbs={breadcrumbs} type="product" />
        </div>
        <Row>
          <Col md={{ span: 9 }}>
            {images.length < 1 ? (
              <Skeleton height={300} />
            ) : (
              <SliderProductDetailContainer
                videoUrl={videoUrl}
                isUpdateImageVariant={isUpdateImageVariant}
                imageDefault={defaultImage}
                images={images}
                imageVariant={imageVariant}
                actionUpdateSelectVariant={actionUpdateSelectVariant}
              />
            )}
          </Col>
          <Col md={{ span: 8, offset: 1 }}>
            <div>
              <span className="mp-product-detail__product-name">
                {loading ? <Skeleton height={20} /> : information.name}
              </span>
              <br />
              <div className="mp-product-detail__review-container">
                {loading ? (
                  <Skeleton height={20} />
                ) : (
                  <span className="mp-product-detail__review">
                    <Rate defaultValue={4} disabled /> 4.0 | 816 Ulasan | 1194
                    Difavoritkan
                  </span>
                )}
              </div>
              <span className="mp-product-detail__price">
                {loading ? (
                  <Skeleton height={25} />
                ) : (
                  currencyRupiah(price.amount)
                )}
              </span>
              {images.length < 1 ? (
                <Skeleton height={25} width={200} />
              ) : (
                <Variants
                  product={product}
                  actionUpdateImageVariant={actionUpdateImageVariant}
                  actionUpdateSku={actionUpdateSku}
                />
              )}
              {loading ? (
                <div style={{ marginTop: 10 }}>
                  <Skeleton height={40} width={200} />
                </div>
              ) : (
                <React.Fragment>
                  <span className="mp-product-detail__total-quantity">
                    Jumlah
                  </span>
                  <Quantity
                    stock={information.maxOrder}
                    updateQuantity={actionUpdateQuantity}
                  />
                </React.Fragment>
              )}
              {isProductAvailable && (
                <Shipping
                  totalShipping={totalShipping}
                  priceShipment={price.fee}
                />
              )}
              {loading ? (
                <div style={{ marginTop: 55 }}>
                  <Skeleton height={40} width={350} />
                </div>
              ) : (
                <div style={{ marginTop: 30 }}>
                  {blurAlertVariant === true ? (
                    <Text type="danger">{alertVariant}</Text>
                  ) : null}
                  <Button
                    type="primary"
                    size="large"
                    width="full"
                    onClick={actionSubmitToCheckout}
                  >
                    {strings.order_now}
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col md={{ span: 5, offset: 1 }}></Col>
        </Row>
        {loading ? (
          <div style={{ marginTop: 55 }}>
            <Skeleton height={40} width={350} />
            <Skeleton height={250} width={"100%"} />
          </div>
        ) : (
          <TabsProductDetail
            isProductAvailable={isProductAvailable}
            information={information}
            productId={productId}
          />
        )}
      </div>
    </React.Fragment>
  );
}
