'use client'

import React, { ReactNode } from 'react'
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'

import Header from '@/components/layout/header/header.component'
import Sidebar from '@/components/layout/sidebar/sidebar.component';
import { useSidebarContext } from '@/context/sidebar.context';

import styles from './layout.module.scss';

const SidebarLayout = ({ children }: {children: ReactNode}) => {
  const { sidebarToggle } = useSidebarContext();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = mobileView ? '56px' : '64px';

  return (
    <Stack className={styles.sidebarLayout}>
      <Header />
      <Box sx={{ flex: 1, maxHeight: `calc(100vh - ${appBarHeight})` }}>
        <Stack className={styles.fullContainer} direction="row">
          <Sidebar />
          <Stack className={`${styles.contentContainer} ${sidebarToggle ? styles.opened : styles.closed}`} >
            {children}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SidebarLayout



