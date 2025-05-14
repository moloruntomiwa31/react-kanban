import Modal from '../../global/Modal'
import Input from "../../global/Input"
import Button from '../../global/Buttton'
import { Plus, CircleX } from "lucide-react"

export default function NewBoard({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-6">
                <h3 className="font-bold text-lg">Add New Board</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label htmlFor="boardName" className='font-bold text-xs text-grayColor'>Board Name</label>
                        <Input placeholder="e.g Web Design" />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label htmlFor="boardColumns" className='font-bold text-xs text-grayColor'>Board Columns</label>
                            <div className="flex items-center w-full">
                                <Input placeholder="e.g Web Design" className="grow" />
                                <Button className='!bg-transparent'><CircleX color='gray' /></Button>
                            </div>
                        </div>
                        <div className='grid gap-6'>
                            <Button color="purple" className='text-sm dark:bg-white dark:text-primaryPurple'>
                                <Plus strokeWidth={4} size={10} />
                                <span>Add New Column</span>
                            </Button>
                            <Button color="purple" className='text-sm'>
                                Create New Board
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}