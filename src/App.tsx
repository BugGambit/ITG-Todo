import React from "react";
import TodoList from "./components/TodoList";
import styled from "styled-components";
import AddTodo from "./components/AddTodo";
import { Divider, Skeleton } from "antd";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import useTodos from "./hooks/useTodos";
import { TodoItem } from "./types/Todo";
import LoginScreen from "./components/LoginScreen";
import useApiKey from "./hooks/useApiKey";
import useAddTodo from "./hooks/useAddTodo";
import useCompleteTodo from "./hooks/useCompleteTodo";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px;
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
`;

function Home() {
  const { todos, loadingTodos, refetchTodos } = useTodos();
  const { addTodo, loadingAddTodo } = useAddTodo();
  const { completeTodo, loadingCompleteTodo } = useCompleteTodo();
  const loading = loadingTodos || loadingAddTodo || loadingCompleteTodo;
  const onAdd = async (todo: TodoItem) => {
    await addTodo({ variables: todo });
    await refetchTodos();
  };
  const onComplete = async (todo: TodoItem) => {
    await completeTodo({ variables: { id: todo.id } });
    await refetchTodos();
  };
  return (
    <Page>
      <Container>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <AddTodo onAdd={onAdd} />
            <Divider />
            <TodoList items={todos} onComplete={onComplete} />
          </>
        )}
      </Container>
    </Page>
  );
}

function App() {
  const { setApiKey, apiKey } = useApiKey();
  const loggedIn = !!apiKey;
  return (
    <ApolloProvider client={client}>
      {loggedIn ? <Home /> : <LoginScreen onLogin={setApiKey} />}
      <Home />
    </ApolloProvider>
  );
}

export default App;
