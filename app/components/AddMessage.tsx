import React from "react";

interface Props {
  message: string;
}

export const AddMessage = ({ message }: Props) => {
  return (
    <div>
      <div className={`flex justify-end gap-2 items-center`}>
        <div className={`flex flex-col gap-1`}>
          <div className="bg-purple-300 p-2 rounded-md">{message}</div>
        </div>
      </div>
    </div>
  );
};
