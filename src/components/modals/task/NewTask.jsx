import Modal from '../../global/Modal'
import Input from "../../global/Input"
import Select from '../../global/Select'
import Button from '../../global/Buttton'
import { Plus, CircleX } from "lucide-react"

export default function NewTask({ isOpen, onClose }) {
    const statusOptions = [
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'done', label: 'Done' }
    ]
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-6">
                <h3 className="font-bold text-lg">Add New Task</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label htmlFor="taskName" className='font-bold text-xs text-grayColor dark:text-white'>Task Name</label>
                        <Input placeholder="e.g Tak Coffee Break" />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor="taskDescription" className='font-bold text-xs text-grayColor dark:text-white'>Description</label>
                        <textarea
                            rows='4'
                            cols='10'
                            className='w-full rounded-sm py-2 px-4
                                border border-grayColor
                                outline-none focus:outline-none focus:ring focus:ring-primaryPurple transition-all duration-150
                                dark:focus:ring-0
                                placeholder:text-sm placeholder:font-medium placeholder:text-grayColor/50
                               dark:placeholder:text-grayColor'
                            placeholder="e.g. Make coffee and take a short break"
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label htmlFor="subtasks" className='font-bold text-xs text-grayColor dark:text-white'>Subtasks</label>
                            <div className="flex items-center w-full">
                                <Input placeholder="e.g Web Design" className="grow" />
                                <Button className='!bg-transparent'><CircleX color='gray' /></Button>
                            </div>
                            <div className="flex items-center w-full">
                                <Input placeholder="e.g Web Design" className="grow" />
                                <Button className='!bg-transparent'><CircleX color='gray' /></Button>
                            </div>
                        </div>
                        <Button color="purple" className='text-sm dark:bg-white dark:text-primaryPurple'>
                            <Plus strokeWidth={4} size={10} />
                            <span>Add New Subtask</span>
                        </Button>
                    </div>
                    <div className='grid gap-3'>
                        <div className="grid gap-2">
                            <label htmlFor="currentStatus" className='font-bold text-xs text-grayColor dark:text-white'>Current Status</label>
                            <Select
                                options={statusOptions} />
                        </div>
                        <Button color="purple" className='text-sm'>
                            <span>Create Task</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}