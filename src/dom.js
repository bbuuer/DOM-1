window.dom = {
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) { //用于新增node2弟弟
        node.parentNode.insertBefore(node2, node.nextSibling);
        // 找到node这个节点的爸爸，调用爸爸的insertBefore方法，把node2插入node的下一个节点的前面
    },
    before(node, node2) {//用于新增node2哥哥
        node.parentNode.insertBefore(node2, node);
        // 找到node这个节点的爸爸，调用爸爸的insertBefore方法，
    },
    append(parent, node) {//用于新增儿子
        parent.appendChild(node)
    },
    wrap(node, parent) {//用于新增爸爸
        dom.before(node, parent)
        dom.append(parent, node)
        //把节点从数里弄出来
    },
    remove(node) {//用于删除节点
        node.parentNode.removeChild(node)
        return node
        //通过节点的爸爸调用removeChild方法删除节点
    },
    empty(node) { //用于删除后代
        const { childNodes } = node //直接从node获取所有的节点
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild)) //移除节点并放在数组里面
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {//用于读写属性
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { //适配
        if (arguments.length === 2) {  //修改
            if ('innerText' in node) {
                node.innerText = string  //ie
            } else {
                node.textContent = string  //chrome
            }
        } else if (arguments.length === 1) { //获取
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }

    },
    html(node, string) {//读写HTML内容
        if (arguments.length === 2) { //写
            node.innerHTML = string
        } else if (arguments.length === 1) {//读
            return node.innerHTML
        }
    },
    style(node, name, value) { //用于修改style
        if (arguments.length === 3) {  //修改
            //dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {  //可能修改 ，可能读
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                //读
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }

    },
    class: {
        add(node, className) { //用于添加class
            node.classList.remove(className)
        },
        remove(node, className) { //用于删除class
            node.classList.has(className)
        }
    },
    on(node, eventName, fn) {//用于添加事件监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {//用于删除事件监听
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {//用于获取标签/标签们
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {//用于获取父元素
        return node.parentNode
    },
    children(node) {//用于获取子元素
        return node.children
    },
    siblings(node) {//用于获取获取兄弟姐妹元素
        return Array.from(node.parentNode, children)
            .filter(n => n != node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node, parentNode)
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }


};
