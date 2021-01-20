Привет, я легкий плагин для создания всплывающих подсказок на JS
=====================
***
##### Оставим все этим описания для копирайтеров, просто покажу как я выгляжу и что умею
[hoverOut]: https://i.imgur.com/O0T0yu7.png
[hoverIn]: https://i.imgur.com/EVD9TZU.gif
1. ![Альтернативный текст][hoverOut]
2. ![Альтернативный текст][hoverIn]



## И это собственно все!
##### Разберем как это добавить себе
-----------------------------------
```html
<p>Lorem <span id="_tooltipCheck">HoverMe!</span> ipsum dolor sit <span id="tooltip">Привет</span>, consectetur adipisicing <span id="tooltip2">Еще привет</span>. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, odit.  perspiciatis quod tempore?</p>
```

###### Так,я вижу в нашем html какой-то спан с id - _tooltipCheck, наверняка он тут не просто так! Заглянука я мой JS файл

```js
ToolTip({ //Вызываем функцию и передаем объект
    place: '#_tooltipCheck', //Элемент, на который нужно вешать подсказку
    vector: 'right', //С какой стороны будет подсказка 'left' 'right' 'top' 'bottom'
    text: `<div><a id="_link" href="">Привет</a></div>`, //Верстка подсказки, можно использовать просто текст
    handlers: {  //События на элементы подсказки
        place: '#_link', //Элемент, на который нужно повесить событие
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

```
---
### Доступные опции

Опция | Тип данных | Описание 
------|------------| ------
place | String   | Указывается селектор слова, на которое нужно применить подсказку
vector| String   | Указание скоторы, с которой будет появляться подсказка (left, right, top, button)
text  | String   | Текст, который будет наполнять подсказку. Можно использовать верстку и шаблонные строки
handlers | Object| Набор свойств для кастомных событий
handlers.place | String | Указывает селектор, на который будет использоваться катсомное событие
handlers.eventType | String | Тип селектора ('click', 'mousemove'...)    
handlers.handler | Function |  Call-back функция
targetStyle | Object | Стили для элемента, на котором будет висеть подсказка
style | Object | Стили подсказки