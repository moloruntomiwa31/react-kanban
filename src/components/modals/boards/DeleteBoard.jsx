import Modal from "../../global/Modal";
import Button from "../../global/Buttton";
import { useBoardStore } from '../../../stores/useAppStore'

export default function DeleteBoard({ isOpen, onClose }) {
    const { activeBoard, deleteBoard } = useBoardStore()
    
    const handleDelete = () => {
        if (activeBoard) {
            deleteBoard(activeBoard.id)
            onClose()
        }
    }
    
    if (!activeBoard) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-4">
                <h3 className="font-bold text-lg text-red-500">Delete this board?</h3>
                <p className="text-sm text-grayColor">
                    Are you sure you want to delete the "{activeBoard.title}" board? This action will remove all columns and tasks and cannot be reversed.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                    <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}