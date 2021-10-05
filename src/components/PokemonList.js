import "./PokemonList.css";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faRulerVertical,
  faWeight,
  faSortNumericUp,
  faSortNumericDown,
} from "@fortawesome/free-solid-svg-icons";
import PokeCard from "./PokeCard";

// const getObjectFromURL = (url) => {
//     const queryString = url.substring(url.indexOf('?')+1);
//     const urlParams = new URLSearchParams(queryString);
//     const params = Object.fromEntries(urlParams);
//     return params;
// }

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(() => {
    const storedValue = sessionStorage.getItem("limit"),
      initialValue = parseInt(storedValue) || 20;
    return initialValue;
  });
  const [sort, setSort] = useState(() => {
    const initialSort = sessionStorage.getItem("sort");
    return initialSort || "name-asc";
  });
  const [searchText, setSearchText] = useState(() => {
    const initialSearchText = sessionStorage.getItem("searchText");
    return initialSearchText || "";
  });
  const [disablePrevious, setDisablePrevious] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const onLimitChange = (event) => {
    let newLimit = event.target.value,
      url = ""; //sessionStorage.getItem('lastUrl'),
    // params = url && getObjectFromURL(url),
    // urlWithoutParam = url && url.substring(0, url.indexOf('?'));

    if (limit !== newLimit) {
      setLimit(newLimit);
      sessionStorage.setItem("limit", newLimit);
      // if(params.limit !== newLimit) {
      //     params.limit = newLimit;
      //     url = `${urlWithoutParam}?${new URLSearchParams(params).toString()}`;
      // }
      loadData(newLimit, url);
    }
  };

  const onSearch = (event) => {
    let newSearchText = event.target.value,
      filteredData = [],
      data = JSON.parse(sessionStorage.getItem("rawData"));

    if (searchText !== newSearchText) {
      setSearchText(newSearchText);
      sessionStorage.setItem("searchText", newSearchText);
      if (newSearchText === "") {
        setPokemons(data.results);
      } else {
        filteredData = searchOp(newSearchText.toLowerCase(), data.results);
        setPokemons(filteredData);
      }
    }
  };

  const searchOp = (query, list = []) => {
    let regex = new RegExp(query, "g"),
      filteredData = list.filter((poke) => {
        let abilities = poke.abilities
          .map((item) => {
            let str = item.ability.name;
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(", ");
        return (
          poke.name.toLowerCase().search(regex) > -1 ||
          abilities.toLowerCase().search(regex) > -1
        );
      });
    return filteredData;
  };

  const onSortChange = (event) => {
    let newSort = event.target.value;
    doSort(newSort);
  };

  const doSort = (newSort, force = false) => {
    let newOrder = [];
    if (sort !== newSort || force) {
      setSort(newSort);
      sessionStorage.setItem("sort", newSort);
      newOrder = sortOp(newSort, pokemons);
      setPokemons(newOrder);
    }
  };

  const sortOp = (newSort, list = []) => {
    let tokens = newSort.split("-"),
      newOrder = [];
    if (tokens[1] === "asc") {
      newOrder = list.sort((a, b) =>
        a[tokens[0]] > b[tokens[0]] ? 1 : b[tokens[0]] > a[tokens[0]] ? -1 : 0
      );
    } else {
      newOrder = list.sort((a, b) =>
        a[tokens[0]] > b[tokens[0]] ? -1 : b[tokens[0]] > a[tokens[0]] ? 1 : 0
      );
    }
    return newOrder;
  };

  const onPrevious = () => {
    let data = JSON.parse(sessionStorage.getItem("rawData"));
    loadData(limit, data.previous);
  };

  const onNext = () => {
    let data = JSON.parse(sessionStorage.getItem("rawData"));
    loadData(limit, data.next);
  };

  const loadData = (pageLimit, url) => {
    let apiUrl =
      url || `https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=0`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        let mons = response.results,
          details = [];
        setDisableNext(!response.next);
        setDisablePrevious(!response.previous);
        for (let mon of mons) {
          details.push(fetch(mon.url));
        }

        Promise.all(details)
          .then((data) => Promise.all(data.map((res) => res.json())))
          .then((records) => {
            return records.map((record) => {
              return {
                id: record.id,
                name: record.name,
                height: record.height,
                weight: record.weight,
                sprites: record.sprites,
                abilities: record.abilities,
              };
            });
          })
          .then((result) => {
            let sortValue = sessionStorage.getItem("sort"),
              sortedSet = sortOp(sortValue || sort, result),
              finalList = [],
              combinedData = Object.assign({}, response, { results: result });

            sessionStorage.setItem("rawData", JSON.stringify(combinedData));
            if (searchText)
              finalList = searchOp(searchText.toLowerCase(), sortedSet);
            else finalList = sortedSet;
            setPokemons(finalList);
          });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let url = ""; //sessionStorage.getItem('lastUrl'), data = JSON.parse(sessionStorage.getItem('rawData'));
    loadData(limit, url);
  }, [limit]);

  return (
    <>
      <div className="top-container">
        <span className="limit" style={{ flex: 1 }}>
          <span style={{ display: "flex" }}>
            <InputLabel>Items Per Page </InputLabel>
            <Select
              role="itemCountControl"
              className="limit-control"
              value={limit}
              onChange={onLimitChange}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </span>
          <span
            style={{
              border: "1px solid lightgrey",
              borderRadius: "0.2em",
              marginLeft: "1em",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchText}
              onChange={onSearch}
              inputProps={{ "aria-label": "search page" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </span>
        </span>
        <span className="paging-container">
          <span className="limit" style={{ flex: 1 }}>
            <InputLabel>Sort By </InputLabel>
            <Select
              className="sort-control"
              value={sort}
              onChange={onSortChange}
            >
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"name-asc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faPaw}
                />
                <span style={{ flex: 8 }}>Name (Ascending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericUp} />
              </MenuItem>
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"name-desc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faPaw}
                />
                <span style={{ flex: 8 }}>Name (Descending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericDown} />
              </MenuItem>
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"height-asc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faRulerVertical}
                />
                <span style={{ flex: 8 }}>Height (Ascending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericUp} />
              </MenuItem>
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"height-desc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faRulerVertical}
                />
                <span style={{ flex: 8 }}>Height (Descending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericDown} />
              </MenuItem>
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"weight-asc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faWeight}
                />
                <span style={{ flex: 8 }}>Weight (Ascending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericUp} />
              </MenuItem>
              <MenuItem
                className="sort-menu-item"
                style={{ display: "flex" }}
                value={"weight-desc"}
              >
                <FontAwesomeIcon
                  style={{ flex: 1, marginRight: "0.5em" }}
                  icon={faWeight}
                />
                <span style={{ flex: 8 }}>Weight (Descending)</span>
                <FontAwesomeIcon style={{ flex: 1 }} icon={faSortNumericDown} />
              </MenuItem>
            </Select>
          </span>
          <IconButton
            disabled={disablePrevious}
            color="primary"
            onClick={onPrevious}
            aria-label="previous page"
          >
            <ArrowBackIosNew />
            Previous
          </IconButton>
          <IconButton
            disabled={disableNext}
            color="primary"
            onClick={onNext}
            aria-label="next page"
          >
            Next
            <ArrowForwardIos />
          </IconButton>
        </span>
      </div>
      <div
        data-testid="card-container"
        className="card-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem",
        }}
      >
        {pokemons.map((mon, index) => (
          <PokeCard testid="card" key={index} {...mon} />
        ))}
      </div>
      <div className="top-container">
        <span className="limit" style={{ flex: 1 }}></span>
        <span className="paging-container" style={{ flex: 1 }}>
          <IconButton
            disabled={disablePrevious}
            color="primary"
            onClick={onPrevious}
            aria-label="previous page"
          >
            <ArrowBackIosNew />
            Previous
          </IconButton>
          <IconButton
            disabled={disableNext}
            color="primary"
            onClick={onNext}
            aria-label="next page"
          >
            Next
            <ArrowForwardIos />
          </IconButton>
        </span>
      </div>
    </>
  );
}

export default PokemonList;
