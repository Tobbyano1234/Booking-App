export function otpMessage(checkOtp: string) {
  let temp = `
      <div style="max-width: 700px;text-align: center;background: #f4f8fd;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Airtym2cAsh</h2>
        <div style="text-align:center ; color:black;"><br>
        <h3 style="color: teal;">Your OTP is ${checkOtp}</h3>
        </div>
     </div>
        `;
  return temp;
}
