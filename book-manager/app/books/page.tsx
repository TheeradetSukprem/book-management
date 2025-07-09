'use client'

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { fetchBooks, createBook, updateBook, deleteBook, type Book } from './api'

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const navigation: Navigation = [
  {
    segment: 'books',
    title: 'Books',
    icon: <LibraryBooksIcon />,
  },
]

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [openModal, setOpenModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null)
  const [errors, setErrors] = useState({ title: false, author: false })

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
  })

  const loadBooks = async () => {
    const data = await fetchBooks()
    setBooks(data)
  }

  useEffect(() => {
    loadBooks().finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const hasTitle = formData.title.trim()
    const hasAuthor = formData.author.trim()

    if (!hasTitle || !hasAuthor) {
      setErrors({
        title: !hasTitle,
        author: !hasAuthor,
      })
      return
    }

    try {
      if (editMode && selectedBookId) {
        await updateBook(selectedBookId, formData)
      } else {
        await createBook(formData)
      }

      setOpenModal(false)
      setFormData({ title: '', author: '', category: '', description: '' })
      setSelectedBookId(null)
      setEditMode(false)
      setErrors({ title: false, author: false })
      await loadBooks()
    } catch (err) {
      console.error('Error saving book:', err)
    }
  }

  const handleEdit = (book: Book) => {
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description ?? '',
    })
    setSelectedBookId(book.id)
    setEditMode(true)
    setOpenModal(true)
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'แน่ใจหรือไม่?',
      text: 'คุณต้องการลบหนังสือเล่มนี้ใช่ไหม',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบเลย',
      cancelButtonText: 'ยกเลิก',
    })

    if (result.isConfirmed) {
      try {
        await deleteBook(id)
        await loadBooks()
        Swal.fire('ลบแล้ว', 'หนังสือถูกลบเรียบร้อยแล้ว', 'success')
      } catch (err) {
        console.error('Error deleting book:', err)
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบหนังสือได้', 'error')
      }
    }
  }

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppRouterCacheProvider>
      <AppProvider
        navigation={navigation}
        branding={{ title: 'Books', logo: null, homeUrl: '/books' }}
      >
        <DashboardLayout>
          <Box sx={{ p: 4 }}>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" gutterBottom>รายการหนังสือ</Typography>
              <TextField
                type="text"
                placeholder="ค้นหา..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
              />
            </div>
            <Button
              onClick={() => {
                setFormData({ title: '', author: '', category: '', description: '' })
                setSelectedBookId(null)
                setEditMode(false)
                setOpenModal(true)
              }}
              variant="contained"
              sx={{ mb: 2 }}
            >
              เพิ่มหนังสือ
            </Button>


            {loading ? (
              <CircularProgress />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>{book.description || '-'}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(book)}><Edit /></Button>
                        <Button color="error" onClick={() => handleDelete(book.id)}>
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>

          <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{editMode ? 'แก้ไขหนังสือ' : 'เพิ่มหนังสือใหม่'}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={(e) => {
                  handleChange(e)
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, title: false }))
                  }
                }}
                error={errors.title}
                helperText={errors.title ? 'กรุณากรอกชื่อหนังสือ' : ''}
              />
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={(e) => {
                  handleChange(e)
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, author: false }))
                  }
                }}
                error={errors.author}
                helperText={errors.author ? 'กรุณากรอกชื่อผู้เขียน' : ''}
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenModal(false)}>ยกเลิก</Button>
              <Button onClick={handleSubmit} variant="contained">บันทึก</Button>
            </DialogActions>
          </Dialog>
        </DashboardLayout>
      </AppProvider>
    </AppRouterCacheProvider>
  )
}
