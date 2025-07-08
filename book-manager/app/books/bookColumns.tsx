import { GridColDef } from '@mui/x-data-grid'

export const bookColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: () => (
      <button className="text-blue-600 hover:underline">Edit / Delete</button>
    ),
  },
]
