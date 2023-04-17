type ButtonProps = { 
  children: React.ReactNode 
};

export default function Button ({ children }: ButtonProps) {
  return (
    <button className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 transition-colors">
      {children}
    </button>
  );
}