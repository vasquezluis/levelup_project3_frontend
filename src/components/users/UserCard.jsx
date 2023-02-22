import React from "react";

function UserCard({ user, credits, identification, email }) {
  return (
    <div className="w-60 rounded overflow-hidden shadow-lg p-2 m-1 bg-gray-100 text-black">
      <p>Usuario: {user}</p>
      <p>Creditos: {credits}</p>
      <p>ID: {identification}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserCard;
