import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
