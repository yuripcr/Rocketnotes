const CreateUserService = require("./CreateUserService");
const UserRepoInMemory = require("../repositories/UserRepoInMemory");
const AppError = require("../utils/AppError");


describe("CreateUserService", () => {
    let userRepoInMemory = null
    let createUserService = null


    beforeEach(() => {
        userRepoInMemory = new UserRepoInMemory();
        createUserService = new CreateUserService(userRepoInMemory);
    });

    it("user should be created", async () => {
        const user = {
            name: "User Test",
            email: "user@example.com",
            password: "123"
        }

        const userCreated = await createUserService.execute(user);
    
        console.log(userCreated);
    
        expect(userCreated).toHaveProperty("id");
    });
    
    it("user not should be created with existing email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@example.com",
            password: "123"
        }

        const user2 = {
            name: "User Test 2",
            email: "user@example.com",
            password: "123"
        }

        await createUserService.execute(user1);
        await expect(createUserService.execute(user2)).rejects.toEqual(new AppError("Email já cadastrado"));
    });
})