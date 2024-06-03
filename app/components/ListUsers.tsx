import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserDataType {
  createdAt: string;
  username: string;
  avatar: string;
  active: boolean;
  fullName: string;
  id: string;
}

interface Props {
  userData: UserDataType[];
}

const USER_PAGE_LIMIT = 10;

export const ListUsers = ({ userData }: Props) => {
  const [currPage, setCurrPage] = useState(1);
  const maxPageNum = userData.length / USER_PAGE_LIMIT;

  return (
    <>
      {userData
        .slice((currPage - 1) * USER_PAGE_LIMIT, currPage * 10)
        .map((user) => (
          <div key={user.id}>
            <Link
              href={`/chats/${user.id}`}
              className="flex gap-5 border border-neutral-100 "
            >
              <Image
                width={80}
                height={80}
                src={user.avatar}
                alt={user.username}
              />
              {user.username}
            </Link>
          </div>
        ))}
      <div className="flex justify-center align-center gap-1 m-4">
        <button
          className={`border p-2 rounded-md hover:bg-gradient-to-r from-purple-100 to-green-100  ${
            currPage == 1 && "disabled cursor-not-allowed bg-gray-200"
          }`}
          onClick={() => {
            currPage > 1 && setCurrPage((prev) => prev - 1);
          }}
        >
          ⬅️ Prev
        </button>
        <button
          className={`border p-2 rounded-md hover:bg-gradient-to-r from-purple-100 to-green-100 ${
            currPage == maxPageNum && "disabled cursor-not-allowed bg-gray-200"
          } `}
          onClick={() => {
            currPage < maxPageNum && setCurrPage((prev) => prev + 1);
          }}
        >
          Next ➡️
        </button>
      </div>
      <div className="flex justify-center align-center text-sm">
        Page {currPage}
      </div>
    </>
  );
};
