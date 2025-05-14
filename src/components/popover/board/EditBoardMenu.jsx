export default function EditBoardMenu({ onOpenDeleteBoard, onOpenEditBoard }) {
    return (
        <div className="bg-white dark:bg-primaryDarkPurple shadow-xl dark:shadow-[0px_10px_20px_0px_rgba(54,78,126,.25)] w-[150px] rounded-md py-5 px-4 text-sm grid gap-4 place-items-start">
            <button className="text-grayColor cursor-pointer z-10 outline-none" onClick={() => onOpenEditBoard()}>Edit board</button>
            <button className="text-primaryRed cursor-pointer z-10 outline-none" onClick={() => onOpenDeleteBoard()}>Delete board</button>
        </div>
    )
}