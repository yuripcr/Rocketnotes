import { Routes, Route } from 'react-router-dom'

import { NewNote } from '../pages/newNote'
import { Home } from '../pages/home'
import { Profile } from '../pages/profile'
import { Details } from '../pages/Details'
import { Navigate } from 'react-router-dom'

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/newNote" element={<NewNote/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/details/:id" element={<Details/>}/>

            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}