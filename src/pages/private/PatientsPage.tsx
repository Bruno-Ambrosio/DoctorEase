import React from 'react';
import ButtonCard from '../../components/ButtonCard';
import { IoAddCircle } from 'react-icons/io5';
import { TextConstants } from '../../constants/TextConstants';

const PatientsPage: React.FC = () => {
    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div>
                <h1 className='text-2xl text-gray-500'>
                    Patients
                </h1>
            </div>
            <div className="flex w-full h-full p-4">

                <ButtonCard text={TextConstants.NEW_PATIENT_BUTTON} icon={IoAddCircle}/>
            </div>
        </div>
    );
};

export default PatientsPage;
