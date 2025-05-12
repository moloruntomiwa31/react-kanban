import { Sun, Moon } from "lucide-react";
import useTheme from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-8 bg-white dark:bg-primaryRed transition-colors duration-300">
      <h1 className="text-2xl font-bold text-black dark:text-white">Hello</h1>

      <div className="flex gap-4 items-center bg-lightGray dark:bg-primaryPurple w-fit p-4 rounded-2xl transition">
        <Sun className="text-grayColor" />

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <div className="w-11 h-6 bg-grayColor peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:bg-primaryDarkPurple transition-all duration-300" />
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-full" />
        </label>

        <Moon className="text-grayColor" />
      </div>
    </div>
  );
}
