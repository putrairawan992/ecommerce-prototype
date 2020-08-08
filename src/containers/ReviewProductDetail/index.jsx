import React, { useEffect, useState } from 'react';
import RatingCardProductDetail from '../../components/RatingCardProductDetail';
import "./style.sass";
import FilterReviewProductDetail from '../../components/FilterReviewProductDetail';
import { Row, Col, Spin, Table } from 'antd';
import LatestReview from '../../components/LatestReview';
import strings from '../../localization/localization';
import Product from '../../repository/Product';

const columns = [
    {
        title: "Review",
        dataIndex: "review",
        key: "review"
    }
];

function ReviewProductDetail({ productId }) {
    const [reviewRatingDetail, setReviewRatingDetail] = useState({})
    const [reviewRating, setReviewRating] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ratingStar, setRatingStar] = useState()
    const [currentPage, setCurrentPage] = useState(0);
    const [foto, setFoto] = useState(0);
    const [deskripsi, setDeskripsi] = useState();

    useEffect(() => {
        getReviewRatingDetail();
        getReviewRating();
        setRatingStar(null)
        setFoto(null);
        setDeskripsi(null);
    }, [productId])


    async function getReviewRatingDetail() {
        let reviewRatingDetail = await Product.reviewRatingDetail({
            productId: productId
        })
        if (reviewRatingDetail.status === 200) {
            setReviewRatingDetail(reviewRatingDetail)
        } else {
            setReviewRatingDetail({})
        }
    }

    async function getReviewRating() {
        let reviewRating = await Product.reviewRating({
            productId: productId,
            loading: setLoading
        })
        if (reviewRating.status === 200) {
            setReviewRating(reviewRating)
            setNotFound(false)
        } else {
            setReviewRating([])
            setNotFound(true)
        }
    }

    function actionChangeSelectFilter(e) {
        let star = [1, 2, 3, 4, 5];
        if (e === "Dengan Foto") {
            setRatingStar(null);
            setDeskripsi(null);
            setFoto(e);
        } else if (star.includes(parseInt(e))) {
            setDeskripsi("");
            setFoto(null);
            setRatingStar(e);
        } else if (e === "Dengan Deskripsi") {
            setDeskripsi(e);
            setFoto(null);
            setRatingStar(null);
        } else if (e === "Semua") {
            setDeskripsi(null);
            setFoto(null);
            setRatingStar(null);
        }
        setCurrentPage(0)
    }

    function onPageChange(page) {
        setCurrentPage(page)
    };

    const filteredData =
        reviewRating.review &&
        reviewRating.review.filter(review => {
            if (!foto && !ratingStar && !deskripsi) {
                return true;
            } else if (ratingStar && ratingStar !== null) {
                return review.rating === ratingStar;
            } else if (foto) {
                return review.images.length !== 0;
            } else if (deskripsi) {
                return review.message !== "";
            }
            return false;
        });

    function renderReview(review, i) {
        return {
            key: i,
            review: [<LatestReview key={i} review={review} />]
        };
    };


    return (
        <Spin spinning={loading}>
            <div className="mp-review-product-detail">
                {notFound ?
                    <div className="mp-product-detail__not-found">
                        <span>
                            Belum ada ulasan untuk produk ini
                        </span>
                    </div> :
                    <React.Fragment>
                        <RatingCardProductDetail
                            reviewRatingDetail={reviewRatingDetail} />
                        <Row>
                            <Col md={17} offset={3}>
                                <div className="mp-review-product-detail__filter">
                                    <FilterReviewProductDetail
                                        reviewRating={reviewRating.review}
                                        actionChangeSelectFilter={actionChangeSelectFilter} />
                                </div>
                            </Col>
                        </Row>
                        <h3>{strings.latest_review}</h3>
                        <Table
                            className="mp-review-product-detail__table"
                            showHeader={false}
                            dataSource={reviewRating.review &&
                                filteredData.map((review, i) =>
                                     renderReview(review, i)
                                )}
                            columns={columns}
                            pagination={{
                                defaultPageSize: 5,
                                current: currentPage,
                                onChange: onPageChange,
                                className: "mp-pagination-review-product-detail"
                            }}
                        />
                    </React.Fragment>}
            </div>
        </Spin>
    );
};

export default ReviewProductDetail;