// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { UserRole } from '../modules/role/enum/user-role.enum';
// import { UserService } from '../modules/user/user.service';

// @Injectable()
// export class AdminRoleGuard implements CanActivate {
//   constructor(private userService: UserService) {}

//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     console.log(request.route.path);
//     console.log(request.method.toLowerCase());

//     if (request?.user) {
//       const { userId } = request.user;

//       const user = await this.userService.getUserById(userId);
//       delete user.password;

//       return (
//         request.user.roleId === user.roleId && user.roleId === UserRole.ADMIN
//       );
//     }

//     return false;
//   }
// }
