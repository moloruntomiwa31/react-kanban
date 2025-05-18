import Modal from '../../global/Modal'
import Input from "../../global/Input"
import Button from '../../global/Buttton'
import { Plus, CircleX } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    boardName: yup.string().required("Board name is required").min(4, "At least 4 characters required"),
    boardColumns: yup.array().of(
        yup.object({
            columnName: yup.string().required("Column name is required"),
        })
    ).min(1, "At least one column is required").required()
})

export default function NewBoard({ isOpen, onClose }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            boardName: "",
            boardColumns: [{ columnName: "" }, { columnName: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "boardColumns"
    });

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg">Add New Board</h3>
                <div className="grid gap-6">
                    <div className='grid gap-2'>
                        <label htmlFor="boardName" className='font-bold text-xs text-grayColor'>Board Name</label>
                        <Input
                            placeholder="e.g Web Design"
                            {...register("boardName")}
                            error={errors.boardName?.message}
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className='grid gap-2'>
                            <label className='font-bold text-xs text-grayColor'>Board Columns</label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center w-full">
                                    <Input
                                        placeholder="e.g Web Design"
                                        className="grow"
                                        {...register(`boardColumns.${index}.columnName`)}
                                        error={errors.boardColumns?.[index]?.columnName?.message}
                                    />
                                    <Button
                                        type="button"
                                        className='!bg-transparent'
                                        onClick={() => remove(index)}
                                    >
                                        <CircleX color='gray' />
                                    </Button>
                                </div>
                            ))}
                            {errors.boardColumns?.message && (
                                <p className="text-red-500 text-xs">{errors.boardColumns.message}</p>
                            )}
                        </div>
                        <div className='grid gap-6'>
                            <Button
                                type="button"
                                color="purple"
                                className='text-sm dark:bg-white dark:text-primaryPurple'
                                onClick={() => append({ columnName: "" })}
                            >
                                <Plus strokeWidth={4} size={10} />
                                <span>Add New Column</span>
                            </Button>
                            <Button type="submit" color="purple" className='text-sm'>
                                Create New Board
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    )
}