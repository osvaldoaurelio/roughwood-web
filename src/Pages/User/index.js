import React, { useCallback } from "react";

import useAuth from "../../hooks/useAuth";

import LoaderSpinner from "../../components/LoaderSpinner";

const User = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  if (loading) {
    return (
      <>
        <h1>User page</h1>
        <h2>{user.name}</h2>
        <LoaderSpinner />
      </>
    );
  }

  return (
    <div>
      <h1>User</h1>
      <h2>{user.name}</h2>
      <button onClick={handleSignOut}> Sign out </button>
    </div>
  );
};

export default User;
