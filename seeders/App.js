import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [pessoas, setPessoas] = useState([]);
    const [form, setForm] = useState({ nome: '', idade: '', UF: '', id: null});

    const fetchPessoas = async () => {
        const res = await axios.get('http://localhost:3001/pessoas');
        setPessoas(res.data);
    };
    
    useEffect(() => {
        fetchPessoas();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSummit = async e => {
        e.preventDefault();
        try{
            if (form.id) {
                await axios.put('http://localhost:3001/pessoas/${form.id}', form);
            }   else {
                await axios.post('http://localhost:3001/pessoas', form);
            }
            setForm({ nome: '', idade: '', UF: '', id: null});
        fetchPessoas();
        }
        catch {
        alert('Erro ao salvar');
    } 
 }
};

const handleEdit = pessoa => setForm(pessoa);

const handleDelete = async id => {
    await axios.delete('http://localhost:3001/pessoas/${id}');
    fetchPessoas();
};

return (
    <div>
        <h1>Cadastro de Pessoas</h1>
        <form onSubmit={handleSubmit}>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
          <input name="idade" type="number" value={form.idade} onChange={handleChange} placeholder="Idade" required />
          <input name="UF" value={form.UF} onChange={handleChange} placeholder="UF" required />
          <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
        </form>

        <ul>
            {pessoas.map(p => (
                <li key={p.id}>
                    {p.nome}, {p.idade} anos, {p.UF}
                    <button onClick={() => handleEdit(p)}>Editar</button>
                    <button onClick={() => handleDelete(p.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    </div>
);

export default App;