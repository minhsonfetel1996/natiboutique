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

  initData() {}
  submitUrl() {}
  processSuccessfulResponse(response) {}
  processUnsuccessfulResponse(response) {}
  getSchemaValidations() {}

  validateProperty(name, value) {
    const validators = this.getSchemaValidations()[name];
    const errors = validators.map((vFn) => vFn(name, value));
    return errors && errors.length > 0
      ? errors.filter((error) => !!error)[0]
      : null;
  }

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

  setData = (data) => {
    this.setState((preState) => ({
      ...preState,
      data: {
        ...preState.data,
        ...data,
      },
    }));
  };

  setErrors = (errors) => {
    this.setState((preState) => ({
      ...preState,
      errors: {
        ...preState.errors,
        ...errors,
      },
    }));
  };

  handleInput = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setData({ [event.target.name]: event.target.value });
  };

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

  submit() {
    post(this.submitUrl(), this.state.data)
      .then((res) => {
        if (res.data && res.data.success) {
          this.processSuccessfulResponse(res.data);
        } else {
          this.processUnsuccessfulResponse(res.data);
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
