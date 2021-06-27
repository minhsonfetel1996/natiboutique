import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  let steps = [t("LABEL_SHIPPING_ADDRESS"), t("LABEL_PAYMENT_DETAILS")];

  const nextStep = () => {
    if (activeStep === 0) {
      setActiveStep((preStep) => preStep + 1);
    }
  };

  const backStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  const Forms = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm backStep={backStep} />
    );

  return (
    <Paper id="checkout-container">
      <Typography variant="h4" align="center" style={{ paddingTop: 20 }}>
        {t("LABEL_CHECKOUT")}
      </Typography>
      <Row className="justify-content-center mx-4">
        <Col sm={12}>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Col>
      </Row>
      <Forms />
    </Paper>
  );
};

export default CheckoutPage;
