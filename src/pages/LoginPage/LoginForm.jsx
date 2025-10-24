import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationFailed, setAuthenticationFailed] = useState(false);
  const [authenticationFailedReason, setAuthenticationFailedReason] =
    useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthenticationFailed(false);
    setAuthenticationFailedReason("");

    try {
      const result = await login(email, password);
      if (result.isSuccessful) {
        setAuthenticationFailed(false);
        navigate("/", { replace: true });
      } else {
        setAuthenticationFailed(true);
        setAuthenticationFailedReason(
          result.message || "Login failed. Please try again.",
        );
      }
    } catch (err) {
      setAuthenticationFailed(true);
      setAuthenticationFailedReason(
        "An unexpected error occurred. Please try again.",
      );
      console.error("Login error:", err);
    }
  };

  // Use isLoading from AuthContext instead of local loading state
  const loading = isLoading;

  return (
    <div className="border-muted-foreground/20 bg-background mt-8 flex w-full flex-col rounded-2xl border-1 p-6">
      {/* Welcome message */}
      <div>
        <h1 className="font-semibold">Welcome Back!</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Enter your credentials to access the administration portal.
        </p>
      </div>

      {/* form */}
      {authenticationFailed && (
        <p className="text-destructive mt-6 text-sm lg:text-base">
          {authenticationFailedReason}
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
            // Clear error when user starts typing
            if (authenticationFailed) {
              setAuthenticationFailed(false);
            }
          }}
          className="pl-10"
          disabled={loading}
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
            // Clear error when user starts typing
            if (authenticationFailed) {
              setAuthenticationFailed(false);
            }
          }}
          className="pl-10"
          disabled={loading}
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
          className={`bg-primary text-primary-foreground mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium transition-colors ${
            loading
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "hover:bg-primary/90 focus:ring-ring focus:ring-2 focus:ring-offset-2"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      
    </div>
  );
}

export default LoginForm;
