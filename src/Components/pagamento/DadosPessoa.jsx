import { useState } from "react"
import apiClient from "../../api/api"
import { useCarrinhoContext } from "../../context/CarrinhoContext"

export default function DadosPessoa(){
    const {itens, limparCarrinho} = useCarrinhoContext()
    const [form, setForm] = useState({ NomePessoa: "", Contato: "", DataRetirada: "", HoraRetirada: "" })
    const [erro, setErro] = useState({ NomePessoa: false, Contato: false, DataRetirada: false, HoraRetirada: false })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

    const novosErros = {
    NomePessoa: !form.NomePessoa,
    Contato: !form.Contato,
    DataRetirada: !form.DataRetirada,
    HoraRetirada: !form.HoraRetirada,
    };

    setErro(novosErros);

    if (Object.values(novosErros).some(Boolean)) return;
    
    const payload = {
    ...form,
    HoraRetirada: form.HoraRetirada.length === 5 ? form.HoraRetirada + ":00" : form.HoraRetirada,
    Produtos: itens.map((item) => ({
      IdProduto: item.idProduto,
      Quantidade: item.quantidade
    }))
  }
    try {
        const response = await apiClient.post("pedidos", payload)

        if(response.data.Error) {
            throw new Error
        } else {

            const responsePagamento = await apiClient.post(`pagamento/${response.data.codigoPedido}`)
            
            if(responsePagamento.data.Error) throw new Error

            let initPoint = responsePagamento.data.preference.result.initPoint

            console.log(responsePagamento.data)
            
            window.location.href = initPoint
            limparCarrinho()
        }
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message)
    }
  }
  
    return (
    <section className="w-full bg-[#865439] flex justify-center pt-64 pb-6">
  <form
    onSubmit={handleSubmit}
    className="bg-[#FFDDBD] shadow-md rounded-lg p-6 flex flex-col gap-4 w-[60%]"
  >
    <h2 className="text-3xl font-bold text-[#48271d] mb-2">
      Dados para Retirada
    </h2>

    <div>
      <label className="block text-lg font-medium text-[#E38E00]">
        Nome <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="NomePessoa"
        value={form.NomePessoa}
        onChange={handleChange}
        className={`w-full border-2 rounded-lg px-3 py-2  outline-none 
            ${erro.NomePessoa ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-2"}`}
      />
    </div>

    <div>
      <label className="block text-lg font-medium text-[#E38E00]">
        Contato <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="Contato"
        value={form.Contato}
        onChange={handleChange}
        className={`w-full border-2 rounded-lg px-3 py-2 outline-none
            ${erro.Contato ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-1"}`}
      />
    </div>

    <div className="flex gap-2">
      <div className="w-1/2">
        <label className="block text-lg font-medium text-[#E38E00]">
          Data Retirada <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="DataRetirada"
          value={form.DataRetirada}
          onChange={handleChange}
          className={`w-full border-2 rounded-lg px-3 py-2 outline-none 
            ${erro.DataRetirada ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-1"}`}
        />
      </div>

      <div className="w-1/2">
        <label className="block text-lg font-medium text-[#E38E00]">
          Hora Retirada <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          name="HoraRetirada"
          value={form.HoraRetirada}
          onChange={handleChange}
          className={`w-full border-2 rounded-lg px-3 py-2  outline-none 
            ${erro.HoraRetirada ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#865439]  focus:ring-1"}`}
        />
      </div>
    </div>

    <button
      type="submit"
      className="bg-[#48271de4] text-white py-2 rounded-lg hover:bg-[#48271d] transition mt-20 cursor-pointer"
    >
      Realizar Pagamento
    </button>
  </form>
</section>

  )
}