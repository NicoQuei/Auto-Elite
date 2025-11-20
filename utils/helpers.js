export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const Button = ({ children, variant = 'primary', onClick, className = '', type='button', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:shadow-lg hover:shadow-blue-900/40 border border-transparent",
    secondary: "bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50",
    outline: "bg-transparent border border-white text-white hover:bg-white/10",
    accent: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/40",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-blue-900",
    ai: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/40 border border-transparent"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

