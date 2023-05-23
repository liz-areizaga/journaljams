import React from 'react';
import './Pages.css';


const Profile = () => {
return (
	<div className="my-profile-wrapper">
		<div className="my-profile-container">
			{/* <!--Holds option to change profile picture and password  --> */}
			<div className="profile-title">
				<div className="profile-text">
					Change profile picture
				</div>
				<div className='pfp-file'>
					<input type="file" id="pfp-file" name="pfp-file"/>
				</div>
			</div>
		</div>
	</div>
    );
};

export default Profile;
