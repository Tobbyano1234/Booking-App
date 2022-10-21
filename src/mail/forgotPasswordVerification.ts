export function forgotPasswordVerification(token: string): string {
  const link = `http://localhost:5000/api/v1/users/reset-password/${token}`;
  let temp = `
       <div style="max-width: 700px;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="text-align: center; text-transform: uppercase;color: teal;">Change your password.</h2>
        <p>Hi there, Follow the link by clicking on the button to change your password.
        </p>
         <a href=${link}
         style="background: crimson; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
        `;
  return temp;
}
