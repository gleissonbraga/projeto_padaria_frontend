import { useEffect, useState } from "react";
import { validarToken } from "../../functions/validarToken";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function LinkPageAdmin(){
    const [areaAdmin, setAreaAdmin] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
    const handleAdmin = () => {
      const token = localStorage.getItem("token")
      const tokenValided = validarToken(token)

      if(tokenValided && token != ""){
        setAreaAdmin(true)
      } else {
        setAreaAdmin(false)
      }
    }

    handleAdmin()
    }, [])

    return (
      <>
      
        {
          areaAdmin && (
            <div onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)} className={
            `fixed w-16 h-16 shadow-xs border-2 border-[#0000006e] bg-white z-50 top-24 right-6 flex justify-center items-center ${show ? "w-52 h-16 rounded-2xl" : "rounded-full"}`}>
                {show ? <span className="hover:underline flex items-center gap-2"><FontAwesomeIcon icon={faScrewdriverWrench}/> <Link to="/admin">Área Administrativa</Link></span> : <span><FontAwesomeIcon icon={faScrewdriverWrench}/></span>}
          </div>
          )
        }
      </>
    )
}