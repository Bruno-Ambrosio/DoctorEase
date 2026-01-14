import React, { useEffect, useState } from 'react';
import { TextConstants } from '../../constants/TextConstants';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { UrlConstants } from '../../constants/UrlConstants';
import { PatientProps, PatientsResponseProps } from '../../props/api_props/PatientsResponseProps';
import api from '../../services/api';
import Checkbox from '../../components/Checkbox';

const PatientsPage: React.FC = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<PatientProps[]>([])
    const [filteredPatients, setFilteredPatients] = useState<PatientProps[]>([]);
    const handleNewPatient = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(UrlConstants.NEWPATIENT_URL);
    }
    const [showInactive, setShowInactive] = useState<boolean>(false);

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
            data.sort((a, b) => a.name.localeCompare(b.name))
            setPatients(data);
            filterActive(data, showInactive);
        };

        loadRoles();
    }, []);

    const handleShowInactive = (active: boolean) => {
        setShowInactive(active);
        filterActive(patients, active);
    }

    const filterActive = (pat: PatientProps[], active: boolean) => {
        if (active) {
            const filter = pat;
            setFilteredPatients(filter);
        }
        else {
            const filter = pat.filter(p => p.active === true);
            setFilteredPatients(filter);
        }
    }

    return (
        <div className="p-4 flex flex-col gap-5 w-full h-full">
            <div className="flex w-32 mx-4">
                <Button name="newPatient" text={TextConstants.NEW_PATIENT} onClick={(e: React.FormEvent) => handleNewPatient(e)} />
            </div>

            <div className='flex px-4'>
                <div className='flex bg-gray-50 h-10 rounded-md items-center px-2 w-full'>
                    <Checkbox active={showInactive} label="Show inactive" onChange={handleShowInactive} />
                </div>
            </div>

            <div className="flex flex-wrap w-full px-4 gap-5">
                {filteredPatients.map((item) => (
                    <Card text={item.name} url={`${UrlConstants.PATIENTS_URL}/${item.id}`} bgColor={item.active ? "" : "bg-gray-300"} />
                ))}
            </div>

        </div>
    );
};

export default PatientsPage;
