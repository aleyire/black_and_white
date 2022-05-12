const yargs = require("yargs")
const child = require("child_process")
const key = 123
yargs.command(
    "login",
    "Comando para acceder a la aplicación",
    {
      key: {
        describe: "Contraseña",
        demand: true,
        alias: "k",
      },
    },
    (args) => {
      args.key == key
        ? child.exec("node script.js", (err, stdout) => {
            err ? console.log(err) : console.log(stdout)
          })
        : console.log("Clave incorrecta")
    }
  )
  .help().argv
