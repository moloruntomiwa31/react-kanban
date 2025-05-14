import { Eye } from "lucide-react";
import Sidebar from "./components/global/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import NewBoard from "./components/modals/NewBoard";
import NewTask from './components/modals/NewTask'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false)
  const [openNewTask, setOpenNewTask] = useState(false);

  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <Header onOpenNewTask={() => setOpenNewTask(true)} />
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            onOpenNewBoard={() => setOpenNewBoard(true)}
          />
        )}
        {/* Eye button when sidebar is hidden */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-8 left-0 z-10 hidden md:block bg-primaryPurple dark:bg-primaryDarkPurple px-6 py-3 rounded-tr-4xl rounded-br-4xl hover:opacity-50 transition duration-300 cursor-pointer"
          >
            <Eye size={20} className="text-white" />
          </button>
        )}

        {/* Content Area */}
        <div
          className={`transition-all duration-300 ${isSidebarOpen ? "md:w-[calc(100%-280px)] w-full" : "min-w-full"
            } h-[calc(100vh-80px)] overflow-auto bg-lightGray dark:bg-primaryDarkPurple p-4`}
        >
          <div className="w-[1200px] h-[1500px] relative">
            {/* overflowing content details */}
            {openNewBoard && (<NewBoard isOpen={openNewBoard} onClose={() => setOpenNewBoard(false)} />)}
            {openNewTask && (<NewTask isOpen={openNewTask} onClose={() => setOpenNewTask(false)} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
