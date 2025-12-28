import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);
    setSelectedBook(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setBooks(data.docs.slice(0, 6));
    } catch  {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h1>Book Library App</h1>
      <p>Search and explore books easily</p>

      {selectedBook && (
        <div
          style={{
            marginBottom: 20,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <button onClick={() => setSelectedBook(null)} style={{ marginBottom: 10 }}>
            Back
          </button>

          <h2 style={{ margin: "10px 0" }}>{selectedBook.title}</h2>
          <p>
            <b>Author:</b>{" "}
            {selectedBook.author_name ? selectedBook.author_name[0] : "Unknown"}
          </p>
          <p>
            <b>First publish year:</b> {selectedBook.first_publish_year || "N/A"}
          </p>

          {selectedBook.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
              alt={selectedBook.title}
              style={{ width: 220, borderRadius: 10, marginTop: 10 }}
            />
          )}
        </div>
      )}

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

      {!selectedBook && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {books.map((book, index) => (
            <div
              key={index}
              onClick={() => setSelectedBook(book)}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                cursor: "pointer",
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
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ color: "#666" }}>No Image</span>
                )}
              </div>

              <h3>{book.title}</h3>
              <p>{book.author_name ? book.author_name[0] : "Unknown author"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
