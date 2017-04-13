const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const date = new Date().getDate();

module.exports = function (package) {
  let banner = `${package.name} v${package.version}\n`;
  banner += `${package.author} ${package.license} ${year}-${month}-${date}\n`;
  banner += `${package.homepage}`;
  return banner;
}
