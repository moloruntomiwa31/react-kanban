export default function Modal({ children, isOpen, onClose = () => { }, className = '', zIndex = 50 }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs transition duration-200" style={{ zIndex: zIndex }} onClick={onClose}>
            <div
                className={`animate-modal relative bg-white dark:bg-primaryDarkPurple dark:text-white rounded-lg shadow-lg px-6 py-10 max-w-lg max-h-[90%] scrollbar-hide overflow-y-auto w-[90%] md:w-full ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {typeof children === 'function'
                    ? children(onClose)
                    : children
                }
            </div>
        </div>
    );
}