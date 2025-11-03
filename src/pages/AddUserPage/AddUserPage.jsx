import AddUserHeader from "./AddUserHeader";
import AddUserInformationForm from "./AddUserInformationForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddUserPage() {


  // Handle back to users

  return (
    <main className="bg-background min-h-dvh w-full flex-1 p-4 pt-24 lg:p-6 lg:pt-8">
      <div className="mb-6">
        <AddUserHeader />
      </div>
      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <AddUserInformationForm  />
      </div>
    </main>
  );
}

export default AddUserPage;
