import { getUser,updateUser,deleteUser } from "../controllers/userController.js";
import { createPost,getPost,updatePost,deletePost  } from "../controllers/postController.js";
import { createComment,getComment,updateComment,deleteComment } from "../controllers/commentController.js";
import {register,login,loginRequired} from "../controllers/authController.js"

const restfulapi = (app) =>{
    app.route("/auth/register")
        .post(register)
    app.route("/auth/login")
        .post(login)

    app.route("/user/:user_id")
        .get(loginRequired,getUser)
        .put(loginRequired,updateUser)
        .delete(deleteUser);



    app.route("/posts")
        .post(loginRequired,createPost);
    app.route("/post/:post_id")
        .get(loginRequired,getPost)
        .put(loginRequired,updatePost)
        .delete(loginRequired,deletePost);

    app.route("/comments")
        .post(loginRequired,createComment);
    app.route("/comment/:comment_id")
        .get(loginRequired,getComment)
        .put(loginRequired,updateComment)
        .delete(loginRequired,deleteComment);
};
export default restfulapi;