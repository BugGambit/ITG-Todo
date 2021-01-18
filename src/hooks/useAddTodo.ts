import { gql, useMutation } from "@apollo/client";
import { TodoItem } from "../types/Todo";

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $isCompleted: Boolean!, $createdAt: Int!) {
    CreateTodoItem(
      title: $title
      isCompleted: $isCompleted
      createdAt: $createdAt
    ) {
      _id
    }
  }
`;

export default function useAddTodo() {
  const [addTodo, { loading }] = useMutation<TodoItem, TodoItem>(ADD_TODO);
  return { addTodo, loadingAddTodo: loading };
}
