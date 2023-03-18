import { ErrorMessage, useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";

const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  // console.log("Input", meta);
  const color = useSelector((state) => state.color);

  return (
    <div className="form-group mb-3">
      <label className="input-label">{label}</label>
      <input
        {...field}
        {...props}
        className={`form-control text-input ${
          meta.touched && meta.error && "is-invalid"
        }`}
        style={{ borderColor: color }}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="invalid-feedback"
      />
    </div>
  );
};

export default InputText;
