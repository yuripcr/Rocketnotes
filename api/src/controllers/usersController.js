const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError.js');
const sqliteConnection = require('../database/sqlite/index.js');
const UserRepository = require("../repositories/UserRepository.js")
const CreateUserService = require("../services/CreateUserService.js")

class usersController {
    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para deletar um registro
     */
    async create(request, response) {
        const {name, email, password} = request.body;        

        const userRepository = new UserRepository();

        const createUserService = new CreateUserService(userRepository);

        await createUserService.execute({name, email, password});

        return response.status(201).json();
    }

    async update(request, response) {
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const database =  await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);
        if(!user) {
            throw new AppError('Usuario não encontrado');
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('Email já cadastrado');
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) {
            throw new AppError('Você precisa informar a senha antiga para definir a nova senha');
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError('Senha antiga incorreta');
            }

            user.password = await hash(password, 8);
        }
        
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, 
            [user.name, user.email, user.password, user_id]
        );

        return response.json();
    }
    
}

module.exports = usersController;