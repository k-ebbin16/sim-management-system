import "./LoginPage.css";
import LoginForm from "./LoginForm";
import LoginSwitcher from "./LoginSwitcher";
import SignupForm from "./SignupForm";
import { useState } from "react";

function LoginPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = (value) => {
    setIsLogin(value);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <section className="bg-primary text-primary-foreground relative hidden overflow-hidden lg:flex lg:w-1/2">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1759328381007-64559a862aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGdyYWR1YXRpb24lMjBzdWNjZXNzfGVufDF8fHx8MTc2MDUxMDgwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Campus"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-accent flex h-16 w-16 items-center justify-center rounded-lg">
              <i className="text-primary fa-solid fa-sim-card text-center text-4xl"></i>
            </div>
            <div>
              <h1 className="text-3xl">SimCard Manager</h1>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-accent mb-1 text-3xl">1,247</p>
                <p className="text-primary-foreground/80 text-sm">
                  Active Students
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-accent mb-1 text-3xl">892</p>
                <p className="text-primary-foreground/80 text-sm">
                  SIMs Issued
                </p>
              </div>
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
            <div className="bg-primary text-foreground flex h-16 w-16 items-center justify-center rounded-lg p-2 text-center text-3xl">
              <i className="fa-solid fa-sim-card text-background"></i>
            </div>

            {/* Title */}
            <div className="flex flex-col items-center justify-center gap-1.5">
              <h2 className="text-primary text-xl font-bold">
                SimCard Manager
              </h2>
              <p className="text-muted-foreground">
                Student Administration Portal
              </p>
            </div>
          </div>

          {/* Login/Sign Up Switcher */}
          <LoginSwitcher handleIsLogin={handleIsLogin} isLogin={isLogin} />

          {/* Details Container */}
          {isLogin ? (
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <SignupForm setIsAuthenticated={setIsAuthenticated} />
          )}

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
