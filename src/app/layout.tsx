import ThemeProviderWrapper from "@/theme/theme-provider";
import { StoreProvider } from "./store-provider";
import SnackbarProviderWrapper from "@/components/snackbar/Snackbar-provider";

import "./global.styles.scss";
import { SidebarProvider } from "@/context";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProviderWrapper>
          <SidebarProvider>
            <StoreProvider>
              <SnackbarProviderWrapper>{children}</SnackbarProviderWrapper>
            </StoreProvider>
          </SidebarProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
