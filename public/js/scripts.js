$('.lock-img').on('click', toggleLock)
$('.generate-btn').on('click', changePalettes)
$('.save-project-btn').on('click', saveProject)
$('.save-palette-btn').on('click', savePalette)
$(window).on('load', changePalettes)
$(window).on('load', retrieveProjects)

let globalProjects = ''

function toggleLock(e) {
  $(e.target).toggleClass('hide-png')
  $(e.target).siblings().toggleClass('hide-png')
  $(e.target).parent('div').toggleClass('locked')
}

function changePalettes() {
  for (let i = 1; i < 6; i++) {
    $('.palette-' + [i]).css('background-color', getRandomPalette(i))
  }

  $('.generate-btn').css('background-color', getRandomPalette())
}

function getRandomPalette(i) {
  if ($('.palette-' + i).hasClass('locked')) return

  let color = '#'

  for (let i = 0; i < 6; i++) {
    let digits = '0123456789ABCDEF'
    let randomInt = digits[Math.floor(Math.random() * 16)]
    color = color + randomInt
  }
  
  if (i) $('.hex-' + i)[0].innerText = color
  
  return color
}

function saveProject(e) {
  e.preventDefault()

  const data = { name: $('.project-name').val() }
  
  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => JSON.stringify(response))
  .then(() => retrieveProjects())
  .catch(error => console.error('Error:', error));

  $('.project-name').val('')
}

function retrieveProjects() {
  return fetch ('/api/v1/projects')
  .then(res => res.json())
  .then(response => populateProjectNames(response))
  .catch(error => console.error('Error:', error));
}

function populateProjectNames (projects) { 
  globalProjects = projects
  $('.project-selector').html(projects.map(project =>`<option>${project.name}</option>`))
}

function savePalette(e) {
  e.preventDefault()
  const project = globalProjects.find(project => project.name === $('.project-selector').val())

  const data = {
    name: $('.palette-name').val(),
    hex_one: $('.hex-1').text(),
    hex_two: $('.hex-2').text(),
    hex_three: $('.hex-3').text(),
    hex_four: $('.hex-4').text(),
    hex_five: $('.hex-5').text(),
    project_id: project.id
  }

  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => JSON.stringify(response))
  .catch(error => console.error('Error:', error));

  $('.palette-name').val('')
}