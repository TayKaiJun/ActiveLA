import React from "react";
import PageLayout from "../../components/PageLayout";

function Explore() {
  const name = "Beryl";
  return (
    <PageLayout>
      <h2>Welcome, {name} 👋</h2>
      <p className="mt-4">Events from your groups</p>
    </PageLayout>
  );
}

export default Explore;
