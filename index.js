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
        getVector(e) {
            let x = word.getBoundingClientRect().x
            let y = word.getBoundingClientRect().y
            let height = word.getBoundingClientRect().height
            let width = word.getBoundingClientRect().width
            let windowWidth = window.innerWidth
            let w = +$tool.style['width'].replace('px', '')
            let h = +$tool.style['height'].replace('px', '')
            console.log(options.vector)
            switch (options.vector) {
                case "top":
                    if (y - h < 0) {
                        return {
                            left: `${x}px`,
                            top: `${y + height}px`
                        }
                    } else {
                        return {
                            left: `${x}px`,
                            top: `${h-height}px`
                        }
                    }
                case 'left':
                    if (x - w < 0) {
                        console.log(x + w)
                        return {
                            left: `${x + width}px`,
                            top: `${y - height / 2}px`,
                        }
                    } else {
                        return {
                            left: `${x - w}px`,
                            top: `${y - height / 2}px`,
                        }
                    }
                case 'right':
                    if (x + w > windowWidth) {
                        return {
                            left: `${x}px`,
                            top: `${y + height}px`
                        }
                    } else {
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
            Object.assign($tool.style, methods.getVector(e))
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


ToolTip({ //Вызываем функцию и передаем объект
    place: '#_tooltipCheck', //Элемент, на который нужно вешать подсказку
    vector: 'left', //С какой стороны будет подсказка 'left' 'right' 'top' 'bottom'
    text: `<a href="#" id="link">click</a>`, //Верстка подсказки, можно использовать просто текст
    handlers: {  //События на элементы подсказки
        place: '#link', //Элемент, на который нужно повесить событие
        eventType: 'click', //Тип события
        handler: function (e) { //Функция
            e.preventDefault()
            console.log('Сработало событие')
        }
    },
    targetStyle: { //Стили для самого элемента, на котором будет подсказка
        textDecoration: 'underline',
        fontWeight: '600'
    },
    style: { //Стили самой подсказки
        background: 'rgba(55,55,55,.85)',
        color: '#fff',
        fontSize: '15px',
        letterSpacing: '2px',
        width: '100px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})


