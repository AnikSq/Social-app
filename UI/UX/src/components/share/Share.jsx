import "./share.css";
import {
  PlayCircleFilled,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const description = useRef();

  const submitHandler = async (defaultCreated) => {
    defaultCreated.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };

    if (file) {
      const data = new FormData(); // This is creating a new form data for the file
      const fileName = `${Date.now()} + ${file.name}`; // creating a unique name for the file
      data.append("name", fileName); // appending the madeup file name to the request
      data.append("file", file); // appending the actuall file the user wants to send to the request
      newPost.img = fileName; // The actual data that is updated as text on mongoDB also updating the field property
      try {
        await axios.post("/upload", data); // sending data
      } catch (err) {
        console.log(err); // catching errors
      }
    }

    try {
      await axios.post("/posts", newPost); // Sending the actual post text
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/no-avatar.png"
              }
              alt=""
            />
            <input
              placeholder={"What's in your mind Today, " + user.username + "?"}
              className="shareInput"
              ref={description}
            />
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img class="shareImg" src={URL.createObjectURL(file)} alt="" />
              <Cancel
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PlayCircleFilled htmlColor="#fd7e14" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareOption">
                <Label htmlColor="#1c7ed6" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="#0ca678" className="shareIcon" />
                <span className="shareOptionText">Locations</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="#845ef7" className="shareIcon" />
                <span className="shareOptionText">Thoughts</span>
              </div>
              <div className="shareOption">
                <button className="shareButton" type="submit">
                  Share
                </button>
                {/* When ever the sharebutton is clicked the onSubmit will be fired above */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
