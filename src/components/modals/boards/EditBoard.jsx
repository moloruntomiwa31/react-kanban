import Modal from "../../global/Modal"
import Button from "../../global/Buttton"
import Input from "../../global/Input"
import { Plus, CircleX } from "lucide-react"

export default function EditBoard({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-6">
                <h3 className="font-bold text-lg">Edit board</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label htmlFor="boardName" className='font-bold text-xs text-grayColor dark:text-white'>Board Name</label>
                        <Input placeholder="e.g Tak Coffee Break" />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label htmlFor="boardColumns" className='font-bold text-xs text-grayColor dark:text-white'>Board Columns</label>
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
                            <span>Add New Column</span>
                        </Button>
                    </div>
                    <Button color="purple" className='text-sm mx-auto' fullWidth>
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    )
}