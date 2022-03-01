'use strict'

const AWS_DEFAULTS = {
  REGION: 'ap-south-1',
  API_VERSION: {
    DYNAMODB: '2012-08-10',
    S3: '2006-03-01',
  },
}
//
// function _sanitizeRegExpStr (string) {
//   const escapedString = string.trim().replace(/[./]/g, '\\$&')
//   const whildcardReplaced = escapedString.replace(/\*/g, '[0-9a-zA-Z.\\-_:]*')
//   return `^${whildcardReplaced}$`.trim()
// }

export default AWS_DEFAULTS
