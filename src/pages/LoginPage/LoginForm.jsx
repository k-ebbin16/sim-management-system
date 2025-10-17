// import { useNavigate } from "react-router-dom";

function LoginForm({ setIsAuthenticated }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="border-muted-foreground/20 bg-background mt-8 flex w-full flex-col rounded-2xl border-1 p-6">
      {/* Welcome message */}
      <div>
        <h1 className="font-semibold">Welcme Back!</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Enter your credentials to access the administration portal.
        </p>
      </div>

      {/* form */}
      <form
        action=""
        className="mt-6 flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Email Address
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary bg-input-background flex items-center gap-4 rounded-lg border px-4 py-1.5 transition-all">
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

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm font-medium">
            Password
          </label>
          <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary bg-input-background flex items-center gap-4 rounded-lg border px-4 py-1.5 transition-all">
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

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-sm font-medium sm:text-[16px]">
          {/* Remember Me */}
          <div className="flex w-full items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              className="accent-accent h-4 w-4 sm:h-5 sm:w-5"
            />
            <label htmlFor="">Remember Me</label>
          </div>

          {/* Forgot Password */}
          <div className="w-full text-right">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-lg py-2 font-medium transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
