import { React, useRef } from "react";
import "./topbar.css";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useDispatch } from "react-redux";
import actions from "./../../actions/index";

function TopBar() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  function handleSearch(e) {
    dispatch({
      type: actions.CHANGE_SEARCH_TEXT,
      query: e.target.value,
    });

    dispatch({
      type: actions.CHANGE_SEARCH_PAGE,
      pageNumber: 1,
    });
  }

  function onClickSearchButton() {
    searchInput.current.focus();
  }

  return (
    <div className="topbar__container">
      <div className="tobbar__searchbar__container">
        <input
          className="topbar__search"
          placeholder="Search"
          type="text"
          onChange={handleSearch}
          ref={searchInput}
        />
        <IconButton onClick={onClickSearchButton}>
          <SearchOutlinedIcon className="searchbar__icon" />
        </IconButton>
      </div>
    </div>
  );
}
export default TopBar;
