import { Navigate, Route, Routes } from "react-router-dom"

import ClientHomePage from "../clientHome/clientHomePage"
import ContractCreatePage from "../contract/createPage"
import UserHomePage from "../userHome/userHomePage"
import Sidebar from "../../shared/sidebar"
import Navbar from "../../shared/navbar"
import { useAppSelector } from "../../hooks/hooks"
import { AuthRouter } from "../../auth/router/authrouter"

export const UserRouter = () => {
    const { uiState: { DarkMode } } = useAppSelector(state => state);
    const { status } = useAppSelector(state => state.userAuthState);

    return (
        (status !== 'authenticated')
            ? <Route path="/auth/*" element={<AuthRouter />} />
            : (<div className={"flex h-screen overflow-hidden " + (DarkMode && 'dark text-bodydark bg-boxdark-2')}>
                <Sidebar></Sidebar>
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Navbar></Navbar>
                    <main>
                        <Routes>
                            {/* Client */}
                            <Route path="/" element={<ClientHomePage />} />
                            <Route path="/contract/" element={<ContractCreatePage />} />
                            <Route path="/user/" element={<UserHomePage />} />

                            <Route path='/*' element={<Navigate to='/' />} />
                        </Routes>
                    </main>
                </div>
            </div>)
    )
}