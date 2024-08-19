import { DashboardLayout } from "../../components/layouts/dashboard-layout"
import { LineChart } from "../../components/charts/LineChartVisited"

export const DashboardGeneral = () => {



    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-[80vh] p-3 pl-5">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Dashboard General
                </h1>
                <div className="flex flex-wrap py-2 gap-4">
                    <div className="w-full max-w-md h-32 rounded-lg shadow-md shadow-blue-600 bg-[#020817] p-3 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Total de Vistados</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="stroke-blue-600 scale-125"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                        <span className="text-2xl font-bold">6</span>
                        <span className="text-sm text-gray-400">
                            Todas las visitas
                        </span>
                    </div>
                    <div className="w-full max-w-md h-32 rounded-lg shadow-md shadow-yellow-600 bg-[#020817] p-3 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Total de Enviados</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="stroke-yellow-600"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                        </div>
                        <span className="text-2xl font-bold">6</span>
                        <span className="text-sm text-gray-400">
                            Todas de enviadas
                        </span>
                    </div>
                    <div className="w-full max-w-md h-32 rounded-lg shadow-md shadow-red-600 bg-[#020817] p-3 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Votaciones Creadas</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="stroke-red-600"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.414 10l-7.383 7.418a2.091 2.091 0 0 0 0 2.967a2.11 2.11 0 0 0 2.976 0l7.407 -7.385" /><path d="M18.121 15.293l2.586 -2.586a1 1 0 0 0 0 -1.414l-7.586 -7.586a1 1 0 0 0 -1.414 0l-2.586 2.586a1 1 0 0 0 0 1.414l7.586 7.586a1 1 0 0 0 1.414 0z" /></svg>
                        </div>
                        <span className="text-2xl font-bold">6</span>
                        <span className="text-sm text-gray-400">
                            Todas las creaciones
                        </span>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <span className="font-bold">
                        Visitas por día
                    </span>
                    <div className="w-full flex bg-gray-900 rounded-lg p-4 max-w-7xl mt-2 text-white shadow-lg shadow-gray-500">
                        <LineChart />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    )
}
