'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, TextField, Typography } from '@mui/material'
import { AppProvider } from '@toolpad/core/AppProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'

export default function AddBookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    router.push('/books')
  }

  return (
    <AppRouterCacheProvider>
      <AppProvider>
        <DashboardLayout>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>เพิ่มหนังสือใหม่</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField label="Title" name="title" value={formData.title} onChange={handleChange} />
              <TextField label="Author" name="author" value={formData.author} onChange={handleChange} />
              <TextField label="Category" name="category" value={formData.category} onChange={handleChange} />
              <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
              <Button variant="contained" onClick={handleSubmit}>บันทึก</Button>
            </Box>
          </Box>
        </DashboardLayout>
      </AppProvider>
    </AppRouterCacheProvider>
  )
}
