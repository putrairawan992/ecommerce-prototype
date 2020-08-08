import React, { useState } from "react";
import "./style.sass"
import { Col, Row, Form } from "antd";
import { Formik } from "formik";
import { schema } from "./schema"
import Input from "../../components/Input";
import TextArea from "antd/lib/input/TextArea";
import Button from "../../components/Button";
import Contact from "../../repository/Contact";
import Alert from "../../components/Alert";

export default function ContactUs() {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  async function handleSubmit(value, resetForm) {
    const response = await Contact.post({params: value,loading: setLoading})
    console.log("res", response)
    if (response.status === 201) {
      resetForm();
      setShow(true);
    }
  }
  return (
    <React.Fragment>
      {show && (
        <Alert
        showIcon={true}
        title={"Terima kasih atas pesan nya, kami akan memproses dan menghubungi anda kembali"}
        animation="fall"
      />
      )}
      <Row type="flex" justify="center" className="mp-contact-us">
        <Col md={8}>
          <h3>Hubungi Kami</h3>
          <p className="mp-contact-us__description">
            Kami akan dengan senang hati membantu dan mendengarkan pendapat anda.
            Untuk kritik, saran dan pesan, harap hubungi kami di:
          </p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: ""
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <div>
                <Form onSubmit={handleSubmit}>
                  <Form.Item
                    validateStatus={errors.name && "error"}
                    help={errors.name}
                  >
                    <Input
                      name="name"
                      size="large"
                      onChange={handleChange}
                      value={values.name}
                      placeholder="Nama.."
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={errors.email && "error"}
                    help={errors.email}
                  >
                    <Input
                      name="email"
                      size="large"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Email.."
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={errors.message && "error"}
                    help={errors.message}
                  >
                    <TextArea 
                      name="message"
                      style={{fontSize: "18px"}}
                      onChange={handleChange}
                      value={values.message}
                      rows={4}
                      placeholder="Messages.. ( 10 charracters minimum )"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={loading}
                      size="large"
                      htmlType="submit"
                      type="primary"
                      width="full"
                    >Kirim</Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Formik>
        </Col>
      </Row>
    </React.Fragment>
  )
}