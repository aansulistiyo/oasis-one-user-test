import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "./assets/css/custom.css";

import { io } from "socket.io-client";
import { SocketContext } from "./context/socketContext";

import FoodcourtPage from "./components/pages/foodCourt";
import TenantPage from "./components/pages/tenant";
import ButtomBar from "./components/navbar/BottomBar";
import CartPage from "./components/pages/cart";
import OrderPlaced from "./components/pages/orderPlaced";
import Order from "./components/pages/Order";
import Payment from "./components/pages/payment";
import PaymentSuccess from "./components/pages/payment/PaymentSuccess";
import CallWaiter from "./components/pages/CallWaiter";
import DetailMenu from "./components/pages/DetailMenu";
import DetailPromo from "./components/pages/DetailPromo";
import { setSocket } from "./redux/actions/utilsAction";
import TermsCondition from "./components/pages/legal/TermsCondition";
import PrivacyPolicy from "./components/pages/legal/PrivacyPolicy";
function App() {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const currFoodcourt = localStorage.getItem("currFoodcourt");
  if (currFoodcourt === null || currFoodcourt === undefined) {
    localStorage.setItem(
      "currFoodcourt",
      JSON.stringify({
        id: "F-Ha7dmTLi",
        color: "#424242",
      })
    );
  }

  const defaultColor = localStorage.getItem("color");
  if (defaultColor === null || defaultColor === undefined) {
    localStorage.setItem("color", "#424242");
  }
  const [socket, setSocket] = useState("");
  const [socketRetrieved, setSocketRetrieved] = useState(false);
  const [online, setOnline] = useState(0);

  let peopleOnline = online - 1;
  let onlineText = "";

  if (peopleOnline < 1) {
    onlineText = "No one else is online";
  } else {
    onlineText =
      peopleOnline > 1
        ? `${online - 1} people are online`
        : `${online - 1} person is online`;
  }

  useEffect(() => {
    if (socket) {
      socket.on("visitor enters", (data) => setOnline(data));
      socket.on("visitor exits", (data) => setOnline(data));
      socket.emit("joinRoom", "T-rcIjD0zo");
    }
  });

  useEffect(() => {
    const newSocket = io(
      "https://backend.oasis-one.com",
      { transports: ["polling"] },

      {
        query: {
          tenant_id: "T-rcIjD0zo",
        },
      }
    );

    setSocket(newSocket);
    setSocketRetrieved(true);

    return () => newSocket.close();
  }, [socketRetrieved]);

  useState(() => {
    async function fetchUserID() {
      const response = await axios
        .post("https://backend.oasis-one.com/api/user/create")
        .catch((err) => {
          console.log("Error: ", err);
        });
      const user_id = response.data.data.user_id;
      localStorage.setItem("user_id", user_id);
    }

    const user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === "" || user_id === undefined) {
      fetchUserID();
    }
  }, []);

  const color = useSelector((state) => state.color);
  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <div className="App" style={{ background: color }}>
          <div className="container">
            <Switch>
              <React.Fragment>
                <Route path="/foodcourt/:id" exact component={FoodcourtPage} />
                <Route path="/tenant/:id" exact component={TenantPage} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/OrderPlaced" exact component={OrderPlaced} />
                <Route path="/Order" exact component={Order} />
                <Route path="/Payment" exact component={Payment} />
                <Route path="/Menu/:id" exact component={DetailMenu} />
                <Route path="/Promo/:id" exact component={DetailPromo} />
                <Route
                  path="/PaymentSuccess"
                  exact
                  component={PaymentSuccess}
                />
                <Route
                  path="/:tenant_id/CallWaiter"
                  exact
                  component={CallWaiter}
                />

                <Route
                  path="/TermsCondition"
                  exact
                  component={TermsCondition}
                />
                <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
              </React.Fragment>
            </Switch>
          </div>
          <ButtomBar />
        </div>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
