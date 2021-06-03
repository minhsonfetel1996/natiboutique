import React from "react";
import { post } from "../../services/HttpService";

class AbstractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.initData(),
      errors: {},
      globalErrorMsg: null,
    };
  }
  /**
   * Init form data
   *
   * @memberof AbstractForm
   */
  initData() {}
  /**
   * Prepare submit url
   *
   * @memberof AbstractForm
   */
  /**
   * Handle response with success status
   *
   * @param {*} response
   * @memberof AbstractForm
   */
  handleSuccessfullyResponse(response) {}
  /**
   * Handle response with failed status
   *
   * @param {*} response
   * @memberof AbstractForm
   */
  handleUnsuccessfullyResponse(response) {}
  /**
   * Prepare form schema validations
   *
   * @memberof AbstractForm
   */
  getSchemaValidations() {}
  /**
   * Validate value of form control in form
   *
   * @param {*} name
   * @param {*} value
   * @return {*}
   * @memberof AbstractForm
   */
  validateProperty(name, value) {
    const validators = this.getSchemaValidations()[name];
    const errors = validators.map((vFn) => vFn(name, value));
    return errors && errors.length > 0
      ? errors.filter((error) => !!error)[0]
      : null;
  }
  /**
   * Validate form data
   *
   * @return {*}
   * @memberof AbstractForm
   */
  validate() {
    let errors = null;
    Object.keys(this.state.data).forEach((name) => {
      const result = this.validateProperty(name, this.state.data[name]);
      if (result) {
        if (!errors) {
          errors = {};
        }
        errors[name] = result;
      }
    });
    return errors;
  }
  /**
   *
   *
   * @param {*} data
   * @memberof AbstractForm
   */
  setData = (data) => {
    this.setState((preState) => ({
      ...preState,
      data: {
        ...preState.data,
        ...data,
      },
    }));
  };
  /**
   *
   *
   * @param {*} errors
   * @memberof AbstractForm
   */
  setErrors = (errors) => {
    this.setState((preState) => ({
      ...preState,
      errors: {
        ...preState.errors,
        ...errors,
      },
    }));
  };
  /**
   *
   *
   * @param {*} event
   * @memberof AbstractForm
   */
  handleInput = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setData({ [event.target.name]: event.target.value });
  };
  /**
   * Handle submit form event
   *
   * @param {*} event
   * @memberof AbstractForm
   */
  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      errors: {},
      globalErrorMsg: null,
    });
    const errors = this.validate();
    const errorsFormState = {};
    if (errors) {
      Object.keys(errors).forEach((name) => {
        errorsFormState[name] = errors[name];
      });
      this.setState((preState) => ({
        ...preState,
        errors: {
          ...errorsFormState,
        },
      }));
    } else {
      this.submit();
    }
  }
  /**
   * Submit form
   *
   * @memberof AbstractForm
   */
  submit() {
    post(this.submitUrl(), this.state.data)
      .then((res) => {
        if (res.data && res.data.success) {
          this.handleSuccessfullyResponse(res.data);
        } else {
          this.handleUnsuccessfullyResponse(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: {},
          globalErrorMsg: "Internal server error",
        });
      });
  }
  /**
   *
   *
   * @param {*} globalErrorMsg
   * @memberof AbstractForm
   */
  renderGlobalErrorMsg = (globalErrorMsg) => {
    return (
      <>
        {globalErrorMsg && (
          <div
            style={{
              color: "rgb(97, 26, 21)",
              backgroundColor: "rgb(253, 236, 234)",
              textAlign: "center",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {globalErrorMsg}
          </div>
        )}
      </>
    );
  };
}

export default AbstractForm;
