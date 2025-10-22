import { useContext, useState } from "react";

import AuthContext from "../../context/AuthContext";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticationFailed, setAuthenticationFailed] = useState(false);
  const [authenticationFailedReason, setAuthenticationFailedReason] =
    useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success.isSuccessful) {
        setAuthenticationFailed(false);
        navigate("/");
      } else {
        setAuthenticationFailed(true);
        setAuthenticationFailedReason(success.message);
      }
    } catch (err) {
      setAuthenticationFailed(true);
      console.log(err);
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

        <Input
          icon="fa-solid fa-envelope"
          placeholder="admin@umat.edu.gh"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="pl-10"
        />

        {/* Password */}
        <Input
          icon="fa-solid fa-lock"
          placeholder="••••••••"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="pl-10"
        />

        {/* Remember me & Forgot Password */}
        {/* <div className="flex items-center justify-between text-sm font-medium sm:text-[16px]">
          <div className="flex w-full items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              className="accent-accent h-4 w-4 sm:h-5 sm:w-5"
            />
            <label htmlFor="">Remember Me</label>
          </div>

          <div className="w-full text-right">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
        </div> */}

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
