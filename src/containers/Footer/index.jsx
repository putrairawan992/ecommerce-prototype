import React from "react";
import { Row, Col, Form } from "antd";
import { Link } from "react-router-dom";
import "./style.sass";
import strings from "../../localization/localization";
import ovo from "../../assets/img/ic_ovo.png";
import bca from "../../assets/img/ic_bca.png";
import mandiri from "../../assets/img/ic_mandiri.png";
import dana from "../../assets/img/ic_dana.png";
import visa from "../../assets/img/ic_visa-mastercard.png";
import instagram from "../../assets/img/ic_instagram.png";
import twitter from "../../assets/img/ic_twitter.png";
import facebook from "../../assets/img/ic_facebook.png";
import Input from "../../components/Input";
import { Formik } from "formik";
import { schema } from "./schema";
import Subscription from "../../repository/Subscription";
import notification from "../../library/notification";
import PATH_URL from "../../routers/path";

function Footer() {
  async function handleSubmitSubscribe(email, resetForm) {
    const subscription = await Subscription.add({
      email: email
    });
    if (subscription.status === 200) {
      resetForm({});
      notification(
        "Selamat",
        "sekarang kamu bisa dapetin update dari kita.",
        "success"
      );
    }
  }

  return (
    <React.Fragment>
      <div className="backgroundFooter full-width">
        <Row className="footer__all-col container">
          <Col md={7}>
            <p className="footer__title">{strings.footer_any_help}</p>
            <Col
              className="footer__menu-col"
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "24px"
              }}
            >
              <span>
                <Link to={PATH_URL.USER_GUIDE_HOW_TO_SHOP}>{strings.how_to_shop}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_DELIVERY_TIME}>{strings.delivery_time}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_HOW_TO_PAY}>{strings.how_to_pay}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_TRACK_SHIPMENT}>{strings.track_the_delivery}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_CONTACT_US}>{strings.contact_us}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_ABOUT_US}>{strings.about_us}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_CAREER}>{strings.career}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_TERMS_CONDITION}>{strings.terms_and_condition}</Link>
              </span>
              <span>
                <Link to={PATH_URL.USER_GUIDE_PRIVACY_POLICY}>{strings.privacy_policy}</Link>
              </span>
            </Col>
          </Col>
          <Col span={7}>
            <p className="footer__title">{strings.payment}</p>
            <div className="footer__icon-box">
              <img src={bca} alt="bca" />
              <img src={mandiri} alt="mandiri" />
              <img src={ovo} alt="ovo" />
              <img src={dana} alt="dana" />
              <img src={visa} alt="visa" />
            </div>
            <p className="footer__follow-us">{strings.follow_us}</p>
            <div className="footer__follow-box">
              <img src={instagram} alt="instagram" />
              <img src={twitter} alt="twitter" />
              <img src={facebook} alt="facebook" />
            </div>
          </Col>
          <Col md={9}>
            <p className="footer__title">{strings.monggo}</p>
            <Col md={24}>
              <p className="footer__info">{strings.subscripton_invitation}</p>
              <Formik
                onSubmit={(values, { resetForm }) => {
                  handleSubmitSubscribe(values, resetForm);
                }}
                validationSchema={schema}
                validateOnChange={false}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <Form.Item
                    validateStatus={errors.email && "error"}
                    help={errors.email}
                  >
                    <Input
                      name="email"
                      value={values.email}
                      placeholder="Email"
                      icon="mail"
                      size="large"
                      buttontext="Send"
                      onButtonClick={handleSubmit}
                      onChange={handleChange}
                    />
                  </Form.Item>
                )}
              </Formik>
            </Col>
          </Col>
        </Row>
      </div>
      <div className="logo-bottom">
        <span>{strings.very_bottom}</span>
      </div>
    </React.Fragment>
  );
}

export default Footer;
