import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const TextBoxComponent = ({
  label,
  id,
  name,
  placeholder,
  type,
  onChange,
  errorMsg,
  required,
}) => {
  return (
    <FormGroup>
      <Label for={name}>
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />
      {errorMsg && <div className="validation">{errorMsg}</div>}
    </FormGroup>
  );
};

export default TextBoxComponent;
