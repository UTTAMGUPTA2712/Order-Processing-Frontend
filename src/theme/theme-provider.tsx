import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import theme from "@/theme/theme";

export default function ThemeProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppRouterCacheProvider options={{ key: 'css', prepend: true }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </AppRouterCacheProvider>
  );
}