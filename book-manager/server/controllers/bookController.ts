import { Request, Response } from 'express'
import * as bookService from '../services/bookService'

// GET ALL & SEARCH
export const getAll = async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined
  const books = await bookService.getBooks(search)
  res.json(books)
}

// GET BY ID
export const getOne = async (req: Request, res: Response) => {
  const book = await bookService.getBooks(req.params.id)
  book ? res.json(book) : res.status(404).send('Not found')
}

// CREATE
export const create = async (req: Request, res: Response) => {
  const input = req.body

  const books: any[] = Array.isArray(input) ? input : [input]

  const errors: { index: number; message: string }[] = []
  const validBooks: any[] = []

  books.forEach((book, index) => {
    if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
      errors.push({ index, message: 'ชื่อหนังสือห้ามว่าง' })
      return
    }
    if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
      errors.push({ index, message: 'ชื่อผู้เขียนห้ามว่าง' })
      return
    }
    validBooks.push(book)
  })

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'พบข้อมูลผิดพลาด',
      errors,
    })
  }

  const createdBooks = await Promise.all(validBooks.map(book => bookService.createBook(book)))

  res.status(201).json({
    message:
      createdBooks.length === 1
        ? `เพิ่มหนังสือ "${createdBooks[0].title}" สำเร็จ`
        : `เพิ่มหนังสือ ${createdBooks.length} เล่มสำเร็จ`,
    data: createdBooks,
  })
}

// UPDATE
export const update = async (req: Request, res: Response) => {
  const book = await bookService.updateBook(Number(req.params.id), req.body)
  res.json(book)
}

// DELETE
export const remove = async (req: Request, res: Response) => {
  await bookService.deleteBook(Number(req.params.id))
  res.status(204).json({ message: "ลบข้อมูลสำเร็จ" })
}