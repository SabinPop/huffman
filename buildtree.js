/*

var huffman = {
  letters : {},
  freqs : {},
  codes : {},
  methods: {

  }
};

*/
var letters = {};
var freqs = {};
var tree = {};
var node = {};
var codes = {};
var encoded = {};
var nod = {
  name: "",
  children : []
};
var obj = {};

function main(){
  init();
  freqs = frequency(letters);
  freqs = sortfreqs(freqs);
  tree = buildtree(freqs);
  node = trimtree(tree);
  codes = assigncodes(node);
  encoded = encode(letters);
  obj = json(tree);
  output();
}

function json(tree){
  var p = tree[1];
  if(typeof p === "string"){
    nod.name = p;
    return r;
  }
  else{
    nod.children.push([{"0" : []}, {"1" : []}]);
    return (Array(trimtree(p[0]), trimtree(p[1])));
  }
}

function init(){
  var text = document.getElementById("input").value;
  letters = text;
}

function output(){
  document.getElementById("id").innerHTML = encoded;
}

function frequency(letters){
  var freqs = {};
  for(var i = 0; i < letters.length; i++){
    if(letters[i] in freqs){
      freqs[letters[i]] += 1;
    }
    else{
      freqs[letters[i]] = 1;
    }
  }
  return freqs;
}

function sortfreqs(freqs){
  var letters = [];
  for(var char in freqs){
    letters.push([freqs[char], char]);
  }
  return letters.sort();
}

function buildtree(letters){
  while(letters.length>1){
    var leasttwo = letters.slice(0,2);
    var therest = letters.slice(2,letters.length);
    var combfreq = letters[0][0] + letters[1][0];
    letters = therest;
    //console.log(letters);
    var two = [combfreq,leasttwo];
    letters.push(two);
    //console.log(JSON.stringify(letters).toString());
    letters.sort();
  }
  return letters[0];
}

function trimtree(tree){
  var p = tree[1];
  if(typeof p === "string"){
    return p;
  }
  else{
    return (Array(trimtree(p[0]), trimtree(p[1])));
  }
}

function assigncodes(node, pat){
  pat = pat || "";
  if(typeof(node) == typeof("")){
    codes[node] = pat;
  }
  else{
    assigncodes(node[0], pat + "0");
    assigncodes(node[1], pat + "1");
  }
  return codes;
}

function encode(letters){
  var output = "";
  for(var i = 0; i < letters.length; i++){
    output += codes[letters[i]];
  }
  return output;
}