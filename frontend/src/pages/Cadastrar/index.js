import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo, AlertSuccess, AlertDanger, Form, Label, Input, ButtonSuccess } from './styles';


export const Cadastrar = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const select = {
    display: "block",
    width: "100%",
    padding: ".375rem 2.25rem .375rem .75rem",
    'font-size': "1rem",
    'font-weight': "400",
    "-moz-padding-start": "calc(0.75rem - 3px)",
    'line-height': "1.5",
    color: "#212529",
    'background-color': "#fff",
    "background-repeat": "no-repeat",
    "background-position": "right .75rem center",
    "background-size": "16px 12px",
    "border": "1px solid #ced4da",
    "border-radius": ".25rem",
    "transition": "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
  };
  const getCep = async (cep) => {
    if (cep.length >= 8) {
      fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then((response) => response.json())
        .then((responseJson) => {
          setEstado(responseJson.uf)
          setCidade(responseJson.localidade)
          setLogradouro(responseJson.logradouro)
          setCep(cep)

        });
    }
    else{
      setCep(cep)
    }



  }
  const cadastrarUsuario = async e => {
    e.preventDefault();


    await fetch("http://127.0.0.1:8000/insert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome,  telefone, cep,  estado, cidade, logradouro,  complemento, numero })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Erro ao cadastrar usu??rio!'
        });
      });
  }

  return (

    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar novo usu??rio</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Visualizar todos usu??rios</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

        <Form onSubmit={cadastrarUsuario}>
          <Label>Nome completo: </Label>
          <Input type="text" name="nome" value={nome} placeholder="nome do usu??rio" onChange={e => setNome(e.target.value)} />

   
          <Label>Telefone: </Label>
          <Input type="text" name="telefone" value={telefone} placeholder="Telefone" onChange={e => setTelefone(e.target.value)} />

          <Label>Cep: </Label>
          <Input type="text" name="cep" value={cep} onChange={e => { getCep(e.target.value) }} />
      
          <Label>Estado: </Label>
          <Input type="text" name="estado" value={estado} onChange={e => setEstado(e.target.value)} />
          <Label>Cidade: </Label>
          <Input type="text" name="cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
          <Label>Lagradouro: </Label>
          <Input type="text" name="logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
          <Label>Complemento: </Label>
          <Input type="text" name="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} />

          <Label>N??mero: </Label>
          <Input type="text" name="numero" value={numero} onChange={e => setNumero(e.target.value)} />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>

        </Form>
      </ConteudoForm>
    </Container>
  );

}
