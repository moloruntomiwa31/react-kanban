import { Kanban, ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import Button from "./global/Buttton";
import EditBoardMenu from "./popover/board/EditBoardMenu";
import { useModalStore } from "../stores/useAppStore";

export default function Header({ onOpenNewTask, onOpenDeleteBoard, onOpenEditBoard, onOpenMobileSidebar }) {
  const { openEditBoardMenu, setOpenEditBoardMenu } = useModalStore()

  return (
    <header className="relative px-4 py-4 h-[80px] dark:bg-secondaryPurple shadow flex items-center">
      <div className="items-center gap-2 w-[280px] hidden md:flex">
        <Kanban
          className="!fill-primaryPurple dark:fill-white dark:stroke-white"
          size={32}
          strokeWidth={4}
        />
        <h1 className="text-4xl font-extrabold text-black dark:text-white">
          kanban
        </h1>
      </div>
      <h2 className="font-bold text-2xl capitalize dark:text-white flex items-center gap-0.5">
        Platform Launch
        <button className="!bg-transparent !w-fit outline-none" onClick={onOpenMobileSidebar}>
          <ChevronDown
            className="md:hidden text-primaryPurple"
            size={20}
            strokeWidth={3}
          />
        </button>
      </h2>
      <div className="ml-auto flex items-center gap-4">
        <Button className="bg-primaryPurple hover:opacity-50" onClick={onOpenNewTask}>
          <Plus strokeWidth={6} size={12} />
          <span className="hidden md:block">Add New Task</span>
        </Button>
        <Button className="!bg-transparent" onClick={() => setOpenEditBoardMenu(!openEditBoardMenu)}>
          <EllipsisVertical color="gray" />
        </Button>
      </div>
      <>
        {openEditBoardMenu && (
          <div className="fixed right-8 top-18 z-50">
            <EditBoardMenu onOpenDeleteBoard={() => {
              onOpenDeleteBoard()
              setOpenEditBoardMenu(false)
            }}
              onOpenEditBoard={
                () => {
                  onOpenEditBoard()
                  setOpenEditBoardMenu(false)
                }
              }
            />
          </div>
        )}
      </>
    </header>
  );
}
