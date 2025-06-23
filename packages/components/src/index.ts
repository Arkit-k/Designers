/**
 * 🧩 Unstyled components that work with any CSS framework
 * 
 * These components provide behavior and accessibility,
 * you provide the styling. Perfect for any design system.
 */

// Layout components
export { Box } from './layout/Box';
export { Stack } from './layout/Stack';
export { Cluster } from './layout/Cluster';
export { Grid } from './layout/Grid';
export { Container } from './layout/Container';

// Interactive components
export { Button } from './interactive/Button';
export { Input } from './interactive/Input';
export { Select } from './interactive/Select';
export { Checkbox } from './interactive/Checkbox';
export { Radio } from './interactive/Radio';

// Feedback components
export { Alert } from './feedback/Alert';
export { Toast } from './feedback/Toast';
export { Spinner } from './feedback/Spinner';

// Overlay components
export { Modal } from './overlay/Modal';
export { Dropdown } from './overlay/Dropdown';
export { Tooltip } from './overlay/Tooltip';

// Data components
export { Table } from './data/Table';
export { Card } from './data/Card';

// Types
export type {
  BoxProps,
  StackProps,
  ClusterProps,
  GridProps,
  ContainerProps,
  ButtonProps,
  InputProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  AlertProps,
  ToastProps,
  SpinnerProps,
  ModalProps,
  DropdownProps,
  TooltipProps,
  TableProps,
  CardProps,
} from './types';

// Hooks
export { useDisclosure } from './hooks/useDisclosure';
export { useClickOutside } from './hooks/useClickOutside';
export { useFocusTrap } from './hooks/useFocusTrap';
export { useKeyboard } from './hooks/useKeyboard';

// Version
export const version = '1.0.0';
