interface ButtonProps {
    text: string;
    onclick?: () => void;
    className?: string; 
}

export const Button = (props: ButtonProps) => {
    return (
        <button 
            onClick={props.onclick} 
            className={props.className || "flex items-center justify-center cursor-pointer p-4 rounded-md border outline-none bg-[#5409DA] hover:bg-[#4408c4] text-white font-sans transition-colors duration-200"}
        >
            {props.text}
        </button>
    );
};