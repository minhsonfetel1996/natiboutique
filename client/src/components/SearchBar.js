import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, setKeyWord } from "../store/ProductsReducer";

const SearchBar = () => {
  const _keyword = useSelector(getFilters)._keyword;
  const dispatch = useDispatch();
  const [text, setText] = useState(_keyword);
  const { t } = useTranslation();

  const handleType = (event) => {
    if (event.keyCode === 13) {
      handleBtnClick();
    }
  };

  const handleBtnClick = () => {
    dispatch(setKeyWord(text));
    window.location.href = `${window.location.pathname}?_keyword=${text}`;
  };

  return (
    <div
      className="search_bar d-none d-xl-flex"
      style={{ justifyContent: "center" }}
    >
      <form
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type="text"
          placeholder={t("LABEL_SEARCH")}
          className="p-0"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyUp={(event) => handleType(event)}
        />
      </form>
    </div>
  );
};

export default withTranslation()(SearchBar);
