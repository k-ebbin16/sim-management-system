import profilePic from "../../assets/profile-pic.jpg";

function WelcomeHeader() {
  const firstname = "Kwamina";
  const lastname = "Ebbin";
  return (
    <section className="bg-card fixed z-40 h-24 w-full">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-7 py-3 lg:px-5">
        <h1 className="text-2xl font-bold lg:text-3xl">Welcome {firstname}!</h1>
        <div className="space-between flex items-center gap-x-2">
          <div className="flex flex-col gap-0 text-right text-sm lg:text-lg">
            <p>{`${firstname} ${lastname}`}</p>
            <p>System Admin</p>
          </div>
          <div className="bg-primary h-12 w-12 overflow-hidden rounded-full md:h-16 md:w-16 lg:h-20 lg:w-20">
            <img src={profilePic} alt="" className="object-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeHeader;
