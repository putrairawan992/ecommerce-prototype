import React from "react";
import { Tabs, Card } from "antd";
import strings from "../../localization/localization";
import ProductAttibutes from "../../components/ProductAttributes";
import ProductQnA from "../../containers/ProductQnA";
import ReviewProductDetail from "../../containers/ReviewProductDetail";

export default function TabsProductDetail({ productId, information, isProductAvailable }) {
  const questionAnswers = information.questionAnswers;
  return (
    <Tabs className="tabs-detail" defaultActiveKey="1" type="card">
      <Tabs.TabPane tab="DETAIL PRODUK" key="1">
        {isProductAvailable && (
          <Card className="product-description">
            <h2>{strings.detail_product}</h2>
            <ProductAttibutes product={information} />
          </Card>
        )}
      </Tabs.TabPane>
      <Tabs.TabPane tab="PERTANYAAN" key="2">
        {questionAnswers && questionAnswers.length === 0 ? (
          <div className="mp-product-detail__not-found">
            <span>Belum ada pertanyaan untuk produk ini</span>
          </div>
        ) : (
            <ProductQnA questionAnswers={questionAnswers} />
          )}
      </Tabs.TabPane>
      <Tabs.TabPane tab="ULASAN" key="3">
        <ReviewProductDetail productId={productId} />
      </Tabs.TabPane>
    </Tabs>
  );
}
