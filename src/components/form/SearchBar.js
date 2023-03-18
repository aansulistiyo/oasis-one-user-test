import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTerms } from "../../redux/actions/utilsAction";

const SearchBar = ({ placeholder }) => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const color = useSelector((state) => state.color);

  return (
    <section>
      <div className="row">
        <div className="col-12">
          <div className="input-group mb-3" style={{ borderColor: color }}>
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ borderColor: color }}>
                <span className="material-icons-outlined">search</span>
              </span>
            </div>
            <input
              type="text"
              className="form-control search-bar"
              placeholder={placeholder}
              onChange={(e) => dispatch(setTerms(e.target.value))}
              value={search}
              style={{ borderColor: color }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
