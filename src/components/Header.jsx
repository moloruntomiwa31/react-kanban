import { Kanban, ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import Button from "./global/Buttton";

export default function Header({ onOpenNewTask }) {

  return (
    <header className="px-4 py-4 h-[80px] dark:bg-secondaryPurple shadow flex items-center">
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
        <ChevronDown
          className="md:hidden text-primaryPurple"
          size={20}
          strokeWidth={3}
        />
      </h2>
      <div className="ml-auto flex items-center gap-4">
        <Button className="bg-primaryPurple hover:opacity-50" onClick={onOpenNewTask}>
          <Plus strokeWidth={6} size={12} />
          <span className="hidden md:block">Add New Task</span>
        </Button>
        <Button className="!bg-transparent">
          <EllipsisVertical color="gray" />
        </Button>
      </div>
    </header>
  );
}
