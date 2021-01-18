import { gql, useQuery } from "@apollo/client";

const LIST_TODOS = gql`
  query ListTodos {
    TodoItem(isCompleted: false, orderBy: createdAt_desc) {
      id
      title
      isCompleted
      createdAt
    }
  }
`;

export default function useTodos() {
  const { loading, error, data, refetch } = useQuery(LIST_TODOS);
  const todos = data ? data.TodoItem : [];
  return {
    todos,
    loadingTodos: loading,
    errorTodos: error,
    refetchTodos: refetch,
  };
}
