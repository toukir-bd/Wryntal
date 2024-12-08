
import "../../app/tailwind.scss";
import PhonePicker from "react-phone-input-2";
interface PhonePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  wrapperStyle?: React.CSSProperties;
}

const PhoneInput = ({
  value,
  onChange,
  onBlur,
  wrapperStyle,
}: PhonePickerProps) => {
  return (
    <span className='block' style={wrapperStyle}>
      <PhonePicker
        disableDropdown={true}
        disableCountryGuess={true}
        country="ca"
        value={value}
        onChange={(e: string) => onChange && onChange(e)}
        onBlur={() => onBlur && onBlur()}
        placeholder="+1 123 456 7890"
        containerClass='max-w-[1280px] w-full mx-auto'
        inputClass='border-2 border-[#DFE3E7] h-[44px] rounded-[9px] text-[14px] font-normal w-full text-[#000]'
        buttonClass='bg-transparent rounded-[15px] border-0 py-[2px] px-[10px] cursor-auto'
        dropdownClass='rounded-[15px] overflow-hidden'
      />
    </span>
  );
};

export default PhoneInput;