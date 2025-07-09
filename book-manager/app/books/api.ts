import axios from 'axios'

export type Book = {
  id: number
  title: string
  author: string
  category: string
  description?: string
  createdAt: string
  updatedAt: string
}

const API_BASE = 'http://localhost:4000'

export const fetchBooks = async (search?: string): Promise<Book[]> => {
  try {
    const res = await axios.get(`${API_BASE}/books`, {
      params: search ? { search } : {},
    })
    return res.data
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

export const createBook = async (data: Partial<Book>): Promise<Book | null> => {
  try {
    const res = await axios.post(`${API_BASE}/book`, data)
    return res.data
  } catch (error) {
    console.error('Error creating book:', error)
    return null
  }
}

export const updateBook = async (id: number, data: Partial<Book>): Promise<Book | null> => {
  try {
    const res = await axios.put(`${API_BASE}/book/${id}`, data)
    return res.data
  } catch (error) {
    console.error(`Error updating book ID ${id}:`, error)
    return null
  }
}

export const deleteBook = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE}/book/${id}`)
    return true
  } catch (error) {
    console.error(`Error deleting book ID ${id}:`, error)
    return false
  }
}
