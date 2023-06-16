import React from "react";

interface ButtonProps {
  styles: string;
}

const Button: React.FC<ButtonProps> = ({ styles }) => (
  <a href="/login" className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-[#00960A] border border-[#00960A] transition-all duration-150 ease-in-out hover:bg-transparent rounded-[10px] outline-none ${styles}`}>
    Começar
  </a>
);

export default Button;