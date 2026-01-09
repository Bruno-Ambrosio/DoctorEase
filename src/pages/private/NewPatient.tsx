import React, { useEffect, useState } from 'react';
import Field from '../../components/Field';
import { GenderProps, GenderResponseProps } from '../../props/api_props/GenderResponseProps';
import api from '../../services/api';
import ComboBox, { ComboBoxOption } from '../../components/ComboBox';
import Label from '../../components/Label';
import Button from '../../components/Button';

interface PatientProps {
    name: string;
    adress: string;
    genderId: number;
}

const NewPatient: React.FC = () => {

    const [genders, setGenders] = useState<ComboBoxOption[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="p-4 flex flex-col gap-12 w-full h-full bg-gray-200">
            <div className="flex justify-between">
                <h1 className='text-2xl text-gray-500'>
                    Patient register form
                </h1>

            </div>

            <div className='flex flex-wrap gap-4'>

                <div className="flex-1 flex-col gap-2">
                    <Label text="Name" />
                    <Field name='name' placeholder='Patient name' type='name' onChange={handleChange} />
                </div>
                <div className="flex-1 flex-col gap-2">
                    <Label text="Adress" />
                    <Field name='adress' placeholder='Patient adress' type='adress' onChange={handleChange} />
                </div>
                <div className="flex-1 flex-col gap-2">
                    <Label text="Gender" />
                    <ComboBox name="genderId" options={genders} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)} />
                </div>

            </div>
            <div className="flex gap-2 justify-end">
                <div className="flex w-60">
                    <Button name="add" text="+ Add" onClick={(e: React.FormEvent) => handleSubmit(e)} />
                </div>
            </div>
        </div>
    );
};

export default NewPatient;
