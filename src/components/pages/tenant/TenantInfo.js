import { Modal, Button } from "react-bootstrap/";
import moment from "moment";
import { useHistory } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function TenantInfo({ openingDays, ...props }) {
  const history = useHistory();
  const color = useSelector((state) => state.color);

  return (
    <Modal
      {...props}
      dialogClassName={"modal-detail modal-info"}
      size={"sm"}
      centered
    >
      <div className="modal-tenant-info">
        <div className="tenant-info-title mb-3">Opening Hours</div>

        <table className="table table-borderless table-info-tenant">
          <tbody>
            {openingDays.map((data) => {
              const {
                OpenHour,
                OpenMins,
                OpenTF,
                CloseHour,
                CloseMins,
                CloseTF,
              } = data;
              const schedulue = `${OpenHour}:${OpenMins} ${OpenTF} - ${CloseHour}:${CloseMins} ${CloseTF}`;
              var days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              var today = days[new Date().getDay()];
              return (
                <tr
                  className={`border-bottom ${
                    today === data.day ? "active" : ""
                  }`}
                  style={{ color: today === data.day ? color : "#000" }}
                  key={data.day}
                >
                  <td>{data.day}</td>
                  <td className="text-right">{schedulue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
