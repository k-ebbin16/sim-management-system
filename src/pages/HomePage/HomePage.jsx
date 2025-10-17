import SideBar from "../../components/SideBar/SideBar";

function HomePage({ navData, setIsAuthenticated }) {
  return (
    <div className="bg-background w- flex min-h-screen">
      {/* Navigation */}
      <SideBar navData={navData} setIsAuthenticated={setIsAuthenticated} />

      {/* Dashboard */}
      <main></main>
    </div>
  );
}

export default HomePage;
