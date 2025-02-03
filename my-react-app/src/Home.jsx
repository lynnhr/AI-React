import React, { useState } from "react";
import { motion } from "framer-motion";
import PlotlyComp from "./PlotlyComp"; 
import "./index.css";

const Home = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [selectedChart, setSelectedChart] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [plotData, setPlotData] = useState(null); 

  const handleGeneratePrompt = () => {
    if (!selectedAnalysis || !selectedChart) {
      setGeneratedPrompt("Please select an analysis type and chart type.");
      return;
    }

    const analysisMap = {
      "1": "the number of male and female customers",
      "2": "data grouped by the age of the customers",
      "3": "cluster customer segmentation based on their purchase behavior",
    };

    const prompt = `Create a Python script that reads a CSV file named 'input_file.csv' with columns such as TransactionID, CustomerID, CustGender, CustAccountBalance, TransactionAmount, Age, Cluster.
     Then, using Plotly, generate a ${selectedChart} chart to represent ${analysisMap[selectedAnalysis]}. Save the Plotly figure as a JSON file named 'plotly_figure.json'.`;
    setGeneratedPrompt(prompt);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setPlotData(json); 
        localStorage.setItem("plotlyData", JSON.stringify(json)); 
      } catch (error) {
        console.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="home-container">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="title">AI Prompt Generator</h1>

        <div className="space-y-6">
          <div>
            <label className="label">Select Analysis Type:</label>
            <select
              className="select"
              value={selectedAnalysis}
              onChange={(e) => setSelectedAnalysis(e.target.value)}
            >
              <option value="">-- Select an Analysis Type --</option>
              <option value="1">Number of Male and Female Customers</option>
              <option value="2">Data Based on Age of the Customers</option>
              <option value="3">Cluster Customer Segmentation</option>
            </select>
          </div>

          <div>
            <label className="label">Select Chart Type:</label>
            <select
              className="select"
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
            >
              <option value="">-- Select a Chart Type --</option>
              <option value="pie">Pie Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          <button onClick={handleGeneratePrompt} className="button">
            Generate My Prompt
          </button>

          {generatedPrompt && (
            <motion.div
              className="prompt-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="prompt-title">Generated Prompt:</h2>
              <p className="prompt-text">{generatedPrompt}</p>
            </motion.div>
          )}

          
          <div>
            <label className="label">Upload Plotly JSON File:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>

          {/* display chart */}
          {plotData && <PlotlyComp plotData={plotData} />}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;