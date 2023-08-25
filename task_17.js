 function getApi(cd) {
  let debounce = false
  return async function(q) {

    if (!debounce) {

      const query = new URLSearchParams({
        q: q,
        limit: '10',
        key: 'bbdbeb52-1f6b-44a9-bc10-3420ef60f4fe'
      }).toString();

      try {
        const resp = await fetch(`https://graphhopper.com/api/1/geocode?${query}`);
        const data = await resp.json();
        console.log(data);
        ul.innerHTML = ''
        input.value = ''
        data.hits.map(e => ul.insertAdjacentHTML('beforeend',`<li>${e.country} ${
          e.state ? e.state : ''} ${e.name} ${
          e.housenumber ? e.housenumber : ''} ${
          e.postcode ? e.postcode : ''}</li>`))
      } catch(e) {
        input.value = 'Error request'
      }
      debounce = true
      setTimeout(() => debounce = false, cd)

    }
  }
}
const getGeo = getApi(3000)


const input = document.querySelector('input')
const form = document.querySelector('form')
const ul = document.querySelector('ul')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  getGeo(input.value)
})
ul.addEventListener('click', (e) => {
  if (e.target.closest('ul')) {
    input.value = e.target.textContent
    ul.innerHTML = ''
  }
})