"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const expenses_service_1 = require("./expenses.service");
const expenses_controller_1 = require("./expenses.controller");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
let ExpensesModule = class ExpensesModule {
};
ExpensesModule = __decorate([
    common_1.Module({
        controllers: [expenses_controller_1.ExpensesController],
        providers: [expenses_service_1.ExpensesService, users_service_1.UsersService],
        imports: [common_1.forwardRef(() => users_module_1.UsersModule)],
    })
], ExpensesModule);
exports.ExpensesModule = ExpensesModule;
//# sourceMappingURL=expenses.module.js.map