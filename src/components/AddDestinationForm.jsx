import { useState } from "react";

export default function AddDestinationForm({ onAdd, status, roots }) {
  const [parentId, setParentId] = useState(0);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title?.trim()) return;
    onAdd(Number(parentId), title.trim());
    setTitle("");
  };

  return (
    <div className="card">
      <h2>Add Destination</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Parent
          <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
            {roots.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </label>

        <label>
          Title
          <input
            type="text"
            placeholder="e.g. Portugal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <button className="primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Adding..." : "Add Destination"}
        </button>
        {status === "sent" && <p style={{marginTop: '0.5rem'}}>Destination added!</p>}
      </form>
    </div>
  );
}
