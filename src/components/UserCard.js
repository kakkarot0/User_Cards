import React from "react";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card" data-testid="user-card">
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <div className="user-details">
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
