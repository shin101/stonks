"use client";

import { useContext, useMemo, useState } from "react";
import { UserDataContext } from "../contexts/user-data-context";
import { useDebouncedValue } from "../hooks/use-debounced-value";
import { ListUsers } from "../components/ListUsers";

const ChatList = () => {
  const userData = useContext(UserDataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const matchingUsers = useMemo(() => {
    return debouncedSearchTerm
      ? userData.filter((user) =>
          user.username
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
      : userData;
  }, [debouncedSearchTerm, userData]);

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center p-4 bg-gradient-to-r from-purple-100 to-green-100">
        <form className="flex justify-center items-center">
          <input
            required
            className="bg-white rounded-full h-10 px-5 ring-2 ring-purple-200 border-none placeholder:text-neutral-400 w-80"
            type="text"
            name="search bar"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <ListUsers userData={matchingUsers}></ListUsers>
    </div>
  );
};

export default ChatList;
