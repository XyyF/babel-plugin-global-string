export default function (babel) {
    const {types: t} = babel;
    return {
        name: 'elfin-globalString',
        visitor: {
            MemberExpression: {
                exit(path, state) {
                    // 保证正常运行
                    if (!path.hub) return
                    const {file} = path.hub
                    const {node} = path
                    // 获取参数
                    const {opts} = state
                    const globalStrings = opts.globalString || []
                    if (globalStrings.length === 0) return
                    // 找到是以属性调用的形式使用 string.xxx
                    const string = globalStrings.find(e => t.isIdentifier(path.node.object, {name: e}))
                    if (!string) return
                    let result = ''
                    const property = node.property
                    // 是否自定义了 string 变量
                    if (file.scope.getBinding(string) || !property) return
                    let preParent = null
                    let parent = path
                    // 要由大写字母开头
                    while (parent && t.isIdentifier(parent.node.property) && /^[A-Z].*/.test(parent.node.property.name)) {
                        result += `${parent.node.property.name}-`
                        preParent = parent
                        parent = parent.findParent((temp) => temp.isMemberExpression())
                    }
                    if (preParent) {
                        preParent.replaceWith(t.stringLiteral(result.slice(0, -1)))
                    }
                },
            },
        }
    };
}
