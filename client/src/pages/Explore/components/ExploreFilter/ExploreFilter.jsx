import React from "react";
import FiltersGroup from "../../../../components/Filters/FiltersGroup";

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
  return <FiltersGroup onChange={onChange} filters={FILTERS_CONFIG} />;
}

export default ExploreFilter;
