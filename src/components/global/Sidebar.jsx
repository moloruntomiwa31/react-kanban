import { Sun, Moon, EyeOff, LayoutDashboard, Plus } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const boards = [
  {
    id: 1,
    title: "Design",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Marketing",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    title: "Development in Progress",
    icon: LayoutDashboard,
  },
  {
    id: 4,
    title: "Sales",
    icon: LayoutDashboard,
  },
  {
    id: 5,
    title: "Support",
    icon: LayoutDashboard,
  },
];
const activeBoard = boards[1];

export default function Sidebar({ setIsSidebarOpen, isSidebarOpen, onOpenNewBoard }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {isSidebarOpen && (
        <aside
          className={`hidden md:flex relative bg-white dark:bg-secondaryPurple shadow w-[280px] h-[calc(100vh-80px)]
 flex-col items-start pt-4 gap-8 transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Content */}
          <div className="flex-1 w-11/12">
            <h2 className="uppercase text-xs tracking-widest font-semibold text-grayColor pl-4">
              All Boards (3)
            </h2>
            <div className="flex flex-col gap-2 mt-4  overflow-y-auto max-h-[500px]  mdlg:max-h-[245px]">
              {boards.map((board, index) => (
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
          {/* Footer */}
          <div className="static bottom-3 left-0 right-0 flex flex-col gap-4 mb-2 ml-4 w-10/12">
            <div className="flex gap-6 items-center justify-center  py-4 px-6 rounded-md transition duration-300 bg-lightGray dark:bg-primaryDarkPurple">
              <Sun fill="gray" stroke="gray" />

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-primaryPurple peer-focus:outline-none rounded-full peer transition-all duration-300" />
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-full" />
              </label>

              <Moon fill="gray" stroke="gray" />
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-2 hover:bg-lightGray hover:text-primaryPurple  text-primaryPurple dark:text-grayColor dark:hover:text-primaryPurple cursor-pointer p-3 rounded-tr-4xl rounded-br-4xl transition duration-300"
            >
              <EyeOff stroke="gray" size={20} />
              <p className="font-bold">Hide Sidebar</p>
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
