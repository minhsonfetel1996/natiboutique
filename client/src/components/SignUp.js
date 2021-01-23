import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "reactstrap";
import {
  getCitiesAction,
  getCitiesFromState,
  getDistrictsAction,
  getDistrictsFromState,
  resetDistrictsAction,
} from "../store/AreaReducer";
import { setUserAction } from "../store/AuthReducer";
import { setAppAlertAction } from "../store/ShopReducer";
import { Validators } from "../utils/Validators";
import AbstractForm from "./form/AbstractForm";
import DropdownComponent from "./form/DropdownComponent";
import TextBoxComponent from "./form/TextBoxComponent";

class SignUp extends AbstractForm {
  constructor(props) {
    super(props);
    if (!this.props.cities || this.props.cities.length === 0) {
      this.props.getCities();
    }
  }

  initData() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      city: "",
      district: "",
      address: "",
      phone: "",
    };
  }

  getSchemaValidations() {
    return {
      email: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.email,
      ],
      password: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(120),
      ],
      firstName: [Validators.required, Validators.maxLength(100)],
      lastName: [Validators.required, Validators.maxLength(100)],
      address: [Validators.required],
      city: [Validators.required],
      district: [Validators.required],
      phone: [Validators.required, Validators.phoneNumber],
    };
  }

  submitUrl() {
    return "/auth/register";
  }

  processSuccessfulResponse = (response) => {
    this.props.storeUser(response.user);
    this.props.setAlertOpen({
      isAlertOpen: true,
      success: response.success,
      message: response.message,
    });
    window.location.replace("/");
  };

  processUnsuccessfulResponse = (response) => {
    this.setState((preState) => ({
      ...preState,
      globalErrorMsg: response.message,
    }));
  };

  render() {
    const { errors } = this.state;
    const { cities, districts, getDistricts, resetDistricts } = this.props;
    return (
      <div className="AuthForm">
        <div className="header">
          <h1>{this.props.t("LABEL_SIGN_UP")}</h1>
        </div>
        {this.renderGlobalErrorMsg(this.state.globalErrorMsg)}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <TextBoxComponent
            label={this.props.t("LABEL_EMAIL")}
            id="email"
            name="email"
            type="email"
            onChange={this.handleInput}
            errorMsg={errors.email}
            required={true}
          />
          <TextBoxComponent
            label={this.props.t("LABEL_PASSWORD")}
            id="password"
            name="password"
            type="password"
            onChange={this.handleInput}
            errorMsg={errors.password}
            required={true}
          />
          <Row>
            <Col>
              <TextBoxComponent
                label={this.props.t("LABEL_FIRST_NAME")}
                id="firstName"
                name="firstName"
                type="text"
                onChange={this.handleInput}
                errorMsg={errors.firstName}
                required={true}
              />
            </Col>
            <Col>
              <TextBoxComponent
                label={this.props.t("LABEL_LAST_NAME")}
                id="lastName"
                name="lastName"
                type="text"
                onChange={this.handleInput}
                errorMsg={errors.lastName}
                required={true}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownComponent
                label={this.props.t("LABEL_CITY")}
                id="city"
                name="city"
                onChange={(event) => {
                  const city = cities.find(
                    (c) => c.name === event.target.value
                  );
                  if (city) {
                    getDistricts(city.id);
                  } else {
                    resetDistricts();
                  }
                  this.handleInput(event);
                }}
                errorMsg={errors.city}
                required={true}
                options={cities}
                includePleaseSelectOption={true}
              />
            </Col>
            <Col>
              <DropdownComponent
                label={this.props.t("LABEL_DISTRICT")}
                id="district"
                name="district"
                onChange={this.handleInput}
                errorMsg={errors.district}
                required={true}
                options={districts}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <TextBoxComponent
                label={this.props.t("LABEL_ADDRESS")}
                id="address"
                name="address"
                type="text"
                onChange={this.handleInput}
                errorMsg={errors.address}
                required={true}
              />
            </Col>
            <Col sm={6}>
              <TextBoxComponent
                label={this.props.t("LABEL_PHONE")}
                id="phone"
                name="phone"
                type="text"
                onChange={this.handleInput}
                errorMsg={errors.phone}
                required={true}
              />
            </Col>
          </Row>
          <Button size="lg" block type="submit">
            {this.props.t("LABEL_CONTINUE")}
          </Button>
        </Form>
        <div className="footer">
          {this.props.t("LABEL_ALREADY_HAVE_AN_ACCOUNT")}
          <span onClick={() => this.props.history.push("/sign-in")}>
            {this.props.t("LABEL_SIGN_IN")}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: getCitiesFromState(state),
    districts: getDistrictsFromState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCities: () => dispatch(getCitiesAction()),
  getDistricts: (cityId) => dispatch(getDistrictsAction(cityId)),
  storeUser: (user) => dispatch(setUserAction(user)),
  setAlertOpen: (payload) => dispatch(setAppAlertAction(payload)),
  resetDistricts: () => dispatch(resetDistrictsAction()),
});

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);
