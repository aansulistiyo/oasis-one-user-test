import { ErrorMessage, useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";

const Select = ({ label, table, ...props }) => {
  const [field, meta] = useField(props);
  const color = useSelector((state) => state.color);

  const currTable = localStorage.getItem("curr_table");

  return (
    <div className="form-group mb-3">
      <label className="input-label">{label} *</label>
      <select
        {...field}
        {...props}
        className={`form-control select-input ${
          meta.touched && meta.error && "is-invalid"
        }`}
        style={{ borderColor: color }}
      >
        <option value="">Select Table</option>
        {table.map((item) => {
          const data = item.table;
          if (
            data.status === "EMPTY" ||
            data.index === parseInt(currTable) ||
            data.index !== 0
          ) {
            return (
              <option key={data.id} value={data.index}>
                Table {data.index}
              </option>
            );
          }
          return null;
        })}
      </select>
      <ErrorMessage
        component="div"
        name={field.name}
        className="invalid-feedback"
      />
    </div>
  );
};

export default Select;
