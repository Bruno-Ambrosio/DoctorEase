import React, { useState } from 'react';
import ButtonCard from '../../components/ButtonCard';
import { IoAddCircle } from 'react-icons/io5';
import { TextConstants } from '../../constants/TextConstants';
import Modal from '../../components/Modal';

const PatientsPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div>
                <h1 className='text-2xl text-gray-500'>
                    Patients
                </h1>
            </div>
            <div className="flex w-full h-full p-4">

                <ButtonCard text={TextConstants.NEW_PATIENT_BUTTON} icon={IoAddCircle} onClick={() => handleOpenModal()}/>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Novo Paciente</h2>
            </Modal>
        </div>
    );
};

export default PatientsPage;
