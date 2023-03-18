import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

function Promo() {
  const history = useHistory();
  let promo = useSelector((state) => state.promo);
  promo = Object.entries(promo).filter(([key, item]) => {
    const today = new Date();
    return moment(item.endingPeriod) > today;
  });
  promo = Object.fromEntries(promo);
  return (
    <section>
      <div className="row">
        <div className="col-12">
          <h4 className="section-title">Promos For You</h4>

          <div className="row scrolling-wrapper-x flex-row flex-nowrap">
            {Object.keys(promo).length === 0 ? (
              <div className="col-12">
                <Alert variant="danger">No Promo Found</Alert>
              </div>
            ) : (
              Object.keys(promo).map((key) => {
                const item = promo[key];
                return (
                  <div
                    className="col-12"
                    key={item.id}
                    onClick={() => {
                      history.push({
                        pathname: `/Promo/${item.id}`,
                        state: {
                          promo: item,
                        },
                      });
                    }}
                  >
                    <img className="promo-image" src={item.promoImage} alt="" />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Promo;
