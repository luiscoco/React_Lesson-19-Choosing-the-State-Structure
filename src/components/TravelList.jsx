export default function TravelList({ plan, onSelect }) {
  const renderPlace = (id, level = 0) => {
    const place = plan[id];
    return (
      <div key={id}>
        <button className={`lvl-${level}`} onClick={() => onSelect(id)}>
          {place.title}
        </button>
        {place.childIds.map(childId => renderPlace(childId, level + 1))}
      </div>
    );
  };

  return (
    <div className="card list">
      <h2>Destinations</h2>
      {renderPlace(0)}
    </div>
  );
}
