$('.lock-img').on('click', toggleLock)
$('.generate-btn').on('click', changePalettes)
$(window).on('load', changePalettes)

function toggleLock(e) {
  $(e.target).toggleClass('hide-png')
  $(e.target).siblings().toggleClass('hide-png')
  $(e.target).parent('div').toggleClass('locked')
}

function changePalettes() {
  for (let i = 1; i < 6; i++) {
    if ($('.palette-' + [i]).hasClass('locked')) return
    let newColor = getRandomPalette()
    $('.palette-' + [i]).css('background-color', newColor)
  }
}

function getRandomPalette() {
  let newColor = []
  for (let i = 0; i < 6; i++) {
    let randomInt = Math.random() * (9 - 0) + 0
    newColor.push(Math.round(randomInt))
  }
  return `#${newColor.join('')}`
}