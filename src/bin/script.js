var fs = require('fs');
function readWriteSync() {
    const args = process.argv.slice(2).reduce( (acc, arg) => {
        let [k, v] = arg.split('=');
        acc[k] = v;
        return acc
    }, {});
    let env = !args.ENV ? 'dev' : args.ENV;
    let data = fs.readFileSync(`src/environment/environment.${env}.ts`, 'utf-8');
    fs.writeFileSync('src/environment/environment.ts', data, 'utf-8');
    console.log('readFileSync complete');
}
readWriteSync();