function ToolTip(options) {
    const $tool = _createTooltip(options)
    const word = document.querySelector(options.place)
    if (options.targetStyle) {
        Object.assign(word.style, options.targetStyle)
    }

    function _createTooltip(options) {
        const tool = document.createElement('div')
        const template = `
    <div>
        <span>${options.text || 'Это подсказка еще не оформлена'}</span>
    </div>
    `
        tool.insertAdjacentHTML('afterbegin', template)
        tool.classList.add('_tooltipBox')
        Object.assign(tool.style, {
            position: 'absolute',
        })
        Object.assign(tool.style, options.style ? options.style : {
            position: 'absolute',
            background: 'rgba(110,110,110,.8)',
            padding: '10px',
            border: '1px solid #888'
        })
        if (options.handlers) {
            tool.querySelector(options.handlers.place).addEventListener(options.handlers.eventType, options.handlers.handler)
        }
        return tool
    }

    word.addEventListener('mouseenter', (e) => {
        methods.open(e)
    })
    word.addEventListener('mouseleave', (e) => {
        methods.close(e)
    })

    const methods = {
        getVecor(e) {
            let x = word.getBoundingClientRect().x
            let y = word.getBoundingClientRect().y
            let height = word.getBoundingClientRect().height
            let width = word.getBoundingClientRect().width
            let toolTipWidth = $tool.offsetWidth
            let toolTipHeight = $tool.offsetHeight
            let windowWidth = window.innerWidth
            let w = +$tool.style['width'].replace('px', '')
            let h = +$tool.style['height'].replace('px', '')
            console.log(options.vector)
            switch (options.vector) {
                case "top":
                    if (y - h < 0){
                        return {
                            left: `${x}px`,
                            top: `${y + height}px`
                        }
                    }else{
                        return {
                            left: `${x}px`,
                            top: `${y - h+height/2}px`
                        }
                    }
                    return {

                    }
                case 'left':
                    if (x - w < 0){
                        console.log(x+w)
                        return {
                            left: `${x + width}px`,
                            top: `${y - height / 2}px`,
                        }
                    }else{
                        console.log(w)
                        return {
                            left: `${x - w}px`,
                            top: `${y - height / 2}px`,
                        }
                    }
                case 'right':
                    if (x + w > windowWidth){
                        return {
                            left: `${x}px`,
                            top: `${y + height}px`
                        }
                    }else{
                        return {
                            left: `${x + width}px`,
                            top: `${y - height / 2}px`,
                        }
                    }
                case 'bottom':
                    return {
                        left: `${x}px`,
                        top: `${y + height}px`
                    }
                default:
                    return {
                        left: `${x}px`,
                        top: `${y - height * 2}px`
                    }
            }


        },
        open(e) {
            Object.assign($tool.style, methods.getVecor(e))
            word.append($tool)
            document.querySelector('body').style.overflowX = 'hidden'
        },
        close(e) {
            word.querySelector(`._tooltipBox`).remove()
            document.querySelector('body').style.overflowX = 'auto'
        }
    }
    return methods
}


let tl = ToolTip({
    place: '#_tooltipCheck',
    vector: 'right',
    text: 'Приветули',
    targetStyle: {
        textDecoration: 'underline'
    },
    style: {
        background: 'yellow',
        fontSize: '30px',
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})