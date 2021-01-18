import React from "react";
import { notification } from "antd";
import styled from "styled-components";
import TenantSelector from "./TenantSelector";

const StyledPage = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: transparent url("/login-screen.jpg") center center no-repeat;
  background-size: cover;
`;

type LoginScreenProps = {
  onLogin: (apiKey: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const handleLogin = async (apiKey: string) => {
    try {
      const loginData = await fetch(
        "https://api.cognitedata.com/login/status",
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );
      const asJson = await loginData.json();
      const { loggedIn } = asJson.data;
      if (loggedIn !== true) {
        throw new Error("Could not log in");
      }
      onLogin(apiKey);
    } catch (ex) {
      notification.error({
        message: "Could not log you in",
        description: "Are you sure you entered a valid api key to your tenant?",
      });
    }
  };

  return (
    <StyledPage>
      <TenantSelector onLogIn={handleLogin} />
    </StyledPage>
  );
}
