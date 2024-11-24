import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-6 py-2 border bg-black hover:bg-slate-900 text-white rounded-md font-semibold"
    >
      Sign out
    </button>
  );
};

export default SignOut;
