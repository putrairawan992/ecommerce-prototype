import React from 'react';
import { Row, Col, Card } from 'antd';
import convertTimesTime from '../../library/convertTimestime';
import "./style.sass";
import strings from '../../localization/localization';


const PaymentDateInfo = props => {
    const {  dateOrder, typePayment } = props
    return (
        <React.Fragment>
            {typePayment !== undefined | typePayment ?
                <div className="mp-payment-date-info">
                    <Card>
                        <Row>
                            <Col md={24}>
                                <p className="mp-payment-date-info__before-pay">{strings.before_pay}</p>
                                <font className="mp-payment-date-info__end-date">{convertTimesTime.millisecond(dateOrder.orderDate)}</font>
                            </Col>
                            <Col md={24} style={{ marginTop: 25 }}>
                                <p className="mp-payment-date-info__pay-to">
                                    {strings.pay_to}
                                </p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h3 className="giyarto">{strings.giyarto}</h3>
                                            </td>
                                            <td>
                                                <div className="mp-date-info-payment">
                                                 { /*  <img src={bank.imageUrl} alt="" style={{ maxHeight: 25, maxWidth: 69 }} />*/}
                                                    &nbsp;&nbsp;
                                                    <font className="mp-virtual-account-date-info">
                                                        {typePayment.virtualAccount}
                                                    </font>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="mp-date-info-payment-type">{strings.payment_type}</p>
                                            </td>
                                            <td>
                                                <p className="mp-virtual-account-bank-name">
                                                    {typePayment.gateway.bankName} Virtual Account
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Card>  </div> : null}

        </React.Fragment>
    );
};

export default PaymentDateInfo;