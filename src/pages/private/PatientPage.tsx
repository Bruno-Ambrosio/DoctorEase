import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientProps } from '../../props/api_props/PatientsResponseProps';
import api from '../../services/api';
import { PatientResponseProps } from '../../props/api_props/PatientResponseProps';
import PatientImg from '../../assets/images/patient.png';
import Button from '../../components/Button';
import { ButtonEnum } from '../../enums/ButtonEnum';
import { ChangePatientStatusResponseProps } from '../../props/api_props/ChangePatientStatusResponseProps';
import useToast from '../../hooks/useToast';
import { ToastEnum } from '../../enums/ToastEnum';
import { InternalConstants } from '../../constants/InternalConstants';
import { TextConstants } from '../../constants/TextConstants';
import BigField from '../../components/BigField';
import SyncButton from '../../components/SyncButton';
import ExamIcon from '../../assets/images/exam.png';

const PatientPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [patient, setPatient] = useState<PatientProps>({
        id: 0,
        name: "",
        adress: "",
        active: true,
        additionalInfo: "",
        gender: {
            id: 0,
            description: ""
        }
    })
    const { addToast } = useToast();
    const [sync, setSync] = useState<boolean>(true);

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
            active: true,
            additionalInfo: "",
            gender: {
                id: 0,
                description: ""
            }
        };
    }

    useEffect(() => {
        const loadPatient = async () => {
            const data = await getPatient();
            setPatient(data);
        };

        loadPatient();
    }, []);

    const handleEditClick = (e: React.FormEvent) => {
        e.preventDefault();

        navigate(`/newPatient/${patient.id}`);
    }

    const handleInactiveClick = async (e: React.FormEvent) => {
        e.preventDefault();

        let res;
        try {
            res = await api.patch<ChangePatientStatusResponseProps>(`api/patient/ChangePatientStatus:${Number(id)}`, patient.active ? false : true);
            if (res.data.success) {
                window.location.reload();
                return;
            }

            addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    }

    const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setSync(false);

        const { name, value } = e.target;
        setPatient((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const handleSync = async () => {
        if (sync) {
            return;
        }

        try {
            const res = await api.patch<ChangePatientStatusResponseProps>(`api/patient/UpdateAdditionalInfo:${Number(id)}`, patient.additionalInfo);
            if (res.data.success) {
                setSync(true);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    }

    const handleBlur = (e: React.FocusEvent) => {
        e.preventDefault();
        handleSync();
    }

    return (
        <div className="p-4 flex flex-col gap-2 w-full h-full bg-gray-200">
            <div>
                <div className="flex bg-gray-100 p-5 rounded-lg justify-between">
                    <div className='flex gap-20'>
                        <img src={PatientImg} alt="" className="w-40 rounded-lg" />
                        <div className='flex flex-col text-xl text-gray-500 gap-5 justify-center'>
                            <h1>Name: {patient.name}</h1>
                            <h1>Address: {patient.adress}</h1>
                            <h1>Gender: {patient.gender.description}</h1>
                            <h1>Status: {patient.active ? "Active" : "Inactive"}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-60'>
                        <Button name="edit" text="Edit" type={ButtonEnum.Edit} onClick={(e: React.FormEvent) => handleEditClick(e)} />
                        <Button name="inactive" text={patient.active ? "Inactivate" : "Activate"} type={patient.active ? ButtonEnum.Inactive : ButtonEnum.Regular} onClick={(e: React.FormEvent) => handleInactiveClick(e)} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-full'>
                <div className='flex justify-between'>
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-2xl text-gray-500'>
                            Additional information
                        </h1>
                        <div className='size-10'>
                            <SyncButton synced={sync} onChange={handleSync} />
                        </div>
                    </div>
                    <div className='flex items-center gap-3 w-36 p-2'>
                        <Button name="edit" text="Exams"  type={ButtonEnum.Regular} onClick={(e: React.FormEvent) => handleEditClick(e)} image={ExamIcon}/>
                    </div>
                </div>

                <div className='flex bg-gray-100 p-5 rounded-lg h-full'>
                    <BigField name="additionalInfo" placeholder="Type additional information about the patient" value={patient.additionalInfo} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInfoChange(e)} onBlur={(e) => handleBlur(e)} />
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default PatientPage;
