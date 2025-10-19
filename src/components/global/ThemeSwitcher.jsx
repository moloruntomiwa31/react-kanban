import { Sun, Moon } from "lucide-react"
import { useThemeStore } from "../../stores/useAppStore"

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useThemeStore();
    return (
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
    )
}