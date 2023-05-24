import React from 'react';
import './Pages.css';

const Friends = () => {
return (
	<div className="my-friends-wrapper">
		<div className="my-friends-container">
			{/* <!--Holds the friends of user and search bar for sending friend requests --> */}
			<textarea id = "bar" type = "text" placeholder="Search Friend's Name..." name="Search"></textarea>
			<button id = "submit-button" type="submit">Search</button>
		</div>
	</div>
    );
};

export default Friends;
