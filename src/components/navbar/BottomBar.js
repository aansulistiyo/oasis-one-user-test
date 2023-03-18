import { Nav, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetAllItemQuantity } from "../../helper/cartHelper";

function ButtomBar() {
  // const pathname = window.location.pathname.split("/")[1];
  // const pathname = location.pathname.split("/")[1];
  const qty = GetAllItemQuantity();
  // const excludePath = pathname === "Menu";

  const homeUrl = useSelector((state) => state.homeUrl);
  return (
    <div
      className="container fixed-bottom"
      style={{
        width: "414px",
        display: "inline",
      }}
    >
      <div className="row ">
        <div className="col-8 mx-auto mb-4">
          <Nav activeKey="/home" className="bottom-bar justify-content-center">
            <Nav.Item>
              <Nav.Link href={homeUrl}>
                <Button
                  variant="outline-danger"
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "30px", height: "30px" }}
                >
                  <span
                    style={{ fontSize: "16px" }}
                    className="material-icons-outlined"
                  >
                    room_service
                  </span>
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/cart">
                <Button
                  variant="outline-danger"
                  className="rounded-circle d-flex justify-content-center "
                  style={{
                    width: "30px",
                    height: "30px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{ fontSize: "16px" }}
                    className="material-icons-outlined"
                  >
                    shopping_cart
                  </span>
                  <Badge
                    bg="danger"
                    style={{
                      borderRadius: "50%",
                      color: "#fff",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      transform: "translate(50%, -20%)",
                    }}
                  >
                    {qty}
                  </Badge>
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Order">
                <Button
                  variant="outline-danger"
                  className="rounded-circle d-flex justify-content-center "
                  style={{ width: "30px", height: "30px" }}
                >
                  <span
                    style={{ fontSize: "16px" }}
                    className="material-icons-outlined"
                  >
                    receipt_long
                  </span>
                </Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default ButtomBar;
