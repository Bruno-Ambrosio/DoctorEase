import React, { useEffect, useState } from 'react';
import { TextConstants } from '../../constants/TextConstants';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { UrlConstants } from '../../constants/UrlConstants';
import { PatientProps, PatientsResponseProps } from '../../props/api_props/PatientsResponseProps';
import api from '../../services/api';

const PatientsPage: React.FC = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<PatientProps[]>([])
    const handleNewPatient = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(UrlConstants.NEWPATIENT_URL);
    }

    const getPatients = async (): Promise<PatientProps[]> => {
        try {
            const res = await api.get<PatientsResponseProps>("api/patient/patients");
            if (res.data.success) {
                return res.data.content;
            }

        } catch (err: unknown) {

        }

        return [];
    }

    useEffect(() => {
        const loadRoles = async () => {
            const data = await getPatients();
            setPatients(data);
        };

        loadRoles();
    }, []);

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

            <div className="flex flex-wrap w-full p-4 gap-5">
                {patients.map((item) => (
                    <Card text={item.name} url={`patients/${item.id}`} />
                ))}
            </div>

        </div>
    );
};

export default PatientsPage;
