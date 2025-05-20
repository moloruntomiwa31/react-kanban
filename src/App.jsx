import { Eye, LayoutDashboard, Plus } from "lucide-react";
import Sidebar from "./components/global/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import NewBoard from "./components/modals/boards/NewBoard";
import NewTask from './components/modals/task/NewTask'
import DeleteBoard from "./components/modals/boards/DeleteBoard";
import EditBoard from "./components/modals/boards/EditBoard";
import MobileSidebar from "./components/modals/sidebar/MobileSideBar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false)
  const [openDeleteBoard, setOpenDeleteBoard] = useState(false)
  const [openEditBoard, setOpenEditBoard] = useState(false)
  const [openNewTask, setOpenNewTask] = useState(false);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false)

  const [boards, setBoards] = useState([
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
            },
            {
              title: "User Persona",
              description: "Define user persona for target audience",
              status: "Todo",
              subtasks: [
                { title: "Interview 5 users", isCompleted: true },
                { title: "Write user profiles", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Doing",
          tasks: [
            {
              title: "Logo Variations Pattern In Different Ways",
              description: "Create 3 variations of the app logo",
              status: "Doing",
              subtasks: [
                { title: "Draft logo concepts", isCompleted: true },
                { title: "Present to team", isCompleted: false },
              ]
            },
            {
              title: "Navigation Redesign",
              description: "Update sidebar and navbar layout",
              status: "Doing",
              subtasks: [
                { title: "Redesign sidebar", isCompleted: true },
                { title: "Test new layout", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Done",
          tasks: [
            {
              title: "Kill Bill",
              description: "lorem30",
              status: "Done",
              subtasks: [
                { title: "Draft logo concepts", isCompleted: true },
              ]
            },
            {
              title: "Onboarding Flow",
              description: "Complete onboarding user flow",
              status: "Done",
              subtasks: [
                { title: "Design screens", isCompleted: true },
                { title: "Create transitions", isCompleted: true },
                { title: "Test with users", isCompleted: true },
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
          tasks: [
            {
              title: "Instagram Campaign",
              description: "Plan out weekly Instagram content",
              status: "Ideas",
              subtasks: [
                { title: "Define content pillars", isCompleted: false },
                { title: "Create sample posts", isCompleted: false },
              ]
            },
            {
              title: "Email Strategy",
              description: "Build 3-month email drip campaign",
              status: "Ideas",
              subtasks: [
                { title: "Write copy for Month 1", isCompleted: false },
                { title: "Design email templates", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "In Progress",
          tasks: [
            {
              title: "Blog SEO Audit",
              description: "Analyze and optimize blog posts for SEO",
              status: "In Progress",
              subtasks: [
                { title: "Audit top 10 posts", isCompleted: true },
                { title: "Add meta descriptions", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Published",
          tasks: [
            {
              title: "April Newsletter",
              description: "Send out newsletter to subscribers",
              status: "Published",
              subtasks: [
                { title: "Write copy", isCompleted: true },
                { title: "Design layout", isCompleted: true },
                { title: "Send test email", isCompleted: true },
              ]
            }
          ]
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
          tasks: [
            {
              title: "Integrate Payment Gateway",
              description: "Add Stripe payment support",
              status: "Backlog",
              subtasks: [
                { title: "Set up Stripe account", isCompleted: true },
                { title: "Implement checkout flow", isCompleted: false },
              ]
            },
            {
              title: "Add Dark Mode",
              description: "Support theme switching",
              status: "Backlog",
              subtasks: [
                { title: "Define dark color palette", isCompleted: true },
                { title: "Implement toggle switch", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "In Development",
          tasks: [
            {
              title: "API Rate Limiting",
              description: "Prevent abuse of public API",
              status: "In Development",
              subtasks: [
                { title: "Research best practices", isCompleted: true },
                { title: "Implement in middleware", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Completed",
          tasks: [
            {
              title: "Refactor Auth Flow",
              description: "Improve token-based authentication",
              status: "Completed",
              subtasks: [
                { title: "Add refresh token logic", isCompleted: true },
                { title: "Write unit tests", isCompleted: true },
              ]
            }
          ]
        }
      ]
    }
  ]);


  const [activeBoard, setActiveBoard] = useState(boards[0])

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
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
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

            {/* BoardContent */}
            <div className="flex gap-6 h-full">
              {
                activeBoard.columns.map((column, colIndex) => (
                  <div key={colIndex} className="w-[250px]">
                    <div className="flex items-center mb-4 gap-2 font-bold tracking-widest text-grayColor text-sm h-[30px]">
                      <h3>{column.title}</h3>
                      <span>({column.tasks.length})</span>
                    </div>
                    <div className="grid gap-6">
                      {column.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="bg-white dark:bg-secondaryPurple shadow-md p-6 rounded-md grid gap-y-3">
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
              <div className="mt-[48px] min-h-[300px] max-h-[600px] bg-grayColor dark:bg-secondaryPurple flex items-center justify-center w-[300px] rounded-md">
                <h3 className="flex items-center gap-1 font-bold text-xl text-lightGray">
                  <Plus strokeWidth={5} size={16} />
                  New Column</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
