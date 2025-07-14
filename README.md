# Phản hồi của API đăng nhập
### Đăng nhập thành công
```json
{
  "Locked": "0",
  "Logged": "0",
  "Privilege": "1",
  "Active": "1",
  "Luci": "0",
  "ecntToken": "123e06725ace83eb73a17cecd7d506547"
}
```
### Đăng nhập không thành công (sai mật khẩu 1 lần)
```json
{
  "Locked": "0", // hoặc "1": "Login three times fail, Webpage locked,please login after 1 minute"
  "Logged": "0", // hoặc "1": "Admistrator account is login!" | "2": "User account is already login!"
  "Privilege": "0",
  "Active": "0",
  "Luci": "0",
  "ecntToken": "000000000000000000000000000000000"
}
```
# Ví dụ: Khởi động lại router/modem
```mjs
async function reset(token /* ecntToken */, post_par) {
  await axiosInstance.post(
    `/cgi-bin/mag-reset.asp?post_par=${post_par}`,
    new URLSearchParams({
      rebootflag: "1",
      restoreFlag: "1",
      isCUCSupport: "0",
    }),
    {
      headers: {
        Cookie: `EBOOVALUE=9b490b66; ecntToken=${token}`,
      },
    }
  );
}
```