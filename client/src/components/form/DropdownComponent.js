import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const DropdownComponent = ({
  label,
  id,
  name,
  onChange,
  errorMsg,
  required,
  options,
  includePleaseSelectOption,
}) => {
  return (
    <FormGroup>
      <Label for={name}>
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </Label>
      <Input id={id} type="select" name={name} onChange={onChange}>
        {options &&
          options.length > 0 &&
          (includePleaseSelectOption
            ? [{ id: -1, name: "" }, ...options]
            : options
          ).map((opt) => (
            <option key={opt.id} id={opt.id}>
              {opt.name}
            </option>
          ))}
      </Input>
      {errorMsg && <div className="validation">{errorMsg}</div>}
    </FormGroup>
  );
};

export default DropdownComponent;
