function UserProfile({ name, age, bio }) {
  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        padding: "16px",
        margin: "12px 0",
        borderRadius: "10px",
        backgroundColor: "#f8fafc",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#2563eb", margin: "0 0 8px" }}>{name}</h2>
      <p style={{ margin: "0 0 6px" }}>
        Age: <span style={{ fontWeight: "bold", color: "#16a34a" }}>{age}</span>
      </p>
      <p style={{ margin: 0, fontStyle: "italic" }}>Bio: {bio}</p>
    </div>
  );
}

export default UserProfile;
