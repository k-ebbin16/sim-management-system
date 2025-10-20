import { useState } from "react";

import InputBox from "./InputBox";
// import { useNavigate } from "react-router-dom";
import getToken from "../../api/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticationFailed, setauthenticationFailed] = useState(false);
  const [authenticationFailedReason, setAuthenticationFailedReason] =
    useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tokenObject = await getToken(email, password);
      console.log(tokenObject);

      setauthenticationFailed(false);
    } catch (err) {
      setAuthenticationFailedReason(err?.response?.data?.messages[0]);

      setauthenticationFailed(true);
    } finally {
      setLoading(false);
    }
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
      {authenticationFailed && (
        <p className="text-destructive mt-6 text-sm lg:text-base">
          {authenticationFailedReason}!
        </p>
      )}
      <form
        action=""
        className={`${authenticationFailed ? "mt-2" : "mt-6"} flex flex-col gap-y-4`}
        onSubmit={handleAuthSubmit}
      >
        {/* Email */}

        <InputBox
          icon="fa-solid fa-envelope"
          label="Email Address"
          placeholder="admin@umat.edu.gh"
          type="email"
          isRequired={true}
          value={email}
          onChangeFn={setEmail}
        />

        {/* Password */}
        <InputBox
          icon="fa-solid fa-lock"
          label="Password"
          placeholder="••••••••"
          type="password"
          isRequired={true}
          value={password}
          onChangeFn={setPassword}
        />

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
          disabled={loading}
          className={`bg-primary text-primary-foreground mt-4 w-full rounded-lg py-2 font-medium transition-colors ${loading ? "bg-secondary text-secondary-foreground" : "hover:bg-primary/90"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
