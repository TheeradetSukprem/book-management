'use client'

import { AppProvider, type Navigation } from '@toolpad/core/AppProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { bookColumns } from './bookColumns'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, createTheme } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const navigation: Navigation = [
  {
    segment: 'books',
    title: 'Books',
    icon: <LibraryBooksIcon />,
  },
]

const rows = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
]

export default function BooksPage() {
  return (
    <AppRouterCacheProvider>
      <AppProvider
        navigation={navigation}
        branding={{ title: 'Books', logo: null, homeUrl: '/books' }}
      >
        <DashboardLayout>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>รายการหนังสือ</Typography>
            <DataGrid rows={rows} columns={bookColumns} autoHeight />
          </Box>
        </DashboardLayout>
      </AppProvider>
    </AppRouterCacheProvider>
  )
}
