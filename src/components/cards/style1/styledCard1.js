import React from "react";
import './index.css'


const StyledCard1 = (svas) => {

    return(
        <div className="StyledContainer">
            <table>
                <tr className="StyledBorder">
                    <th className="StyledTableImg">SVA</th>
                    <th className="StyledName">NOME</th>
                    <th className="StyledStatus">STATUS</th>
                </tr>

                {svas.svas.map((sva, idx) => {

                    return(
                        <tr key={idx} >
                            <td className="StyledTableImg"><img src={sva.image} alt="SVA_Image"/> </td>
                            <td className="StyledName">{sva.name}</td>
                            <td className="StyledStatus"> 
                                <h4 className={`StyledStatusColor ${sva.status === "ACTIVE" ? "active" : "inactive"}`}>
                                    {sva.status === "INACTIVE" ? "Desabilitado" : "Habilitado"}
                                </h4>
                            
                            </td>
                        </tr>
                    );
                })}

            </table>
        </div>
    );
}



export default StyledCard1;