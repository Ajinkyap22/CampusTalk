import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import Member from "./Member";

function Members({
  members,
  moderators,
  removeMember,
  makeModerator,
  dismissModerator,
}) {
  const [moderatorsList, setModeratorsList] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // create a hashmap of moderators
    let moderatorsHashMap = {};

    moderators.forEach((moderator) => {
      moderatorsHashMap[moderator._id] = true;
    });

    // update the state
    setModeratorsList(moderatorsHashMap);
  }, [moderators]);

  return (
    <div className="bg-white dark:bg-darkSecondary shadow-base min-w-[32rem] rounded">
      {members.map((member, i) => (
        <Member
          key={i}
          members={members}
          member={member}
          moderatorsList={moderatorsList}
          user={user}
          removeMember={removeMember}
          makeModerator={makeModerator}
          dismissModerator={dismissModerator}
          i={i}
        />
      ))}
    </div>
  );
}

export default Members;
