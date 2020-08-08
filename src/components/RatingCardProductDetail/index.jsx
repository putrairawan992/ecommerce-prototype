import React from 'react';
import { Card, Row, Col, Rate, Progress } from 'antd';
import "./style.sass";

function RatingCardProductDetail({ reviewRatingDetail }) {
    const rating = reviewRatingDetail.reviewDetail

    function sortList(list, ascDesc) {
        if (ascDesc === "ASC") {
            return list.sort((a, b) => {
                return parseFloat(a.ratingGroup) - parseFloat(b.ratingGroup);
            })
        } else {
            return list.sort((a, b) => {
                return parseFloat(b.ratingGroup) - parseFloat(a.ratingGroup);
            }) 
        }      
    }

    const ratingSort = rating && sortList(rating.details, "DESC")

    return (
        <Card>
            {rating &&
                <Row>
                    <Col md={19} offset={5}>
                        <div className="mp-rating-card-product-detail">
                            <Col md={6}>
                                <div className="mp-rating-card-product-detail__wrapper-number-review">
                                    <span className="mp-rating-card-product-detail__number-review-wrapper">
                                        <strong className="mp-rating-card-product-detail__number-review">
                                            4.8
                                        </strong>
                                        / 5
                                </span>
                                    <Rate disabled value={4} />
                                    <p>{rating.totalReview} Ulasan</p>
                                </div>
                            </Col>
                            <Col md={18}>
                                {ratingSort.map((star,i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <div className="mp-rating-card-product-detail__progress">
                                                <span>
                                                    {star.ratingGroup}
                                                </span>
                                                <Rate disabled defaultValue={1} count={1} />
                                                <Progress percent={star.total} />
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </Col>
                        </div>
                    </Col>
                </Row>
            }
        </Card>
    );
};

export default RatingCardProductDetail;