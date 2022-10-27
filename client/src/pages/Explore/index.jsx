import React from "react";
import PageLayout from "../../components/PageLayout";
import ExploreFilter from "./components/ExploreFilter/ExploreFilter";

function Explore() {
  const name = "Beryl";

  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Events near you</p>
      <ExploreFilter
        onChange={(filtersState) => {
          // TODO: Make api call to update filters for explore page
          console.log(filtersState);
        }}
      />
    </PageLayout>
  );
}

export default Explore;
