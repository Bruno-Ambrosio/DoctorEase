import React, { useEffect, useState } from 'react';
import Field from '../../components/Field';
import { GenderProps, GenderResponseProps } from '../../props/api_props/GenderResponseProps';
import api from '../../services/api';
import ComboBox, { ComboBoxOption } from '../../components/ComboBox';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { NewPatientResponseProps } from '../../props/api_props/NewPatientResponseProps';
import { useNavigate, useParams } from 'react-router-dom';
import { UrlConstants } from '../../constants/UrlConstants';
import { ToastEnum } from '../../enums/ToastEnum';
import { InternalConstants } from '../../constants/InternalConstants';
import { TextConstants } from '../../constants/TextConstants';
import useToast from '../../hooks/useToast';
import { PatientResponseProps } from '../../props/api_props/PatientResponseProps';
import { PatientProps } from '../../props/api_props/PatientsResponseProps';

interface NewPatientProps {
    name: string;
    adress: string;
    genderId: number;
}

interface EditPatientProps {
    id: number;
    name: string;
    adress: string;
    genderId: number;
}

const NewPatient: React.FC = () => {
    const [patient, setPatient] = useState<NewPatientProps>({
        name: "",
        adress: "",
        genderId: 0
    });
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [genders, setGenders] = useState<ComboBoxOption[]>([]);
    const { id } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const { name, value } = e.target;

        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    }

    const getGenders = async (): Promise<GenderProps[]> => {
        try {
            const res = await api.get<GenderResponseProps>("api/gender/Genders");
            if (res.data.success) {
                return res.data.content;
            }

        } catch (err: unknown) {

        }

        return [];
    }

    useEffect(() => {
        const loadRoles = async () => {
            const data = await getGenders();
            const options: ComboBoxOption[] = data.map(role => ({
                value: role.id,
                label: role.description
            }));
            setGenders(options);
        };

        loadRoles();
    }, []);

    useEffect(() => {
        if (id) {
            const loadPatient = async () => {
                const data = await getPatient();
                setPatient({
                    name: data.name,
                    adress: data.adress,
                    genderId: data.gender.id
                });
            };

            loadPatient();
        }
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let res;
        try {

            if (id) {
                const editPatient: EditPatientProps = {
                    id: Number(id),
                    name: patient.name,
                    adress: patient.adress,
                    genderId: patient.genderId
                }

                res = await api.put<NewPatientResponseProps>("api/patient/EditPatient", editPatient);
                if (res.data.success) {
                    addToast(res.data.message, ToastEnum.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                    navigate(`${UrlConstants.PATIENTS_URL}/${editPatient.id}`);
                    return;
                }
            }
            else {
                res = await api.post<NewPatientResponseProps>("api/patient/CreatePatient", patient);
                if (res.data.success) {
                    addToast(res.data.message, ToastEnum.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                    navigate(UrlConstants.PATIENTS_URL);
                    return;
                }
            }

            addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    }

    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div className="flex justify-between">
                <h1 className='text-2xl text-gray-500'>
                    {id ? "Patient edit form" : "Patient register form"}
                </h1>

            </div>

            <div className='flex flex-wrap gap-4'>

                <div className="flex-1 flex-col gap-2">
                    <Label text="Name" />
                    <Field name='name' placeholder='Patient name' type='name' value={patient.name} onChange={handleChange} />
                </div>
                <div className="flex-1 flex-col gap-2">
                    <Label text="Adress" />
                    <Field name='adress' placeholder='Patient adress' type='adress' value={patient.adress} onChange={handleChange} />
                </div>
                <div className="flex-1 flex-col gap-2">
                    <Label text="Gender" />
                    <ComboBox name="genderId" options={genders} value={patient.genderId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)} />
                </div>

            </div>
            <div className="flex gap-2 justify-end">
                <div className="flex w-60">
                    <Button name="save" text="Save" onClick={(e: React.FormEvent) => handleSubmit(e)} />
                </div>
            </div>
        </div>
    );
};

export default NewPatient;
