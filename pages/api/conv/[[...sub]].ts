import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import template from '@/lib/template.json'
import { omitKeys, removeValue } from '@/lib/utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const externalUrl = Array.isArray(req.query.sub) ? req.query.sub.join('/') : req.query.sub
  const fullUrl = `https://${externalUrl}`

  try {
    const { data } = await axios.get(fullUrl)
    const outbounds = removeValue(
      omitKeys(data?.outbounds, ['url', 'interval', 'idle_timeout', 'tolerance']),
      'outbounds',
      'direct'
    )
    if (outbounds) {
      template.outbounds = outbounds
      res.status(200).json(template)
    } else {
      res.status(404).json({ message: 'outbounds data not found' })
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
