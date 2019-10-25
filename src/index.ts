import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
const Netlify = require('netlify')

class NetlifyCopyEnvVars extends Command
{
  static description = 'copy env vars from one site to another'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    token: flags.string({ char: 't', description: 'Netlify Access Token' }),
    preserve: flags.boolean({char: 'p', description: 'Preserve existing variables' }),
  }

  static args = [
    { name: 'from' },
    { name: 'to' },
  ]

  async run()
  {
    const {args, flags} = this.parse(NetlifyCopyEnvVars)

    const netlify = new Netlify(await this.getAndSaveToken(flags.token))

    const from = await netlify.getSite({ site_id: args.from })
    let env = from.build_settings.env

    if (flags.preserve) {
      const to = await netlify.getSite({ site_id: args.to })
      env = Object.assign({}, env, to.build_settings.env)
    }

    await netlify.updateSite({
      site_id: args.to,
      body: {
        build_settings: {
          env
        }
      }
    })
  }

  async getAndSaveToken(token: string | undefined)
  {
    const json = path.join(this.config.configDir, 'config.json')

    const exists = await fs.pathExists(json)
    const config = exists ? await fs.readJSON(json, { throws: false }) : {}

    config.token = token || config.token

    await fs.outputJson(json, config)

    return config.token
  }
}

export = NetlifyCopyEnvVars
