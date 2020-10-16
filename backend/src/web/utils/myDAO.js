var client = require('./mysql');

exports.selectAllNoticeList = () => {
  let query = `SELECT idx, title, write_name, count, insert_date,(select user_mail from user u where u.idx=notice.insert_idx) as user_mail FROM notice where use_flag='Y';`;

  return client.query(query);
};
