import { useState } from "react"
import useCarrinho from "../../hooks/useCarrinho"
import apiClient from "../../api/api"

export default function DadosPessoa(){
    const {itens} = useCarrinho()

    const [form, setForm] = useState({ NomePessoa: "", Contato: "", DataRetirada: "", HoraRetirada: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
    const payload = {
    ...form,
    HoraRetirada: form.HoraRetirada.length === 5 ? form.HoraRetirada + ":00" : form.HoraRetirada,
    Produtos: itens.map((item) => ({
      IdProduto: item.idProduto,
      Quantidade: item.quantidade
    }))
  }
     console.log(payload)

    try {
        const response = await apiClient.post("pedidos", payload)

        if(response.data.Error) {
            throw new Error
        } else {
            const responsePagamento = await apiClient.post(`pagamento/${response.data.CodigoPedido}`)

            console.log("volta do response pagamento", responsePagamento.data)

            let initPoint = responsePagamento.data.preference.result.initPoint

            window.location.href = initPoint
        }

    } catch (error) {
    console.error("Erro:", error.response?.data || error.message)
    }
  }


    return (
    <section className="w-full h-screen bg-[#fff] flex justify-center pt-64 pb-6">
        <form
          onSubmit={handleSubmit}
        className=" bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 w-[80%]"
        >
        <h2 className="text-xl font-bold text-gray-700 mb-2">
            Formulário de Retirada
        </h2>

        <div>
            <label className="block text-sm font-medium text-gray-600">
            Nome
            </label>
            <input
            type="text"
            name="NomePessoa"
              value={form.NomePessoa}
              onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-600">
            Contato
            </label>
            <input
            type="tel"
            name="Contato"
              value={form.Contato}
              onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>

        <div className="flex gap-2">
            <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">
                Data Retirada
            </label>
            <input
                type="date"
                name="DataRetirada"
                value={form.DataRetirada}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">
                Hora Retirada
            </label>
            <input
                type="time"
                name="HoraRetirada"
                value={form.HoraRetirada}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>
        </div>
        <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-20 cursor-pointer"
        >
            Realizar Pagamento
        </button>
        </form>
    </section>
  )
}