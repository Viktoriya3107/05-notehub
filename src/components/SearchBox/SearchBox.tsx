import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState('');

  const debounced = useDebouncedCallback((val: string) => {
    onSearch(val);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}