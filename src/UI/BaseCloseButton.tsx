import { CloseButton } from '@mantine/core';

type BaseCloseButtonProps = {
  onClick: () => void;
}

function BaseCloseButton({onClick}:BaseCloseButtonProps) {
  return <CloseButton onClick={onClick}/>;
}
export default BaseCloseButton