import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";

function App() {
  const profiles = [
    { name: "Ghizlane", age: 22, bio: "React learner who loves design & travel." },
    { name: "Zaina", age: 24, bio: "Digital marketer and content creator." },
  ];

  return (
    <div
      style={{
        fontFamily: "system-ui",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <Header />

      <MainContent />

      {/* ✅ Counter component */}
      <Counter />

      <section style={{ padding: "0 20px 20px" }}>
        {profiles.map((p) => (
          <UserProfile key={p.name} {...p} />
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default App;
