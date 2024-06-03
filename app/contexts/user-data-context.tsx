"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

const UserDataContext = createContext<UserDataType[]>([]);

interface UserDataType {
  createdAt: string;
  username: string;
  avatar: string;
  active: boolean;
  fullName: string;
  id: string;
}

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://665621609f970b3b36c4625e.mockapi.io/users"
      );
      const data = await res.json();
      setUserData(data);
    };
    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataProvider, UserDataContext };
