interface InputProps {
    value: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    reference?: React.RefObject<HTMLInputElement>;
    placeholder?: string;
    className?: string; 
}

export const InputBox = (props: InputProps) => {
    return (
        <input
            ref={props.reference}
            value={props.value}
            onChange={props.onchange}
            placeholder={props.placeholder}
            className={props.className || "w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#5409DA] focus:outline-none focus:ring-2 focus:ring-[#5409DA]/20 transition-all duration-200"}
        />
    );
};