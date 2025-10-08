import { useState } from "react"
import apiClient from "../../api/api"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [form, setForm] = useState({Email: "", Password: ""})
    const [erro, setErro] = useState({Email: false, Password: false, Dados: ""})
    const [toastVisible, setToastVisible] = useState(false)
    const navigate = useNavigate()

  const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })

        setErro({ ...erro, [name]: false, Dados: "" });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!form.Email || !form.Password){
            let email = !form.Email ? true : false 
            let senha = !form.Password ? true : false 
        
            setErro({
                Email: email,
                Password: senha,
                Dados: ""
            })
            return
        }

        try {

            const response = await apiClient.post("login", {email: form.Email, senha: form.Password})
            
            if(response.data.Error){
                throw new Error()
            }

            localStorage.setItem("token", response.data.token)
            navigate("/admin")
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErro((prev) => ({
                ...prev,
                Dados: "Email ou senha incorretos"
                }))

                setToastVisible(true)

                setTimeout(() => {
                    setToastVisible(false)
                }, 6000)
            } else {
                setErro((prev) => ({
                ...prev,
                Dados: "Erro ao conectar ao servidor"
                }))
            }
        }
    }

    return (
        <section className="bg-[#FFDDBD] w-full h-screen flex justify-center items-center p-10">
            <div className="bg-[#C78B59] w-[40%] rounded-2xl flex flex-col items-center p-4">
                <div className="w-[50%]">
                    <h2 className="text-[#48271D] font-extrabold text-4xl text-center">Acesso Administrativo</h2>
                </div>
                <form className="w-[70%] mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div >
                        <div className="flex flex-col gap-1">
                            <label className="text-[#48271D]">E-mail</label>
                            <input className={`h-10 rounded border-2 border-[#865439] p-2 bg-[#FFDDBD] 
                                ${erro.Email ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-1"}`} name="Email" value={form.Email} type="text" placeholder="exemplo@dominio.com" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#48271D]">Senha</label>
                            <input className={`h-10 rounded border-2 border-[#865439] p-2 bg-[#FFDDBD] 
                                ${erro.Password ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-1"}`} name="Password" value={form.Password}  type="password" placeholder="*******" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                        <button className="w-full p-3 bg-[#48271D] text-[#FFDDBD] font-semibold rounded-lg shadow-md hover:bg-[#865439] hover:text-[#48271D] hover:border-[0.5px] transform hover:scale-[1.01] transition-all duration-200 btn-transition cursor-pointer" type="submit">Entrar</button>
                        <p className="hover:underline cursor-pointer">Esqueceu sua senha?</p>
                    </div>
                </form>
            </div>

            {toastVisible && (
                        <div className={`w-[18%] p-2 bg-[#D55566] border-l-4 border-red-600 absolute top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                            <p className="text-white font-extralight text-center">{erro.Dados}</p>
                        </div>
                        )}
        </section>
    )
}