import prisma from "../models/prismaClient";

// ------------- GET ---------------//
export const getBooks = () => prisma.book.findMany()

// ------------- GET By ID ---------------//
export const getBook = (id: number) => prisma.book.findUnique({ where: { id } })

// ------------- CREATE ---------------//
export const createBook = (data: any) => prisma.book.create({ data })

// ------------- UPDATE ---------------//
export const updateBook = (id: number, data: any) =>
  prisma.book.update({ where: { id }, data })

// ------------- DELETE ---------------//
export const deleteBook = (id: number) =>
  prisma.book.delete({ where: { id } })
