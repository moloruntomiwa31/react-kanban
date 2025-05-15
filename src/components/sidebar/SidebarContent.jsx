import { LayoutDashboard, Plus } from 'lucide-react'
const boards = [
  {
    id: 1,
    title: "Product Design",
    icon: LayoutDashboard,
    columns: [
      {
        title: "Todo",
        tasks: [
          {
            title: "Landing Page UI",
            description: "Design the landing page for the mobile app",
            status: "Todo",
            subtasks: [
              { title: "Sketch wireframes", isCompleted: false },
              { title: "Choose color scheme", isCompleted: true },
              { title: "Design hero section", isCompleted: false },
            ]
          }
        ]
      },
      {
        title: "In Progress",
        tasks: [
          {
            title: "Logo Variations",
            description: "Create 3 variations of the app logo",
            status: "In Progress",
            subtasks: [
              { title: "Draft logo concepts", isCompleted: true },
              { title: "Present to team", isCompleted: false },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Marketing",
    icon: LayoutDashboard,
    columns: [
      {
        title: "Ideas",
        tasks: []
      }
    ]
  },
  {
    id: 3,
    title: "Engineering",
    icon: LayoutDashboard,
    columns: [
      {
        title: "Backlog",
        tasks: []
      }
    ]
  }
];
const activeBoard = boards[0];

export default function SidebarContent({ onOpenNewBoard }) {
  return (
    <div className="flex-1 w-11/12">
      <h2 className="uppercase text-xs tracking-widest font-semibold text-grayColor pl-4">
        All Boards (3)
      </h2>
      <div className="flex flex-col gap-2 mt-4  overflow-y-auto max-h-[500px]  mdlg:max-h-[245px] lg:max-h-[260px] scrollbar-hide">
        {boards.map((board) => (
          <div
            key={board.id}
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
        className={`w-full flex items-center gap-2 p-3 rounded-tr-4xl rounded-br-4xl transition duration-300 cursor-pointer hover:bg-lightGray text-primaryPurple dark:hover:text-primaryPurple`}
      >
        <LayoutDashboard
          className="dark:fill-grayColor"
          size={20}
          strokeWidth={2}
        />
        <h3 className="font-bold flex items-baseline">
          <Plus strokeWidth={4} size={12} />
          Create New Board
        </h3>
      </button>
    </div>
  )
}