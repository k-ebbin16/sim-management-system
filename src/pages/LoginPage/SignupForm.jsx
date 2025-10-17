function SignupForm({ setIsAuthenticated }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="border-muted-foreground/20 bg-background mt-8 flex w-full flex-col rounded-2xl border-1 p-6">
      {/* Create Account message */}
      <div>
        <h1 className="font-semibold">Create Account</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Register for a new administrator account.
        </p>
      </div>

      {/* form */}
      <form
        action=""
        className="mt-6 flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        {/* Full Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Full Name
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary flex items-center gap-4 rounded-lg border bg-transparent px-4 py-1.5 transition-all">
            <i className="fa-solid fa-user"></i>
            <input
              className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
              type="text"
              name=""
              id=""
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Email Address
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary flex items-center gap-4 rounded-lg border bg-transparent px-4 py-1.5 transition-all">
            <i className="fa-solid fa-envelope"></i>
            <input
              className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
              type="email"
              name=""
              id=""
              placeholder="admin@umat.edu.gh"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Phone Number
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary flex items-center gap-4 rounded-lg border bg-transparent px-4 py-1.5 transition-all">
            <i className="fa-solid fa-phone"></i>
            <input
              className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
              type="tel"
              name=""
              id=""
              placeholder="+233 XXX XXX XXXX"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Password
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary flex items-center gap-4 rounded-lg border bg-transparent px-4 py-1.5 transition-all">
            <i className="fa-solid fa-lock"></i>
            <input
              className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
              type="password"
              name=""
              id=""
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Confirm Password
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary flex items-center gap-4 rounded-lg border bg-transparent px-4 py-1.5 transition-all">
            <i className="fa-solid fa-lock"></i>
            <input
              className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
              type="password"
              name=""
              id=""
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Agree to terms and conditons */}
        <div className="flex items-center gap-2 text-sm font-medium sm:text-[16px]">
          <input
            required
            type="checkbox"
            name=""
            id=""
            className="accent-accent h-4 w-4 sm:h-5 sm:w-5"
          />
          <label htmlFor="">I agree to the terms and conditions</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-lg py-2 font-medium transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
