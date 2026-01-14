import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientProps } from '../../props/api_props/PatientsResponseProps';
import api from '../../services/api';
import { PatientResponseProps } from '../../props/api_props/PatientResponseProps';
import PatientImg from '../../assets/images/patient.png';
import Button from '../../components/Button';
import { ButtonEnum } from '../../enums/ButtonEnum';
import useToast from '../../hooks/useToast';
import { ToastEnum } from '../../enums/ToastEnum';
import { InternalConstants } from '../../constants/InternalConstants';
import { TextConstants } from '../../constants/TextConstants';
import BigField from '../../components/BigField';
import SyncButton from '../../components/SyncButton';
import Modal from '../../components/Modal';
import ImageButton from '../../components/ImageButton';
import DownloadIcon from '../../assets/images/download.png';
import DeleteIcon from '../../assets/images/close.png';
import { selectFilesByExtension } from '../../utils/Files';
import { UploadExamsResponseProps } from '../../props/api_props/UploadExamsResponseProps';
import { GetExamsByPatientProps, GetExamsByPatientResponseProps } from '../../props/api_props/GetExamsByPatientResponseProps';
import { BooleanResponseProps } from '../../props/api_props/BooleanResponseProps';
import useAuth from '../../hooks/useAuth';

const PatientPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getToken } = useAuth();
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [exams, setExams] = useState<GetExamsByPatientProps[]>([]);

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

    // const handleInactiveClick = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     let res;
    //     try {
    //         res = await api.patch<BooleanResponseProps>(`api/patient/ChangePatientStatus:${Number(id)}`, patient.active ? false : true);
    //         if (res.data.success) {
    //             window.location.reload();
    //             return;
    //         }

    //         addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
    //     } catch (err: unknown) {
    //         if (err instanceof Error) {
    //             addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
    //         }
    //     }
    // }

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
            const res = await api.patch<BooleanResponseProps>(`api/patient/UpdateAdditionalInfo:${Number(id)}`, patient.additionalInfo);
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

    const handleExamsClick = async (e: React.FormEvent) => {
        e.preventDefault();
        loadExams();
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleUploadExam = async () => {
        const files = await selectFilesByExtension(["pdf"]);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append(`titles`, file.fileName);
            formData.append(`fileNames`, file.fileName);
            formData.append(`files`, file.file);
            formData.append(`dates`, new Date().toISOString());
            formData.append(`patientIds`, String(id));
        });

        let res;
        try {
            res = await api.post<UploadExamsResponseProps>("api/Exam/UploadExam", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                addToast(res.data.message, ToastEnum.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                loadExams();
                return;
            }

            addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    }

    const loadExams = async () => {
        try {
            const res = await api.get<GetExamsByPatientResponseProps>(`api/exam/GetExamsByPatientId:${Number(id)}`);
            if (res.data.success) {
                setExams(res.data.content);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {

            }
        }
    }

    const deleteExam = async (examId: number) => {
        let res;
        try {
            res = await api.delete<BooleanResponseProps>(`api/Exam/Delete:${examId}`);

            if (res.data.success) {
                addToast(res.data.message, ToastEnum.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                loadExams();
                return;
            }

            addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    }

    const openExam = async (examId: number) => {
        const token = getToken();

        const response = await fetch(
            `${api.defaults.baseURL}api/Exam/Open/${examId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            addToast("Unauthorized", ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        }

        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);

        window.open(fileURL, "_blank");
    }

    return (
        <div className="p-4 flex flex-col gap-2 w-full h-full">
            <div>
                <div className="flex bg-gray-100 p-5 rounded-md justify-between">
                    <div className='flex gap-20'>
                        <img src={PatientImg} alt="" className="w-40 rounded-md" />
                        <div className='flex flex-col text-md text-gray-600 gap-3 justify-center'>
                            <span>Name: {patient.name}</span>
                            <span>Address: {patient.adress}</span>
                            <span>Gender: {patient.gender.description}</span>
                            <span>Status: {patient.active ? "Active" : "Inactive"}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-32'>
                        <Button name="edit" text="Edit" type={ButtonEnum.Gray} onClick={(e: React.FormEvent) => handleEditClick(e)} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-full'>
                <div className='flex justify-between'>
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-xl text-gray-600'>
                            Additional information
                        </h1>
                        <div className='size-8'>
                            <SyncButton synced={sync} onChange={handleSync} />
                        </div>
                    </div>
                    <div className='flex items-center gap-3 w-36 p-2'>
                        <Button name="exams" text="Exams" type={ButtonEnum.Gray} onClick={(e: React.FormEvent) => handleExamsClick(e)} />
                    </div>
                </div>

                <div className='flex bg-gray-100 p-5 rounded-md h-full'>
                    <BigField name="additionalInfo" placeholder="Type additional information about the patient" value={patient.additionalInfo} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInfoChange(e)} onBlur={(e) => handleBlur(e)} />
                </div>
            </div>
            <div>

            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className='flex flex-col gap-2'>
                    <div className='flex w-60'>
                        <Button name='upload' text="Upload from device" type={ButtonEnum.Gray} onClick={handleUploadExam} />
                    </div>

                    {exams && exams.map((item) => (
                        <div className='flex w-full bg-slate-200 p-2 rounded-md justify-between items-center'>
                            <span className='text-md text-gray-600'>
                                {item.title}
                            </span>
                            <div className='flex gap-3 items-center'>
                                <ImageButton image={DownloadIcon} onClick={() => { openExam(item.id) }} imageCss='size-6' />
                                <ImageButton image={DeleteIcon} onClick={() => { deleteExam(item.id) }} imageCss='size-8' />
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default PatientPage;
