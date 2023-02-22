import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import theme from "./styles/theme";
import { BasePage, Home } from "./pages";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <BasePage>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BasePage>
    </BrowserRouter>
  </ChakraProvider>
);
