import Modal from '../../global/Modal'
import Select from '../../global/Select'
import Button from '../../global/Buttton'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { useBoardStore, useModalStore } from '../../../stores/useAppStore'

export default function TaskDetail({ isOpen, onClose }) {
    const { selectedTask, setOpenEditTask, setOpenDeleteTask, setSelectedTask } = useModalStore()
    const { activeBoard, updateTask } = useBoardStore()
    const [showMenu, setShowMenu] = useState(false)
    
    if (!selectedTask) return null
    
    // Get fresh task data from the store
    const currentTask = activeBoard?.columns
        .flatMap(col => col.tasks)
        .find(task => task.id === selectedTask.id) || selectedTask
    
    const statusOptions = activeBoard?.columns.map(col => ({ value: col.title, label: col.title })) || []
    
    const handleSubtaskToggle = (subtaskId) => {
        const updatedSubtasks = currentTask.subtasks.map(st => 
            st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
        )
        updateTask(currentTask.id, { subtasks: updatedSubtasks })
        setSelectedTask({ ...currentTask, subtasks: updatedSubtasks })
    }
    
    const handleStatusChange = (newStatus) => {
        updateTask(currentTask.id, { status: newStatus })
    }
    
    const completedCount = currentTask.subtasks.filter(st => st.isCompleted).length
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg pr-6">{currentTask.title}</h3>
                    <div className="relative">
                        <Button 
                            className="!bg-transparent" 
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <EllipsisVertical color="gray" />
                        </Button>
                        {showMenu && (
                            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-primaryDarkPurple shadow-lg rounded-lg p-4 z-10 min-w-[120px]">
                                <button 
                                    onClick={() => {
                                        setOpenEditTask(true)
                                        setShowMenu(false)
                                        onClose()
                                    }}
                                    className="block w-full text-grayColor text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                                >
                                    Edit Task
                                </button>
                                   <button 
                                    onClick={() => {
                                        setOpenDeleteTask(true)
                                        setShowMenu(false)
                                        onClose()
                                    }}
                                    className="block w-full whitespace-nowrap p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-red-500"
                                >
                                    Delete Task
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {currentTask.description && (
                    <p className="text-grayColor text-sm leading-relaxed">
                        {currentTask.description}
                    </p>
                )}
                
                <div className="grid gap-3">
                    <h4 className="font-bold text-xs text-grayColor dark:text-white">
                        Subtasks ({completedCount} of {currentTask.subtasks.length})
                    </h4>
                    <div className="grid gap-2">
                        {currentTask.subtasks.map((subtask) => (
                            <label 
                                key={subtask.id} 
                                className="flex items-center gap-3 p-3 bg-lightGray dark:bg-primaryDarkPurple rounded cursor-pointer hover:bg-primaryPurple/25 dark:hover:bg-primaryPurple/25"
                            >
                                <input
                                    type="checkbox"
                                    checked={subtask.isCompleted}
                                    onChange={() => handleSubtaskToggle(subtask.id)}
                                    className="w-4 h-4 text-primaryPurple rounded focus:ring-primaryPurple checked:bg-primaryPurple checked:border-primaryPurple"
                                />
                                <span className={`text-sm ${subtask.isCompleted ? 'line-through text-grayColor' : 'dark:text-white'}`}>
                                    {subtask.title}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="grid gap-2">
                    <label className="font-bold text-xs text-grayColor dark:text-white">Current Status</label>
                    <Select
                        options={statusOptions}
                        value={currentTask.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}