import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setBooks(data.docs.slice(0, 6));

} catch {
  setError("Something went wrong. Please try again.");
}
     finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h1>Book Library App</h1>
      <p>Search and explore books easily</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 16px" }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {books.map((book, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div
              style={{
                height: 150,
                background: "#eee",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              IMAGE
            </div>
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name[0] : "Unknown author"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;