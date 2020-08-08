import React, { Component } from 'react';
import { apiGetWithToken, apiPostWithToken, apiDeleteWithToken, apiPutWithToken, patchService } from '../../api/services';
import { PATH_CUSTOMER } from '../../api/path';
import AddressListDetailDashboard from '../../components/AddressListDetailDashboard';
import { Card, Row, Col, Icon, Modal, Empty, Spin } from 'antd';
import FormAddAddress from '../FormAddAddress';
import { connect } from "react-redux";
import { openModal } from "../../store/actions/authentication";
import { addressDefault } from "../../store/actions/address";
import strings from '../../localization/localization';
import FormEditAddress from '../FormEditAddress';
import Button from '../../components/Button';


const confirm = Modal.confirm;

class AddressListDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addresses: [],
            visibleAddAddress: false,
            visibleEditAddress: false,
            customerAddress: {},
            cities: [],
            subdistricts: [],
            address: {},
            isLoading: false,
            isProductAlvailabel: false
        }
    }

    componentDidMount() {
        this.getAddress();
        this.initCustomerAddress();
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (!props.isAddressAvailable) {
            this.setState({
                customerAddress: props.dataAddressDefault
            });
        }
    }

    initCustomerAddress = async () => {
        await this.props.addressDefault();
        this.setState(
            { customerAddress: this.props.dataAddressDefault }
            , () => {
                this.getCities(this.state.customerAddress.provinceId);
                this.getSubdistrict(this.state.customerAddress.cityId);
            }
        );
    };

    getAddress = async () => {
        this.setState({ isLoading: true })
        try {
            const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS);
            if (response.data.data) {
                this.setState({
                    addresses: response.data.data,
                    isLoading: false
                });
            }
            if (response.data.data.length < 1) {
                this.setState({
                    isProductAlvailabel: true
                })
            } else if (response.data.data.length > 0) {
                this.setState({
                    isProductAlvailabel: false
                })
            }
        } catch (error) {
            this.setState({ isLoading: false, isProductAlvailabel: true });
        }
    };

    getCities = async id => {
        const params = {
            province: id
        };
        try {
            const response = await apiGetWithToken(
                PATH_CUSTOMER.ADDRESS_CITY,
                params
            );
            this.setState({ cities: response.data.data });
        } catch (error) {
            console.log(error);
        }
    };

    getSubdistrict = async id => {
        const params = {
            city: id
        };
        try {
            const response = await apiGetWithToken(
                PATH_CUSTOMER.ADDRESS_SUBDISTRICT,
                params
            );
            this.setState({ subdistricts: response.data.data });
        } catch (error) {
            console.log(error);
        }
    };

    showDeleteAddress = (idAddress) => {
        confirm({
            title: strings.tabs_my_account_change_address,
            content: strings.tabs_my_account_change_address_paragraph,
            okText: strings.received,
            cancelText: strings.back,
            centered: true,
            onOk: () => {
                this.actionDeleteAddress(idAddress);
            },
        });
    };


    splitValue = value => {
        const splitValue = value.split("|");
        return splitValue;
    };


    handleChangeCity = value => {
        const city = this.splitValue(value);
        this.setState(
            {
                cityId: city[0],
                city: city[1]
            },
            () => this.getSubdistrict(city[0])
        );
    };

    actionDeleteAddress = async (index) => {
        try {
            const idAddress = index
            const response = await apiDeleteWithToken(PATH_CUSTOMER.CUSTOMER_ADDRESS_DELETE + idAddress);
            if (response.data.code === 200 || response.data.code === "200") {
                this.getAddress();
            }
        } catch (error) {
            console.log(error);
        }
    };

    actionShowAddFormAddress = () => {
        this.setState(prevState => ({
            visibleAddAddress: !prevState.visibleAddAddress
        }));
    };

    actionShowEditFormAddress = (address) => {
        this.setState(prevState => ({
            address: address,
            visibleEditAddress: !prevState.visibleEditAddress
        }));
    };

    actionSubmitAddFormAddress = async request => {
        try {
            const response = await apiPostWithToken(PATH_CUSTOMER.ADDRESS, request);
            if (response.data.data) {
                const customerAddressId = response.data.data;
                let customerAddress = {
                    ...request,
                    id: customerAddressId
                };
                this.setState({
                    customerAddress: customerAddress
                });
                this.props.addressDefault();
                this.getAddress();
                if (!this.isAddressAvailable) {
                    this.props.addressDefault();
                }
                this.actionShowAddFormAddress();
            }
        } catch (error) {
            console.log(error);
        }
    };

    actionSubmitEditFormAddress = async request => {
        try {
            const response = await apiPutWithToken(PATH_CUSTOMER.ADDRESS, request);
            if (response.data.data) {
                this.setState(
                    { customerAddress: request },
                    () => {
                        this.getAddress();
                        this.actionShowEditFormAddress(this.state.address);
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    actionChangeAddress = async (addressId) => {
        const request = {
            addressId: addressId
        }
        try {
            const response = await patchService(PATH_CUSTOMER.ADDRESS_DEFAULT, request);
            if (response.code === 200 || response.code === "200") {
                this.getAddress();
            }
        } catch (error) {
            console.log(error);
        }
    };


    loadingItems(value) {
        return <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            {value && <Spin spinning={value} />}
        </div>
    }


    responseAddressList = response => {
        return response.map((address, index) => (
            <AddressListDetailDashboard
                lengthAddress={response}
                actionChangeAddress={this.actionChangeAddress}
                key={index}
                actionShowEditFormAddress={this.actionShowEditFormAddress}
                isAddressAvailable={this.props.isAddressAvailable}
                customerAddress={this.state.customerAddress}
                showDeleteAddress={this.showDeleteAddress}
                address={address} />
        ))
    }

    render() {
        const { customerAddress, addresses, isLoading, isProductAlvailabel } = this.state
        return (
            <Card>
                <div className="listAddress">
                    <Row>
                        <Col md={20}>
                            <h4>{strings.address_me}</h4>
                            <p>{strings.use_notice_address}</p>
                        </Col>
                        <Col md={4}>
                            <div style={{ marginLeft: -18 }}>
                                <Button
                                    size="large"
                                    type="secondary"
                                    onClick={this.actionShowAddFormAddress}
                                >
                                    {strings.add_address}<Icon type="plus" />
                                </Button>
                            </div>
                        </Col>
                        <Col md={24} style={{ marginTop: 10 }}>
                            {isLoading ?
                                this.loadingItems(isLoading) :
                                this.responseAddressList(addresses)}
                            {isLoading === true ? false : isProductAlvailabel && <Empty />}
                        </Col>
                    </Row>
                    {customerAddress.id && (
                        <FormEditAddress
                            visible={this.state.visibleEditAddress}
                            address={this.state.address}
                            onSubmit={this.actionSubmitEditFormAddress}
                            onCancle={this.actionShowEditFormAddress}
                            cities={this.state.cities}
                            subdistricts={this.state.subdistricts}
                            handleChangeCity={this.handleChangeCity}
                        />
                    )}
                    <FormAddAddress
                        visible={this.state.visibleAddAddress}
                        onSubmit={this.actionSubmitAddFormAddress}
                        onCancle={this.actionShowAddFormAddress}
                        isAddressAvailable={this.props.isAddressAvailable}
                    />
                </div>
            </Card>
        )
    }
}


const mapStatetoProps = state => ({
    dataAddressDefault: state.address.addressDefault,
    isAddressAvailable: state.address.isAddressAvailable,
    statusModal: state.authentication.statusModal,
    message: state.authentication.message
});

export default connect(mapStatetoProps, { addressDefault, openModal })(AddressListDashboard);