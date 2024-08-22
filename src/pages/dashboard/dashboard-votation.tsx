import { DashboardLayout } from "../../components/layouts/dashboard-layout"
import { TableVotation } from "../../components/dashboard/tables/table-votation/table-votation";
// import { ChangeEvent, useEffect, useState } from "react";
// import { votationApi } from "../../api/config";
// import { useAuthStore } from "../../store/auth/authStore";
// import { ModalWrapper } from "../../components/ui/ModalWrapper";
// import { IVotations, IVotationState, ResGetVotations } from "../../interfaces";
// import { Pagination } from "../../components/ui/Pagination";
// import { useAppDispatch, useVotation } from "../../hooks";
// import { clearAnimeList, setAnimeListCollection, setConfiguration, cleanConfiguration } from "../../store/slices";
// import { ModalVotation } from "../../components/dashboard/modals/modal-votation";
// import { toast } from "sonner";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import { formatInTimeZone } from 'date-fns-tz';
// import { LaoderGeneral } from '../../components/ui/LaoderGeneral';
// import { format } from "date-fns";

export const DashboardVotation = () => {

    // TODO al copiar un formulario desde el dashboard, no se actualizan los datos que envío el formulario	

    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-[80vh] p-3 pl-5">

                <TableVotation />

            </div>
        </DashboardLayout>
    )
}
