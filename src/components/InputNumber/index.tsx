import classes from './InputNumber.module.css'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import { useEffect, useState } from 'react'

interface InputNumberProps {
  number: number
  min?: number
  max?: number
  step?: number
  onBlur?: (event: any) => void
}

const InputNumber: React.FC<InputNumberProps> = ({
  number,
  min,
  max,
  step = 1,
  onBlur
}: InputNumberProps) => {
  const [num, setNum] = useState<number>(number)

  const handleUp = () => (num + step > max ? setNum(num) : setNum(num + step))
  const handleDown = () => (num - step < min ? setNum(num) : setNum(num - step))

  useEffect(() => setNum(number), [number])

  return (
    <div className={classes.position} onBlur={() => onBlur(num)} tabIndex={-1}>
      <div className={classes.up} onClick={() => handleUp()}>
        <ExpandLessOutlinedIcon />
      </div>
      <input
        className={classes.input}
        type="number"
        min={min}
        max={max}
        step={step}
        value={num}
        readOnly
      />
      <div className={classes.down} onClick={() => handleDown()}>
        <ExpandMoreOutlinedIcon />
      </div>
    </div>
  )
}

export { InputNumber }
