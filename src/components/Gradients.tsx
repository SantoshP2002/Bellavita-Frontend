export const TopGradient = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full absolute top-0 pointer-events-none h-24 z-[1] bg-gradient-to-b from-primary-inverted to-transparent ${className}`}
    />
  );
};

export const BottomGradient = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full absolute bottom-0 pointer-events-none h-24 z-[1] bg-gradient-to-t from-primary-inverted to-transparent ${className}`}
    />
  );
};

export const LeftGradient = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full absolute left-0 top-0 pointer-events-none h-24 z-[1] bg-gradient-to-r from-primary-inverted to-transparent ${className}`}
    />
  );
};

export const RightGradient = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full absolute right-0 top-0 pointer-events-none h-24 z-[1] bg-gradient-to-l from-primary-inverted to-transparent ${className}`}
    />
  );
};
