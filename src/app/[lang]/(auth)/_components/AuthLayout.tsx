import { Container, Paper, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className="text-2xl font-black">
        {title}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {description}
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;
