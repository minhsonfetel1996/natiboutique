import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlertInfoFromState,
  resetAppAlertAction,
} from "../store/ShopReducer";
import { faBan, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const CustomizeAlertComponent = () => {
  const alertData = useSelector(getAlertInfoFromState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    let timeout;
    if (alertData.isAlertOpen) {
      timeout = setTimeout(() => {
        dispatch(resetAppAlertAction());
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [alertData, dispatch]);

  if (!alertData || !alertData.isAlertOpen) {
    return null;
  }

  return (
    <div className="visible-md" aria-live="polite" aria-atomic="true" style={{ position: "relative" }}>
      <div style={{ position: "fixed", top: 100, right: 0 }}>
        <Toast>
          <Toast.Header style={{ color: alertData.success ? "green" : "red" }}>
            <span>
              {alertData.success ? (
                <FontAwesomeIcon icon={faUserCheck} />
              ) : (
                <FontAwesomeIcon icon={faBan} />
              )}
            </span>
            <strong className="mr-auto ml-1">{t("LABEL_NOTIFICATION")}</strong>
          </Toast.Header>
          <Toast.Body>
            {alertData.success
              ? t("LABEL_SUCCESSFUL_RESPONSE")
              : t("LABEL_UNSUCCESSFUL_RESPONSE")}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default CustomizeAlertComponent;
