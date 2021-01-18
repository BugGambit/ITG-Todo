import React, { useState } from "react";
import { Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { TodoItem } from "../types/Todo";
import { v4 as uuid } from "uuid";

type AddTodoProps = {
  onAdd: (todo: TodoItem) => Promise<void>;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  return (
    <Input
      value={title}
      addonAfter={<EnterOutlined />}
      placeholder="Write a todo and press enter"
      allowClear
      maxLength={50}
      size="large"
      onChange={(event) => setTitle(event.target.value)}
      onKeyPress={async (event) => {
        const emptyTitle = title.trim() === "";
        if (event.key === "Enter" && !emptyTitle) {
          event.preventDefault();
          const nowAsTimestampInS = Math.floor(Date.now() / 1000);
          await onAdd({
            id: uuid(),
            title: title,
            createdAt: nowAsTimestampInS,
            isCompleted: false,
          });
          setTitle("");
        }
      }}
    />
  );
}
