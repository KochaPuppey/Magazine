import { Group, ActionIcon, Text } from '@mantine/core';

import styles from './Counter.module.css'

type CounterProps = {
  count: number;
  setCount: ((value:number) => void);
}

 function Counter({count, setCount}:CounterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
  
    setCount(isNaN(value) ? 0 : value);
  }
  return (
    <Group gap="xs">
      <ActionIcon
        variant="light"
        radius="md"
        size="md"
        color="red"
        onClick={() => setCount( Math.max(0,count - 1))}
      >
        -
      </ActionIcon>

      <Text fw={400} w={40} ta="center">
        <input
        className = {styles.input}
        value={count}
        pattern="[0-9]*"
        onChange={(e) => handleChange(e)}
        >
        </input>
      </Text>

      <ActionIcon
        variant="light"
        radius="md"
        size="md"
        onClick={() => setCount(count + 1)}
      >
        +
      </ActionIcon>
    </Group>
  );
}
export default Counter;