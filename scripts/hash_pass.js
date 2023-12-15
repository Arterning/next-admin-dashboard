const bcrypt = require('bcrypt');
const plaintextPassword = '123456';
/**
 * 使用 bcrypt 对密码进行加密
 */
bcrypt.hash(plaintextPassword, 10, (err, hash) => {
  if (err) {
    // 处理错误
    console.error(err);
  } else {
    // 输出哈希密码
    console.log(hash);
  }
});
