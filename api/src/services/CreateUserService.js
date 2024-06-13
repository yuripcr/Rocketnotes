const { hash } = require('bcryptjs');
const AppError = require('../utils/AppError.js');

class CreateUserService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError('Email já cadastrado');
        }

        const hashedpassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedpassword});

        return userCreated;
    }
};

module.exports = CreateUserService;