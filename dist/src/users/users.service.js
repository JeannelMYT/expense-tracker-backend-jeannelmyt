"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    async create(createUserDto) {
        const usernameExists = await user_entity_1.User.findOne({
            where: {
                username: createUserDto.username,
            },
        });
        if (usernameExists) {
            throw new common_1.HttpException('Username already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const emailExists = await user_entity_1.User.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (emailExists) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = user_entity_1.User.create(createUserDto);
        await user.save();
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }
    async getUserDetails(id) {
        const user = await this.findById(id);
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }
    async findById(id) {
        return await user_entity_1.User.findOne(id);
    }
    async findByUsername(username) {
        return await user_entity_1.User.findOne({
            where: {
                username: username,
            },
        });
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map