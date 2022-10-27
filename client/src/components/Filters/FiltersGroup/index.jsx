import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DropdownFilter from "../DropdownFilter";
import ToggleFilter from "../ToggleFilter";

/*

Filters can be dynamically generated using a list of filter configs:

1. Dropdown Filter
{ type: "dropdown", options: ["option1", "option2"], name: "Dropdown" }

2. Toggle Filter
{ type: "toggle", name: "Toggle" }

3. Reset Filter
{ type: "reset" }

*/

function FiltersGroup(props) {
  const { filters, onChange } = props;
  const [filtersState, setFiltersState] = useState(null);
  const [changeCounter, setChangeCounter] = useState(0);

  useEffect(() => {
    onChange(filtersState);
  }, [changeCounter]);

  const getFilterState = (filterName) => {
    if (filtersState === null) {
      return null;
    }
    if (filterName in filtersState) {
      return filtersState[filterName];
    }
    return null;
  };

  const renderedFilters = filters.map((filterConfig) => {
    const { type, name } = filterConfig;
    const filterState = getFilterState(name);
    if (type === "dropdown") {
      return (
        <div
          key={name}
          style={{
            marginRight: 10,
          }}
        >
          <DropdownFilter
            options={filterConfig.options}
            name={filterState === null ? name : filterState}
            onSelect={(eventKey) => {
              setFiltersState((prevState) => ({
                ...prevState,
                [name]: eventKey,
              }));
              setChangeCounter((prevState) => prevState + 1);
            }}
          />
        </div>
      );
    }
    if (type === "reset") {
      return (
        <div
          key={name}
          style={{
            marginRight: 10,
          }}
        >
          <Button
            onClick={() => {
              setFiltersState(null);
              setChangeCounter((prevState) => prevState + 1);
            }}
            as="input"
            type="reset"
            value="Reset"
          />
        </div>
      );
    }
    return (
      <div
        key={name}
        style={{
          marginRight: 10,
        }}
      >
        <ToggleFilter
          name={name}
          checked={getFilterState(name)}
          onToggle={(checked) => {
            setFiltersState((prevState) => ({
              ...prevState,
              [name]: checked,
            }));
            setChangeCounter((prevState) => prevState + 1);
          }}
        />
      </div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {renderedFilters}
    </div>
  );
}

export default FiltersGroup;
