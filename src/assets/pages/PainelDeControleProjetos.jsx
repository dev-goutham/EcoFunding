import React from 'react';
import ProjetosInvestidos from '../../components/Dashboard/ProjetosInvestidos.jsx';
import Sidebar from '../../components/Dashboard/Sidebar.jsx';


const PainelDeControleProjetos = () => {
    return (
        <div>
            <Sidebar />
            <ProjetosInvestidos />
        </div>
    )
}
export default PainelDeControleProjetos;