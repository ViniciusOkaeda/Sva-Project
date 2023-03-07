import React from "react";
import './index.css'


const StyledCard1 = (svas) => {

    return(
        <div className="StyledContainer">
            <table>
                <thead className="StyledBorder">
                    <tr>
                    <th className="StyledTableImg">SVA</th>
                    <th className="StyledName">NOME</th>
                    <th className="StyledStatus">STATUS</th>

                    </tr>
                </thead>

                {svas.svas.map((sva, idx) => {

                    return(
                        <tbody key={idx} >
                            <tr>
                                <td className="StyledTableImg"><img src={sva.image} alt="SVA_Image"/> </td>
                                <td className="StyledName">{sva.name}</td>
                                <td className="StyledStatus"> 
                                    <h4 className={`StyledStatusColor ${sva.status === "ACTIVE" ? "active" : "inactive"}`}>
                                        {sva.status === "INACTIVE" ? "Desabilitado" : "Habilitado"}
                                    </h4>
                                
                                </td>
                            </tr>
                        </tbody>
                    );
                })}

            </table>
        </div>
    );
}



export default StyledCard1;