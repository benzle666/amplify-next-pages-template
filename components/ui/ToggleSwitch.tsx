import { motion } from 'framer-motion';

// Usage
// const [selected, setSelected] = useState('GPT-4');
{/* <ToggleSwitch
    options={['GPT-4', 'Claude', 'Gemini', 'Custom']}
    value={selected}
    onChange={setSelected}
/> */}

interface ToggleSwitchProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function ToggleSwitch({ options, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="relative flex items-center bg-gray-200 rounded-full p-1 w-fit">
      {options.map((option) => {
        const isSelected = value === option;

        return (
          <div key={option} className="relative">
            {isSelected && (
              <motion.div
                layoutId="toggle-pill"
                className="absolute inset-0 bg-blue-500 rounded-full z-0"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            <button
              onClick={() => onChange(option)}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                isSelected ? 'text-white' : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          </div>
        );
      })}
    </div>
  );
}



