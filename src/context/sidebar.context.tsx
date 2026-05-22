'use client'

import { useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode, useState, createContext, useMemo, useCallback, useContext, useEffect } from 'react';

interface SidebarContext {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children?: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('sm'));
  const [sidebarToggle, setSidebarToggle] = useState(desktopView);
  const toggleSidebar = useCallback(() => setSidebarToggle(!sidebarToggle), [sidebarToggle]);
  const closeSidebar = useCallback(() => setSidebarToggle(false), []);
  const contextValue = useMemo(() => ({ sidebarToggle, toggleSidebar, closeSidebar }), [sidebarToggle, toggleSidebar, closeSidebar]);

  useEffect(() => {
    setSidebarToggle(desktopView);
  }, [desktopView]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
