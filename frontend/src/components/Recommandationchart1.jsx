import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "ML", score: 95 },
  { name: "NLP", score: 88 },
  { name: "Data Sci", score: 82 },
  { name: "Web Dev", score: 75 },
];

function Recommendationchart1() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold mb-4">
        AI Recommendation Strength
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Recommendationchart1;
