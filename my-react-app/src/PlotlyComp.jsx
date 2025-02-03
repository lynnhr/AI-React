import React from "react";
import Plot from "react-plotly.js";

export default function PlotlyComp({ plotData }) {
  if (!plotData) return null;

  //parse the json if string
  const data = typeof plotData === "string" ? JSON.parse(plotData) : plotData;

  return (
    <div>
      <Plot
        data={data.data}
        layout={data.layout}
      />
    </div>
  );
}