import { useEffect, useState } from "react";

import Button from "../../components/Button";
import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import Input from "../../components/Input";
import Label from "../../components/Label";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AddUserInformationForm() {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, phoneNumber, password]);

  useEffect(() => {
    if (password.length >= 6) {
      setPasswordMatchError("");
      if (password === confirmPassword) {
        setPasswordMatchError("");
      } else {
        setPasswordMatchError("(Passwords don't match)");
      }
    } else {
      setPasswordMatchError("(Password must be at least 6 characters long)");
    }
  }, [password, confirmPassword]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsSaving(true);
      const updatePayload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: password,
        confirmPassword: password,
        phoneNumber: phoneNumber,
        activateUser: true,
        autoConfirmEmail: true,
      };

      const result = await api.post("/Users", updatePayload);
      if (result.data.isSuccessful) {
        setErrorMessage("");
        navigate("/system-users", { replace: true });
        console.log("User Added successfully");
      } else {
        setErrorMessage(
          result.message || "Failed to add System User. Please try again.",
        );
      }
    } catch (err) {
      if (err.response.data.errors) {
        for (let error in err.response.data.errors) {
          const newErrorMessage = err.response.data.errors[error][0];
          setErrorMessage(
            newErrorMessage || "Username already exists / Invalid Phone number",
          );
        }
      } else if (err.response.data) {
        setErrorMessage(err.response.data.messages[0]);
      }
      console.error("User Creation error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Use isLoading from AuthContext instead of local loading state
  // const loading = isLoading;
  return (
    <Card className="p-6">
      <div>
        <h1 className="text-xl font-semibold">User Information</h1>
        <p className="text-muted-foreground mt-1 text-sm lg:text-base">
          Enter the basic details of the new System User.
        </p>
      </div>
      {errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
      <CardContent>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="flex w-full flex-col gap-6"
        >
          {/* Name */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="w-full">
              <Label className="text-sm">First Name</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter first name"
                disabled={isSaving}
                required
                value={firstName}
              />
            </div>
            <div className="w-full">
              <Label className="text-sm">Last Name</Label>
              <Input
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Enter last name"
                disabled={isSaving}
                value={lastName}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="w-full">
              <Label className="flex items-center text-sm">
                Email Address
                <Label className="text-primary m-0 hidden font-semibold sm:block sm:text-xs">
                  (This will be used for login credentials)
                </Label>
              </Label>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="admin@umat.edu.gh"
                disabled={isSaving}
                required
                value={email}
              />
              <Label className="text-primary mt-1 text-xs font-semibold sm:hidden">
                (This will be used for login credentials)
              </Label>
            </div>
            <div className="w-full">
              <Label className="flex items-center text-sm">
                Username
                <Label className="text-destructive m-0 hidden font-semibold sm:block sm:text-xs">
                  {userNameError}
                </Label>
              </Label>
              <Input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value.trim().replaceAll(" ", ""));
                }}
                placeholder="Enter Username"
                disabled={isSaving}
                value={userName}
                required
                onKeyDown={(e) => {
                  if (e.key === " " || e.code === "Space") {
                    setUserNameError(
                      "(Username can only letters/digits - No spaces)",
                    );
                  } else if (e.key !== " " || e.code !== "Space") {
                    setUserNameError("");
                  }
                }}
              />
              <Label className="text-destructive mt-1 text-xs font-semibold sm:hidden">
                {userNameError}
              </Label>
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <Label className="flex items-center text-sm">Phone Number</Label>
            <Input
              type="tel"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="+233 XXX XXX XXX"
              disabled={isSaving}
              required
              value={phoneNumber}
            />
          </div>

          {/* Password */}

          <div className="flex flex-col">
            <Label className="text-destructive sm:text-xs">
              {passwordMatchError}
            </Label>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="w-full">
                <Label className="text-sm">Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="• • • • • • • •"
                  disabled={isSaving}
                  required
                  value={password}
                />
              </div>
              <div className="w-full">
                <Label className="flex items-center text-sm">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="• • • • • • • •"
                  disabled={isSaving}
                  value={confirmPassword}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between gap-4 md:flex-row lg:w-1/2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center text-sm"
              icon="fa-solid fa-user-plus"
              iconBeforeText={true}
              type="submit"
              disabled={isSaving || passwordMatchError}
            >
              {isSaving ? "Adding..." : "Add New User"}
            </Button>
            <Button className="border-border hover:bg-muted text-foreground w-full border-2 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddUserInformationForm;
