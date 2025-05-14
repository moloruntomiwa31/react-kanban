export default function Button({
  children,
  className = "",
  color = "purple",
  variant = "solid",
  padding = "py-3 px-4",
  fullWidth = false,
  disabled = false,
  ...props
}) {
  const getVariantClasses = () => {
    if (color === "purple") {
      return variant === "solid"
        ? "bg-primaryPurple text-white"
        : "text-primaryPurple border border-current bg-transparent";
    }

    if (color === "white") {
      return variant === "solid"
        ? "bg-white text-primaryPurple"
        : "text-white border border-current bg-transparent";
    }

    if (color === "red") {
      return variant === "solid" ? 'bg-primaryRed text-white' : "text-primaryRed border border-primaryRed bg-transparent"
    }

    if (color === "gray") {
      return variant === 'solid' ? 'bg-lightGray text-primaryPurple dark:bg-white' : ''
    }

    return "";
  };

  const baseClasses = [
    "inline-flex items-center justify-center transition-all duration-300 hover:cursor-pointer rounded-4xl font-bold outline-none",
    padding,
    getVariantClasses(),
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
