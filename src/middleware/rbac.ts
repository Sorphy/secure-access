import { JwtRequest } from "./auth";
import { Request, Response, NextFunction } from "express";

export function checkRole(allowedRoles: ('admin' | 'manager' | 'employee')[]) {
 return (req: JwtRequest, res: Response, next: NextFunction) => {
  const user = req.user;

     if (user && !allowedRoles.includes(user.role)) {
       const roleString = constructRoleString(allowedRoles);
         
         const userRolePrefix = isVowel(user.role[0].toLowerCase())
           ? "an"
           : "a";
   return res.status(403).json({
     message: `Forbidden, you are ${userRolePrefix} ${user.role} and this service is only available for ${roleString}`,
   });
  }

  next();
 };
}

function isVowel(char: string): boolean { 
    return ["a", "e", "i", "o", "u"].includes(char);
}

function constructRoleString(roles: string[]): string {
  if (roles.length > 1) {
    return `${roles.join(" and ")}`;
  }

  return ` ${roles[0]}`;
}


// If the roles are more.
// function constructRoleString(roles: string[]): string {
//   if (roles.length === 1) {
//     return ` ${roles[0]}`;
//   } else if (roles.length === 2) {
//     return ` ${roles[0]} and ${roles[1]}`;
//   } else {
//     const firstPart = roles.slice(0, -1).join(", ");
//     const secondPart = ` and ${roles.slice(-1)[0]}`;
//     return ` ${firstPart}${secondPart}`;
//   }
// }
