import React, { Suspense, useEffect, useState } from "react";
import { BackTop, Row, Col, Divider } from "antd";
import strings from "../../localization/localization";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCustom from "../../components/Skeleton";
import Spinner from "../../components/Spinner";
import SortListProduct from "../../components/SortListProduct";
import { convertToCategoryName } from "../../library/regex";
import Product from "../../repository/Product";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";

const Products = React.lazy(() => import("../../containers/Products"));

export default function Category(props) {
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [direction, setDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { history } = useRootContext();
  const params = props.match.params;
  const limit = 20;

  useEffect(() => {
    setRefresh(false);
    getProductList();
  }, [direction, sortBy, refresh]);

  useEffect(() => {
    onRefresh();
  }, [history.location.pathname]);

  function onRefresh() {
    setProductList([]);
    setPage(0);
    setRefresh(true);
  }

  async function getProductList() {
    const categoryId = Object.values(params)
      .map(value => `${value}`)
      .join("/");
    const objparams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction
    };
    const productListResp = await Product.getByCategory({
      categoryId,
      objparams
    });
    if (productListResp.status === 200) {
      setProductList(productList.concat(productListResp.products));
      setPage(page + 1);
      setTotalData(productListResp.totalData);
      setIsProductAvailable(true);
    } else {
      handleCategoryNotFound();
    }
  }

  function handleCategoryNotFound() {
    props.history.push(PATH_URL.PRODUCT);
  }

  function fetchMoreData() {
    if (productList.length >= totalData) {
      setHasMore(false);
      return;
    } else {
      getProductList();
    }
  }

  function onChangeSort(sortValue) {
    const arraySort = sortValue.split("|");
    const sortBy = arraySort[0];
    const direction = arraySort[1];
    setProductList([]);
    setPage(0);
    setSortBy(sortBy);
    setDirection(direction);
    setHasMore(true);
  }

  let breadcrumbs = [];
  let pathTemp = "/category";

  Object.values(params).forEach((value, index) => {
    pathTemp = pathTemp + "/" + value;
    const breadcrumb = {
      label: convertToCategoryName(value),
      link: pathTemp
    };
    breadcrumbs.push(breadcrumb);
  });

  function infiniteScroll() {
    const categoryIdName =
      params[Object.keys(params)[Object.keys(params).length - 1]];
    const categoryTextResult = strings.formatString(
      strings.category_text_result,
      <b style={{ fontStyle: "oblique", fontWeight: 600 }}>"{totalData}"</b>,
      <b style={{ color: "#f63700" }}>
        {convertToCategoryName(categoryIdName)}
      </b>
    );
    return (
      <div style={{ marginTop: 24 }}>
        <div style={{ margin: "0 24px" }}>
          <Breadcrumbs breadcrumbs={breadcrumbs} type="category" />
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 24px"
          }}
        >
          <div>{categoryTextResult}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Urutkan &nbsp;&nbsp;&nbsp;</span>
            <SortListProduct
              defaultValue={"|desc"}
              onChange={onChangeSort}
              valueOld={"|asc"}
              valueLow={"price.amount|asc"}
              valueHigh={"price.amount|desc"}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={productList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={productList.length < limit ? false : <Spinner size="large" />}
          endMessage={<BackTop />}
        >
          <div>
            <Suspense
              fallback={
                <SkeletonCustom
                  count={20}
                  height={300}
                  leftMargin={13}
                  rightMargin={13}
                  topMargin={15}
                />
              }
            >
              <Products products={productList} />
            </Suspense>
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  function renderProducts() {
    return isProductAvailable ? (
      infiniteScroll()
    ) : (
      <SkeletonCustom
        count={20}
        height={300}
        leftMargin={13}
        topMargin={15}
        rightMargin={13}
      />
    );
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} md={24}>
          {renderProducts()}
        </Col>
      </Row>
    </React.Fragment>
  );
}
