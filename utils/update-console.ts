const enc = new TextEncoder()

const updateConsole = (msg: string) => {
  Deno.stdout.writeSync(enc.encode(`\x1b[2K\r${msg}`))
}

export default updateConsole
