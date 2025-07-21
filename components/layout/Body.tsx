type BodyProps = {
  children: React.ReactNode;
};

export default function Body({ children }: BodyProps) {
  return (
    <main className="flex-grow flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {children}
      </div>
    </main>
  );
}
