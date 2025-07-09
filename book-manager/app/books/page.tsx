'use client'

import { AppProvider, type Navigation } from '@toolpad/core/AppProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const navigation: Navigation = [
  {
    segment: 'books',
    title: 'Books',
    icon: <LibraryBooksIcon />,
  },
]

const rows = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-help',
    description: 'Tiny Changes, Remarkable Results',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-05-01'),
  },
  {
    id: 2,
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    description: 'Rules for Focused Success in a Distracted World',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-06-15'),
  },
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
            <div className='flex justify-between'>
              <Typography variant="h5" gutterBottom>รายการหนังสือ</Typography>
              <input type="text" placeholder='ค้นหารายชื่อหนังสือ' />
            </div>
            <div>
              <Button href="/books/add" variant="contained" sx={{ mb: 2 }}>
                เพิ่มหนังสือ
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.description ?? '-'}</TableCell>
                    <TableCell>{row.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>{row.updatedAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DashboardLayout>
      </AppProvider>
    </AppRouterCacheProvider>
  )
}
