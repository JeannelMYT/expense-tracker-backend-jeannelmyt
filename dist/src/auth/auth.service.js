"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(authLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {
            userId: user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            userId: user.id,
        };
    }
    async validateUser(authLoginDto) {
        const { username, password } = authLoginDto;
        const user = await this.usersService.findByUsername(username);
        if (!(await (user === null || user === void 0 ? void 0 : user.validatePassword(password)))) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async validate(authValidateDto) {
        const { id, password } = authValidateDto;
        const user = await this.usersService.findById(id);
        if (!(await (user === null || user === void 0 ? void 0 : user.validatePassword(password)))) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map