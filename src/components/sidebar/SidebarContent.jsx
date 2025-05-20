import { LayoutDashboard, Plus } from 'lucide-react'

export default function SidebarContent({ onOpenNewBoard, boards, activeBoard, setActiveBoard }) {

  return (
    <div className="flex-1 w-11/12">
      <h2 className="uppercase text-xs tracking-widest font-semibold text-grayColor pl-4">
        All Boards ({boards.length})
      </h2>
      <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[500px] mdlg:max-h-[245px] lg:max-h-[260px] scrollbar-hide">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => setActiveBoard(board)}
            className={`flex items-center gap-2 p-3 rounded-tr-4xl rounded-br-4xl transition duration-300 cursor-pointer hover:bg-lightGray text-grayColor dark:hover:text-primaryPurple ${board === activeBoard &&
              "bg-primaryPurple dark:bg-primaryPurple text-white hover:bg-lightGray hover:text-primaryPurple"
              }`}
          >
            <board.icon
              className="dark:fill-grayColor"
              size={20}
              strokeWidth={2}
            />
            <h3 className="font-bold capitalize truncate">{board.title}</h3>
          </div>
        ))}
      </div>
      <button
        onClick={onOpenNewBoard}
        className="w-full flex items-center gap-2 p-3 rounded-tr-4xl rounded-br-4xl transition duration-300 cursor-pointer hover:bg-lightGray text-primaryPurple dark:hover:text-primaryPurple"
      >
        <LayoutDashboard className="dark:fill-grayColor" size={20} strokeWidth={2} />
        <h3 className="font-bold flex items-baseline">
          <Plus strokeWidth={4} size={12} />
          Create New Board
        </h3>
      </button>
    </div>
  )
}
