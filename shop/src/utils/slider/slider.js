export const moveSlide = (param) => { // param = 1
    let items = document.querySelectorAll('.custom-slider-item')
    for (let i = 0; i < items.length; i++) {
        let itemOrder = parseInt(window.getComputedStyle(items[i]).order);

        items[i].style.order = itemOrder + param;

        if (items[i].style.order == items.length) {
            items[i].style.order = 0;
        } else if (items[i].style.order < 0) {
            items[i].style.order = items.length - 1;
        }

        if (items[i].style.order < 2) {
            var addClass = ''

            if (param > 0) {
                addClass = 'shiftLeft'
            } else {
                addClass = 'shiftRight'
            }

            items[i].classList.add(addClass)

            function rmvClass() {
                items[i].classList.remove(addClass)
            }

            setTimeout(() => {
                rmvClass()
            }, 200)

            if (items[i].classList.contains('display-none')) {
                items[i].classList.remove('display-none')
            }
        } else {
            if (!items[i].classList.contains('display-none')) {
                items[i].classList.add('display-none')
            }

        }
    }
}