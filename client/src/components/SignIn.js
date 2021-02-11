import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Form } from "reactstrap";
import {
  getCurrentUser,
  isCheckoutClick,
  isLoggedInUser,
  setUserAction,
} from "../store/AuthReducer";
import { setAppAlertAction } from "../store/ShopReducer";
import { Validators } from "../utils/Validators";
import AbstractForm from "./form/AbstractForm";
import TextBoxComponent from "./form/TextBoxComponent";

class SignIn extends AbstractForm {
  initData() {
    return {
      email: "",
      password: "",
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
    };
  }

  submitUrl() {
    return "/auth/login";
  }

  processSuccessfulResponse(response) {
    this.props.storeUser(response.user);
    this.props.setAlertOpen({
      isAlertOpen: true,
      success: response.success,
      message: response.message,
    });
    window.location.replace("/");
  }

  processUnsuccessfulResponse(response) {
    this.setState((preState) => ({
      ...preState,
      globalErrorMsg: response.message,
    }));
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={this.props.isCheckoutClick ? "/checkout" : "/"} />;
    } else {
      const { errors, globalErrorMsg } = this.state;
      return (
        <div className="auth_container">
          <div className="header">
            <h1>{this.props.t("LABEL_WELCOME_BACK")}</h1>
            <p>{this.props.t("LABEL_LOGIN_HINT")}</p>
          </div>
          {this.renderGlobalErrorMsg(globalErrorMsg)}
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <TextBoxComponent
              label={this.props.t("LABEL_EMAIL")}
              id="email"
              name="email"
              type="email"
              placeholder={this.props.t("LABEL_EMAIL")}
              onChange={this.handleInput}
              errorMsg={errors.email}
              required={true}
            />
            <TextBoxComponent
              label={this.props.t("LABEL_PASSWORD")}
              id="password"
              name="password"
              type="password"
              placeholder={this.props.t("LABEL_PASSWORD")}
              onChange={this.handleInput}
              errorMsg={errors.password}
              required={true}
            />
            <Button size="lg" block type="submit">
              {this.props.t("LABEL_CONTINUE")}
            </Button>
          </Form>
          <div className="footer">
            {this.props.t("LABEL_DO_NOT_HAVE_AN_ACCOUNT")}
            <span onClick={() => this.props.history.push("/sign-up")}>
              {this.props.t("LABEL_SIGN_UP")}
            </span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
    isLoggedIn: isLoggedInUser(state),
    isCheckoutClick: isCheckoutClick(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setAlertOpen: (payload) => dispatch(setAppAlertAction(payload)),
  storeUser: (user) => dispatch(setUserAction(user)),
});

export default withTranslation()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn))
);
