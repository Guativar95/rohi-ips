import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { StatusEnum } from "../../models/enums";
import { thunkAllLoadContracts } from "../../store/slices/contract";
import { Contract } from "../../models/interfaces";

export default function UserHomePage() {
    const [contractsDisplay, setContractsDisplay]= useState<Contract[]>([]);  
    const dispatch = useAppDispatch();
    const { roles } = useAppSelector(state => state.userAuthState);
    const { AllContracts, IsActivateFilter , ContractsFilter } = useAppSelector(state => state.contractState);
    useEffect(() => {
        if (!IsActivateFilter && AllContracts.length === 0) {
            dispatch(thunkAllLoadContracts());
        }
        else if (IsActivateFilter){
            setContractsDisplay([...ContractsFilter]);
        } else {
            setContractsDisplay([...AllContracts]);
        }
    }, [IsActivateFilter, ContractsFilter, AllContracts, dispatch]);

    const getPatientType = (typeId: number) => {
        switch (typeId) {
            case 1:
                return 'Pagador';
            case 2:
                return 'Beneficiario';
            case 3:
                return 'Pagador / Beneficiario';
        }
    }

    return (
        <div
            className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark m-10  md:p-6 xl:p-9">
            <div className="flex flex-col gap-7.5">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Tipo de paciente</h5>
                        </div>
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Identificación</h5>
                        </div>
                        <div className="p-2.5 text-left xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Nombres</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Dirección</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Contrato</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Estado</h5>
                        </div>
                        {
                            (roles?.isAdmin) && <div className="p-2.5 text-center xl:p-5"></div>
                        }
                    </div>

                    {
                        contractsDisplay.map(contract =>
                            contract.Patients!.map(patient => (
                                <div key={patient.Identification} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-7">
                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="font-medium text-black dark:text-white">{getPatientType(patient.Type)}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="font-medium text-black dark:text-white">{patient.Identification}</p>
                                    </div>

                                    <div className="flex items-center justify-left p-2.5 xl:p-5">
                                        <p className="font-medium text-black dark:text-white">{patient.Name}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="font-medium text-black dark:text-white">{patient.Address}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="font-medium text-black dark:text-white">{contract.Number}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        {
                                            patient.Status === StatusEnum.Active ? (
                                                <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                    Activo
                                                </p>
                                            ) : (
                                                <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                                    Inactivo
                                                </p>
                                            )
                                        }
                                    </div>
                                    {
                                        (roles?.isAdmin) &&
                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="font-medium text-black dark:text-white">
                                                <Link to={{ pathname: '/contract', search: '?idContract=' + contract.Number }}
                                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7">
                                                    <svg className="fill-current m-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z" fill="" />
                                                        <path d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z" fill="" />
                                                    </svg>Editar
                                                </Link>
                                            </p>
                                        </div>
                                    }
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}