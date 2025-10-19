import Modal from '../../global/Modal'
import Input from "../../global/Input"
import Button from '../../global/Buttton'
import { Plus, CircleX } from "lucide-react"
import { useState } from 'react'
import { useBoardStore } from '../../../stores/useAppStore'

export default function NewBoard({ isOpen, onClose }) {
    const { addBoard } = useBoardStore()
    const [title, setTitle] = useState('')
    const [columns, setColumns] = useState([{ title: 'Todo' }, { title: 'Doing' }, { title: 'Done' }])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return
        
        addBoard({
            title,
            columns: columns.filter(col => col.title.trim()).map(col => ({ ...col, tasks: [] }))
        })
        
        setTitle('')
        setColumns([{ title: 'Todo' }, { title: 'Doing' }, { title: 'Done' }])
        onClose()
    }
    
    const addColumn = () => setColumns([...columns, { title: '' }])
    const removeColumn = (index) => setColumns(columns.filter((_, i) => i !== index))
    const updateColumn = (index, title) => setColumns(columns.map((col, i) => i === index ? { ...col, title } : col))
    return (
        <Modal isOpen={isOpen} onClose={onClose} zIndex={60}>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <h3 className="font-bold text-lg">Add New Board</h3>
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
                        <div className='grid gap-6'>
                            <Button 
                                type="button"
                                onClick={addColumn}
                                color="purple" 
                                className='text-sm dark:bg-white dark:text-primaryPurple'
                            >
                                <Plus strokeWidth={4} size={10} />
                                <span>Add New Column</span>
                            </Button>
                            <Button type="submit" color="purple" className='text-sm'>
                                Create New Board
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    )
}