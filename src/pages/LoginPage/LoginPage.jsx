import LoginForm from "./LoginForm";
import LoginSwitcher from "./LoginSwitcher";
import Logo from "../../components/Logo";
import SignupForm from "./SignupForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-dvh">
      {/* Left Side - Branding */}
      <section className="bg-primary text-primary-foreground relative hidden overflow-hidden transition-[background-color] duration-100 ease-in-out lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://cdn.pyclubs.org/website-storage/club/Umat.jpeg"
            alt="Campus"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="mb-8 flex items-center gap-3">
            <Logo
              width="12"
              height="12"
              fontSize="3xl"
              bgColor="accent"
              iconColor="primary"
            />
            <div>
              <h1 className="text-4xl">SimCard Manager</h1>
              <p className="text-primary-foreground/80">
                Student Administration Portal
              </p>
            </div>
          </div>

          <div className="max-w-md space-y-6">
            <div>
              <h2 className="mb-2 text-2xl">
                Excellence in Engineering Education
              </h2>
              <p className="text-primary-foreground/80">
                Manage student mobile SIM card distribution efficiently and
                securely. Empowering students with seamless connectivity for
                academic success.
              </p>
            </div>

            <div className="border-primary-foreground/20 border-t pt-6">
              <p className="text-primary-foreground/70 text-sm">
                Trusted by leading engineering institutions for student
                connectivity management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side - Login Form */}
      <section className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center gap-4 p-6 lg:hidden">
            {/* Logo */}

            <Logo
              width="16"
              height="16"
              fontSize="3xl"
              bgColor="primary"
              iconColor="background"
            />

            {/* Title */}
            <div className="flex flex-col items-center justify-center gap-1.5">
              <h1 className="text-primary text-xl font-bold">
                SimCard Manager
              </h1>
              <p className="text-muted-foreground">
                Student Administration Portal
              </p>
            </div>
          </div>

          {/* Login/Sign Up Switcher */}
          {/* <LoginSwitcher handleIsLogin={handleIsLogin} isLogin={isLogin} /> */}

          {/* Details Container */}
          {/* {isLogin ? (
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <SignupForm setIsAuthenticated={setIsAuthenticated} />
          )} */}

          <LoginForm />

          {/* Footer */}
          <footer className="w-full">
            <p className="text-muted-foreground mt-6 text-center text-xs lg:text-base">
              © 2024 SimCard Management System. All rights reserved.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
