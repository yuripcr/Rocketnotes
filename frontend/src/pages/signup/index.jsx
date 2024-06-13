import { useState } from "react"
import { Container, Form, Background} from "./styles.js"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { FiMail, FiLock } from "react-icons/fi" 
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../services/api.js"


export function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignup(){
        if(!name || !email || !password){
            return alert("Preencha todos os campos");
        }

        api.post("/users", {name, email, password})
        .then(() => {
            alert("Usuário cadastrado com sucesso")
            navigate("/");
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Não foi possível cadastrar o usuário");
            }
        });
    }

    return (
        <Container>

            <Background/>
            
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>
                
                <h2>Crie sua conta</h2>

                <Input icon={FiMail} type="text" placeholder="Nome" onChange={e => setName(e.target.value)}/>

                <Input icon={FiMail} type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>

                <Input icon={FiLock} type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)}/>

                <Button title="Entrar" onClick={handleSignup}/>

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>
    )
}