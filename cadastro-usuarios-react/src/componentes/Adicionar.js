// CadastroUsuario.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adicionar.css'

const Adicionar = () => {
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');

    const [data, setData] = useState([]);

    const handleLimparHistorico = () => {
        axios.delete('http://localhost:8000/usuarios/') // Certifique-se de usar a URL correta para a rota de limpeza do histórico
          .then(response => {
            // Atualize o estado ou realize qualquer ação adicional necessária após a limpeza do histórico
            console.log(response.data.message); // Exemplo: exibir uma mensagem de sucesso
          })
          .catch(error => {
            console.error('Erro ao limpar o histórico:', error);
          });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/usuarios/', {
                nome,
                cidade,
            });
            console.log('Usuário cadastrado com sucesso:', response.data);
            alert('Usuário cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário');
        }

        // Limpar os campos após o cadastro
        setNome('');
        setCidade('');
    };

    useEffect(() => {
        // Realize a solicitação GET assim que o componente for montado
        axios.get('http://localhost:8000/usuarios/')
            .then(response => {
                // Atualize o estado com os dados recebidos
                setData(response.data);
            })
            .catch(error => {
                alert('Erro ao buscar os dados:', error);
            });
    }, []);

    return (
        <div className='content'>
            <h2>Adicionar</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder='Nome'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required
                        placeholder='Cidade'
                    />
                </div>
                
                <button type="submit">Adicionar</button>  
            </form>
            
            <div className='historico'>
                <h1>Histórico</h1>
                <ul>
                    {data.map(usuario =>
                        (<li key={usuario.id}>
                                {usuario.nome} - {usuario.cidade}
                        </li>))}
                </ul>

                <button type='button' onClick={handleLimparHistorico}>Limpar</button>
            </div>
        </div>

        
    );
};

export default Adicionar;
