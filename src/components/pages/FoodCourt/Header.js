import { useSelector } from "react-redux";

export default function Header() {
  const foodcourt = useSelector((state) => state.foodcourt);
  const {
    foodcourt_name,
    foodcourt_logo,
    foodcourt_location,
    foodcourt_address,
  } = foodcourt;

  return (
    <section className="header">
      <div className="row custom-gutter">
        <div className="col-2">
          <img className="rounded header-image" src={foodcourt_logo} alt="" />
        </div>
        <div className="col-10">
          <h6 className="header-title">{foodcourt_name}</h6>
          <div className="header-text">
            <i
              className="material-icons-outlined mr-1"
              style={{ fontSize: "14px" }}
            >
              location_on
            </i>
            {foodcourt_location}
            <br />
            {foodcourt_address}
          </div>

          <button className="btn btn-outline-light header-btn mr-2">
            Info
          </button>
          <button
            className="btn btn-light header-btn mr-2"
            onClick={() => {
              localStorage.clear();
              localStorage.setItem(
                "currFoodcourt",
                JSON.stringify({
                  id: "F-Ha7dmTLi",
                  color: "#424242",
                })
              );
              localStorage.setItem("cart", JSON.stringify([]));
              window.location.reload();
            }}
          >
            Clear Cache
          </button>
        </div>
      </div>
    </section>
  );
}
