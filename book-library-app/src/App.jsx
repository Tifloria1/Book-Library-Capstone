import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);
    setSelectedBook(null);
    setHasSearched(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h1>Book Library App</h1>
      <p>Search and explore books easily</p>

      {/* 🔹 DETAILS SCREEN */}
      {selectedBook && (
        <div
          style={{
            marginBottom: 20,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <button onClick={() => setSelectedBook(null)}>Back</button>

          <h2 style={{ marginTop: 10 }}>{selectedBook.title}</h2>

          <p>
            <b>Author:</b>{" "}
            {selectedBook.author_name
              ? selectedBook.author_name[0]
              : "Unknown"}
          </p>

          <p>
            <b>First publish year:</b>{" "}
            {selectedBook.first_publish_year || "N/A"}
          </p>

          {selectedBook.cover_i ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
              alt={selectedBook.title}
              style={{
                width: 220,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          ) : (
            <p style={{ color: "#666" }}>No cover available</p>
          )}
        </div>
      )}

      {/* 🔹 SEARCH BAR */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 16px" }}>
          Search
        </button>
      </div>

      {/* 🔹 STATES */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {hasSearched && !loading && !error && books.length === 0 && (
        <p>No results found. Try another keyword.</p>
      )}

      {/* 🔹 BOOK LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
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
                overflow: "hidden",
                borderRadius: 6,
              }}
            >
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#666" }}>No Image</span>
              )}
            </div>

            <h3>{book.title}</h3>
            <p>
              {book.author_name ? book.author_name[0] : "Unknown author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
