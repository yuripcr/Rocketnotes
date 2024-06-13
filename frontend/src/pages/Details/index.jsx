import { Container, Links, Content } from "./styles.js"
import { Button } from "../../components/button/index.jsx"
import { Header } from "../../components/header/index.jsx"
import { Section } from "../../components/section/index.jsx"
import { Tag } from "../../components/tag/index.jsx"
import { BtnText } from "../../components/btnText/index.jsx"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api.js"

export function Details () {
  const params = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  async function handleRemove(){
    const confirm = window.confirm("Tem certeza que deseja excluir esta nota?");

    if(confirm){
      await api.delete(`/notes/${params.id}`);
      navigate("/");
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, [])

  return (
    <Container>

      <Header/> 
      
      {
        data &&
        <main>
        <Content>
            <BtnText title="Excluir nota" onClick={handleRemove}/>

            <h1>{data.title}</h1>
            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a target="_blank" href={link.url}>{link.url}</a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} title={tag.name}/>
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />
        </Content>
        </main>
      }

    </Container>
  )
}