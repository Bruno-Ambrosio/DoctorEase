import React, { useState } from 'react';
import { TextConstants } from '../../constants/TextConstants';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { UrlConstants } from '../../constants/UrlConstants';

const PatientsPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => setModalOpen(false);
    const navigate = useNavigate();
    const handleNewPatient = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(UrlConstants.NEWPATIENT_URL);
    }

    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div className="flex justify-between">
                <h1 className='text-2xl text-gray-500'>
                    Patients
                </h1>
                <div className="">
                    <Button name="newPatient" text={TextConstants.NEW_PATIENT} onClick={(e: React.FormEvent) => handleNewPatient(e)} />
                </div>
            </div>
            <div className="flex w-full h-full p-4">

                <Card text={TextConstants.NEW_PATIENT_BUTTON} url=""/>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Novo Paciente</h2>
            </Modal>
        </div>
    );
};

export default PatientsPage;
