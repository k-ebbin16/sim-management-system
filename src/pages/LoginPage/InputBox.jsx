function InputBox({
  label,
  type,
  icon,
  placeholder,
  isRequired = false,
  name = "",
  id = "",
  value,
  onChangeFn,
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor="" className="text-sm font-medium">
        {label}
      </label>
      <div className="border-muted-foreground/20 focus-within:border-primary hover:border-primary bg-input-background flex items-center gap-4 rounded-lg border px-4 py-1.5 transition-all">
        <i className={icon}></i>
        <input
          className="text-muted-foreground w-full transition-all outline-none placeholder:text-sm placeholder:font-light"
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          required={isRequired}
          onChange={(e) => {
            onChangeFn(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default InputBox;
