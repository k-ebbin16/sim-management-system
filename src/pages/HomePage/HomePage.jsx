// import Card from "../../components/Card/Card";
// import Header from "../../components/Header/Header";
// import { Link } from "react-router-dom";
// import WelcomeHeader from "./WelcomeHeader";
// import { v4 as uuid } from "uuid";

import Logo from "../../components/Logo";

function Home() {
  // const navData = [
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Home",
  //     link: "/",
  //     description: "",
  //   },
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Student Records",
  //     link: "/student-records",
  //     description: "Browse all student SIM records",
  //   },
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Assign",
  //     link: "/assign",
  //     description: "Filter and Manage SIM assignments",
  //   },
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Student Profile",
  //     link: "/student-profile",
  //     description: "View an individual students details",
  //   },
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Users",
  //     link: "/users",
  //     description: "Manage system users and permissions",
  //   },
  //   {
  //     id: uuid(),
  //     name: "",
  //     title: "Add User",
  //     link: "/add-user",
  //     description: "Create a new system user",
  //   },
  // ];

  return (
    // <div className="min-h-screen w-full bg-amber-300">
    //   <Header navData={navData} />
    //   <main className="flex h-full flex-col items-center pt-24 lg:pt-20">
    //     <WelcomeHeader />

    //     <section className="mx-auto mt-24 grid h-full w-full max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(50vw,250px),1fr))] gap-8 p-4 px-7 py-16 lg:px-16">
    //       {navData.map(
    //         ({ id, title, description, link }, index) =>
    //           index !== 0 && (
    //             <Link to={link} key={id}>
    //               <Card title={title} description={description} />
    //             </Link>
    //           ),
    //       )}
    //     </section>
    //   </main>
    // </div>

    <div className="bg-background flex min-h-screen w-full">
      {/* Navigation */}
      <aside className="bg-sidebar hidden w-1/5 flex-col p-6 lg:flex">
        {/* User Info & Logo*/}
        <div className="flex flex-col">
          {/* Logo */}
          <div>
            <Logo
              width={12}
              height={12}
              fontSize={"3xl"}
              bgColor={"accent"}
              iconColor={"primary"}
            />
            <h1>SimCard Manager</h1>
          </div>

          {/* User Info */}
          <div></div>
        </div>

        {/* Nav Box */}
        <nav></nav>

        {/* Logout Button */}
        <div></div>
      </aside>

      {/* Dashboard */}
      <main></main>
    </div>
  );
}

export default Home;
