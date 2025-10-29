import { create } from 'zustand'
import { LayoutDashboard } from "lucide-react"

export const useModalStore = create((set) => ({
  openNewBoard: false,
  openDeleteBoard: false,
  openEditBoard: false,
  openNewTask: false,
  openMobileSidebar: false,
  openEditBoardMenu: false,
  openTaskDetail: false,
  openEditTask: false,
  openDeleteTask: false,
  selectedTask: null,
  
  setOpenNewBoard: (open) => set({ openNewBoard: open }),
  setOpenDeleteBoard: (open) => set({ openDeleteBoard: open }),
  setOpenEditBoard: (open) => set({ openEditBoard: open }),
  setOpenNewTask: (open) => set({ openNewTask: open }),
  setOpenMobileSidebar: (open) => set({ openMobileSidebar: open }),
  setOpenEditBoardMenu: (open) => set({ openEditBoardMenu: open }),
  setOpenTaskDetail: (open) => set({ openTaskDetail: open }),
  setOpenEditTask: (open) => set({ openEditTask: open }),
  setOpenDeleteTask: (open) => set({ openDeleteTask: open }),
  setSelectedTask: (task) => set({ selectedTask: task }),
}))

export const useBoardStore = create((set) => ({
  boards: [
    {
      id: 1,
      title: "Product Design",
      icon: LayoutDashboard,
      columns: [
        {
          title: "Todo",
          tasks: [
            {
              id: 1,
              title: "Landing Page UI",
              description: "Design the landing page for the mobile app",
              status: "Todo",
              subtasks: [
                { id: 1, title: "Sketch wireframes", isCompleted: false },
                { id: 2, title: "Choose color scheme", isCompleted: true },
                { id: 3, title: "Design hero section", isCompleted: false },
              ]
            },
            {
              id: 2,
              title: "User Persona",
              description: "Define user persona for target audience",
              status: "Todo",
              subtasks: [
                { id: 4, title: "Interview 5 users", isCompleted: true },
                { id: 5, title: "Write user profiles", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Doing",
          tasks: [
            {
              id: 3,
              title: "Logo Variations Pattern In Different Ways",
              description: "Create 3 variations of the app logo",
              status: "Doing",
              subtasks: [
                { id: 6, title: "Draft logo concepts", isCompleted: true },
                { id: 7, title: "Present to team", isCompleted: false },
              ]
            }
          ]
        },
        {
          title: "Done",
          tasks: [
            {
              id: 4,
              title: "Onboarding Flow",
              description: "Complete onboarding user flow",
              status: "Done",
              subtasks: [
                { id: 8, title: "Design screens", isCompleted: true },
                { id: 9, title: "Create transitions", isCompleted: true },
              ]
            }
          ]
        }
      ]
    }
  ],
  activeBoard: null,
  
  setActiveBoard: (board) => set({ activeBoard: board }),
  initializeActiveBoard: () => set((state) => ({ activeBoard: state.boards[0] })),
  
  addTask: (task) => set((state) => {
    const newTask = { ...task, id: Date.now() }
    const updatedBoards = state.boards.map(board => 
      board.id === state.activeBoard.id
        ? {
            ...board,
            columns: board.columns.map(col => 
              col.title === task.status
                ? { ...col, tasks: [...col.tasks, newTask] }
                : col
            )
          }
        : board
    )
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.find(b => b.id === state.activeBoard.id)
    }
  }),
  
  updateTask: (taskId, updates) => set((state) => {
    const updatedBoards = state.boards.map(board => 
      board.id === state.activeBoard.id
        ? {
            ...board,
            columns: board.columns.map(col => {
              const updatedTasks = col.tasks.map(task => 
                task.id === taskId ? { ...task, ...updates } : task
              )
              if (updates.status && updates.status !== col.title) {
                return { ...col, tasks: updatedTasks.filter(task => task.id !== taskId) }
              }
              return { ...col, tasks: updatedTasks }
            }).map(col => {
              if (updates.status === col.title) {
                const taskToMove = state.activeBoard.columns
                  .flatMap(c => c.tasks)
                  .find(task => task.id === taskId)
                if (taskToMove && !col.tasks.find(t => t.id === taskId)) {
                  return { ...col, tasks: [...col.tasks, { ...taskToMove, ...updates }] }
                }
              }
              return col
            })
          }
        : board
    )
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.find(b => b.id === state.activeBoard.id)
    }
  }),
  
  deleteTask: (taskId) => set((state) => {
    const updatedBoards = state.boards.map(board => 
      board.id === state.activeBoard.id
        ? {
            ...board,
            columns: board.columns.map(col => ({
              ...col,
              tasks: col.tasks.filter(task => task.id !== taskId)
            }))
          }
        : board
    )
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.find(b => b.id === state.activeBoard.id)
    }
  }),
  
  moveTask: (taskId, targetColumnTitle) => set((state) => {
    const updatedBoards = state.boards.map(board => {
      if (board.id !== state.activeBoard.id) return board
      
      let taskToMove = null
      const updatedColumns = board.columns.map(col => {
        const task = col.tasks.find(t => t.id === taskId)
        if (task) {
          taskToMove = { ...task, status: targetColumnTitle }
          return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
        }
        return col
      })
      
      if (taskToMove) {
        return {
          ...board,
          columns: updatedColumns.map(col => 
            col.title === targetColumnTitle
              ? { ...col, tasks: [...col.tasks, taskToMove] }
              : col
          )
        }
      }
      return board
    })
    
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.find(b => b.id === state.activeBoard.id)
    }
  }),
  
  addBoard: (board) => set((state) => ({
    boards: [...state.boards, { ...board, id: Date.now(), icon: LayoutDashboard }]
  })),
  
  updateBoard: (boardId, updates) => set((state) => {
    const updatedBoards = state.boards.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    )
    return {
      boards: updatedBoards,
      activeBoard: state.activeBoard?.id === boardId 
        ? updatedBoards.find(b => b.id === boardId)
        : state.activeBoard
    }
  }),
  
  deleteBoard: (boardId) => set((state) => {
    const newBoards = state.boards.filter(board => board.id !== boardId)
    return {
      boards: newBoards,
      activeBoard: state.activeBoard?.id === boardId ? newBoards[0] || null : state.activeBoard
    }
  }),
  
  addColumn: (columnTitle) => set((state) => {
    const updatedBoards = state.boards.map(board => 
      board.id === state.activeBoard.id
        ? {
            ...board,
            columns: [...board.columns, { title: columnTitle, tasks: [] }]
          }
        : board
    )
    return {
      boards: updatedBoards,
      activeBoard: updatedBoards.find(b => b.id === state.activeBoard.id)
    }
  }),
}))

export const useSidebarStore = create((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
}))

export const useThemeStore = create((set, get) => ({
  theme: "light",
  
  setTheme: (theme) => {
    set({ theme })
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  },
  
  toggleTheme: () => {
    const { theme } = get()
    get().setTheme(theme === "light" ? "dark" : "light")
  },
  
  initializeTheme: () => {
    const savedTheme = localStorage.getItem("theme")
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (systemPreference ? "dark" : "light")
    get().setTheme(initialTheme)
  },
}))