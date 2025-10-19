export default function Input({ type, placeholder, className, value, onChange, ...props }) {
    return (
        <input
            type={type || 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full rounded-sm py-2 px-4
                      border border-grayColor
                      outline-none focus:outline-none focus:ring focus:ring-primaryPurple transition-all duration-150
                      dark:focus:ring-0 dark:bg-primaryDarkPurple dark:text-white dark:border-grayColor/30
                      placeholder:text-sm placeholder:font-medium placeholder:text-grayColor/50
                      dark:placeholder:text-grayColor ${className || ''}`}
            {...props}
        />
    )
}