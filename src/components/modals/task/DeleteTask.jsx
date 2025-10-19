import Modal from '../../global/Modal'
import Button from '../../global/Buttton'
import { useBoardStore, useModalStore } from '../../../stores/useAppStore'

export default function DeleteTask({ isOpen, onClose }) {
    const { selectedTask } = useModalStore()
    const { deleteTask } = useBoardStore()
    
    const handleDelete = () => {
        if (selectedTask) {
            deleteTask(selectedTask.id)
            onClose()
        }
    }
    
    if (!selectedTask) return null
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-6">
                <h3 className="font-bold text-lg text-red-500">Delete this task?</h3>
                <p className="text-grayColor text-sm leading-relaxed">
                    Are you sure you want to delete the '{selectedTask.title}' task and its subtasks? 
                    This action cannot be reversed.
                </p>
                <div className="flex gap-4">
                    <Button 
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white flex-1"
                    >
                        Delete
                    </Button>
                    <Button 
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    )
}