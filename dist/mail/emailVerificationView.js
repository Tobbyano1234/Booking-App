"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationView = void 0;
function emailVerificationView(token) {
    const link = `http://localhost:5000/api/v1/users/verify/${token}`;
    let temp = `
     <div style="max-width: 700px;text-align: center; text-transform: uppercase;
     margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h2 style="color: teal;">Welcome to My booking app</h2>
     <p>Please Follow the link by clicking on the button to verify your email
      </p>
      <div style="text-align:center ;">
        <a href=${link}
       style="background: #277BC0; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
   </div>
      `;
    return temp;
}
exports.emailVerificationView = emailVerificationView;
