const fs = require('fs')
const openRpcSpec = require('@airswap/utils/spec')

function formatType(schema, indent = 0) {
  if (!schema) return 'any'

  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    return `[${refName}](#${refName.toLowerCase()})`
  }

  if (schema.type === 'array') {
    const itemType = formatType(schema.items, indent)
    return `${itemType}[]`
  }

  if (schema.type === 'object' && schema.properties) {
    const props = Object.entries(schema.properties)
      .map(([key, value]) => `${key}: ${formatType(value)}`)
      .join(', ')
    return `{ ${props} }`
  }

  return schema.type || 'any'
}

function formatParams(params) {
  if (!params || params.length === 0) return ''

  return params
    .map((param) => {
      const required = param.required !== false ? '' : '?'
      const type = formatType(param.schema)
      const description = param.description ? ` // ${param.description}` : ''
      return `  ${param.name}${required}: ${type},${description}`
    })
    .join('\n')
}

function formatResult(result) {
  if (!result) return 'void'
  return formatType(result.schema)
}

function generateMethodDoc(method) {
  let md = `## \`${method.name}\`\n\n`

  if (method.description) {
    md += `${method.description}\n\n`
  }

  md += '```typescript\n'
  md += `${method.name}(\n`

  if (method.params && method.params.length > 0) {
    md += formatParams(method.params)
    md += '\n'
  }

  md += `): ${formatResult(method.result)}\n`
  md += '```\n\n'

  if (method.params && method.params.length > 0) {
    md += '### Parameters\n\n'
    md += '| Name | Type | Required | Description |\n'
    md += '|------|------|----------|-------------|\n'
    method.params.forEach((param) => {
      const required = param.required !== false ? 'Yes' : 'No'
      const type = formatType(param.schema)
      const description = param.description || ''
      md += `| \`${param.name}\` | \`${type}\` | ${required} | ${description} |\n`
    })
    md += '\n'
  }

  if (method.result && method.result.schema) {
    md += '### Returns\n\n'
    md += `\`${formatResult(method.result)}\``
    if (method.result.description) {
      md += ` — ${method.result.description}`
    }
    md += '\n\n'
  }

  return md
}

function generateSchemaDoc(name, schema) {
  let md = `## ${name}\n\n`

  if (schema.description) {
    md += `${schema.description}\n\n`
  }

  if (schema.properties) {
    md += '| Property | Type | Description |\n'
    md += '|----------|------|-------------|\n'
    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const type = formatType(propSchema)
      const description = propSchema.description || ''
      md += `| \`${propName}\` | \`${type}\` | ${description} |\n`
    })
    md += '\n'
  }

  return md
}

function groupMethodsByTag(methods) {
  const grouped = {}
  const untagged = []

  methods.forEach((method) => {
    if (method.tags && method.tags.length > 0) {
      method.tags.forEach((tag) => {
        const tagName = typeof tag === 'string' ? tag : tag.name
        if (!grouped[tagName]) {
          grouped[tagName] = []
        }
        grouped[tagName].push(method)
      })
    } else {
      untagged.push(method)
    }
  })

  if (untagged.length > 0) {
    grouped['Other'] = untagged
  }

  return grouped
}

let markdown = ''

if (openRpcSpec.methods && openRpcSpec.methods.length > 0) {
  const groupedMethods = groupMethodsByTag(openRpcSpec.methods)

  Object.entries(groupedMethods).forEach(([tag, methods]) => {
    markdown += `# ${tag}\n\n`
    methods.forEach((method) => {
      markdown += generateMethodDoc(method)
    })
  })
}

if (openRpcSpec.components && openRpcSpec.components.schemas) {
  markdown += '# Types\n\n'
  Object.entries(openRpcSpec.components.schemas).forEach(([name, schema]) => {
    markdown += generateSchemaDoc(name, schema)
  })
}

fs.writeFileSync('./technology/protocols.md', markdown)
console.info(markdown)
