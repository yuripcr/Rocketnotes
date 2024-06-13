import { Container, Form, Avatar } from "./style"
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();


    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);


    const navigate = useNavigate();

    async function handleUpdateProfile() {
        if(oldPassword && !newPassword){
            return alert("Preencha a nova senha");
        }
        
        const updated = {
            name,
            email,
            password: newPassword,
            old_password: oldPassword
        }
        const userUpdated = Object.assign(user, updated);
        await updateProfile({user: userUpdated, avatarFile});
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview)
    }

    function handleBack(){
        navigate("/");
      }

    return (
        <Container>
            <header>
                <button type="button" onClick={handleBack}>< FiArrowLeft /></button>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} alt="Foto do usuário"/>

                    <label htmlFor="avatar">
                        <FiCamera />
                    </label>

                    <input type="file" id="avatar" onChange={handleChangeAvatar} />
                </Avatar>

                <Input icon={FiUser} type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>

                <Input icon={FiMail} type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                <Input icon={FiLock} type="password" placeholder="Senha atual" onChange={e => setOldPassword(e.target.value)}/>

                <Input icon={FiLock} type="password" placeholder="Nova senha" onChange={e => setNewPassword(e.target.value)}/>

                <Button title="Salvar" onClick={handleUpdateProfile}/>
            </Form>
        </Container>
    )
}