import { useDispatch, useSelector } from "react-redux";
import formatCurrency from "../../../utils/formatCurrency";
import InputText from "../../form/InputText";
import Select from "../../form/Select";
import { Formik } from "formik";
import * as Yup from "yup";

import { GetTotalCost, RecapCart } from "../../../helper/cartHelper";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { clearCart } from "../../../redux/actions/cartAction";

import { SocketContext } from "../../../context/socketContext";
import { Link } from "react-router-dom";

export default function FormCheckout() {
  const color = useSelector((state) => state.color);
  const total_cost = GetTotalCost();
  const [isLoading, setIsLoading] = useState(false);
  const [isAccept, setIsAccept] = useState(true);

  const socket = useContext(SocketContext);

  let recap = RecapCart();

  const dispatch = useDispatch();
  let formDataDefault = localStorage.getItem("form_data");
  let isDefaultExist = false;

  if (
    formDataDefault !== "" &&
    formDataDefault !== null &&
    formDataDefault !== undefined
  ) {
    formDataDefault = JSON.parse(formDataDefault);
    isDefaultExist = true;
  } else {
    isDefaultExist = false;
  }

  function prepareOrderDataBeforeSend(formData) {
    let recap_data = recap;
    for (let i = 0; i < recap.length; i++) {
      fetch("https://backend.oasis-one.com/api/table/" + recap[i].tenant_id)
        .then((response) => response.json())
        .then((data) => {
          let table = data.data;
          console.log("table_id", formData.order_table);
          const order_table = table.filter(
            (x) => x.table.index === parseInt(formData.order_table)
          );
          recap_data[i].order_table =
            order_table.length > 0
              ? order_table[0].table.id
              : table[0].table.id;
        });
    }

    return recap_data;
  }

  function createOrder(formData) {
    // console.log(formData);
    setIsLoading(true);
    const user_id = localStorage.getItem("user_id");
    recap = prepareOrderDataBeforeSend(formData);

    setTimeout(async () => {
      const payload = {
        user_name: formData.user_name === "" ? "-" : formData.user_name,
        user_phonenumber:
          formData.user_phonenumber === "" ? "-" : formData.user_phonenumber,
        order_instruction: formData.order_instruction,
        user_guest: formData.user_guest === "" ? "-" : formData.user_guest,
        user_id: user_id,
        data: recap,
      };
      const url = "https://backend.oasis-one.com/api/order/create";

      // console.log("payload", payload);
      // axios
      //   .post(url, payload)
      //   .then((response) => {
      //     console.log("Success", response);
      //   })
      //   .catch((error) => {
      //     console.log("error: ", error.response.data.message);
      //     alert(error.response.data.message);
      //     setIsLoading(false);
      //   });

      try {
        const response = await axios.post(url, payload);
        const data = response.data.data.order_list;
        const tenants = response.data.data.tenant_list;
        for (let i = 0; i < data.length; i++) {
          await socket.emit("add order", {
            tenant_id: tenants[i],
            order_id: data[i],
          });
        }
        let localOrderData = localStorage.getItem("order_data");
        if (localOrderData === null || localOrderData === "") {
          localStorage.setItem("order_data", JSON.stringify(data));
        } else {
          localOrderData = JSON.parse(localOrderData);
          localOrderData = localOrderData.concat(data);
          localStorage.setItem("order_data", JSON.stringify(localOrderData));
        }
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("curr_table", formData.order_table);
        localStorage.setItem("form_data", JSON.stringify(formData));
        dispatch(clearCart([]));
        setInterval(function () {
          setIsLoading(false);
          window.location = "/OrderPlaced";
        }, 500);
      } catch (error) {
        console.log("ERROR", error);
      }
    }, 3000);
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
    fetchTable(recap[0].tenant_id);
  }, []);

  const validate = Yup.object({
    user_name: Yup.string(),
    user_phonenumber: Yup.string().matches(
      /\+?(^-)|([ -]?\d+)+|\(\d+\)([ -]\d+)/,
      "Phone number is not valid."
    ),
    order_table: Yup.string().required("Table Number is required."),
  });

  return (
    <section className="my-3">
      <div className="row" style={{ marginBottom: "200px" }}>
        <div className="col-12">
          {!isLoading ? (
            <Formik
              initialValues={{
                user_name: isDefaultExist ? formDataDefault.user_name : "",
                user_phonenumber: isDefaultExist
                  ? formDataDefault.user_phonenumber
                  : "",
                order_instruction: isDefaultExist
                  ? formDataDefault.order_instruction
                  : "",
                user_guest: isDefaultExist ? formDataDefault.user_guest : 1,
                order_table: isDefaultExist ? formDataDefault.order_table : "",
              }}
              validationSchema={validate}
              onSubmit={(e) => createOrder(e)}
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
                  <div className="form-check mb-2 mr-sm-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isAccept}
                      onChange={() => setIsAccept(!isAccept)}
                    />
                    <label className="form-check-label">
                      Saya menyetujui{" "}
                      <Link to={"/TermsCondition"}>"Syarat Ketentuan"</Link> dan
                      <Link to={"/PrivacyPolicy"}>
                        "Kebijakan Privasi"
                      </Link>{" "}
                      Oasis One bagi pelanggan
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn big-primary-button my-5"
                    style={{ background: color }}
                    disabled={!isAccept}
                  >
                    Total Cost: {formatCurrency(total_cost)} | Confirm Order
                  </button>
                </form>
              )}
            </Formik>
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-grow text-success mr-3" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success mr-3" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success mr-3" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
