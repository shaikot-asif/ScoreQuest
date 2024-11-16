import React from "react";
import Header from "../../../../../components/Header";

const MatchStatistics = () => {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Match Statistics
        </h1>

        {/* Batters Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Batters</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Runs</th>
                  <th className="p-2 border">Balls</th>
                  <th className="p-2 border">4s</th>
                  <th className="p-2 border">6s</th>
                  <th className="p-2 border">SR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border">Player 1</td>
                  <td className="p-2 border">45</td>
                  <td className="p-2 border">30</td>
                  <td className="p-2 border">5</td>
                  <td className="p-2 border">3</td>
                  <td className="p-2 border">150.0</td>
                </tr>
                {/* More rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bowlers Table */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Bowlers</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Overs</th>
                  <th className="p-2 border">Runs</th>
                  <th className="p-2 border">Wickets</th>
                  <th className="p-2 border">Economy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border">Bowler 1</td>
                  <td className="p-2 border">4</td>
                  <td className="p-2 border">32</td>
                  <td className="p-2 border">2</td>
                  <td className="p-2 border">8.0</td>
                </tr>
                {/* More rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatistics;
