import React, { useMemo, useState } from "react";
import { travelPlan as initialPlan } from "./data/travelData.js";
import TravelList from "./components/TravelList.jsx";
import TravelDetail from "./components/TravelDetail.jsx";
import AddDestinationForm from "./components/AddDestinationForm.jsx";

/**
 * This sample demonstrates the state-structure principles:
 * - Group related state (plan as a single object)
 * - Avoid contradictions (single 'status' instead of isLoading/isSent)
 * - Avoid redundant/duplicate state (derive selectedItem from selectedId + plan)
 * - Flatten nested structures (plan is a normalized dictionary + childIds)
 */
export default function App() {
  const [plan, setPlan] = useState(initialPlan);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'sent'

  // Derived: no duplication of selected item
  const selectedItem = useMemo(() => {
    if (selectedId == null) return null;
    return plan[selectedId] ?? null;
  }, [selectedId, plan]);

  // Roots to show in "Parent" select. For simplicity, allow any place to be a parent.
  const roots = useMemo(() => Object.values(plan), [plan]);

  const handleAddDestination = (parentId, title) => {
    setStatus("loading");
    // Simulate async "saving"
    setTimeout(() => {
      const newId = Date.now();
      const newPlace = { id: newId, title, childIds: [] };

      setPlan(prev => ({
        ...prev,
        [newId]: newPlace,
        [parentId]: {
          ...prev[parentId],
          childIds: [...prev[parentId].childIds, newId]
        }
      }));

      setStatus("sent");
      // Reset back to idle after a short confirmation
      setTimeout(() => setStatus("idle"), 600);
    }, 700);
  };

  return (
    <div className="app">
      <h1>Travel Planner</h1>
      <div className="sub">React 19 + Vite • State structure best practices</div>

      <TravelList plan={plan} onSelect={setSelectedId} />
      <TravelDetail place={selectedItem} />
      <AddDestinationForm onAdd={handleAddDestination} status={status} roots={roots} />

      <div className="footer">
        <strong>Concepts:</strong> group related state • avoid contradictions • no redundant/duplicate state • flatten deeply nested objects.
      </div>
    </div>
  );
}
