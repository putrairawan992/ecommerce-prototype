import React, { useState, useEffect } from "react";
import "./style.sass";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";
import Cards from "../../components/Cards";
import { Link } from "react-router-dom";
import PATH_URL from "../../routers/path";

export default function PopularProducts() {
  let initPopularProducts = {
    productLarge: [],
    productSmall: []
  };

  const [popularProducts, setPopularProducts] = useState(initPopularProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductPopular();
  }, []);

  async function getProductPopular() {
    let productPopular = await Product.getPopular({
      loading: setLoading
    });
    if (productPopular.status === 200) {
      const popularProducts = productPopular.products;
      popularProductSpread(popularProducts);
    } else {
      setPopularProducts({
        ...popularProducts,
        productLarge: null,
        productSmall: null
      });
    }
  }

  function popularProductSpread(data) {
    if (data.length === 7) {
      setPopularProducts({
        ...popularProducts,
        productLarge: data.slice(0, 3),
        productSmall: data.slice(3, 7)
      });
    } else {
      setLoading(true);
    }
  }

  return (
    <div className="mp-popular-products">
      <span className="mp-popular-products__title">
        {strings.most_searched}
      </span>
      <Row type="flex" style={{ marginTop: 12 }}>
        <React.Fragment>
          {loading ? (
            <SkeletonCustom
              count={2}
              width={276}
              height={296}
              rightMargin={20}
            />
          ) : (
            popularProducts.productLarge.map((product, index) => {
              return (
                <React.Fragment key={index}>
                  <Col style={{ margin: "10px" }}>
                    <Link to={`${PATH_URL.PRODUCT}/${product.id} ` || "#"}>
                      <Cards
                        type="large"
                        title={product.name}
                        urlImage={product.thumbnail}
                        price={product.price}
                      />
                    </Link>
                  </Col>
                </React.Fragment>
              );
            })
          )}
          <div className="mp-popular-little-card">
            {loading ? (
              <SkeletonCustom
                count={3}
                width={120}
                height={146}
                rightMargin={20}
              />
            ) : (
              popularProducts.productSmall.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col style={{ margin: "8px" }}>
                      <Link
                        to={`${PATH_URL.PRODUCT}/${product.id} ` || "#"}
                      >
                        <Cards
                          type="small"
                          title={product.name}
                          urlImage={product.thumbnail}
                          price={product.price}
                        />
                      </Link>
                    </Col>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </React.Fragment>
      </Row>
    </div>
  );
}
