import { Container, Form } from "./styles.js";
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { TextArea } from "../../components/textArea"
import { NoteItem } from "../../components/noteItem"
import { Section } from "../../components/section"
import { Button } from "../../components/button"
import { BtnText } from "../../components/btnText"
import { useState } from "react";
import { api } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export function NewNote() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    async function handleNewNote(){
        if(!title){
            return alert("Lembrete: Digite o título da nota.")
        }

        if(newLink){
            return alert("Lembrete: Link não foi adicionado.")
        }

        if(newTag){
            return alert("Lembrete: Tag não foi adicionada.")
        }

        if(links.length === 0) {
            return alert("Insira um link!")
        }

        if(tags.length === 0) {
            return alert("Insira uma tag!")
        }


        await api.post("/notes", {
            title,
            description,
            links,
            tags
        })

        alert("Nota criada com sucesso!");
        navigate("/");
    };

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    function handleBack(){
        navigate(-1);
    }

    return (
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <BtnText title="Voltar" onClick={handleBack}/>
                    </header>

                    <Input placeholder="Título" onChange={event => setTitle(event.target.value)}/>

                    <TextArea placeholder="Observações" onChange={event => setDescription(event.target.value)}/>

                    <Section title="Links úteis">
                       {
                           links.map((link, index) => {
                               return (
                                <NoteItem  
                                    key={String(index)}
                                    value={link} 
                                    onClick={() => handleRemoveLink(link)} />
                               )
                           })
                       }
                       <NoteItem 
                            isNew
                            placeholder="Novo link" 
                            value={newLink} 
                            onChange={event => setNewLink(event.target.value)}
                            onClick={handleAddLink} /> 
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => {
                                    return (
                                        <NoteItem
                                            key={String(index)}
                                            value={tag}
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                    )
                                })
                            }
                            <NoteItem isNew placeholder="Nova tag" onChange={event => setNewTag(event.target.value)}  value={newTag} onClick={handleAddTag} />
                        </div>
                    </Section>

                    
                    <Button title="Salvar" onClick={handleNewNote} />
                </Form>
            </main>
        </Container>
    )
}