function MainContent() {
  return (
    <main
      style={{
        backgroundColor: "#eef2ff",
        padding: "20px",
        minHeight: "220px",
        lineHeight: 1.6,
      }}
    >
      <h3 style={{ color: "#111827", marginTop: 0 }}>Welcome!</h3>
      <p>
        This React app demonstrates <strong>inline CSS styling</strong> across
        multiple components. Try tweaking values like <code>backgroundColor</code>,
        <code>padding</code>, or <code>textAlign</code> to see instant changes.
      </p>
    </main>
  );
}

export default MainContent;
