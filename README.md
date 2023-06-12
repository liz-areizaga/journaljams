<!-- [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/w5ovOekq)
 -->
# Summary:
JournalJams is a web application that allow users to input their journal entries. Based off of their entries, a user is given a playlist according to their mood. Users can also add friends and view their friend's entries and profile. Users can comment on posts and upvote or downvote comments. JournalJams also has a chat feature where users can join chat rooms and live chat with other users in the same room.

# Features:
#### Profiling:
- User can set an About Me status
- User can set their Birthday
- User can change their password
 
#### User Authentication and Authorization:
- User can Sign Up with Dual Factor Authentication by email confirmation
- User must log in with valid email and password

#### Rating and Commenting:
- User can comment on their own entries and their friend's entries
- User can upvote or downvote comments on their own entries or their friend's entries

#### Database:
- Uses MongoDB
- Holds:
  1. User information
  2. User entries
  3. User comments
  4. User friends
  5. User mood

#### Social Network:
- User can add and remove friends by their email
- Users can talk to each other in a chatroom

#### Playlist Recommendation System:
- User is recommended based on the mood of their entry

## How to Run:
1. Run "npm start" in the journaljams-app folder in one terminal
2. Run "npx nodemon src/server/server.js" in the journaljams-app folder in another terminal;
3. Access "http://localhost:3000"
 
## Database Schema:
- Comments:
  - Entry ID
  - Comments
    - User
    - Comment
    - Rating
- Entries
  - User
  - Title
  - Text
  - Mood
- Friends
  - Email
  - Friends
- Messages
  - Room
  - Messages
    - User
    - Message
- Rooms
  - User
  - Rooms
- User
  - Email
  - Birthday
  - About Me
 
## Divison of Labour:
Jason Lo: Completed user authenticaion with dual factor authenticaion requiring email verification. Implemented Login and Sign Up functionality. Implemented user profiling with birthday, about me, and change password attributes. Worked together with groupmates to implement chat room features. Connected MongoDB database messaging feature. Implemented friends page and corresponding datatbase. Designed front end of web application. 

Lizbeth Areizaga: Collaborated on intial set up of the website. Initial set up of MongoDB database and connection with backend and frontend components. Worked together with groupmates to implement chat room features. Implemented display of entries and fetching entries from the database. Implemented comments functionality including sending and fetching comments from the database and upvoting and downvoting on comments.

Nathan Kong: Collaborated on intial set up of the website. Implemented a language model that predicts the mood of given text in order to be integrated with our web application. Attempted to work with Spotify API, and after an assesment, chose to manually return playlist from preset array of songs. Integrated language model with fetching entries from MongoDB to assign a playlist for every newly created entry based on its predicted mood. Worked together with groupmates to implement chat room features.

## Screenshots:
<img width="1510" alt="Screenshot_2023-06-12_at_5 21 38_AM" src="https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/e99215a8-e021-4aaf-84ba-83a22a63c150">
![image](https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/d8a66076-1f1a-4555-8bc3-217be5be9875)
<img width="1510" alt="Screenshot_2023-06-12_at_5 21 33_AM" src="https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/a14047e6-5867-48a1-903e-29f62b40baea">
<img width="1510" alt="Screenshot_2023-06-12_at_5 21 16_AM" src="https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/d55c0494-c492-4fd7-81db-8b0906c97153">
<img width="1510" alt="Screenshot_2023-06-12_at_5 17 25_AM" src="https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/b255f909-169b-4a2c-942f-159f00309465">
<img width="1510" alt="Screenshot_2023-06-12_at_5 20 39_AM" src="https://github.com/UCR-CS110-S23/project-journaljams/assets/81611522/1d199a24-bcf5-4ba9-84b6-7aa8c872cb5a">
