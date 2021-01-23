import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, setKeyWord } from "../store/ProductsReducer";

const SearchBar = ({ isTopMenu, isTopMenuMobile, setClicked }) => {
  const { t } = useTranslation();
  const _keyword = useSelector(getFilters)._keyword;
  const dispatch = useDispatch();
  const [text, setText] = useState(_keyword);

  const handleType = (event) => {
    if (event.keyCode === 13) {
      if (isTopMenuMobile) {
        setClicked();
      }
      handleBtnClick();
    }
  };

  const handleBtnClick = () => {
    dispatch(setKeyWord(text));
    window.location.href = `${window.location.pathname}?_keyword=${text}`;
  };

  return (
    <div
      className={
        !isTopMenuMobile ? "SearchBar d-none d-xl-flex" : "SearchBar d-flex"
      }
      style={{ justifyContent: "center" }}
    >
      {isTopMenuMobile && (
        <div className="mobile-btn">
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => setClicked()} />
        </div>
      )}
      <form
        style={isTopMenu && { background: "rgb(243, 243, 243)" }}
        onSubmit={(event) => event.preventDefault()}
      >
        {isTopMenu && <FontAwesomeIcon icon={faSearch} className="mx-3" />}
        <input
          style={isTopMenu && { background: "rgb(243, 243, 243)" }}
          type="text"
          placeholder={t("LABEL_SEARCH")}
          className="p-0"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyUp={(event) => handleType(event)}
        />
      </form>
      {!isTopMenu && !isTopMenuMobile && (
        <button onClick={() => handleBtnClick()}>
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          {t("LABEL_SEARCH_BTN")}
        </button>
      )}
      {isTopMenuMobile && (
        <div className="mobile-btn">
          <FontAwesomeIcon icon={faSearch} onClick={() => handleBtnClick()} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
