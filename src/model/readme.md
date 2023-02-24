







- User API Routes:-
`````````````````
path: "/user",
method: GET,
intent: for checking working or not,

path: "/user/newUser",
method: POST,
intent: for adding new user,

path: "/user/allusers",
method: GET,
intent: for getting all existing users,

path: "/user/lookuser/:_id",
method: GET,
intent: for getting specified existing user,

path: "/user/searchuser",
method: GET,
intent: for searching all existing users from name starting with query params,

path: "/user/edit/:uid",
method: PATCH,
intent: for Edit user information and update,

path: "/user/follow/:uid",
method: PATCH,
intent: for adding followers,

path: "/user/unfollow/:uid",
method: PATCH,
intent: for removing followers,



- Poetry API Routes:-
`````````````````
path: "/poetry",
method: GET,
intent: for checking working or not,

path: "/poetry/addpoetry",
method: POST,
intent: for adding one poetry,

path: "/allpoetrys",
method: GET,
intent: for getting all poetrys,


path: "/poetry/:id",
method: GET,
intent: for getting only one poetry at time,


path: "/poetry/*/:uid",
method: GET,
intent: for getting all poetry from one user,


path: "/poetry/delete/:_id",
method: DELETE,
intent: for deleting specified one poetry,


path: "/poetry/update/:_id",
method: PATCH,
intent: for editing exisiting poetry,

path: "/poetry/addlike/:_id",
method: PATCH,
intent: for adding likes in existing poetry,


path: "/poetry/removelike/:_id",
method: PATCH,
intent: for removing likes in existing poetry,







- Likes Functionality:-
``````````````````````
- We can first find the user by uid and then put our uid in their array of followers and also put their uid in our following.

- We can send logged in users uid in req.body part for add following details and for add followers in recievers side we send their uid in req.params .

- We can send logged in users uid in req.body part for remove following details and for remove followers in recievers side we send their uid in req.params .
