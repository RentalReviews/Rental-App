import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import theme from "styles/theme";
import { BasePage, Home, Property, Login, Signup } from "pages";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
/**
 * Add error handling if user does CRUD via front-end and are not authorized (throw error for 401 status code)
 */
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <BasePage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BasePage>
    </BrowserRouter>
  </ChakraProvider>
);
