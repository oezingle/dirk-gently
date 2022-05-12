import { auditWeb } from "../lib/util/web"

import web from '../lib/web.json'

export async function get() {
    return {
        body: auditWeb(web)
    }
}