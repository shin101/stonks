import { useContext, useMemo } from "react";
import { UserDataContext } from "../contexts/user-data-context";

interface Props {
  addTaggedUser: (username: string) => void;
  text: string;
}

export const TagUser = ({ addTaggedUser, text }: Props) => {
  const userData = useContext(UserDataContext);

  const filteredUsers = userData.filter((user) => {
    return user.username.toLowerCase().includes(text.toLowerCase());
  });

  const defaultUsers = useMemo(() => userData.slice(0, 3), [userData]);
  const finalUsers = filteredUsers.length > 0 ? filteredUsers : defaultUsers;

  return (
    <div className="w-48 max-h-44 border rounded-md p-2 overflow-y-scroll">
      {finalUsers.map((user, idx) => {
        return (
          <button
            className="hover:bg-gray-200 w-full flex p-1"
            key={idx}
            onClick={() => addTaggedUser(user.username)}
          >
            @{user.username}
          </button>
        );
      })}
    </div>
  );
};
