import Modal from "../../global/Modal"
import Button from "../../global/Buttton"
import Input from "../../global/Input"
import { Plus, CircleX } from "lucide-react"
import { useState, useEffect } from 'react'
import { useBoardStore } from '../../../stores/useAppStore'

export default function EditBoard({ isOpen, onClose }) {
    const { activeBoard, updateBoard } = useBoardStore()
    const [title, setTitle] = useState('')
    const [columns, setColumns] = useState([])
    
    useEffect(() => {
        if (activeBoard) {
            setTitle(activeBoard.title)
            setColumns(activeBoard.columns.map(col => ({ title: col.title })))
        }
    }, [activeBoard])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !activeBoard) return
        
        const validColumns = columns.filter(col => col.title.trim())
        const updatedColumns = validColumns.map(col => {
            const existingColumn = activeBoard.columns.find(c => c.title === col.title)
            return existingColumn || { ...col, tasks: [] }
        })
        
        updateBoard(activeBoard.id, {
            title,
            columns: updatedColumns
        })
        
        onClose()
    }
    
    const addColumn = () => setColumns([...columns, { title: '' }])
    const removeColumn = (index) => setColumns(columns.filter((_, i) => i !== index))
    const updateColumn = (index, title) => setColumns(columns.map((col, i) => i === index ? { ...col, title } : col))
    
    if (!activeBoard) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <h3 className="font-bold text-lg">Edit Board</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label className='font-bold text-xs text-grayColor dark:text-white'>Board Name</label>
                        <Input 
                            placeholder="e.g Web Design" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label className='font-bold text-xs text-grayColor dark:text-white'>Board Columns</label>
                            {columns.map((column, index) => (
                                <div key={index} className="flex items-center w-full gap-2">
                                    <Input 
                                        placeholder="e.g Todo" 
                                        className="grow" 
                                        value={column.title}
                                        onChange={(e) => updateColumn(index, e.target.value)}
                                    />
                                    <Button 
                                        type="button"
                                        onClick={() => removeColumn(index)}
                                        className='!bg-transparent'
                                    >
                                        <CircleX color='gray' />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button 
                            type="button"
                            onClick={addColumn}
                            color="purple" 
                            className='text-sm dark:bg-white dark:text-primaryPurple'
                        >
                            <Plus strokeWidth={4} size={10} />
                            <span>Add New Column</span>
                        </Button>
                    </div>
                    <Button type="submit" color="purple" className='text-sm' fullWidth>
                        Save Changes
                    </Button>
                </div>
            </form>
        </Modal>
    )
}