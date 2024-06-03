"use client";

import { AddMessage } from "@/app/components/AddMessage";
import { EMOJIS, EmojiModal, REVERSED_EMOJIS } from "@/app/components/Emoji";
import { TagUser } from "@/app/components/TagUser";
import { UserDataContext } from "@/app/contexts/user-data-context";

import Image from "next/image";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  params: { id: string };
}

const Chat = ({ params: { id } }: Props) => {
  const userData = useContext(UserDataContext);
  const user = userData.find((user) => user.id == id);

  const [messageText, setMessageText] = useState<string[]>([""]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayText = useMemo(
    () => messageText.map((word) => EMOJIS[word] ?? word).join(" "),
    [messageText]
  );

  const lastWord = messageText[messageText.length - 1];

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessageList((prev) => [...prev, displayText]);
    setMessageText([""]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setMessageText(
      value.split(" ").map((word) => REVERSED_EMOJIS[word] ?? word)
    );
  };

  useEffect(() => {
    setShowTagSuggestions(lastWord.startsWith("@"));
    setShowEmoji(lastWord.startsWith(":"));
  }, [lastWord]);

  return user ? (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      <div className={`flex gap-2 items-center`}>
        <Image
          src={user.avatar}
          alt="my photo"
          width={50}
          height={50}
          className="size-8 rounded-full"
        />
        <div className={`flex flex-col gap-1`}>
          <div className="text-xs">{user.username}</div>
          <div className="bg-purple-100 p-2 rounded-md">
            I can take the couch for $10.
          </div>
        </div>
      </div>
      {/* Hard-coded example conversation */}
      <div className={`flex justify-end gap-2 items-center`}>
        <Image
          src="/tom.jpg"
          alt="their photo"
          width={50}
          height={50}
          className="size-8 rounded-full"
        />{" "}
        <div className={`flex flex-col gap-1`}>
          <div className="text-xs">Tom</div>
          <div className="bg-purple-300 p-2 rounded-md">
            $10? No way!
          </div>
        </div>
      </div>
      {messageList.map((message, idx) => (
        <AddMessage key={idx} message={message} />
      ))}
      {showTagSuggestions && (
        <TagUser
          addTaggedUser={(username) => {
            setMessageText((prev) => {
              return [...prev.slice(0, prev.length - 1), `@${username}`, ""];
            });
          }}
          text={lastWord.slice(1)}
        />
      )}
      {showEmoji && (
        <EmojiModal
          text={lastWord}
          addSelectedEmoji={(tag) => {
            setMessageText((prev) => {
              return [...prev.slice(0, prev.length - 1), tag, ""];
            });
            setShowEmoji(false);
            inputRef.current?.focus();
          }}
        />
      )}
      {/* Send message button */}
      <form className="flex relative items-center">
        <input
          className="bg-transparent rounded-full w-full h-10  px-5 ring-2 ring-purple-200 border-none placeholder:text-neutral-400"
          name="message"
          onChange={handleInputChange}
          placeholder="Write a message.."
          required
          ref={inputRef}
          type="text"
          value={displayText}
        />
        <button
          className="absolute right-3 text-3xl"
          onClick={handleSendMessage}
        >
          ⬆️
        </button>
      </form>
    </div>
  ) : null;
};

export default Chat;
