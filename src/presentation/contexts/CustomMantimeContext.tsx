import { Container, createTheme, MantineProvider } from "@mantine/core";

type CustomMantineContextProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      defaultProps: {
        size: "xl",
      },
    }),
  },
});

export const CustomMantineProvider = ({
  children,
}: CustomMantineContextProps) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};
