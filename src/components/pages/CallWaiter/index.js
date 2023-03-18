import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import InputText from "../../form/InputText";
import Select from "../../form/Select";
import { Formik } from "formik";
import * as Yup from "yup";

import HeaderBar from "../../navbar/HeaderBar";
import { setColor } from "../../../redux/actions/utilsAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SocketContext } from "../../../context/socketContext";

export default function CallWaiter() {
  const currFoodcourt = JSON.parse(localStorage.getItem("currFoodcourt"));
  const color = useSelector((state) => state.color);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { tenant_id } = useParams();

  let formDataDefault = localStorage.getItem("form_data");
  let isDefaultExist = false;

  if (
    formDataDefault !== "" &&
    formDataDefault !== null &&
    formDataDefault !== undefined
  ) {
    formDataDefault = JSON.parse(formDataDefault);
    isDefaultExist = true;
  }

  const [table, setTable] = useState([]);
  useEffect(() => {
    async function fetchTable(tenant_id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/table/" + tenant_id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      setTable(data);
    }

    fetchTable("T-rcIjD0zo");
  }, []);

  const validate = Yup.object({
    user_name: Yup.string(),
    order_instruction: Yup.string(),
    user_phonenumber: Yup.string().matches(
      /(^\+62|62|^08)(\d{2,3}-?){2}\d{2,3}$/,
      "Phone number is not valid."
    ),
    order_table: Yup.string().required("Table Number is required."),
  });

  async function callWaiter(formData) {
    const user_id = localStorage.getItem("user_id");
    formData.user_id = user_id;
    console.log("FORM DATA", formData);
    const url = "https://backend.oasis-one.com/api/waiter/" + tenant_id;
    try {
      const response = await axios.post(url, JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      // console.log("RESPONSE", response.data.data);
      socket.emit("add waiter call", data);

      notify("Calling waiter...");
      setTimeout(() => {
        history.goBack();
      }, 3000);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-message",
    });

  return (
    <React.Fragment>
      <HeaderBar />

      <div
        className="container-body"
        style={{ position: "absolute", width: "414px", maxWidth: "100vw" }}
      >
        <section>
          <div className="row">
            <div className="col-12">
              <Formik
                initialValues={{
                  user_name: isDefaultExist ? formDataDefault.user_name : "",
                  user_phonenumber: isDefaultExist
                    ? formDataDefault.user_phonenumber
                    : "",
                  order_instruction: isDefaultExist
                    ? formDataDefault.order_instruction
                    : "",
                  user_guest: isDefaultExist ? formDataDefault.user_guest : "",
                  order_table: isDefaultExist
                    ? formDataDefault.order_table
                    : "",
                }}
                validationSchema={validate}
                onSubmit={(e) => callWaiter(e)}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    {/* {console.log(formik.values)} */}
                    <InputText
                      label="Name"
                      name="user_name"
                      type="text"
                      placeholder="Enter Your Name"
                    />

                    <InputText
                      label="Phone Number"
                      name="user_phonenumber"
                      type="text"
                      placeholder="Enter Your Phone Number"
                    />

                    <InputText
                      label="Special Instructions (optional)"
                      name="order_instruction"
                      type="text"
                      placeholder="Enter E.g No onions, please"
                    />

                    <InputText
                      label="Number of People"
                      name="user_guest"
                      type="text"
                      placeholder=""
                    />

                    {table.length !== 0 ? (
                      <Select
                        label="Table Number"
                        name="order_table"
                        table={table}
                        placeholder=""
                      />
                    ) : null}

                    <button
                      type="submit"
                      className="btn big-primary-button my-5"
                      style={{ background: color }}
                    >
                      Call Now
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
