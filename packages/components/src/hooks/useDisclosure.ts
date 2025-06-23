/**
 * 🔓 useDisclosure - Manage open/close state
 * 
 * Perfect for modals, dropdowns, and any toggle behavior.
 */

import { useState, useCallback } from 'react';

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * Hook for managing disclosure state (open/close).
 * 
 * @example
 * ```tsx
 * function MyModal() {
 *   const { isOpen, onOpen, onClose } = useDisclosure();
 *   
 *   return (
 *     <>
 *       <Button onClick={onOpen}>Open Modal</Button>
 *       <Modal isOpen={isOpen} onClose={onClose}>
 *         Modal content
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 */
export function useDisclosure(defaultIsOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const onToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
