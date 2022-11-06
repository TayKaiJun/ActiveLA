import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FiltersGroup from "../../../../components/Filters/FiltersGroup";
import useIsFirstRender from "../../../../hooks/useIsFirstRender";

const FILTERS_CONFIG = [
  { type: "dropdown", options: ["1km", "2km", "Any"], name: "Distance" },
  { type: "dropdown", options: ["Badminton"], name: "Sports" },
  {
    type: "toggle",
    name: "Active",
  },
  {
    type: "toggle",
    name: "Show",
  },
  {
    type: "reset",
  },
];

function ExploreFilter(props) {
  const { onChange } = props;
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");

  const firstRender = useIsFirstRender();

  const [filterChangeObserver, setFilterChangObserver] = useState(0);

  useEffect(() => {
    if (!firstRender) {
      onChange(filters);
    }
  }, [filterChangeObserver]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        className="p-inputgroup"
        style={{
          height: 38,
          width: 300,
          marginRight: 10,
        }}
      >
        <Button
          onClick={() => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              query: searchText,
            }));
            setFilterChangObserver((prevFilterChangeCounter) => prevFilterChangeCounter + 1);
          }}
          label="Search"
        />
        <InputText
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Keyword"
        />
      </div>
      <Calendar
        style={{
          marginRight: 10,
          height: 38,
          width: 120,
        }}
        value={filters.date}
        placeholder="Date"
        onChange={(e) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            date: e.value,
          }));
          setFilterChangObserver((prevFilterChangeCounter) => prevFilterChangeCounter + 1);
        }}
      />
      <FiltersGroup
        onReset={() => {
          setFilters({});
          setSearchText("");
          setFilterChangObserver((prevFilterChangeCounter) => prevFilterChangeCounter + 1);
        }}
        onChange={(filtersState) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            ...filtersState,
          }));
          setFilterChangObserver((prevFilterChangeCounter) => prevFilterChangeCounter + 1);
        }}
        filters={FILTERS_CONFIG}
      />
    </div>
  );
}

export default ExploreFilter;
