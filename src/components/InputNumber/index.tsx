import classes from './InputNumber.module.css'

interface InputNumberProps {
  number: number
  min?: number
  max?: number
  step?: number
}

const InputNumber: React.FC<InputNumberProps> = ({
  number,
  min = 1,
  max,
  step = 1
}: InputNumberProps) => {
  return (
    <div className={classes.quantity}>
      <input
        className={classes.input}
        type="number"
        min={min}
        max={max}
        step={step}
        value={number}
      />
    </div>
  )
}

export { InputNumber }
