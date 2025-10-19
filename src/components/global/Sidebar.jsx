import { EyeOff } from "lucide-react";
import SidebarContent from "../sidebar/SidebarContent";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSidebarStore } from "../../stores/useAppStore";

export default function Sidebar({ onOpenNewBoard, boards, activeBoard, setActiveBoard }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore()

  return (
    <>
      {isSidebarOpen && (
        <aside
          className={`hidden md:flex relative bg-white dark:bg-secondaryPurple shadow w-[280px] h-[calc(100vh-80px)]
 flex-col items-start pt-4 gap-8 transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Content */}
          <SidebarContent onOpenNewBoard={onOpenNewBoard} boards={boards} activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
          {/* Footer */}
          <div className="static bottom-3 left-0 right-0 flex flex-col gap-4 mb-2 ml-4 w-10/12">
            <ThemeSwitcher />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-2 hover:bg-lightGray hover:text-primary  Purple  text-primaryPurple dark:text-grayColor dark:hover:text-primaryPurple cursor-pointer p-3 rounded-tr-4xl rounded-br-4xl transition duration-300"
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
