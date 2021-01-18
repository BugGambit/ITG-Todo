import React from "react";
import { List, Avatar, Button, Tooltip, Empty } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import TaskLogo from "./task.png";
import { TodoItem } from "../types/Todo";

type TodoListProps = {
  items: TodoItem[];
  onComplete: (todo: TodoItem) => void;
};

export default function TodoList({ items, onComplete }: TodoListProps) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      style={{ width: "100%" }}
      locale={{
        emptyText: (
          <Empty image={TaskLogo} description="No TODOs. Start by adding one" />
        ),
      }}
      renderItem={(item) => {
        const createdAt = new Date(item.createdAt * 1000);
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={TaskLogo} shape="square" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={`Created ${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`}
            />
            <Tooltip title="Mark as completed">
              <Button
                onClick={() => onComplete(item)}
                shape="circle"
                icon={<CheckOutlined />}
              />
            </Tooltip>
          </List.Item>
        );
      }}
    />
  );
}
