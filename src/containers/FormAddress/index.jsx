import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col, Card } from "antd";
import { Formik } from "formik";
import { schema } from "./schema";
import Address from "../../repository/Address";
import PropTypes from "prop-types";
import convertSchemaToInit from "../../library/convertSchemaToInit";
import strings from "../../localization/localization";

const { Option } = Select;
const { TextArea } = Input;
export default function FormAddress(props) {
  const titleCreate = strings.form_add_shipping_address
  const titleUpdate = strings.form_change_shipping_address
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState();
  const [subdistricts, setSubdistricts] = useState();
  const [initialValues, setInitialValues] = useState();
  const [title, setTitle] = useState(titleCreate);

  useEffect(() => {
    props.action === "create" ? doCreate() : doUpdate();
    getProvinces();
  }, [props.address]);

  function doCreate() {
    setTitle(titleCreate);
    const initValue = convertSchemaToInit(schema);
    console.log({...initValue, isDefault: props.default});
    setInitialValues({...initValue, isDefault: props.default});
  }

  function doUpdate() {
    setTitle(titleUpdate);
    getAddress(props.address);
  }

  async function getAddress(address) {
      getCities(address.provinceId);
      getSubdistricts(address.cityId);
      setInitialValues(address);
  }

  async function getProvinces() {
    const response = await Address.getListProvince({});
    if (response.status === 200) {
      setProvinces(response.data.data);
    }
  }

  async function getCities(provinceId) {
    const params = { province: provinceId };
    const response = await Address.getListCity({ params: params });
    if (response.status === 200) {
      setCities(response.data.data);
    }
  }

  async function getSubdistricts(cityId) {
    const params = { city: cityId };
    const response = await Address.getListSubdistrict({ params: params });
    if (response.status === 200) {
      setSubdistricts(response.data.data);
    }
  }

  async function submitCreate(params) {
    const response = await Address.create({
      params: params
    });
    return response;
  }

  async function submitUpdate(params) {
    const response = await Address.update({
      params: params
    });
    return response;
    
  }

  async function handleSubmit(params, resetForm) {
    let response =
      props.action === "create"
        ? await submitCreate(params)
        : await submitUpdate(params);
    if (response.status === 200) {
      props.onSuccess({...params, id : response.data.data});
      resetForm();
    }
  }

  function onChangeProvince(value, option, setFieldValue) {
    setFieldValue("province", option.props.children);
    setFieldValue("provinceId", value);
    setFieldValue("cityId", "");
    setFieldValue("subdistrictId", "");
    getCities(value);
    setSubdistricts([]);
  }

  function onChangeCity(value, option, setFieldValue) {
    setFieldValue("city", option.props.children);
    setFieldValue("cityId", value);
    setFieldValue("subdistrictId", "");
    getSubdistricts(value);
  }

  function onChangeSubdistrict(value, option, setFieldValue) {
    setFieldValue("subdistrict", option.props.children);
    setFieldValue("subdistrictId", value);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values,{resetForm}) => {
        handleSubmit(values, resetForm);
      }}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
        <Card title={title} bordered={false}>
          <Form onSubmit={handleSubmit}>
            <Form.Item
              label="Nama Alamat"
              validateStatus={errors.labelName && "error"}
              help={errors.labelName}
            >
              <Input
                placeholder="Contoh: Rumah, Kantor, Kost, dll"
                name="labelName"
                onChange={handleChange}
                value={values.labelName}
              />
            </Form.Item>
            <Form.Item
              label="Atas Nama"
              validateStatus={errors.receiverName && "error"}
              help={errors.receiverName}
            >
              <Input
                placeholder="Atas Nama"
                name="receiverName"
                onChange={handleChange}
                value={values.receiverName}
              />
            </Form.Item>
            <Form.Item
              label="No. Telepon"
              validateStatus={errors.phoneNumber && "error"}
              help={errors.phoneNumber}
            >
              <Input
                placeholder="08xxx"
                name="phoneNumber"
                type="number"
                onChange={handleChange}
                value={values.phoneNumber}
              />
            </Form.Item>
            <Form.Item
              label="Provinsi"
              validateStatus={errors.provinceId && "error"}
              help={errors.provinceId}
            >
              <Select
                showSearch
                name="provinceId"
                placeholder="Select a province"
                optionFilterProp="children"
                onChange={(value, option) => {
                  onChangeProvince(value, option, setFieldValue);
                }}
                value={provinces && values.provinceId}
              >
                {provinces &&
                  provinces.map(province => (
                    <Option
                      value={province.province_id}
                      key={province.province_id}
                    >
                      {province.province}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Kota / Kabupaten"
              validateStatus={errors.cityId && "error"}
              help={errors.cityId}
            >
              <Select
                showSearch
                name="cityId"
                placeholder="Select a City"
                optionFilterProp="children"
                onChange={(value, option) => {
                  onChangeCity(value, option, setFieldValue);
                }}
                value={cities && values.cityId}
              >
                {cities &&
                  cities.map(city => (
                    <Option value={city.city_id} key={city.city_id}>
                      {city.city_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Row>
              <Col md={19}>
                <Form.Item
                  label="Kecamatan"
                  validateStatus={errors.subdistrictId && "error"}
                  help={errors.subdistrictId}
                >
                  <Select
                    showSearch
                    name="subdistrictId"
                    placeholder="Select a subdistrict"
                    optionFilterProp="children"
                    onChange={(value, option) => {
                      onChangeSubdistrict(value, option, setFieldValue);
                    }}
                    value={subdistricts && values.subdistrictId}
                  >
                    {subdistricts &&
                      subdistricts.map(subdistrict => (
                        <Option
                          value={subdistrict.subdistrict_id}
                          key={subdistrict.subdistrict_id}
                        >
                          {subdistrict.subdistrict_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col offset={1} md={4}>
                <Form.Item
                  label="Kode Pos"
                  validateStatus={errors.zipcode && "error"}
                  help={errors.zipcode}
                >
                  <Input
                    placeholder=""
                    name="zipcode"
                    onChange={handleChange}
                    value={values.zipcode}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Alamat Lengkap"
              validateStatus={errors.fullAddress && "error"}
              help={errors.fullAddress}
            >
              <TextArea
                placeholder="Atas Nama"
                name="fullAddress"
                onChange={handleChange}
                value={values.fullAddress}
              />
            </Form.Item>
            <Row type="flex" justify="end">
              <Col md={4}>
                <span onClick={() => props.onCancel()}>Batalkan</span>
              </Col>
              <Col md={4}>
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={props.onLoading}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </Formik>
  );
}

FormAddress.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  title: PropTypes.string,
  default: PropTypes.bool
};

FormAddress.defaultProps = {
  default: false
}