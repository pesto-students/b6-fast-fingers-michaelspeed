import React, {ChangeEvent} from 'react';
import clsx from "clsx";

export interface Props {
  value: string,
  onChange(event: ChangeEvent<HTMLInputElement>): void,
  label?: string
  classes?: string[],
  type?: string
  placeholder?: string
}

export default function Input({value, onChange, label, classes = [], type, placeholder}: Props) {
  return (
    <React.Fragment>
      {label && <label className="sr-only">{label}</label>}
      <input type={type}
             value={value}
             onChange={event => onChange(event)}
             className={clsx(['appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm', ...classes])}
             placeholder={placeholder ? placeholder : label}/>
    </React.Fragment>
  )
}
