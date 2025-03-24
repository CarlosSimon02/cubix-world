"use client";

import { Card, Grid, theme, Typography } from "antd";
import { ReactNode } from "react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      padding: `${token.sizeXL}px ${token.sizeMD}px`,
    },
    innerContainer: {
      width: "100%",
      maxWidth: token.screenXS,
      margin: "0 auto",
      gap: token.marginXL,
    },
    header: {
      textAlign: "center" as const,
    },
    description: {
      textAlign: "center" as const,
      color: token.colorTextSecondary,
    },
  };

  return (
    <div style={styles.container}>
      <Card style={styles.innerContainer}>
        <div>
          <Typography.Title level={3} style={styles.header}>
            {title}
          </Typography.Title>
          {description && (
            <Typography.Paragraph style={styles.description}>
              {description}
            </Typography.Paragraph>
          )}
        </div>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
