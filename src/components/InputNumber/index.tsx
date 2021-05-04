import classes from './InputNumber.module.css'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import { useEffect, useRef, useState } from 'react'

export interface InputNumberProps {
  number: number
  min?: number
  max?: number
  step?: number
  size?: 'small' | 'medium'
  onBlur?: (event: any) => void
}

const InputNumber: React.FC<InputNumberProps> = ({
  number,
  min,
  max,
  step = 1,
  onBlur,
  size = 'medium'
}: InputNumberProps) => {
  const [num, setNum] = useState<number>(number)
  const divRef = useRef()

  const handleUp = () => (num + step > max ? setNum(num) : setNum(num + step))
  const handleDown = () => (num - step < min ? setNum(num) : setNum(num - step))

  useEffect(() => setNum(number), [number])

  return (
    <div
      className={classes.position}
      onBlur={() => onBlur(num)}
      tabIndex={-1}
      ref={divRef}
    >
      <div className={classes.up} onClick={() => handleUp()}>
        <ExpandLessOutlinedIcon fontSize="small" />
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
        <ExpandMoreOutlinedIcon fontSize="small" />
      </div>
    </div>
  )
}

export { InputNumber }
