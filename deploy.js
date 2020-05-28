/**
 * 这个文件的逻辑是将打出来的包上传到远程服务器上
 * 命令：npm run deploy:uat
 * 注意：这个上传逻辑是先把服务器上旧的包删掉，接着上传新的包,
 * 所以第一次上传的时候直接把打出来的包放在服务器上，第二次再执行npm run deploy:uat
 */
let Client = require("ssh2-sftp-client");
let sftp = new Client();
var fs = require("fs");
var path = require("path");
const Ora = require("ora");
var dirs = [];
var files = [];
//上传到远程服务器指定的目录
const remoteDir = "/usr/local/nginx/demo";
const localDir = "./dist/";
//连接远程服务器的主机名、端口号、用户名、密码
const server = {
  host: "10.11.123.0",
  port: "11",
  username: "admin",
  password: "123456"
};

const spinner = new Ora({
  text: "",
  spinner: "star"
});

/**
 *
 *
 * @param {*} localDir
 * @param {*} dirs
 * @param {*} files
 * @param {boolean} [isBase=false]
 */
function GetFileAndDirList(localDir, dirs, files, isBase = false) {
  var dir = fs.readdirSync(localDir);
  for (var i = 0; i < dir.length; i++) {
    var p = path.join(localDir, dir[i]);
    var stat = fs.statSync(p);
    if (stat.isDirectory()) {
      dirs.push(p.substring(5));
      GetFileAndDirList(p, dirs, files, true);
    } else {
      files.push({
        win: p,
        remote: isBase ? p.substring(5) : dir[i]
      });
    }
  }
}
GetFileAndDirList(localDir, dirs, files);

function deploy() {
  spinner.color = "yellow";
  spinner.start("deploy start.....");
  GetFileAndDirList(localDir, dirs, files);
  sftp
    .connect(server)
    .then(() => {
      spinner.text = "delete old files....";
      const promise = [sftp.rmdir(remoteDir + "/dist/", true)];
      return Promise.all(promise);
    })
    .then(() => {
      spinner.text = "create mobile directory";
      const promise = [sftp.mkdir(remoteDir + "/dist/", true)];

      return Promise.all(promise);
    })
    .then(data => {
      const promise = [];
      spinner.text = "create others subdirectory.....";
      dirs.forEach(item => {
        promise.push(sftp.mkdir(remoteDir + "/dist/" + item, false));
      });
      return Promise.all(promise);
    })
    .then(data => {
      const promise = [];
      spinner.text = "upload files.....";
      files.forEach(item => {
        item.remote = item.remote.replace("\\", "/");
        promise.push(sftp.put(item.win, remoteDir + "/dist/" + item.remote));
      });
      return Promise.all(promise);
    })
    .then(data => {
      console.log(`upload successful with ${files.length} files upload`);
      spinner.succeed("deploy successful");
      sftp.end();
    })
    .catch(err => {
      spinner.warn(err, "catch error");
    });
}
deploy();
