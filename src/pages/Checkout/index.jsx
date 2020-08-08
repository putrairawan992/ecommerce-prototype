import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Form, Modal } from "antd";
import { AddressCheckout } from "../../components/AddressCheckout";
import AddressList from "../../containers/AddressList";
import OrderDetailContainer from "../../containers/OrderDetail";
import OrderSummary from "../../components/OrderSummary";
import strings from "../../localization/localization";
import "./style.sass";
import history from "../../routers/history";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import schemaOrder from "./schema";
import FormAddress from "../../containers/FormAddress";
import Address from "../../repository/Address";
import Courier from "../../repository/Courier";
import Order from "../../repository/Order";
import convertSchemaToInit from "../../library/convertSchemaToInit";

export default function Checkout(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAddAddress, setVisibleAddAddress] = useState(false);
  const [visibleEditAddress, setVisibleEditAddress] = useState(false);
  const [visibleListAddress, setVisibleListAddress] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setaddress] = useState();
  const [alertAddress, setAlertAddress] = useState();
  const [isProductDetailAvailable, setIsProductDetailAvailable] = useState(
    false
  );
  const [shipmentFee, setShipmentFee] = useState({});
  const [maxOrder, setMaxOrder] = useState(0);
  const [priceProduct, setPriceProduct] = useState(0);
  const [priceJne, setPriceJne] = useState(0);
  const [payloadProductDetail, setPayloadProductDetail] = useState({});
  const [jneChecked, setJneChecked] = useState(false);
  const [payload, setPayload] = useState(convertSchemaToInit(schemaOrder));
  const [customerAddressId, setCustomerAddressId] = useState('')
  const onLoadingAddress = false;

  useEffect(() => {
    getaddress();
  }, []);

  useEffect(() => {
    getListAddress();
    getPayloadProductDetail();
    //initCustomerAddress();
    getFareExpedisi();
  }, [priceJne]);

  async function getFareExpedisi() {
    const response = await Courier.jne({ params: {} });
    if (response.status === 200) {
      setPriceJne(response.data.data.price);
    } else {
      setPriceJne(0);
    }
  }

  function getPayloadProductDetail() {
    const dataProductDetail = JSON.parse(localStorage.getItem("product"));
    const dataVariants = variantsRequest(dataProductDetail.sku);
    setIsProductDetailAvailable(true);
    setPriceProduct(dataProductDetail.price);
    setPayloadProductDetail(dataProductDetail);
    setMaxOrder(dataProductDetail.maxOrder);
    setShipmentFee(dataProductDetail.shipmentFee);
    const { quantity, price, shipmentFee } = dataProductDetail;
    const total = countTotalAmount(
      quantity,
      price,
      shipmentFee,
      payload.items[0].shipment
    );
    const tempPayloadItems = [...payload.items];
    const tempItems = tempPayloadItems.map(temp => {
      return {
        ...temp,
        productId: dataProductDetail.productId,
        variants: dataVariants,
        quantity: dataProductDetail.quantity
      };
    });
    setPayload({
      ...payload,
      amount: total,
      items: tempItems
    });
  }

  function countTotalAmount(quantity, price, shipmentFee, shipment) {
    const subTotal = Number(quantity) * Number(price);
    let totalShippingPrice = 0;
    if (shipment === "air") {
      totalShippingPrice = Number(shipmentFee.difference) * Number(quantity);
    }
    const totalAmount = Number(priceJne);
    const total = shipmentFee.difference
      ? subTotal + totalShippingPrice + totalAmount
      : subTotal + totalAmount;
    return total;
  }

  function setStateNote(event) {
    const tempPayloadItems = [...payload.items];
    const tempItems = tempPayloadItems.map(item => {
      return { ...item, note: event.target.value };
    });
    setPayload({
      ...payload,
      items: tempItems
    });
  }

  function actionUpdateQuantity(qty) {
    const total = countTotalAmount(qty, priceProduct, shipmentFee);
    const tempPayloadItems = [...payload.items];
    const tempItems = tempPayloadItems.map(item => {
      return { ...item, quantity: qty };
    });
    setPayload({
      ...payload,
      amount: total,
      items: tempItems
    });
  }

  function actionChangeShipping(shipping) {
    const total = countTotalAmount(
      payload.items[0].quantity,
      priceProduct,
      shipmentFee,
      shipping.shipment
    );
    const tempPayloadItems = [...payload.items];
    const tempItems = tempPayloadItems.map(item => {
      return { ...item, shipment: shipping.shipment };
    });
    setPayload({
      ...payload,
      amount: total,
      items: tempItems
    });
  }

  function variantsRequest(variantsRequest) {
    const variants = [];
    variantsRequest.length >= 1 &&
      variantsRequest.forEach(variant => {
        variants.push({
          id: variant.id,
          variantItemId: variant.variantItem.id
        });
      });
    return variants;
  }

  function actionShowAddFormAddress() {
    setVisibleAddAddress(!visibleAddAddress);
  }

  function actionShowEditFormAddress() {
    setVisibleEditAddress(!visibleEditAddress);
  }

  function actionShowListAddress() {
    setVisibleListAddress(!visibleListAddress);
  }

  async function getListAddress() {
    const response = await Address.getAll({});
    if (response.status === 200) {
      setAddresses(response.data.data);
    }
  }

  async function getaddress() {
    const response = await Address.getDefault({});
    if (response.status === 200) {
      const id = response.data.data.id;
      // setPayload({
      //   ...payload,
      //   customerAddressId: id
      // });
      setCustomerAddressId(id)
      setaddress(response.data.data);
      setIsDefault(false);
    } else {
      setIsDefault(true);
    }
  }

  function handleChecked() {
    setJneChecked(!jneChecked);
  }

  function updateAddress(values) {
    const id = values.id;
    // setPayload({
    //   ...payload,
    //   customerAddressId: id
    // });
    setCustomerAddressId(id)
    setaddress(values);
    setVisibleAddAddress(!visibleAddAddress);
    getListAddress();
  }

  function handleSuccessEdit(callBackAddress) {
    setVisibleEditAddress(!visibleEditAddress);
    setaddress(callBackAddress);
  }

  function handleSubmit(values) {
    // if(props.isAddressAvailable){
      if(customerAddressId){
        const newRequest = {
          ...values,
          customerAddressId : customerAddressId
        }
        actionSubmitOrder(newRequest);

      }
      return;
      
    // }else{
    //   actionShowAddFormAddress()
    // }
  }

  async function actionChangeAddress(addressSelected) {
    // setPayload({
    //   ...payload,
    //   customerAddressId: addressSelected.id
    // });
    setCustomerAddressId(addressSelected.id)
    setaddress(addressSelected);
    setVisibleListAddress(!visibleListAddress);
  }

  async function actionSubmitOrder(request) {
    document.body.style.overflow = "hidden";
    try {
      document.body.style.overflow = "auto";
      setIsLoading(true);
      const quantity = payload.items[0].quantity;
      const response = await Order.create({ params: request });
      if (quantity > maxOrder) {
        setIsLoading(false);
      } else {
        if (response.data.data) {
          setTimeout(() => {
            setIsLoading(false);
          }, 700);
          const token = response.data.data.token;
          const snap = window.snap;
          snap.pay(token, {
            onSuccess: function(result) {
              history.push("/");
            },
            onPending: function(result) {
              let order = result.order_id;
              history.push({
                pathname: `${"/payment-info"}/${order}`,
                state: { detail: result }
              });
            },
            onError: function(result) {
              history.push("/payment-failed");
            },
            onClose: function() {}
          });
        }
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(true);
      });
      document.body.style.overflow = "hidden";
    }
  }

  return (
    <Spin wrapperClassName="checkoutLoading" size="large" spinning={isLoading}>
      <div className="checkout">
        <div className="container">
          <Row>
            <Col md={5}>
              <Link to="/">
                <img
                  src={require("assets/img/logo_monggopesen/monggopesen_logo.png")}
                  className="checkout__logo"
                  alt=""
                />
              </Link>
            </Col>
            <Col md={19}>
              <p className="checkout__text">{strings.checkout}</p>
            </Col>
          </Row>
          <div className="checkout__content">
            <Formik
              initialValues={payload}
              onSubmit={values => {
                handleSubmit(values);
              }}
              enableReinitialize
              validationSchema={schemaOrder}
              render={({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={15} style={{ marginTop: 25 }}>
                      <AddressCheckout
                        onLoading={onLoadingAddress}
                        address={address}
                        isDefault={isDefault}
                        onEditAddress={actionShowEditFormAddress}
                        onSelectListAddress={actionShowListAddress}
                        onAddAddress={actionShowAddFormAddress}
                      />
                      {address && (
                        <React.Fragment>
                          <AddressList
                            addresses={addresses}
                            visible={visibleListAddress}
                            onCancle={actionShowListAddress}
                            onChangeAddress={actionChangeAddress}
                            customerAddress={address}
                          />
                        </React.Fragment>
                      )}
                      {isProductDetailAvailable && (
                        <Form.Item>
                          <OrderDetailContainer
                            shipmentFee={shipmentFee.difference}
                            stock={maxOrder}
                            priceProduct={priceProduct}
                            payloadProductDetail={payloadProductDetail}
                            actionChangeShipping={actionChangeShipping}
                            actionUpdateQuantity={actionUpdateQuantity}
                            quantity={values.items[0].quantity}
                            setStateNote={setStateNote}
                          />
                        </Form.Item>
                      )}
                    </Col>
                    <Col md={9}>
                      {
                        console.log("values===",values)
                      }
                      <OrderSummary
                        isLoading={isLoading}
                        priceJne={priceJne}
                        shipmentFee={shipmentFee.difference}
                        quantity={values.items[0].quantity}
                        total={values.amount}
                        priceProduct={priceProduct}
                        shipment={values.items[0].shipment}
                        checked={jneChecked}
                        handleChecked={handleChecked}
                        isAddress={address ? true : false}
                        addAddress={actionShowAddFormAddress}
                        alertAddress={setAlertAddress}
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            />
            <Modal
              visible={visibleAddAddress}
              footer={null}
              centered
              onCancel={() => setVisibleAddAddress(!visibleAddAddress)}
            >
              <FormAddress
                action={"create"}
                onCancel={() => {
                  setVisibleAddAddress(!visibleAddAddress);
                  setAlertAddress(false);
                }}
                onSuccess={updateAddress}
                default={isDefault}
                alertAddress={alertAddress}
              />
            </Modal>
            {address && (
              <Modal
                visible={visibleEditAddress}
                footer={null}
                centered
                onCancel={() => setVisibleEditAddress(!visibleEditAddress)}
              >
                <FormAddress
                  action={"update"}
                  onCancel={() => setVisibleEditAddress(!visibleEditAddress)}
                  onSuccess={callBackAddress =>
                    handleSuccessEdit(callBackAddress)
                  }
                  address={address}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
}
