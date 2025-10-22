import NavigationContainer from "../../components/Navigation/NavigationContainer";

function SysUsersPage({ navData }) {
  return (
    <div className="bg-background w- flex min-h-dvh">
      {/* Navigation */}
      <NavigationContainer navData={navData} />

      {/* Content Section */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default SysUsersPage;
