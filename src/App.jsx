import { Eye, Plus } from "lucide-react";
import Sidebar from "./components/global/Sidebar";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import NewBoard from "./components/modals/boards/NewBoard";
import NewTask from './components/modals/task/NewTask'
import DeleteBoard from "./components/modals/boards/DeleteBoard";
import EditBoard from "./components/modals/boards/EditBoard";
import MobileSidebar from "./components/modals/sidebar/MobileSidebar";
import TaskDetail from "./components/modals/task/TaskDetail";
import EditTask from "./components/modals/task/EditTask";
import DeleteTask from "./components/modals/task/DeleteTask";
import { useModalStore, useBoardStore, useSidebarStore, useThemeStore } from "./stores/useAppStore";
import Button from "./components/global/Buttton";

export default function App() {
  const { 
    openNewBoard, openDeleteBoard, openEditBoard, openNewTask, openMobileSidebar,
    openTaskDetail, openEditTask, openDeleteTask,
    setOpenNewBoard, setOpenDeleteBoard, setOpenEditBoard, setOpenNewTask, setOpenMobileSidebar,
    setOpenTaskDetail, setOpenEditTask, setOpenDeleteTask, setSelectedTask
  } = useModalStore()
  
  const { boards, activeBoard, setActiveBoard, initializeActiveBoard, moveTask } = useBoardStore()
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore()
  const { initializeTheme } = useThemeStore()
  
  const [draggedTask, setDraggedTask] = useState(null)

  useEffect(() => {
    initializeTheme()
    initializeActiveBoard()
  }, [])

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, columnTitle) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== columnTitle) {
      moveTask(draggedTask.id, columnTitle)
    }
    setDraggedTask(null)
  }

  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <Header
        onOpenNewTask={() => setOpenNewTask(true)}
        onOpenDeleteBoard={() => setOpenDeleteBoard(true)}
        onOpenEditBoard={() => setOpenEditBoard(true)}
        onOpenMobileSidebar={() => setOpenMobileSidebar(true)}
      />
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <Sidebar
            onOpenNewBoard={() => setOpenNewBoard(true)}
            boards={boards}
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
          />
        )}
        {/* Eye button when sidebar is hidden */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-8 left-0 z-10 hidden md:block bg-primaryPurple dark:bg-secondaryPurple px-6 py-3 rounded-tr-4xl rounded-br-4xl hover:opacity-50 transition duration-300 cursor-pointer"
          >
            <Eye size={20} className="text-white" />
          </button>
        )}

        {/* Content Area */}
        <div
          className={`transition-all duration-300 ${isSidebarOpen ? "md:w-[calc(100%-280px)] w-full" : "min-w-full"
            } h-[calc(100vh-80px)] overflow-auto bg-lightGray dark:bg-primaryDarkPurple p-4`}
        >
          <div className="w-[1000px] h-[1500px] relative">
            {/* overflowing content details */}
            {openNewBoard && (<NewBoard isOpen={openNewBoard} onClose={() => setOpenNewBoard(false)} />)}
            {openNewTask && (<NewTask isOpen={openNewTask} onClose={() => setOpenNewTask(false)} />)}
            {openDeleteBoard && (<DeleteBoard isOpen={openDeleteBoard} onClose={() => setOpenDeleteBoard(false)} />)}
            {openEditBoard && (<EditBoard isOpen={openEditBoard} onClose={() => setOpenEditBoard(false)} />)}
            {openMobileSidebar && (<MobileSidebar isOpen={openMobileSidebar} onClose={() => setOpenMobileSidebar(false)} boards={boards} activeBoard={activeBoard}
              setActiveBoard={setActiveBoard} onOpenNewBoard={() => setOpenNewBoard(true)} />)}
            {openTaskDetail && (<TaskDetail isOpen={openTaskDetail} onClose={() => setOpenTaskDetail(false)} />)}
            {openEditTask && (<EditTask isOpen={openEditTask} onClose={() => setOpenEditTask(false)} />)}
            {openDeleteTask && (<DeleteTask isOpen={openDeleteTask} onClose={() => setOpenDeleteTask(false)} />)}

            {/* BoardContent */}
            <div className="flex gap-6 h-full relative">
              {
                activeBoard?.columns.map((column, colIndex) => (
                  <div 
                    key={colIndex} 
                    className={`w-[250px] min-h-[400px] p-2 rounded-lg transition-all duration-300 ${
                      draggedTask && draggedTask.status !== column.title
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600' 
                        : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.title)}
                  >
                    <div className="flex items-center mb-4 gap-2 font-bold tracking-widest text-grayColor text-sm h-[30px]">
                      <h3>{column.title}</h3>
                      <span>({column.tasks.length})</span>
                    </div>
                    <div className="grid gap-6">
                      {column.tasks.map((task) => (
                        <div 
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          className={`bg-white dark:bg-secondaryPurple shadow-md p-6 rounded-md grid gap-y-3 cursor-grab hover:opacity-80 transition-all duration-200 transform hover:scale-105 ${
                            draggedTask?.id === task.id ? 'opacity-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedTask(task)
                            setOpenTaskDetail(true)
                          }}
                        >
                          <h3 className="font-bold dark:text-white truncate">{task.title}</h3>
                          <p className="text-grayColor font-bold text-sm">
                            {task.subtasks.filter(subtask => subtask.isCompleted).length} of {task.subtasks.length} subtasks
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
              <Button 
                onClick={() => setOpenEditBoard(true)}
                className="mt-[48px] min-h-[300px] max-h-[600px] bg-grayColor dark:bg-secondaryPurple flex items-center justify-center w-[300px] rounded-md hover:opacity-80 transition-opacity"
              >
                <h3 className="flex items-center gap-1 font-bold text-xl text-lightGray">
                  <Plus strokeWidth={5} size={16} />
                  New Column</h3>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
