const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchPackage = async searchText => {
  const res = await fetch('../data/data.json');
  const packages = await res.json();

// Get matches to current text input
  let matches = packages.filter(package => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return package.name.match(regex) || package.package_type.match(regex);
  });

  if (searchText.lenght === 0) {
    mathes = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches)
};

// Show results in HTML
const outputHtml = matches => {
  if(matches.length > 0) {
    const html = matches.map(match => `
      <div class="card card-body mb-1">
        <h5 class="text-primary"><b>${match.name}</b></h5>
        <h5>${match.package_type}</h5>
        <medium>${match.ver_suffix} <br> ${match.hashtag}</small>
      </div>
    `
    )
    .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchPackage(search.value))
;
