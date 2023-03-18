import TenantCard from "./TenantCard";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

function TenantLists() {
  const foodcourt = useSelector((state) => state.foodcourt);
  const term = useSelector((state) => state.search);

  let tenants = [];
  if (Object.keys(foodcourt).length !== 0) {
    tenants = foodcourt.tenant_list.filter((item) => {
      if (term === "") {
        return item;
      }

      return item.tenant_name.toLowerCase().includes(term.toLowerCase());
    });
  }
  return (
    <section className="mt-3">
      <h4 className="section-title">Tenant List</h4>

      <div className="row" style={{ marginBottom: "200px" }}>
        {tenants.length === 0 ? (
          <div className="col-12">
            <Alert variant="danger">No tenants found</Alert>
          </div>
        ) : (
          tenants.map((item) => {
            return (
              <TenantCard tenant_id={item.tenant_id} key={item.tenant_id} />
            );
          })
        )}
      </div>
    </section>
  );
}

export default TenantLists;
