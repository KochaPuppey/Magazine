import { Button } from '@mantine/core';

type BaseButtonProps = {
  variant?: string;
  children: React.ReactNode;
  color?: string;
  size?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


function BaseButton ({variant = "filled", color, size = 'sm', children, onClick}: BaseButtonProps) {
  return <Button 
  variant={variant} 
  color = {color}
  size = {size}
  onClick = {onClick}
  >
    {children}
    </Button>;
}

export default BaseButton