import Modal from "../../global/Modal";
import Button from "../../global/Buttton";

export default function DeleteBoard({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {
                (closeModal) => (
                    <div className="grid gap-4">
                        <h3 className="font-bold text-lg text-primaryRed">Delete this board?</h3>
                        <p className="text-sm text-grayColor">
                            Are you sure you want to delete the "Platform Launch" board? This action will remove all columns and tasks and cannot be reversed.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button color="red">Delete</Button>
                            <Button color="gray" onClick={closeModal}>Cancel</Button>
                        </div>
                    </div>
                )
            }
        </Modal>
    )
}