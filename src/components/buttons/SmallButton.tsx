
export const SmallButton = ({
  onClick,
  hint,
  icon,
  className = "",
  ...rest
}: {
  onClick: () => void;
  hint: string;
  icon: string;
  className?: string;
}) => {
  return (
    <button
      className={`small-button ${className}`}
      onClick={onClick}
      title={hint}
      {...rest}
    >
      <img src={icon} alt="X" />
    </button>
  );
};
