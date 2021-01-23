import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLangIdFromState, updateLangIdAction } from "../store/ShopReducer";

const LanguagesComponent = ({ languages }) => {
  const dispatch = useDispatch();
  const currentLang = useSelector(getLangIdFromState);

  const onLanguageClicked = (item) => {
    dispatch(updateLangIdAction(item));
  };

  if (!languages) {
    return null;
  }
  return (
    <div id="languages-container">
      {languages.map((item, index) => {
        return (
          <span
            className={
              (item === currentLang ? "selectedLang" : "") + " pl-4 item"
            }
            key={index}
            onClick={() => onLanguageClicked(item)}
          >
            {item.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};

export default LanguagesComponent;
