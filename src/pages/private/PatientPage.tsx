import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UrlConstants } from '../../constants/UrlConstants';
import { PatientProps, PatientsResponseProps } from '../../props/api_props/PatientsResponseProps';
import api from '../../services/api';
import { PatientResponseProps } from '../../props/api_props/PatientResponseProps';
import PatientImg from '../../assets/images/patient.png';
import Button from '../../components/Button';
import { ButtonEnum } from '../../enums/ButtonEnum';

const PatientPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [patient, setPatient] = useState<PatientProps>({
        id: 0,
        name: "",
        adress: "",
        gender: {
            id: 0,
            description: ""
        }
    })

    const getPatient = async (): Promise<PatientProps> => {
        try {
            const res = await api.get<PatientResponseProps>(`api/patient/getpatient:${id}`);
            if (res.data.success) {
                return res.data.content;
            }

        } catch (err: unknown) {

        }

        return {
            id: 0,
            name: "",
            adress: "",
            gender: {
                id: 0,
                description: ""
            }
        };
    }

    useEffect(() => {
        const loadRoles = async () => {
            const data = await getPatient();
            setPatient(data);
        };

        loadRoles();
    }, []);

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div>
                <div className="flex bg-gray-100 p-5 rounded-lg justify-between">
                    <div className='flex gap-20'>
                        <img src={PatientImg} alt="" className="w-40 rounded-lg" />
                        <div className='flex flex-col text-xl text-gray-500 gap-5 justify-center'>
                            <h1>Name: {patient.name}</h1>
                            <h1>Adress: {patient.adress}</h1>
                            <h1>Gender: {patient.gender.description}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-60'>
                        <Button name="edit" text="Edit" type={ButtonEnum.Edit} onClick={(e: React.FormEvent) => handleClick(e)} />
                        <Button name="inactive" text="Inactive" type={ButtonEnum.Inactive} onClick={(e: React.FormEvent) => handleClick(e)} />
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
};

export default PatientPage;
