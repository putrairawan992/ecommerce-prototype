import React, { useState } from 'react';
import "./style.sass";
import { Rate, Modal, Carousel, Icon } from 'antd';
import convertTimesTime from '../../library/convertTimestime';

const SampleNextArrow = props => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} 
            mp-latest-review__next 
            mp-latest-review__button-next-prev`}
            onClick={onClick}>
            <Icon type="right" className="mp-latest-review__iconButton" />
        </div>
    );
};

const SamplePrevArrow = props => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} 
            mp-latest-review__prev 
            mp-latest-review__button-next-prev`}
            onClick={onClick} >
            <Icon type="left" className="mp-latest-review__iconButton" />
        </div>
    );
};

function LatestReview(props) {
    const { rating, message, images, reviewer } = props.review
    console.log(props.review);
    
    const [visible, setVisible] = useState(false)

    function showModal() {
        setVisible(true)
    };

    function handleClose(e) {
        setVisible(false)
    };

    const settings = {
        slidesToShow: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div style={{ borderRadius: 10 }}>
                <ul className="dots">{dots}</ul>
            </div>
        )
    };

    const slides = images.map((item, i) => {
        return <img key={i} src={item.largeUrl} alt="" />
    });


    let checkImages = images.length < 1 ? "" : "mp-latest-review-image"

    function reviewItem(typeShow) {
        return (
            <div className={`${checkImages} mp-latest-review`} onClick={showModal}>
                <span>
                    <img src={reviewer.imageUrl ? reviewer.imageUrl :
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"}
                        alt=""
                        className="mp-latest-review__profil-image-user" />
                    &nbsp;
                   <Rate disabled value={rating} />
                </span>
                <br />
                <div className="mp-latest-review__content">
                    <p className="mp-latest-review__userNameTime"> 
                        Di ulas oleh
                        <b>
                            {reviewer.name}
                        </b>pada &nbsp;
                        {convertTimesTime.millisecondnohours(2343533)}
                    </p>
                    <p>{message}</p>
                    {typeShow === "review" &&
                        images.map((img, i) => {
                            return <img key={i} src={img.mediumUrl}
                                alt=""
                                className="mp-latest-review__product-image-order-user" />
                        })}
                </div>
            </div>)}

    return (
        <React.Fragment>
            {reviewItem("review")}
            {images.length >= 1 ?
                <Modal
                    title=""
                    visible={visible}
                    wrapClassName="mp-latest-review__modal-image"
                    onOk={() => handleClose()}
                    onCancel={() => handleClose()}
                >
                    <Carousel {...settings}>{slides}</Carousel>
                    {reviewItem()}
                </Modal> : ""
            }
        </React.Fragment>
    );
};

export default LatestReview;