import { useHistory } from "react-router-dom";

export default function HeaderBar() {
  const history = useHistory();

  // console.log("HISTORY", history);
  const handleClick = () => {
    history.goBack();
  };

  return (
    <section className="header">
      <div className="row">
        <div
          className="col-12 d-flex align-items-center"
          onClick={() => handleClick()}
          style={{ cursor: "pointer" }}
        >
          <i
            className="material-icons-outlined mr-1"
            style={{ fontSize: "14px" }}
          >
            arrow_back_ios_new
          </i>
          <span style={{ fontSize: "14px", fontWeight: "700" }}>Back</span>
        </div>
      </div>
    </section>
  );
}
