import "regenerator-runtime/runtime";
import React from "react";

import "./assets/global.css";

import { SignInPrompt, SignOutButton } from "./ui-components";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";

import Main from "./components/Main";
import Loader from "./components/Loader";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [openLoader, setOpenLoader] = React.useState(false);

  /// If user not signed-in with wallet - show prompt
  if (!window.walletConnection.isSignedIn()) {
    // Sign-in flow will reload the page later
    return <SignInPrompt />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack direction="column" alignItems="center" spacing={2}>
        <SignOutButton accountId={window.accountId} />
        <Main setOpenLoader={setOpenLoader} />
      </Stack>
      <Loader open={openLoader} />
    </ThemeProvider>
  );
}
