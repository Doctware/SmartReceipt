import React from "react";

const Profile = ({ user }) => {
    return (
        <div className="profile">
            <h2>Profile</h2>
            <div className="profile-details">
                {user.role === 'business' ? (
                    <>
                    <p><strong>Business Name: </strong> {user.businessName}</p>
                    <p><strong>Email: </strong> {user.email}</p>
                    </>
                ) : (
                    <>
                    <p><strong>Name: </strong> {user.name}</p>
                    <p><strong>Email: </strong> {user.email}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile;