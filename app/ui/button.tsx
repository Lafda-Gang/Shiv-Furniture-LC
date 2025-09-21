import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "clay-button flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-all duration-300 hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-[1px] aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
