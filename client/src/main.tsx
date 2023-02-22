import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client"

import App from "./App";
import theme from "./styles/theme"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);
