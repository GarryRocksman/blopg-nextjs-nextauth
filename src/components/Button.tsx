type ButtonProps = { 
  children: React.ReactNode 
};

const Button  = ({ children }: ButtonProps)  => {
  return (
    <button className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 transition-colors duration-300">
      {children}
    </button>
  );
}

export default Button;