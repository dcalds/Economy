import React, { useState } from "react";
import Modal from "react-responsive-modal"

type ModalProps = {
    children: React.ReactNode,
    onCloseModal: () => void;
}

export const ModalContainer = ({ children, onCloseModal }: ModalProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if (isOpen) {
        return (
            <Modal open={isOpen} onClose={onCloseModal} >
                {children}
            </Modal>
        )
    }
}