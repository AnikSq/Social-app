import "./online.css";
export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // this user excecuted at rightbar
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={PF + user.profilePicture}
          alt="Friend"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
