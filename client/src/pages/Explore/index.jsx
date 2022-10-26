import React, { useState } from "react";
import DropdownFilter from "../../components/Filters/DropdownFilter";
import PageLayout from "../../components/PageLayout";

function Explore() {
  const name = "Beryl";
  const [distance, setDistance] = useState(null);

  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Events from your groups</p>
      <div>
        <DropdownFilter
          onSelect={(eventKey) => {
            setDistance(eventKey);
          }}
          options={["1km", "2km", "Any"]}
          name={distance === null ? "Distance" : distance}
        />
      </div>
    </PageLayout>
  );
}

export default Explore;
