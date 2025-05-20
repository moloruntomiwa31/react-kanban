import Modal from "../../global/Modal"
import ThemeSwitcher from "../../global/ThemeSwitcher"
import SidebarContent from "../../sidebar/SidebarContent"
export default function MobileSidebar({ onOpenNewBoard, isOpen, onClose, boards, activeBoard, setActiveBoard }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="!px-0">
            <SidebarContent onOpenNewBoard={onOpenNewBoard} boards={boards} activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
            <div className="px-4">
                <ThemeSwitcher />
            </div>
        </Modal>
    )
}