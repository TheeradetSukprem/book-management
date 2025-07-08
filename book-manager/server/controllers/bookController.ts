import { Request, Response } from 'express'
import * as bookService from '../services/bookService'

// GET ALL
export const getAll = async (_req: Request, res: Response) => {
  const books = await bookService.getBooks()
  res.json(books)
}

// GET BY ID
export const getOne = async (req: Request, res: Response) => {
  const book = await bookService.getBook(Number(req.params.id))
  book ? res.json(book) : res.status(404).send('Not found')
}

// CREATE
export const create = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body)
  res.status(201).json(book)
}

// UPDATE
export const update = async (req: Request, res: Response) => {
  const book = await bookService.updateBook(Number(req.params.id), req.body)
  res.json(book)
}

// DELETE
export const remove = async (req: Request, res: Response) => {
  await bookService.deleteBook(Number(req.params.id))
  res.status(204).end()
}
