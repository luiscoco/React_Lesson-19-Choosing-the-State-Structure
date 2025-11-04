export default function TravelDetail({ place }) {
  return (
    <div className="card detail">
      <h2>Selected</h2>
      {!place ? (
        <p>Select a destination on the left.</p>
      ) : (
        <>
          <span className="badge">ID: {place.id}</span>
          <p>{place.title}</p>
        </>
      )}
    </div>
  );
}
