import { gql, useMutation } from "@apollo/client";
import { TodoItem } from "../types/Todo";

const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: ID!) {
    UpdateTodoItem(id: $id, isCompleted: true) {
      id
    }
  }
`;

export default function useCompleteTodo() {
  const [completeTodo, { loading }] = useMutation<TodoItem, { id: string }>(
    COMPLETE_TODO
  );
  return { completeTodo, loadingCompleteTodo: loading };
}
