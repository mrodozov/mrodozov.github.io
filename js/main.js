
var archlist_dd_menus = document.querySelectorAll('.arch');
var arch_ib_json;

$.getJSON("../data/dependencies/arch_ib.json", function( data ) {
  console.log('lol');
  console.log(archlist_dd_menus.length)
  //for archlist_dd_menus
  for (i = 0; i < archlist_dd_menus.length; i++) {
    $.each( data, function( k, v ) {
      var link = document.createElement("a");
      link.className = "dropdown-item"
      link.innerHTML = v.arch
      link.href = "#";
      archlist_dd_menus[i].appendChild(link);      
    });
    console.log(archlist_dd_menus[i]);
  }
  console.log(data)
  arch_ib_json = data;
});

$('.arch').on('click', 'a' ,function(e) {
  var arch_button_id = '#btnGroupDropArch'+e.delegateTarget.id;
  var ib_button_id = 'btnGroupDropIb'+e.delegateTarget.id
  var arch = this.text
  $(arch_button_id).text(arch);
  // on selecting arch, reset the ib button text to default
  let ibs_list = arch_ib_json.filter(el => el.arch == arch)[0].ibs.sort();
  //console.log('ib list:' , ibs_list)
  ib_dd = document.querySelectorAll("[aria-labelledby="+ib_button_id+"]")[0]
  //console.log(ib_dd)

  ibs_list.forEach( function(i) {
    //console.log(i)
    var link = document.createElement("a");
    link.className = "dropdown-item"
    link.innerHTML = i
    link.href = "#";
    ib_dd.appendChild(link);
  });
});

$('.ib').on('click', 'a', function(e) {

  console.log(this.text)
  $('#btnGroupDropIb'+e.delegateTarget.id).text(this.text)
  //$('button').text($(this).text());
  //var x = $(event.relatedTarget).text(); // Get the button text
  //alert("You clicked on: " + x);
});

$('#arch_dropdown_selector').on('click', 'dropdown-item', function() {
  console.log('this is ',this, this.textContent)
  var arch = this.textContent;
  // reset the last list and change the button name to default
  $('#ib_dropdown_selector').empty();
  let ibs_list = arch_ib_json.filter(el => el.arch == arch)[0].ibs.sort();
  ibs_list.forEach( function(i) {
    var li = document.createElement("dropdown-item");
    var link = document.createElement("a");             
    var text = document.createTextNode(i);
    link.appendChild(text);
    link.href = "#";
    li.appendChild(link);
    iblist.appendChild(li);
  });
});

$('#ib_dropdown_selector').on('click', 'dropdown-item' , function(e) {
  //console.log('select release');
  console.log(e.delegateTarget.id)
  console.log(e.delegateTarget.class)
  console.log(this)
  var arch = $('#arch_dropdown_selector .active a').text();
  var ib = $('#ib_dropdown_selector .active a').text();
  console.log(arch, ib);

  $.getJSON("../data/dependencies/"+arch+"/"+ib+"/cmssw-tool-conf.json")
  .done(function (result, status, xhr) { console.log('cmssw-tool-conf', result) })
  .fail(function (xhr, status, error){
    // check whats wrong and retry with the other file
    $.getJSON("../data/dependencies/"+arch+"/"+ib+"/cmssw-patch-tool-conf.json")
    .done(function (result, status, xhr) { console.log('cmssw-patch-tool-conf', result) })
    .fail(function (xhr_two, status_two, error_two){
        alert("First request: " + status + " " + error + " " + xhr.status + " " + xhr.statusText +
        "Second request:" + status_two + " " + error_two + " " + xhr_two.status + " " + xhr_two.statusText+'\n'+
        "Both cmssw-patch-tool-conf and cmssw-tool-conf files does not exist, check the folder"
        );
    });
  });
});

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const searchPackage = async searchText => {
  const res = await fetch('../data/dependencies/arch_ib.json');
  const packages = await res.json();

// Get matches to current text input
  let matches = packages.filter(package => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return package.arch.match(regex) ;
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
        <h5 class="text-primary"><b>${match.arch}</b></h5>
        
      </div>
    `
    )
    .join('');

    matchList.innerHTML = html;
  }
};

//search.addEventListener('input', () => searchPackage(search.value))




;
