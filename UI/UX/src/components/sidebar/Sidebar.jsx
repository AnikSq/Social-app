import "./sidebar.css";
import {
  RssFeed,
  Chat,
  YouTube,
  BusinessCenter,
  Group,
  Bookmark,
  Help,
  CalendarToday,
  School,
} from "@material-ui/icons";

import { Users } from "./../../dummyData";

import CloseFriend from "./../closeFriend/CloseFriend";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="statebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <YouTube className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Help className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <BusinessCenter className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <CalendarToday className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Learning</span>
          </li>
          <li className="sidebarListItem">
            <button className="sidebarButton">Show More</button>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((one) => (
            <CloseFriend key={one.id} user={one} /> // this is from the online component
          ))}
        </ul>
      </div>
    </div>
  );
}
