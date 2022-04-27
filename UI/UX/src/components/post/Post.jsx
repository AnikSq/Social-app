import "./post.css";
import {
  MoreVert,
  ThumbUpOutlined,
  InsertCommentOutlined,
  ReplyOutlined,
} from "@material-ui/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js"; // this will help us format the time
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length); // setLike is a function that we can use to change the like variable
  const [isLiked, setIsLiked] = useState(false); // whatever is inside the setIsLiked is a function, we can use to change the isLiked variable
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      axios.patch(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop ">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/no-avatar.png"
                }
                alt="User"
              />
            </Link>
            <span className="postUsername">{user.username} &nbsp;.</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText ">{post?.description}</span>
          <img className="postImg" src={PF + post?.img} alt="User post" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button className="likeIcon" onClick={likeHandler}>
              <ThumbUpOutlined className="icon" htmlColor="#1c7ed6" />
              <p>Like</p>
            </button>
            <button className="likeIcon">
              <InsertCommentOutlined className="icon" htmlColor="#1c7ed6" />
              <p>Comment</p>
            </button>
            <button className="likeIcon">
              <ReplyOutlined className="icon" htmlColor="#1c7ed6" />
              <p>Share</p>
            </button>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
