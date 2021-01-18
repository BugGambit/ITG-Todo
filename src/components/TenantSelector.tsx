import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { LoginOutlined } from "@ant-design/icons";

const { Password } = Input;

export const theme = {
  // ant design colors
  primaryColor: "#1890ff",
  infoColor: "#1890ff",
  successColor: "#1890ff",
  processingColor: "#1890ff",
  errorColor: "#f5222d",
  highlightColor: "#f5222d",
  selectColor: "#e6f7ff",
  warningColor: "#faad14",
  normalColor: "#d9d9d9",
  white: "#fff",
  black: "#000",

  textColor: "rgba(0,0,0, 0.65)",
  textColorSecondary: "rgba(0,0,0, 0.45)",
  textColorInverse: "#fff",
  textColorAccent: "#40a9ff",

  // gearbox colors and styles
  lightGrey: "#f5f5f5",
  lightShadow:
    "rgba(0, 0, 0, 0.05) 1px 6px 20px 8px, rgba(0, 0, 0, 0.11) 0px 6px 6px",
  containerColor: "#fff",
  containerBorderColor: "#EEE",

  textColorDisabled: "rgba(0,0,0, 0.25)",
  buttonBorderColor: "#d9d9d9",
  buttonDisabledColor: "#f5f5f5",
};

const LoginWrapper = styled.div`
  display: flex;
  flex-wrap: initial;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: 50%;
  box-shadow: ${theme.lightShadow};
  background-color: rgba(255, 255, 255, 0.95);
  margin: auto;
  padding: 40px 50px 30px 50px;
  overflow: auto;
`;

const Title = styled.h1`
  font-weight: bold;
  color: black;
`;

const StyledInput = styled(Password)``;

const LoginButton = styled(Button)`
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0;
  min-height: 45px;
  width: 100%;
  margin: 15px 0;
  border-color: ${theme.buttonBorderColor};
  &:not([disabled]) {
    cursor: pointer;
    background-color: ${theme.primaryColor};
    border-color: ${theme.buttonBorderColor};
    color: ${theme.white};
    &:hover {
      color: ${theme.white};
      border-color: ${theme.primaryColor};
      background-color: ${theme.primaryColor};
    }
  }
  &:disabled,
  &:disabled:hover {
    border-color: ${theme.buttonBorderColor} !important;
    background-color: ${theme.buttonDisabledColor} !important;
    color: ${theme.textColorDisabled};
  }
`;

type Props = {
  onLogIn: (apiKey: string) => void;
};

export default function TenantSelector({ onLogIn }: Props) {
  const [apiKey, setApiKey] = useState("");
  return (
    <LoginWrapper>
      <Title style={{ marginBottom: "2rem" }}>
        <span role="img" aria-label="hi">
          👋
        </span>{" "}
        Welcome to ITG
      </Title>
      <p>You need an api-key to your tenant to log in</p>
      <Form
        onFinish={() => {
          onLogIn(apiKey);
        }}
      >
        <Form.Item>
          <StyledInput
            name="apikey"
            data-id="tenant-input"
            autoFocus
            onChange={(event) => {
              setApiKey(event.target.value);
            }}
            value={apiKey}
          />
        </Form.Item>
        <LoginButton
          icon={<LoginOutlined />}
          block
          htmlType="submit"
          disabled={apiKey === ""}
        >
          Login
        </LoginButton>
      </Form>
    </LoginWrapper>
  );
}
