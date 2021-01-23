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
} from "../../store/AreaReducer";
import { setUserAction } from "../../store/AuthReducer";
import { setAppAlertAction } from "../../store/ShopReducer";
import { Validators } from "../../utils/Validators";
import AbstractForm from "../form/AbstractForm";
import DropdownComponent from "../form/DropdownComponent";
import TextBoxComponent from "../form/TextBoxComponent";
import { withRouter } from "react-router-dom";

class AddressForm extends AbstractForm {
  constructor(props) {
    super(props);
    if (!this.props.cities || this.props.cities.length === 0) {
      this.props.getCities();
    }
  }

  initData() {
    return {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
      email: "",
      phone: "",
    };
  }

  getSchemaValidations() {
    return {
      firstName: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
      lastName: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
      address: [Validators.required],
      city: [Validators.required],
      district: [Validators.required],
      email: [Validators.required],
      phone: [Validators.required, Validators.phoneNumber],
    };
  }

  submitUrl() {
    return ""; // TODO SPM
  }

  render() {
    const { errors } = this.state;
    const {
      cities,
      districts,
      getDistricts,
      resetDistricts,
      history,
    } = this.props;

    return (
      <Row className="pl-5 pr-5 pt-4 pb-4">
        <Col>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col lg={6} xs={12}>
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
              <Col lg={6} xs={12}>
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
            <TextBoxComponent
              label={this.props.t("LABEL_ADDRESS")}
              id="address"
              name="address"
              type="text"
              onChange={this.handleInput}
              errorMsg={errors.address}
              required={true}
            />
            <DropdownComponent
              label={this.props.t("LABEL_CITY")}
              id="city"
              name="city"
              onChange={(event) => {
                const city = cities.find((c) => c.name === event.target.value);
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
            <DropdownComponent
              label={this.props.t("LABEL_DISTRICT")}
              id="district"
              name="district"
              onChange={this.handleInput}
              errorMsg={errors.district}
              required={true}
              options={districts}
              includePleaseSelectOption={true}
            />
            <Row>
              <Col lg={6} xs={12}>
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
              <Col lg={6} xs={12}>
                <TextBoxComponent
                  label={this.props.t("LABEL_EMAIL")}
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleInput}
                  errorMsg={errors.email}
                  required={true}
                />
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col sm={6}>
                <Button
                  size="lg"
                  block
                  onClick={() => {
                    history.push("/basket");
                  }}
                >
                  {this.props.t("LABEL_BACK_TO_CART")}
                </Button>
              </Col>
              <Col sm={6} style={{ textAlign: "right" }}>
                <Button size="lg" block type="submit">
                  {this.props.t("LABEL_CONTINUE")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
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
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressForm))
);
