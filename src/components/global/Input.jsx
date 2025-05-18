export default function Input({ type, placeholder, className, value, onChange = () => { }, error = undefined }) {
    return (
        <div className="relative w-full">
            <input
                type={type || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-sm py-2 px-4
                          border ${error ? 'border-primaryRed focus:ring-primaryRed' : 'border-grayColor focus:ring-primaryPurple '}
                          outline-none focus:outline-none focus:ring  transition-all duration-150
                          dark:focus:ring-0
                          placeholder:text-sm placeholder:font-medium placeholder:text-grayColor/50
                          dark:placeholder:text-grayColor ${className}`}
            />
            {error && (
                <div className="absolute top-0 right-2 h-full flex items-center">
                    <span className="text-xs text-primaryRed font-medium animate-wobble">{error}</span>
                </div>
            )}
        </div>
    );
}