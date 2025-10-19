import Modal from '../../global/Modal'
import Input from "../../global/Input"
import Select from '../../global/Select'
import Button from '../../global/Buttton'
import { Plus, CircleX } from "lucide-react"
import { useState, useEffect } from 'react'
import { useBoardStore, useModalStore } from '../../../stores/useAppStore'

export default function EditTask({ isOpen, onClose }) {
    const { selectedTask } = useModalStore()
    const { activeBoard, updateTask } = useBoardStore()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([])
    const [status, setStatus] = useState('')
    
    const statusOptions = activeBoard?.columns.map(col => ({ value: col.title, label: col.title })) || []
    
    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title)
            setDescription(selectedTask.description || '')
            setSubtasks(selectedTask.subtasks || [])
            setStatus(selectedTask.status)
        }
    }, [selectedTask])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !selectedTask) return
        
        updateTask(selectedTask.id, {
            title,
            description,
            status,
            subtasks: subtasks.filter(st => st.title.trim())
        })
        
        onClose()
    }
    
    const addSubtask = () => setSubtasks([...subtasks, { id: Date.now(), title: '', isCompleted: false }])
    const removeSubtask = (index) => setSubtasks(subtasks.filter((_, i) => i !== index))
    const updateSubtask = (index, title) => setSubtasks(subtasks.map((st, i) => i === index ? { ...st, title } : st))
    
    if (!selectedTask) return null
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <h3 className="font-bold text-lg">Edit Task</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label className='font-bold text-xs text-grayColor dark:text-white'>Task Name</label>
                        <Input 
                            placeholder="e.g Take Coffee Break" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label className='font-bold text-xs text-grayColor dark:text-white'>Description</label>
                        <textarea
                            rows='4'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full rounded-sm py-2 px-4 border border-grayColor outline-none focus:ring focus:ring-primaryPurple transition-all duration-150 dark:bg-primaryDarkPurple dark:text-white dark:border-grayColor/30'
                            placeholder="e.g. Make coffee and take a short break"
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label className='font-bold text-xs text-grayColor dark:text-white'>Subtasks</label>
                            {subtasks.map((subtask, index) => (
                                <div key={subtask.id || index} className="flex items-center w-full gap-2">
                                    <Input 
                                        placeholder="e.g Make wireframes" 
                                        className="grow" 
                                        value={subtask.title}
                                        onChange={(e) => updateSubtask(index, e.target.value)}
                                    />
                                    <Button 
                                        type="button"
                                        onClick={() => removeSubtask(index)}
                                        className='!bg-transparent'
                                    >
                                        <CircleX color='gray' />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button 
                            type="button"
                            onClick={addSubtask}
                            color="purple" 
                            className='text-sm dark:bg-white dark:text-primaryPurple'
                        >
                            <Plus strokeWidth={4} size={10} />
                            <span>Add New Subtask</span>
                        </Button>
                    </div>
                    <div className='grid gap-3'>
                        <div className="grid gap-2">
                            <label className='font-bold text-xs text-grayColor dark:text-white'>Current Status</label>
                            <Select
                                options={statusOptions}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>
                        <Button type="submit" color="purple" className='text-sm'>
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}