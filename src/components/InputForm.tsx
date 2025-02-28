interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

function InputForm({text, name, value,checked, handleChange, error, placeholder='', type='input'}: InputFormProps) {
  return (
    <div className="mb-5">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-black"
        >
            {text}
        </label>
        <input
          value={value}
            checked={checked}
          onChange={handleChange}
            type={type}
          name={name}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          placeholder={placeholder}
        />
        {error && <p className="mt-2 text-sm text-red-600"> {error}</p> }

      </div>

  )
}

export default InputForm